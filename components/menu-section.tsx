"use client"

import { useState } from "react"
import { getImagePath } from "@/lib/utils"

interface MenuSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Menyja Jonë",
    coffee: "Kafe",
    drinks: "Pije",
    food: "Ushqim",
    desserts: "Ëmbëlsira",
    espresso: "Espresso",
    espressoDesc: "Kafe e fortë dhe aromatike",
    cappuccino: "Cappuccino",
    cappuccinoDesc: "Espresso me qumësht të shkumëzuar",
    latte: "Latte",
    latteDesc: "Kafe e butë me qumësht",
    macchiato: "Macchiato",
    macchiatoDesc: "Espresso me një pikë qumështi",
    americano: "Americano",
    americanoDesc: "Espresso me ujë të nxehtë",
    tea: "Çaj",
    teaDesc: "Çaj i zgjedhur nga bota",
    juice: "Lëng",
    juiceDesc: "Lëngje të freskëta natyrore",
    smoothie: "Smoothie",
    smoothieDesc: "Pije të shëndetshme me fruta",
    carrotCake: "Torte Karrote",
    carrotCakeDesc: "Torte e butë me karrota dhe bajame",
    cheesecake: "Cheesecake",
    cheesecakeDesc: "Torte djathi me shije të ndryshme",
    tiramisu: "Tiramisu",
    tiramisuDesc: "Ëmbëlsirë italiane klasike",
  },
  en: {
    title: "Our Menu",
    coffee: "Coffee",
    drinks: "Drinks",
    food: "Food",
    desserts: "Desserts",
    espresso: "Espresso",
    espressoDesc: "Strong and aromatic coffee",
    cappuccino: "Cappuccino",
    cappuccinoDesc: "Espresso with steamed milk",
    latte: "Latte",
    latteDesc: "Smooth coffee with milk",
    macchiato: "Macchiato",
    macchiatoDesc: "Espresso with a touch of milk",
    americano: "Americano",
    americanoDesc: "Espresso with hot water",
    tea: "Tea",
    teaDesc: "Selected teas from around the world",
    juice: "Juice",
    juiceDesc: "Fresh natural juices",
    smoothie: "Smoothie",
    smoothieDesc: "Healthy fruit drinks",
    carrotCake: "Carrot Cake",
    carrotCakeDesc: "Soft cake with carrots and nuts",
    cheesecake: "Cheesecake",
    cheesecakeDesc: "Cheese cake with various flavors",
    tiramisu: "Tiramisu",
    tiramisuDesc: "Classic Italian dessert",
  },
}

export function MenuSection({ language }: MenuSectionProps) {
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<"drinks" | "food" | "desserts">("drinks")

  const menuItems = {
    drinks: [
      { name: t.espresso, desc: t.espressoDesc, price: "150 L", image: getImagePath("/images/coffee-pour.jpg") },
      { name: t.cappuccino, desc: t.cappuccinoDesc, price: "200 L", image: getImagePath("/images/coffee-pour.jpg") },
      { name: t.latte, desc: t.latteDesc, price: "220 L", image: getImagePath("/images/coffee-pour.jpg") },
      { name: t.tea, desc: t.teaDesc, price: "120 L", image: getImagePath("/herbal-tea.jpg") },
      { name: t.juice, desc: t.juiceDesc, price: "180 L", image: getImagePath("/fresh-orange-juice.png") },
      { name: t.smoothie, desc: t.smoothieDesc, price: "250 L", image: getImagePath("/berry-smoothie.png") },
    ],
    food: [
      {
        name: "Sandwich",
        desc: "Fresh sandwich with local ingredients",
        price: "280 L",
        image: getImagePath("/images/coffee-pour.jpg"),
      },
      { name: "Salad", desc: "Mixed green salad", price: "320 L", image: getImagePath("/images/coffee-pour.jpg") },
      { name: "Pasta", desc: "Homemade pasta", price: "450 L", image: getImagePath("/images/coffee-pour.jpg") },
    ],
    desserts: [
      { name: t.carrotCake, desc: t.carrotCakeDesc, price: "300 L", image: getImagePath("/images/carrot-cake.jpg") },
      { name: t.cheesecake, desc: t.cheesecakeDesc, price: "350 L", image: getImagePath("/images/lemon-cheesecake.jpg") },
      { name: t.tiramisu, desc: t.tiramisuDesc, price: "320 L", image: getImagePath("/images/lotus-cheesecake.jpg") },
    ],
  }

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-[#252421] to-[#7e491d]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t.title}</h2>
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2 gap-2">
              {(["drinks", "food", "desserts"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[#e18b1a] text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t[tab]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeTab].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e2ba84]/20 to-[#e18b1a]/20 backdrop-blur-sm border border-[#e2ba84]/30 hover:border-[#e18b1a] transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-white">{item.name}</h4>
                  <span className="text-xl font-bold text-[#e18b1a] bg-white/10 px-3 py-1 rounded-full">
                    {item.price}
                  </span>
                </div>
                <p className="text-[#e2ba84]/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
