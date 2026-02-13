import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile, unlink, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';
import { tmpdir } from 'os';

const PUBLIC_DIR = './public';
const QUALITY = 80; // JPEG/WebP quality (0-100)
const MAX_WIDTH = 1920; // Max width for large images
const SIZE_THRESHOLD = 100 * 1024; // 100KB threshold

const IMAGE_DIRS = [
  'images',
  'Menu',
  'New Batch',
];

async function getImageFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (item.isFile()) {
      const ext = extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Skip if already small
    if (originalSize < SIZE_THRESHOLD) {
      console.log(`⏭️  Skipping ${basename(filePath)} (${(originalSize / 1024).toFixed(1)}KB - already optimized)`);
      return { skipped: true, originalSize };
    }

    const ext = extname(filePath).toLowerCase();
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;

    // Resize if too large
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Optimize based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({
        quality: QUALITY,
        progressive: true,
        mozjpeg: true
      });
    } else if (ext === '.png') {
      pipeline = pipeline.png({
        compressionLevel: 9,
        palette: true
      });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({
        quality: QUALITY
      });
    }

    // Write to buffer first to compare sizes
    const optimizedBuffer = await pipeline.toBuffer();
    const newSize = optimizedBuffer.length;

    // Only save if we achieved compression
    if (newSize < originalSize) {
      // Use temp file approach for Windows compatibility
      const tempPath = join(tmpdir(), `opt_${Date.now()}_${basename(filePath)}`);
      try {
        await sharp(optimizedBuffer).toFile(tempPath);
        await copyFile(tempPath, filePath);
        await unlink(tempPath);
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${basename(filePath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`);
        return { optimized: true, originalSize, newSize };
      } catch (writeError) {
        // Fallback: try direct write
        try {
          await sharp(optimizedBuffer).toFile(filePath);
          const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          console.log(`✅ ${basename(filePath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`);
          return { optimized: true, originalSize, newSize };
        } catch (directError) {
          throw writeError;
        }
      }
    } else {
      console.log(`⏭️  Skipping ${basename(filePath)} (optimization wouldn't reduce size)`);
      return { skipped: true, originalSize };
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
    return { error: true, originalSize: 0 };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const dir of IMAGE_DIRS) {
    const fullDir = join(PUBLIC_DIR, dir);

    if (!existsSync(fullDir)) {
      console.log(`⚠️  Directory not found: ${fullDir}`);
      continue;
    }

    console.log(`\n📁 Processing: ${dir}/`);
    console.log('-'.repeat(40));

    const files = await getImageFiles(fullDir);

    for (const file of files) {
      const result = await optimizeImage(file);

      if (result.optimized) {
        totalOriginal += result.originalSize;
        totalOptimized += result.newSize;
        optimizedCount++;
      } else if (result.skipped) {
        totalOriginal += result.originalSize;
        totalOptimized += result.originalSize;
        skippedCount++;
      } else if (result.error) {
        errorCount++;
      }
    }
  }

  console.log('\n============================');
  console.log('📊 Summary:');
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(`   Skipped: ${skippedCount} images`);
  console.log(`   Errors: ${errorCount} images`);

  if (totalOriginal > 0) {
    const totalSaved = totalOriginal - totalOptimized;
    const percentSaved = (totalSaved / totalOriginal * 100).toFixed(1);
    console.log(`\n   Total size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB (${percentSaved}%)`);
  }
}

main().catch(console.error);
