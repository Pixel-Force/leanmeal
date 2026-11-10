/* ==========================================================================
   LeanMeal — Complete Culinary Catalog, Packages, Sides, Partners & IG Reels
   ========================================================================== */

window.LEANMEAL_DATA = {
  brand: {
    name: "Lean Meal",
    tagline: "Healthy & Clean",
    phone: "365-779-0273",
    email: "management@leanmeal.ca",
    instagramReelsUrl: "https://www.instagram.com/leanmeal.ca/reels/",
    instagramUrl: "https://www.instagram.com/leanmeal.ca/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61570598076960",
    tiktokUrl: "https://www.tiktok.com/@leanmeal.ca",
    region: "Mississauga & Etobicoke, Ontario",
    taxRate: 0.13,
    taxLabel: "Ontario HST (13%)"
  },

  packages: [
    { meals: 6, perMeal: 12.00, total: 72.00, badge: "Starter", subtitle: "3 meals Wed + 3 meals Sun" },
    { meals: 12, perMeal: 11.00, total: 132.00, badge: "Most Popular", subtitle: "6 meals Wed + 6 meals Sun" },
    { meals: 18, perMeal: 10.00, total: 180.00, badge: "Active Lifestyle", subtitle: "9 meals Wed + 9 meals Sun" },
    { meals: 24, perMeal: 9.00, total: 216.00, badge: "Best Value", subtitle: "12 meals Wed + 12 meals Sun" }
  ],

  weeklyPlans: [
    {
      id: "weekly-1-meal",
      name: "Weekly Plan (1 Meal/Day)",
      price: 69.99,
      mealsCount: 5,
      badge: "5-Day Plan",
      description: "Five chef-crafted, macro-balanced lunch or dinner meals delivered fresh for your Monday–Friday workweek.",
      image: "assets/images/hero-meals.png",
      category: "Weekly Plans"
    },
    {
      id: "weekly-2-meals",
      name: "Weekly Plan (2 Meal/Day)",
      price: 129.99,
      mealsCount: 10,
      badge: "Save $10",
      description: "Ten fresh high-protein meals covering both lunch and dinner across 5 days—zero cooking, zero cleanup.",
      image: "assets/images/about-kitchen.png",
      category: "Weekly Plans"
    }
  ],

  menuItems: [
    // MAIN MENU (8 Halal/Chef Entrees)
    {
      id: "chicken-mushroom",
      name: "Chicken Mushroom Sauce (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Chicken",
      calories: 565,
      protein: 50.91,
      fat: 34.64,
      carbs: 12.94,
      price: 22.99,
      subProteins: ["Classic Herb Chicken", "Extra Lean Breast"],
      image: "assets/images/dish-chicken-mushroom.png",
      description: "Enjoy a rich and savoury dish featuring tender grilled chicken smothered in a luscious mushroom cream sauce. A simple yet elegant dish that’s perfect for a comforting meal!",
      ingredients: "Halal chicken breast, sautéed mushrooms, 10% cream, onion powder, garlic, thyme, sea salt, cracked black pepper."
    },
    {
      id: "spinach-feta-chicken",
      name: "Spinach & Feta Stuffed Chicken (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "170g Portion",
      calories: 410,
      protein: 54.09,
      fat: 18.62,
      carbs: 4.8,
      price: 23.99,
      subProteins: ["Classic Mediterranean", "Light Herb Crust"],
      image: "assets/images/dish-spinach-feta-chicken.png",
      description: "Golden pan-seared Halal chicken breast stuffed with fresh baby spinach, savoury feta cheese, and roasted Mediterranean herbs.",
      ingredients: "Halal chicken breast, baby spinach, feta cheese, roasted garlic, oregano, olive oil."
    },
    {
      id: "chilly-chicken",
      name: "Chilly Chicken (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Chicken",
      calories: 258,
      protein: 45.43,
      fat: 5.29,
      carbs: 3.38,
      price: 20.99,
      subProteins: ["Mild Spice", "Medium Heat", "Extra Spicy"],
      image: "assets/images/dish-chilly-chicken.png",
      description: "Ultra-lean Halal seared chicken bites tossed in a crisp, savory chili-garlic glaze with fresh peppers and scallions.",
      ingredients: "Halal chicken breast, red & green bell peppers, chili-garlic glaze, ginger, scallions, sesame oil."
    },
    {
      id: "chicken-fajita",
      name: "Chicken Fajita (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g",
      calories: 363,
      protein: 47.9,
      fat: 12.36,
      carbs: 13.49,
      price: 22.99,
      subProteins: ["Classic Smoky Fajita", "Extra Lime & Cilantro"],
      image: "assets/images/dish-chicken-fajita.png",
      description: "Savour the bold flavours of our Fajita Chicken. Tender grilled chicken mixed with crisp bell peppers and onions, quickly heated on a flat-top grill for a smoky, charred finish.",
      ingredients: "Halal chicken breast, crisp bell peppers, onions, fajita spices, lime juice, olive oil."
    },
    {
      id: "grilled-chicken",
      name: "Grilled Chicken (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Chicken",
      calories: 277,
      protein: 41.27,
      fat: 10.0,
      carbs: 3.02,
      price: 19.99,
      subProteins: ["Lemon Rosemary", "Smoky Paprika", "Garlic Herb"],
      image: "assets/images/dish-grilled-chicken.png",
      description: "Tender and juicy marinated chicken, perfectly baked to golden perfection. Lightly seasoned and cooked for maximum flavor—served fresh and ready to enjoy!",
      ingredients: "Halal chicken breast, lemon zest, rosemary, garlic, sea salt, extra-virgin olive oil."
    },
    {
      id: "beef-mushroom",
      name: "Beef Mushroom Sauce (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g",
      calories: 749,
      protein: 64.57,
      fat: 48.74,
      carbs: 12.94,
      price: 23.99,
      subProteins: ["Medium Sear", "Well Done"],
      image: "assets/images/dish-beef-mushroom.png",
      description: "Succulent grilled beef combined with sautéed mushrooms in a rich, creamy sauce made from 10% cream, seasoned with onion powder, salt, and pepper for a hearty, comforting meal.",
      ingredients: "Halal grilled beef, sautéed mushrooms, 10% cream, onion powder, sea salt, black pepper."
    },
    {
      id: "grilled-salmon",
      name: "Salmon",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Fillet",
      calories: 213,
      protein: 33.16,
      fat: 7.15,
      carbs: 2.32,
      price: 25.99,
      subProteins: ["Lemon Dill", "Herb Crusted"],
      image: "assets/images/dish-salmon.png",
      description: "Fresh grilled Atlantic salmon fillet delicately seasoned with lemon, garden herbs, and light olive oil for lean omega-3 nutrition.",
      ingredients: "Fresh Atlantic salmon fillet, lemon, dill, garlic herb seasoning, olive oil."
    },
    {
      id: "beef-fajita",
      name: "Beef Fajita (Halal)",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g",
      calories: 601,
      protein: 62.2,
      fat: 32.12,
      carbs: 13.49,
      price: 22.99,
      subProteins: ["Classic Flat-Top", "Spicy Chipotle"],
      image: "assets/images/dish-beef-fajita.png",
      description: "Tender slices of grilled Halal beef mixed with sautéed bell peppers and onions, flash-heated on a flat-top grill with a touch of olive oil for smoky depth.",
      ingredients: "Halal grilled beef, bell peppers, sweet onions, fajita spices, olive oil."
    },

    // SALADS (3 items)
    {
      id: "caesar-salad",
      name: "Caesar Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 198,
      protein: 11.2,
      fat: 8.51,
      carbs: 20.69,
      price: 9.99,
      image: "assets/images/salad-caesar.png",
      description: "Crisp romaine hearts tossed with shaved parmesan, crunchy whole-grain croutons, and light herb caesar dressing.",
      ingredients: "Romaine lettuce, parmesan cheese, croutons, light caesar dressing, lemon."
    },
    {
      id: "quinoa-salad",
      name: "Quinoa Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 700,
      protein: 29.58,
      fat: 12.96,
      carbs: 120.06,
      price: 14.99,
      image: "assets/images/salad-quinoa.png",
      description: "Nutrient-dense tri-color quinoa bowl packed with crisp garden vegetables, chickpeas, and bright lemon-herb dressing.",
      ingredients: "Organic quinoa, chickpeas, cucumber, cherry tomatoes, parsley, lemon vinaigrette."
    },
    {
      id: "california-salad",
      name: "California Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 316,
      protein: 11.35,
      fat: 23.36,
      carbs: 21.19,
      price: 12.99,
      image: "assets/images/salad-california.png",
      description: "Fresh spring greens layered with creamy avocado, crisp berries, crunchy nuts, and light citrus vinaigrette.",
      ingredients: "Spring greens, avocado, mixed berries, walnuts, light citrus vinaigrette."
    },

    // BEVERAGES (5 items including Diet Coke)
    {
      id: "turmeric-smoothie",
      name: "Golden Turmeric Smoothie",
      category: "Beverages",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "450ml",
      calories: 210,
      protein: 6.5,
      fat: 4.5,
      carbs: 36.0,
      price: 13.99,
      image: "assets/images/smoothie-turmeric.png",
      description: "Rich golden-yellow blend of ripe banana, turmeric, fresh ginger, almond milk, and a touch of cinnamon—warm, creamy, and energizing.",
      ingredients: "Ripe banana, turmeric, fresh ginger, almond milk, ground cinnamon."
    },
    {
      id: "green-detox-smoothie",
      name: "Green Detox Smoothie",
      category: "Beverages",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "450ml",
      calories: 175,
      protein: 5.2,
      fat: 6.0,
      carbs: 26.0,
      price: 13.99,
      image: "assets/images/smoothie-green.png",
      description: "Vibrant green blend of spinach, kale, green apple, cucumber, lemon, ginger, avocado, and coconut water garnished with chia seeds.",
      ingredients: "Spinach, kale, green apple, cucumber, lemon, ginger, avocado, coconut water, chia seeds."
    },
    {
      id: "berry-smoothie",
      name: "Berry Antioxidant Smoothie",
      category: "Beverages",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "450ml",
      calories: 225,
      protein: 7.0,
      fat: 3.8,
      carbs: 42.0,
      price: 13.99,
      image: "assets/images/smoothie-berry.png",
      description: "Deep purple blend of blueberries, strawberries, raspberries, blackberries, banana, and almond milk topped with chia seeds and honey.",
      ingredients: "Blueberries, strawberries, raspberries, blackberries, banana, almond milk, honey, chia seeds."
    },
    {
      id: "tropical-smoothie",
      name: "Tropical Bliss Smoothie",
      category: "Beverages",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "450ml",
      calories: 230,
      protein: 4.8,
      fat: 5.5,
      carbs: 43.0,
      price: 13.99,
      image: "assets/images/smoothie-tropical.png",
      description: "Creamy golden blend of frozen pineapple, mango, banana, and coconut milk finished with chia seeds and a touch of turmeric.",
      ingredients: "Pineapple, mango, banana, coconut milk, chia seeds, turmeric pinch."
    },
    {
      id: "diet-coke",
      name: "Diet Coke",
      category: "Beverages",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "355ml Can",
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      price: 2.99,
      image: "assets/images/diet-coke.webp",
      description: "Crisp, chilled 355ml can of zero-calorie Diet Coke to pair cleanly with any macro-balanced meal.",
      ingredients: "Carbonated water, caramel color, aspartame, phosphoric acid, potassium benzoate, natural flavors, caffeine."
    },

    // HEALTHY DESSERTS (4 muffins)
    {
      id: "nutty-oat-muffin",
      name: "Nutty Oat Delight (Halal)",
      category: "Healthy Desserts",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "95g",
      calories: 245,
      protein: 7.4,
      fat: 11.2,
      carbs: 31.0,
      price: 5.99,
      image: "assets/images/muffin-nutty-oat.png",
      description: "245 Calories — Whole-grain rolled oats and whole wheat flour baked with applesauce, pecans, crisp apple, coconut oil, and honey.",
      ingredients: "Whole wheat flour, whole rolled oats, ground cinnamon, baking soda, baking powder, salt, unsweetened applesauce, eggs, coconut oil, honey, almond milk, vanilla extract, pecan, apple."
    },
    {
      id: "choc-pb-muffin",
      name: "Chocolate Peanut Butter Muffin (Halal)",
      category: "Healthy Desserts",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "95g",
      calories: 188,
      protein: 8.6,
      fat: 8.1,
      carbs: 22.0,
      price: 5.99,
      image: "assets/images/muffin-choc-pb.png",
      description: "188 Calories — Naturally sweetened with ripe bananas and honey, baked with cocoa powder and creamy peanut butter.",
      ingredients: "Whole wheat flour, bananas, honey, egg, coconut oil, vanilla extract, natural unsweetened cocoa powder, baking powder, baking soda, salt, peanut butter."
    },
    {
      id: "apple-oat-muffin",
      name: "NutriOat Apple Muffin (Halal)",
      category: "Healthy Desserts",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "95g",
      calories: 206,
      protein: 6.2,
      fat: 6.5,
      carbs: 32.5,
      price: 5.99,
      image: "assets/images/muffin-apple-oat.png",
      description: "206 Calories — Wholesome rolled oat muffin with sweet raisins, unsweetened applesauce, cinnamon, and pure honey.",
      ingredients: "Whole wheat flour, whole rolled oats, ground cinnamon, baking soda, baking powder, salt, unsweetened applesauce, eggs, coconut oil, honey, almond milk, vanilla extract, raisins."
    },
    {
      id: "dark-choc-muffin",
      name: "Dark Chocolate Muffin (Halal)",
      category: "Healthy Desserts",
      halal: true,
      proteinEligible: false,
      isAddon: true,
      weight: "95g",
      calories: 245,
      protein: 7.0,
      fat: 10.4,
      carbs: 30.8,
      price: 5.99,
      image: "assets/images/muffin-dark-choc.png",
      description: "245 Calories — Rich dark cocoa muffin studded with dark chocolate chips, ripe banana, and honey.",
      ingredients: "Whole wheat flour, bananas, honey, egg, coconut oil, vanilla extract, natural unsweetened cocoa powder, baking powder, baking soda, salt, dark chocolate chips."
    }
  ],

  sides: [
    { id: "jasmine-rice", name: "Steamed Jasmine Rice", calories: 165, protein: 3.2, fat: 0.4, carbs: 36.0 },
    { id: "brown-basmati", name: "Whole-Grain Brown Basmati Rice", calories: 155, protein: 3.8, fat: 1.2, carbs: 32.0 },
    { id: "sweet-potato", name: "Roasted Herb Sweet Potatoes", calories: 135, protein: 2.4, fat: 2.5, carbs: 26.0 },
    { id: "garlic-mash", name: "Light Garlic Mashed Potatoes", calories: 140, protein: 3.0, fat: 3.2, carbs: 24.5 },
    { id: "roasted-broccoli", name: "Steamed Broccoli & Asparagus", calories: 58, protein: 4.5, fat: 1.5, carbs: 7.5 },
    { id: "seasonal-veggies", name: "Sautéed Zucchini, Peppers & Carrots", calories: 72, protein: 2.6, fat: 2.4, carbs: 10.8 },
    { id: "quinoa-pilaf", name: "Herb Lemon Quinoa Pilaf", calories: 160, protein: 5.8, fat: 2.8, carbs: 28.0 },
    { id: "cauliflower-mash", name: "Creamy Cauliflower Mash (Low-Carb)", calories: 65, protein: 3.0, fat: 2.8, carbs: 7.2 },
    { id: "chickpea-salad", name: "Mediterranean Chickpea Salad", calories: 145, protein: 6.4, fat: 4.1, carbs: 21.0 },
    { id: "herb-wedges", name: "Baked Rosemary Potato Wedges", calories: 150, protein: 3.1, fat: 3.0, carbs: 27.5 }
  ],

  partners: [
    {
      id: "hub-punjaabi",
      name: "Punjaabi Indian Cuisine",
      address: "7235 Bellshire Gate #6, Mississauga, ON L5N 7X1",
      hours: "Mon–Sun · 11:00 AM – 8:30 PM",
      badge: "Mississauga",
      logo: "assets/images/partner-punjaabi.webp"
    },
    {
      id: "hub-bloom",
      name: "The Bloom Coffee",
      address: "3525 Platinum Dr, Mississauga, ON L5M 2R9",
      hours: "Daily · 8:00 AM – 7:00 PM",
      badge: "Erin Mills",
      logo: "assets/images/partner-bloom.webp"
    },
    {
      id: "hub-george",
      name: "George the Greek",
      address: "3575 Lake Shore Blvd W, Etobicoke, Toronto, ON M8W 1P5",
      hours: "Mon–Sun · 11:00 AM – 9:00 PM",
      badge: "Etobicoke",
      logo: "assets/images/partner-george.webp"
    },
    {
      id: "hub-dough",
      name: "Dough Master",
      address: "128 Queen St S #23, Mississauga, ON L5M 1K8",
      hours: "Mon–Sun · 10:00 AM – 8:00 PM",
      badge: "Streetsville",
      logo: "assets/images/partner-dough.webp"
    }
  ],

  instagramFeed: [
    {
      url: "https://www.instagram.com/reel/DJSFkPUCzrc/",
      isReel: true,
      caption: "Ditch the “what’s for dinner?” stress. Lean Meal delivers fresh, healthy meals and flexible plans right to your door.",
      image: "assets/images/hero-meals.png"
    },
    {
      url: "https://www.instagram.com/p/DJP9qglNbHO/",
      isReel: false,
      caption: "Simplify healthy eating with Lean Meal's flexible subscription plans. Weekly & bi-weekly options available!",
      image: "assets/images/dish-chicken-fajita.png"
    },
    {
      url: "https://www.instagram.com/reel/DJMj1jayj1c/",
      isReel: true,
      caption: "Convenient weekly or bi-weekly deliveries of macro-balanced, chef-crafted Halal meals across the GTA.",
      image: "assets/images/dish-chilly-chicken.png"
    },
    {
      url: "https://www.instagram.com/reel/DJKX_CnBmIj/",
      isReel: true,
      caption: "Nourish your healthy lifestyle with Lean Meal’s flexible meal subscriptions and fresh ingredients.",
      image: "assets/images/about-kitchen.png"
    },
    {
      url: "https://www.instagram.com/reel/DJHu_G-y_yz/",
      isReel: true,
      caption: "High-protein favourites prepared fresh with zero preservatives—ready in minutes.",
      image: "assets/images/dish-spinach-feta-chicken.png"
    },
    {
      url: "https://www.instagram.com/reel/DJFRNTfSuR6/",
      isReel: true,
      caption: "Warning ⚠️ Clicking on Lean Meal may result in deliciousness and less time spent hangry. 🥗",
      image: "assets/images/dish-salmon.png"
    },
    {
      url: "https://www.instagram.com/p/DJAe10npJ7p/",
      isReel: false,
      caption: "Fuel your healthy lifestyle effortlessly with adaptable weekly meal packages.",
      image: "assets/images/salad-quinoa.png"
    },
    {
      url: "https://www.instagram.com/reel/DI97qklPRUz/",
      isReel: true,
      caption: "Simplify healthy eating with customizable protein + two-side plates delivered Wednesdays & Sundays.",
      image: "assets/images/smoothie-berry.png"
    }
  ],

  faqs: [
    {
      q: "How do the meal packages work?",
      a: "Choose your desired number of meals (6, 12, 18, or 24), select your favorite proteins, and customize each meal with two sides. We'll prepare fresh, healthy meals and deliver them to your door on your selected schedule."
    },
    {
      q: "Can I customize each meal?",
      a: "Absolutely! After selecting your meal package, you'll choose your proteins and then customize each one with your preferred two sides. You have complete control over every meal."
    },
    {
      q: "How long do the meals stay fresh?",
      a: "Our meals are prepared fresh with zero preservatives and can be stored in the refrigerator for up to 5 days."
    },
    {
      q: "What are the delivery options?",
      a: "We deliver on Wednesdays and Sundays, splitting your package into two equal deliveries (half & half). Orders placed on Tuesday cannot receive Wednesday delivery (next day), and Saturday orders cannot receive Sunday delivery (next day)."
    },
    {
      q: "Are the meals healthy and nutritious?",
      a: "Yes! All our meals are prepared with fresh, high-quality Halal ingredients and balanced nutrition in mind—clearly labeled with calories, protein, fat, and carbs."
    },
    {
      q: "Can I change my order after placing it?",
      a: "Yes, you can modify your order up to 48 hours before your scheduled delivery. Contact our team at 365-779-0273 or manage your order through My Account."
    }
  ],

  promoCodes: {
    "LEAN10": { type: "percent", value: 10, label: "10% Off First Meal Plan" },
    "FRESH15": { type: "percent", value: 15, label: "15% Off Member Special" },
    "WELCOME5": { type: "fixed", value: 5, label: "$5.00 Off Welcome Credit" }
  },

  gtaSuggestions: [
    "128 Queen St S, Mississauga, ON L5M 1K8",
    "7235 Bellshire Gate, Mississauga, ON L5N 7X1",
    "3525 Platinum Dr, Mississauga, ON L5M 2R9",
    "3575 Lake Shore Blvd W, Etobicoke, ON M8W 1P5",
    "100 City Centre Dr, Mississauga, ON L5B 2C9",
    "220 Yonge St, Toronto, ON M5B 2H1",
    "150 King St W, Toronto, ON M5H 1J9",
    "2500 Hurontario St, Mississauga, ON L5B 1N4"
  ]
};
