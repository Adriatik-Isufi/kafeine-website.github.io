/**
 * Menu Images & Dessert Stories Configuration
 *
 * HOW TO ADD IMAGES:
 * ─────────────────────────────────────────────────────────
 * 1. Drop the image/video file into the correct folder under /public/
 *    - Category photos  → /public/Menu/
 *    - Dessert stories  → /public/stories/desserts/
 *
 * 2. Add the path to the relevant array below.
 *    Supported formats: .jpg  .jpeg  .png  .webp  .mp4
 *
 * That's it — no other files need to be changed.
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
    teas: [
      "/Menu/IcedTea1.jpg",
      "/Menu/IcedTea2.jpg",
      "/Menu/IcedTea3.jpg",
    ],
    smoothies: [
      "/Menu/Smoothie1.jpg",
      "/Menu/Smoothie2.jpg",
      "/Menu/Smoothie3.jpg",
      "/Menu/Smoothie4.jpg",
      "/Menu/Smoothie5.jpg",
      "/Menu/Smoothie6.jpg",
      "/Menu/Smoothie7.jpg",
    ],
    milkshakes: [
      "/Menu/MilkShake1.jpg",
      "/Menu/MilkShake2.jpg",
      "/Menu/MilkShake3.jpg",
    ],
    granitas: [
      "/Menu/Granita1.jpg",
      "/Menu/Granita2.jpg",
      "/Menu/Granita3.jpg",
      "/Menu/Granita4.jpg",
      "/Menu/Granita5.jpg",
      "/Menu/Granita6.jpg",
    ],
    food: [
      "/Menu/Food1.jpg",
      "/Menu/Food2.jpg",
      "/Menu/Food3.jpg",
      "/videos/SandwitchEaten1.mp4",
      "/videos/SandwithcEaten.mp4",
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
  