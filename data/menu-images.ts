/**
 * Menu Images & Dessert Stories Configuration
 *
 * Prices / item names live in data/menu.csv (owner edits that file only).
 * This file is only for category mood photos + dessert stories.
 *
 * HOW TO ADD IMAGES:
 * ─────────────────────────────────────────────────────────
 * 1. Drop the image/video into /public/Menu/ (or /public/stories/)
 * 2. Add the path to the array for that category below
 *
 * No image for a category? Leave the array empty — site shows a placeholder.
 * Product rows in the CSV do not need photos.
 * ─────────────────────────────────────────────────────────
 */

// ── Per-tab images shown in the left panel when a menu category is active ──
// Photo paths point at scripts/optimize-images.mjs output (pre-resized WebP);
// videos and files already shipped as WebP are referenced directly.
export const categoryImages: Record<string, string[]> = {
  espresso: [
    "/optimized/Menu/Coffe1.webp",
    "/optimized/Menu/Coffe2.webp",
    "/optimized/Menu/machiato1.webp",
    "/optimized/Menu/turkcoffe1.webp",
  ],
  icedCoffee: [
    "/optimized/Menu/IcedCoffe1.webp",
    "/optimized/Menu/MatchaLate1.webp",
    "/optimized/Menu/IcedMotcha1.webp",
    "/optimized/Menu/IcedCaramel1.webp",
  ],
  teas: ["/optimized/Menu/IcedTea1.webp", "/optimized/Menu/IcedTea2.webp", "/optimized/Menu/IcedTea3.webp"],
  smoothies: [
    "/optimized/Menu/Smoothie1.webp",
    "/optimized/Menu/Smoothie2.webp",
    "/optimized/Menu/Smoothie3.webp",
    "/optimized/Menu/Smoothie4.webp",
    "/optimized/Menu/Smoothie5.webp",
    "/optimized/Menu/Smoothie6.webp",
    "/optimized/Menu/Smoothie7.webp",
  ],
  milkshakes: ["/optimized/Menu/MilkShake1.webp", "/optimized/Menu/MilkShake2.webp", "/optimized/Menu/MilkShake3.webp"],
  granitas: [
    "/optimized/Menu/Granita1.webp",
    "/optimized/Menu/Granita2.webp",
    "/optimized/Menu/Granita3.webp",
    "/optimized/Menu/Granita4.webp",
    "/optimized/Menu/Granita5.webp",
    "/optimized/Menu/Granita6.webp",
  ],
  // Free Unsplash photos (no brand logos) — juice / water / lemonade vibe for Pije
  softDrinks: [
    "/optimized/Menu/soft-drinks/juice-orange.webp",
    "/optimized/Menu/soft-drinks/juice-fresh.webp",
    "/optimized/Menu/soft-drinks/lemonade.webp",
  ],
  food: [
    "/optimized/Menu/Food1.webp",
    "/optimized/Menu/Food2.webp",
    "/optimized/Menu/Food3.webp",
    "/videos/SandwitchEaten1.mp4",
    "/videos/SandwithcEaten.mp4",
  ],
  bakery: [
    "/optimized/stories/Desert1.webp",
    "/optimized/stories/berry-cake.webp",
    "/optimized/stories/carrot-cake-slice.webp",
    "/optimized/stories/lemon-cheesecake.webp",
  ],
}

// ── Dessert stories shown below the menu as a swipeable story strip ──
// Add new dessert images here — drop the file in /public/stories/
export const dessertImages: string[] = [
  "/optimized/stories/Desert1.webp",
  "/optimized/stories/berry-cake.webp",
  "/optimized/stories/carrot-cake-slice.webp",
  "/optimized/stories/lemon-cheesecake.webp",
  "/stories/storie_picture.webp",
  "/stories/storie_picture_1.webp",
  "/stories/storie_picture_2.webp",
  "/stories/storie_picture_3.webp",
  "/stories/storie_picture_4.webp",
  "/stories/storie_picture_5.webp",
  "/stories/storie_picture_6.webp",
  "/stories/storie_picture_7.webp",
  "/stories/storie_picture_8.webp",
  "/stories/storie_picture_9.webp",
  "/stories/storie_picture_10.webp",
]
