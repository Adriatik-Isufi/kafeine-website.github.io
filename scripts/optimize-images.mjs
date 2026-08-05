// Generates WebP (and AVIF for the LCP hero) siblings of the large photography
// used across the site into public/optimized/<same relative path>... —
// fully non-destructive (originals under public/ are never touched) and
// idempotent (skips files whose output is already newer than the source).
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

const TARGETS = [
  { dir: 'New Batch', maxWidth: 1000, quality: 72 },
  { dir: 'Menu', maxWidth: 800, quality: 72 },
  { dir: 'stories', maxWidth: 800, quality: 72 },
]

const SINGLE_FILES = [
  { file: 'pristina-map-dark.png', maxWidth: 1200, quality: 75 },
  { file: 'images/Work1.jpg', maxWidth: 1000, quality: 75 },
  { file: 'images/workspace.png', maxWidth: 1000, quality: 75 },
]

// Responsive LCP hero background — AVIF + WebP at mobile/tablet/desktop widths.
const HERO_WIDTHS = [640, 960, 1280]
const LOGO_WIDTHS = [208, 416]

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

async function optimizeHero() {
  const src = path.join(publicDir, 'images', 'coffee-pour.jpg')
  let generated = 0
  try {
    await fs.access(src)
  } catch {
    console.warn('[optimize-images] WARNING: images/coffee-pour.jpg not found')
    return 0
  }

  for (const width of HERO_WIDTHS) {
    const webpOut = path.join(outRoot, 'images', `coffee-pour-${width}.webp`)
    if (!(await isUpToDate(src, webpOut))) {
      await fs.mkdir(path.dirname(webpOut), { recursive: true })
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width <= 640 ? 68 : 72 })
        .toFile(webpOut)
      generated++
    }

    const avifOut = path.join(outRoot, 'images', `coffee-pour-${width}.avif`)
    if (!(await isUpToDate(src, avifOut))) {
      await fs.mkdir(path.dirname(avifOut), { recursive: true })
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 45, effort: 5 })
        .toFile(avifOut)
      generated++
    }
  }

  // Keep a plain coffee-pour.webp for any leftover CSS references.
  const legacy = path.join(outRoot, 'images', 'coffee-pour.webp')
  if (!(await isUpToDate(src, legacy))) {
    await sharp(src)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(legacy)
    generated++
  }

  return generated
}

async function optimizeLogo() {
  const src = path.join(publicDir, 'images', 'logo.png')
  let generated = 0
  try {
    await fs.access(src)
  } catch {
    console.warn('[optimize-images] WARNING: images/logo.png not found')
    return 0
  }

  for (const width of LOGO_WIDTHS) {
    const out = path.join(outRoot, 'images', `logo-${width}.webp`)
    if (await isUpToDate(src, out)) continue
    await fs.mkdir(path.dirname(out), { recursive: true })
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out)
    generated++
  }
  return generated
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

  checked += 2
  generated += await optimizeHero()
  generated += await optimizeLogo()

  console.log(`[optimize-images] ${checked} source images checked, ${generated} optimized files (re)generated`)
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err)
  process.exit(1)
})
