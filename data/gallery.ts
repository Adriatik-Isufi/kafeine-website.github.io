/**
 * Gallery Images Configuration
 *
 * To add new images:
 * 1. Drop the file into /public/stories/ (or any subfolder under /public/)
 * 2. Add a new entry below with the path, a short alt description, and a size.
 *    size: "large" | "medium" | "small"
 *
 * The gallery component will automatically pick up every entry here.
 */

export const galleryImages = [
    // Main food photography (pre-optimized WebP, see scripts/optimize-images.mjs)
    { src: "/optimized/New Batch/DJJvASBPbHA_3.webp",   alt: "Coffee and Pastry",        size: "large"  },
    { src: "/optimized/New Batch/DJlmvvUtCIi_1.webp",   alt: "Delicious Cake",           size: "medium" },
    { src: "/optimized/New Batch/DJtwuGLu8MD_1.webp",   alt: "Fresh Dessert",            size: "small"  },
    { src: "/optimized/New Batch/DKw8QbUteRT_1.webp",   alt: "Sweet Treat",              size: "medium" },
    { src: "/optimized/New Batch/DLmRJ2-PFT4_1.webp",   alt: "Gourmet Cake",             size: "large"  },
    { src: "/optimized/New Batch/DMsS1AUqodn_1.webp",   alt: "Artisan Dessert",          size: "small"  },
    { src: "/optimized/New Batch/DOLmerZDDpw_6.webp",   alt: "Premium Pastry",           size: "medium" },
    { src: "/optimized/New Batch/DM93hBlhIZS_3.webp",   alt: "Coffee Specialty",         size: "small"  },
    { src: "/optimized/New Batch/DJWwCVVtALD_1.webp",   alt: "Elegant Dessert",          size: "medium" },
    { src: "/optimized/New Batch/DKZbjqhu64R_1.webp",   alt: "Artisan Creation",         size: "large"  },
    { src: "/optimized/New Batch/DLt4okuMGV9_1.webp",   alt: "Sweet Delicacy",           size: "small"  },
  
    // Dessert stories — drop new files in /public/stories/ and add a line here
    { src: "/stories/storie_picture.webp",   alt: "Delicious Dessert",            size: "medium" },
    { src: "/stories/storie_picture_1.webp", alt: "Sweet Creation",               size: "medium" },
    { src: "/stories/storie_picture_2.webp", alt: "Gourmet Treat",                size: "large"  },
    { src: "/stories/storie_picture_3.webp", alt: "Artisan Dessert",              size: "medium" },
    { src: "/stories/storie_picture_4.webp", alt: "Premium Cake",                 size: "small"  },
    { src: "/stories/storie_picture_5.webp", alt: "Elegant Pastry",               size: "medium" },
    { src: "/stories/storie_picture_6.webp", alt: "Handcrafted Dessert",          size: "large"  },
    { src: "/stories/storie_picture_7.webp", alt: "Special Creation",             size: "small"  },
    { src: "/stories/storie_picture_8.webp", alt: "Gourmet Masterpiece",          size: "medium" },
    { src: "/stories/storie_picture_9.webp", alt: "Sweet Delight",                size: "small"  },
    { src: "/stories/storie_picture_10.webp",alt: "Artisan Collection",           size: "medium" },
  ] as const
  
  export type GalleryImage = (typeof galleryImages)[number]
  