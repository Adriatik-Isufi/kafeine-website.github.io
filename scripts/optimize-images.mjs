// Generates WebP siblings of the large photography used across the site into
// public/optimized/<same relative path>.webp — fully non-destructive (the
// original JPG/PNG files under public/ are never touched) and idempotent
// (skips files whose WebP output is already newer than the source).
//
// Runs automatically before `next build`/`next dev` via the "prebuild"/"predev"
// npm scripts, so newly dropped photos get optimized on every deploy without
// any manual step.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const publicDir = path.join(root, 'public')
const outRoot = path.join(publicDir, 'optimized')

// Each entry caps the resize width to the largest size the image is ever
// rendered at (with headroom for retina), so we get the win from both
// re-encoding to WebP *and* not shipping needlessly high resolutions.
const TARGETS = [
  { dir: 'New Batch', maxWidth: 1000, quality: 72 },
  { dir: 'Menu', maxWidth: 800, quality: 72 },
  { dir: 'stories', maxWidth: 800, quality: 72 },
]

const SINGLE_FILES = [
  { file: 'pristina-map-dark.png', maxWidth: 1200, quality: 75 },
  { file: 'images/coffee-pour.jpg', maxWidth: 1920, quality: 75 },
  { file: 'images/Work1.jpg', maxWidth: 1000, quality: 75 },
  { file: 'images/workspace.png', maxWidth: 1000, quality: 75 },
]

const IMAGE_EXT = /\.(jpe?g|png)$/i

async function isUpToDate(src, out) {
  try {
    const [srcStat, outStat] = await Promise.all([fs.stat(src), fs.stat(out)])
    return outStat.mtimeMs >= srcStat.mtimeMs
  } catch {
    return false
  }
}

async function convert(src, out, maxWidth, quality) {
  if (await isUpToDate(src, out)) return false
  await fs.mkdir(path.dirname(out), { recursive: true })
  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out)
  return true
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(full)
      return IMAGE_EXT.test(entry.name) ? [full] : []
    })
  )
  return files.flat()
}

async function main() {
  let generated = 0
  let checked = 0

  for (const { dir, maxWidth, quality } of TARGETS) {
    const srcDir = path.join(publicDir, dir)
    let files = []
    try {
      files = await walk(srcDir)
    } catch {
      console.warn(`[optimize-images] WARNING: directory not found: ${dir}/`)
      continue
    }
    for (const src of files) {
      const rel = path.relative(publicDir, src).replace(IMAGE_EXT, '.webp')
      const out = path.join(outRoot, rel)
      checked++
      if (await convert(src, out, maxWidth, quality)) generated++
    }
  }

  for (const { file, maxWidth, quality } of SINGLE_FILES) {
    const src = path.join(publicDir, file)
    const out = path.join(outRoot, file.replace(IMAGE_EXT, '.webp'))
    checked++
    try {
      await fs.access(src)
    } catch {
      console.warn(`[optimize-images] WARNING: ${file} not found`)
      continue
    }
    if (await convert(src, out, maxWidth, quality)) generated++
  }

  console.log(`[optimize-images] ${checked} source images checked, ${generated} WebP files (re)generated`)
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err)
  process.exit(1)
})
