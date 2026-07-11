/**
 * Menu data — source of truth is data/menu.csv (edit that file only).
 *
 * menu.generated.json is created automatically when you run dev/build.
 * Do not edit the .json by hand — the website just needs it to load the CSV data.
 *
 * Columns in menu.csv:
 *   category   espresso | icedCoffee | teas | smoothies | milkshakes |
 *              granitas | softDrinks | food | bakery
 *   name       item name on the site
 *   small      S price (1.50 or 1,50 — both fine; € added automatically)
 *   medium     M price (leave blank if not sold)
 *   large      L price
 *   double     double-shot price (espresso)
 *
 * No photos needed in the CSV. Category mood photos live in menu-images.ts.
 * Missing category photos → placeholder. Site still works.
 */

import menuData from "./menu.generated.json"
import { categoryImages } from "./menu-images"

export type MenuCategoryId =
  | "espresso"
  | "icedCoffee"
  | "teas"
  | "smoothies"
  | "milkshakes"
  | "granitas"
  | "softDrinks"
  | "food"
  | "bakery"

export type MenuItemPrices = {
  small?: string
  medium?: string
  large?: string
  double?: string
}

export type MenuItem = {
  name: string
  prices: MenuItemPrices
}

export const MENU_CATEGORY_IDS: MenuCategoryId[] = [
  "espresso",
  "icedCoffee",
  "teas",
  "smoothies",
  "milkshakes",
  "granitas",
  "softDrinks",
  "food",
  "bakery",
]

const FALLBACK_IMAGE = "/placeholder.svg"

export const menuItems: Record<MenuCategoryId, MenuItem[]> = menuData.items as Record<
  MenuCategoryId,
  MenuItem[]
>

/** Categories that currently have at least one item (empty CSV sections hide their tab). */
export function getActiveCategories(): MenuCategoryId[] {
  return MENU_CATEGORY_IDS.filter((id) => (menuItems[id]?.length ?? 0) > 0)
}

/**
 * Gallery for a category tab (from menu-images.ts).
 * Always at least one path so carousels never crash.
 */
export function getCategoryGallery(category: MenuCategoryId): string[] {
  const moodPhotos = (categoryImages[category] ?? []).filter(Boolean)
  return moodPhotos.length > 0 ? moodPhotos : [FALLBACK_IMAGE]
}
