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
export const categoryImages: Record<string, string[]> = {
  espresso: [
    "/Menu/Coffe1.jpg",
    "/Menu/Coffe2.jpg",
    "/Menu/machiato1.png",
    "/Menu/turkcoffe1.jpg",
  ],
  icedCoffee: [
    "/Menu/IcedCoffe1.jpg",
    "/Menu/MatchaLate1.jpg",
    "/Menu/IcedMotcha1.png",
    "/Menu/IcedCaramel1.png",
  ],
  teas: ["/Menu/IcedTea1.jpg", "/Menu/IcedTea2.jpg", "/Menu/IcedTea3.jpg"],
  smoothies: [
    "/Menu/Smoothie1.jpg",
    "/Menu/Smoothie2.jpg",
    "/Menu/Smoothie3.jpg",
    "/Menu/Smoothie4.jpg",
    "/Menu/Smoothie5.jpg",
    "/Menu/Smoothie6.jpg",
    "/Menu/Smoothie7.jpg",
  ],
  milkshakes: ["/Menu/MilkShake1.jpg", "/Menu/MilkShake2.jpg", "/Menu/MilkShake3.jpg"],
  granitas: [
    "/Menu/Granita1.jpg",
    "/Menu/Granita2.jpg",
    "/Menu/Granita3.jpg",
    "/Menu/Granita4.jpg",
    "/Menu/Granita5.jpg",
    "/Menu/Granita6.jpg",
  ],
  // Free Unsplash photos (no brand logos) — juice / water / lemonade vibe for Pije
  softDrinks: [
    "/Menu/soft-drinks/juice-orange.jpg",
    "/Menu/soft-drinks/juice-fresh.jpg",
    "/Menu/soft-drinks/lemonade.jpg",
  ],
  food: [
    "/Menu/Food1.jpg",
    "/Menu/Food2.jpg",
    "/Menu/Food3.jpg",
    "/videos/SandwitchEaten1.mp4",
    "/videos/SandwithcEaten.mp4",
  ],
  bakery: [
    "/stories/Desert1.jpg",
    "/stories/berry-cake.jpg",
    "/stories/carrot-cake-slice.jpg",
    "/stories/lemon-cheesecake.jpg",
  ],
}

// ── Dessert stories shown below the menu as a swipeable story strip ──
// Add new dessert images here — drop the file in /public/stories/
export const dessertImages: string[] = [
  "/stories/Desert1.jpg",
  "/stories/berry-cake.jpg",
  "/stories/carrot-cake-slice.jpg",
  "/stories/lemon-cheesecake.jpg",
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
