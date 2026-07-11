/**
 * Reads data/menu.csv and writes data/menu.generated.json
 *
 * YOU (and the cafe owner) only edit data/menu.csv.
 * menu.generated.json is machine output — do not edit it by hand.
 * It exists so the website can load the menu (browsers can't read CSV directly).
 *
 * Runs automatically via: predev / prebuild / npm run sync-menu
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const csvPath = join(root, "data", "menu.csv")
const outPath = join(root, "data", "menu.generated.json")

const VALID_CATEGORIES = new Set([
  "espresso",
  "icedCoffee",
  "teas",
  "smoothies",
  "milkshakes",
  "granitas",
  "softDrinks",
  "food",
  "bakery",
])

const SIZE_COLUMNS = ["small", "medium", "large", "double"]

function parseCsvLine(line) {
  const cells = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (char === "," && !inQuotes) {
      cells.push(current)
      current = ""
      continue
    }
    current += char
  }
  cells.push(current)
  return cells.map((cell) => cell.trim())
}

function formatPrice(raw) {
  const trimmed = String(raw ?? "").trim()
  if (!trimmed) return null

  const normalized = trimmed.replace(/€/g, "").replace(",", ".").trim()
  const num = Number(normalized)

  if (Number.isFinite(num)) {
    return `${num.toFixed(2)}€`
  }

  return trimmed.includes("€") ? trimmed : `${trimmed}€`
}

function parseMenuCsv(csvText) {
  const lines = csvText
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))

  if (lines.length < 2) {
    throw new Error("menu.csv is empty — add a header row and at least one item")
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase())
  const required = ["category", "name"]
  for (const col of required) {
    if (!headers.includes(col)) {
      throw new Error(`menu.csv missing required column: ${col}`)
    }
  }

  const items = []
  const warnings = []

  for (let i = 1; i < lines.length; i++) {
    const rowNumber = i + 1
    const cells = parseCsvLine(lines[i])
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]))

    const category = row.category?.trim()
    const name = row.name?.trim()

    if (!category || !name) {
      warnings.push(`Row ${rowNumber}: skipped (missing category or name)`)
      continue
    }

    if (!VALID_CATEGORIES.has(category)) {
      warnings.push(
        `Row ${rowNumber}: skipped unknown category "${category}". Use: ${[...VALID_CATEGORIES].join(", ")}`,
      )
      continue
    }

    const prices = {}
    for (const size of SIZE_COLUMNS) {
      const formatted = formatPrice(row[size])
      if (formatted) prices[size] = formatted
    }

    if (Object.keys(prices).length === 0) {
      warnings.push(`Row ${rowNumber}: skipped "${name}" (no prices filled in)`)
      continue
    }

    items.push({ category, name, prices })
  }

  return { items, warnings }
}

const csv = readFileSync(csvPath, "utf8")
const { items, warnings } = parseMenuCsv(csv)

const byCategory = Object.fromEntries([...VALID_CATEGORIES].map((id) => [id, []]))

for (const item of items) {
  byCategory[item.category].push({
    name: item.name,
    prices: item.prices,
  })
}

writeFileSync(
  outPath,
  `${JSON.stringify(
    {
      _comment: "AUTO-GENERATED from data/menu.csv — do not edit. Run: npm run sync-menu",
      items: byCategory,
    },
    null,
    2,
  )}\n`,
  "utf8",
)

console.log(`Synced ${items.length} menu items → data/menu.generated.json`)
for (const warning of warnings) {
  console.warn(`  ⚠ ${warning}`)
}
