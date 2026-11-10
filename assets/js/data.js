/* ==========================================================================
   LeanMeal — Complete Culinary Catalog, Packages, Sides & Partner Hubs
   ========================================================================== */

window.LEANMEAL_DATA = {
  brand: {
    name: "LeanMeal",
    tagline: "Healthy & Clean",
    phone: "(555) 234-8910",
    email: "hello@leanmeal-template.com",
    region: "Greater Toronto Area & Mississauga",
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
      name: "Weekly Plan (2 Meals/Day)",
      price: 129.99,
      mealsCount: 10,
      badge: "Save $10",
      description: "Ten fresh high-protein meals covering both lunch and dinner across 5 days—zero cooking, zero cleanup.",
      image: "assets/images/about-kitchen.png",
      category: "Weekly Plans"
    }
  ],

  menuItems: [
    // MAIN MENU (Proteins eligible for Meal Plan + À la carte)
    {
      id: "chicken-mushroom",
      name: "Chicken Mushroom Sauce",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 565,
      protein: 50.9,
      fat: 34.6,
      carbs: 12.9,
      price: 22.99,
      subProteins: ["Classic Herb Chicken", "Extra Lean Breast"],
      image: "assets/images/dish-chicken-mushroom.png",
      description: "Tender grilled chicken breast smothered in a velvety sautéed mushroom cream sauce with garden thyme.",
      ingredients: "Halal chicken breast, cremini mushrooms, 10% light cream, garlic, thyme, sea salt, cracked black pepper."
    },
    {
      id: "spinach-feta-chicken",
      name: "Spinach & Feta Stuffed Chicken",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "170g Portion",
      calories: 410,
      protein: 54.1,
      fat: 18.6,
      carbs: 4.8,
      price: 23.99,
      subProteins: ["Classic Mediterranean", "Light Herb Crust"],
      image: "assets/images/dish-spinach-feta-chicken.png",
      description: "Golden pan-seared chicken breast stuffed with baby spinach, crumbled feta, and roasted garlic.",
      ingredients: "Halal chicken breast, baby spinach, light feta cheese, roasted garlic, oregano, cold-pressed olive oil."
    },
    {
      id: "chilly-chicken",
      name: "Chilly Chicken",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 258,
      protein: 45.4,
      fat: 5.3,
      carbs: 3.4,
      price: 20.99,
      subProteins: ["Mild Spice", "Medium Heat", "Extra Spicy"],
      image: "assets/images/dish-chilly-chicken.png",
      description: "Ultra-lean seared chicken bites glazed in an aromatic chili-garlic reduction with crisp bell peppers.",
      ingredients: "Halal chicken breast, red & green bell peppers, chili-garlic glaze, ginger, scallions, sesame oil."
    },
    {
      id: "chicken-fajita",
      name: "Chicken Fajita",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 363,
      protein: 47.9,
      fat: 12.4,
      carbs: 13.5,
      price: 22.99,
      subProteins: ["Classic Smoky Fajita", "Extra Lime & Cilantro"],
      image: "assets/images/dish-chicken-fajita.png",
      description: "Smoky flat-top grilled chicken tossed with charred tri-color bell peppers, sweet onions, and cumin.",
      ingredients: "Halal chicken breast, bell peppers, red onions, smoked paprika, cumin, lime juice, olive oil."
    },
    {
      id: "grilled-chicken",
      name: "Grilled Chicken",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 277,
      protein: 41.3,
      fat: 10.0,
      carbs: 3.0,
      price: 19.99,
      subProteins: ["Lemon Rosemary", "Smoky Paprika", "Garlic Herb"],
      image: "assets/images/dish-grilled-chicken.png",
      description: "Clean, juicy marinated chicken breast grilled to golden perfection—our signature high-protein staple.",
      ingredients: "Halal chicken breast, lemon zest, rosemary, garlic, sea salt, extra-virgin olive oil."
    },
    {
      id: "beef-mushroom",
      name: "Beef Mushroom Sauce",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 749,
      protein: 64.6,
      fat: 48.7,
      carbs: 12.9,
      price: 23.99,
      subProteins: ["Medium Sear", "Well Done"],
      image: "assets/images/dish-beef-mushroom.png",
      description: "Succulent seared beef strips paired with sautéed mushrooms in a rich, savory onion-peppercorn cream sauce.",
      ingredients: "Halal sirloin beef, button & cremini mushrooms, 10% cream, onion powder, cracked pepper, olive oil."
    },
    {
      id: "grilled-salmon",
      name: "Atlantic Salmon Fillet",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Fillet",
      calories: 213,
      protein: 33.2,
      fat: 7.2,
      carbs: 2.3,
      price: 25.99,
      subProteins: ["Lemon Dill", "Herb Crusted"],
      image: "assets/images/dish-salmon.png",
      description: "Flaky omega-rich Atlantic salmon fillet delicately seasoned with fresh dill, lemon, and sea salt.",
      ingredients: "Fresh Atlantic salmon, lemon, dill, garlic herb seasoning, cold-pressed olive oil."
    },
    {
      id: "beef-fajita",
      name: "Beef Fajita",
      category: "Main Menu",
      halal: true,
      proteinEligible: true,
      weight: "150g Protein",
      calories: 601,
      protein: 62.2,
      fat: 32.1,
      carbs: 13.5,
      price: 22.99,
      subProteins: ["Classic Flat-Top", "Spicy Chipotle"],
      image: "assets/images/dish-beef-fajita.png",
      description: "Flash-seared halal beef strips sautéed with crisp peppers and onions in warm southwestern spices.",
      ingredients: "Halal flank beef, tri-color bell peppers, sweet onions, chili powder, cumin, olive oil."
    },

    // SALADS
    {
      id: "caesar-salad",
      name: "Caesar Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 198,
      protein: 11.2,
      fat: 8.5,
      carbs: 20.7,
      price: 9.99,
      image: "assets/images/salad-caesar.png",
      description: "Crisp romaine hearts, shaved aged parmesan, whole-grain garlic croutons, and light herb caesar dressing.",
      ingredients: "Romaine lettuce, parmesan cheese, whole-grain croutons, light yogurt caesar dressing, lemon."
    },
    {
      id: "quinoa-salad",
      name: "Power Quinoa Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 440,
      protein: 22.6,
      fat: 12.9,
      carbs: 58.2,
      price: 14.99,
      image: "assets/images/salad-quinoa.png",
      description: "Tri-color organic quinoa tossed with roasted chickpeas, cucumber, cherry tomatoes, and lemon vinaigrette.",
      ingredients: "Organic quinoa, chickpeas, cucumber, cherry tomatoes, parsley, toasted pumpkin seeds, lemon vinaigrette."
    },
    {
      id: "california-salad",
      name: "California Avocado Salad (280g)",
      category: "Salads",
      halal: true,
      proteinEligible: false,
      weight: "280g",
      calories: 316,
      protein: 11.4,
      fat: 23.4,
      carbs: 21.2,
      price: 12.99,
      image: "assets/images/salad-california.png",
      description: "Baby spring greens, sliced avocado, walnuts, berries, and citrus-honey vinaigrette.",
      ingredients: "Spring mix, Hass avocado, blueberries, walnuts, feta crumble, citrus vinaigrette."
    },

    // BEVERAGES
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
      description: "Ripe banana, anti-inflammatory turmeric, fresh ginger, almond milk, and a warm dusting of cinnamon.",
      ingredients: "Banana, turmeric root, fresh ginger, unsweetened almond milk, cinnamon."
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
      description: "Baby spinach, kale, crisp green apple, cucumber, lemon, ginger, avocado, and hydrating coconut water.",
      ingredients: "Spinach, kale, green apple, cucumber, avocado, ginger, lemon, coconut water, chia seeds."
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
      description: "Blueberries, strawberries, raspberries, blackberries, banana, almond milk, raw honey, and chia seeds.",
      ingredients: "Mixed berries, banana, almond milk, chia seeds, raw honey."
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
      description: "Sun-ripened pineapple, mango, banana, and light coconut milk finished with chia seeds.",
      ingredients: "Pineapple, mango, banana, light coconut milk, chia seeds, turmeric pinch."
    },

    // HEALTHY DESSERTS
    {
      id: "nutty-oat-muffin",
      name: "Nutty Oat Delight Muffin",
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
      description: "Wholesome rolled oats, whole wheat flour, pecan crunch, crisp diced apple, honey, and cinnamon.",
      ingredients: "Whole wheat flour, rolled oats, pecans, apple, applesauce, eggs, coconut oil, honey, almond milk, cinnamon."
    },
    {
      id: "choc-pb-muffin",
      name: "Chocolate Peanut Butter Muffin",
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
      description: "Naturally sweetened with ripe banana and raw honey, swirled with natural peanut butter and cocoa.",
      ingredients: "Whole wheat flour, banana, raw honey, egg, coconut oil, natural cocoa powder, creamy peanut butter."
    },
    {
      id: "apple-oat-muffin",
      name: "NutriOat Apple Raisin Muffin",
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
      description: "Soft baked whole-grain oat muffin with sweet raisins, unsweetened applesauce, and warm spice.",
      ingredients: "Whole wheat flour, rolled oats, raisins, unsweetened applesauce, eggs, coconut oil, honey, almond milk."
    },
    {
      id: "dark-choc-muffin",
      name: "Dark Chocolate Chip Muffin",
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
      description: "Rich antioxidant dark cocoa muffin studded with 70% dark chocolate chips and zero refined sugar.",
      ingredients: "Whole wheat flour, banana, honey, egg, coconut oil, unsweetened cocoa, 70% dark chocolate chips."
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
      id: "hub-maple",
      name: "Streetsville Kitchen Hub",
      address: "240 Maple Grove Ave #12, Mississauga, ON L5M 0A1",
      hours: "Mon–Sun · 10:00 AM – 8:00 PM",
      badge: "Mississauga"
    },
    {
      id: "hub-meadowvale",
      name: "Meadowvale Pickup Point",
      address: "880 Meadowvale Blvd #6, Mississauga, ON L5N 0B2",
      hours: "Mon–Sun · 11:00 AM – 8:30 PM",
      badge: "Mississauga North"
    },
    {
      id: "hub-erin",
      name: "Erin Mills Cafe Partner",
      address: "410 Erin Centre Pkwy, Mississauga, ON L5M 0C3",
      hours: "Daily · 8:00 AM – 7:00 PM",
      badge: "Erin Mills"
    },
    {
      id: "hub-west",
      name: "Etobicoke Lakeshore Hub",
      address: "1420 Lakeshore Rd W, Etobicoke, ON M8W 0D4",
      hours: "Mon–Sun · 11:00 AM – 9:00 PM",
      badge: "Toronto West"
    }
  ],

  faqs: [
    {
      q: "How do the custom meal packages work?",
      a: "Choose your meal count (6, 12, 18, or 24 meals), pick your favorite high-protein entrées, and customize each plate with two chef-prepared sides. We cook fresh twice a week and deliver straight to your door."
    },
    {
      q: "Can I customize sides for every single meal?",
      a: "Yes! Every plate gets two included sides. You can tailor each meal individually or use our 1-click 'Repeat sides' helper to copy your favorite combination across multiple plates."
    },
    {
      q: "How long do the meals stay fresh?",
      a: "All meals are cooked fresh with zero preservatives and vacuum-sealed to stay crisp and flavorful in your refrigerator for up to 5 days."
    },
    {
      q: "What are the delivery days and cutoff rules?",
      a: "We deliver every Wednesday and Sunday, splitting your package into two equal drops (half & half) for peak freshness. Orders placed on Tuesday cannot start next-day Wednesday, and Saturday orders cannot start next-day Sunday."
    },
    {
      q: "Are your proteins Halal and macro-verified?",
      a: "Yes—100% of our poultry and beef entrées are certified Halal, portion-weighed, and lab-calculated for accurate calories, protein, fat, and carbs."
    },
    {
      q: "Can I modify my delivery schedule or order after checkout?",
      a: "Yes! You can modify your upcoming delivery or pickup location up to 48 hours prior by contacting our concierge team or managing your order in My Account."
    }
  ],

  promoCodes: {
    "LEAN10": { type: "percent", value: 10, label: "10% Off First Meal Plan" },
    "FRESH15": { type: "percent", value: 15, label: "15% Off Member Special" },
    "WELCOME5": { type: "fixed", value: 5, label: "$5.00 Off Welcome Credit" }
  },

  gtaSuggestions: [
    "240 Maple Grove Ave, Mississauga, ON L5M 0A1",
    "880 Meadowvale Blvd, Mississauga, ON L5N 0B2",
    "410 Erin Centre Pkwy, Mississauga, ON L5M 0C3",
    "1420 Lakeshore Rd W, Etobicoke, ON M8W 0D4",
    "100 Civic Centre Way, Mississauga, ON L5B 0E5",
    "220 Midtown Ave, Toronto, ON M5B 0F6",
    "150 Bayfront St W, Toronto, ON M5H 0G7",
    "2500 Central Pkwy, Mississauga, ON L5B 0H8"
  ]
};
