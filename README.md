# LeanMeal — Healthy & Clean Meal Prep HTML5 Template

A modern, responsive, standalone HTML5/CSS3/Vanilla JS template built for macro-verified meal prep kitchens, custom meal plan subscriptions, and multi-location fresh food delivery brands.

## Pages Included

1. **`index.html`** — Editorial Hero, 4-Step Process, Weekly 5-Day Meal Plans Showcase, Tabbed Menu (`Main Menu`, `Salads`, `Beverages`, `Healthy Desserts`), Delivery Inquiry Form, Partner Pickup Hubs, and Social Feed Strip.
2. **`meal-plan.html`** — Full 6-Step Interactive Meal Plan Customizer Wizard:
   - **Step 1**: Tiered meal packages (`6 Meals @ CA$12`, `12 Meals @ CA$11`, `18 Meals @ CA$10`, `24 Meals @ CA$9`) + FAQ Accordion.
   - **Step 2**: Multi-plate Halal protein selector with live progress bar, dietary filters, prep-style variant modal, and auto-fill helper.
   - **Step 3**: Two distinct included sides per plate with duplicate-side guard and 1-click **Repeat Sides** cascade controls.
   - **Step 4**: Collapsible Healthy Add-Ons drawer + Home Delivery vs Partner Hub Pickup + Wednesday/Sunday split delivery schedule with Tuesday/Saturday cutoff rules and advance start-date picker.
   - **Step 5**: Customer information & GTA address autocomplete suggestions.
   - **Step 6**: Itemized review, promo codes (`LEAN10`, `FRESH15`, `WELCOME5`), 13% Ontario HST calculation, printable confirmation receipt, and order persistence in `localStorage`.
3. **`our-menu.html`** — Full interactive menu with category tabs, macro filter chips (`40g+ Protein`, `Under 350 kcal`, `Low Carb`), search, sorting, Nutrition & Ingredients quick-view modal, and slide-out shopping bag.
4. **`shop.html`** — Weekly 5-Day Meal Plans (`1 Meal/Day`, `2 Meals/Day`) with sorting, quantity steppers, and direct links into the customizer wizard.
5. **`about-us.html`** — Brand story, 3 culinary pillars, and partner storefront hubs.
6. **`contact-us.html`** — Event catering & general inquiry form, contact cards, and partner pickup locations.
7. **`account.html`** — Customer Login/Register portal, saved profile & address editor, and live order history synced with `localStorage`.
8. **`checkout.html`** — Standalone cart checkout with delivery/pickup toggle, promo code engine, 13% HST, and order confirmation.

## Tech Stack

- **HTML5 & CSS3** (`assets/css/style.css`) — `EB Garamond` + `Poppins` typography, `#004B1A` deep forest green, `#C4FF88` fresh lime accent, `#F9F2E6` cream surfaces.
- **Modular Vanilla JS** (`assets/js/data.js`, `assets/js/app.js`, `assets/js/meal-plan.js`) — Zero framework or CMS dependencies.

## Local Preview

```powershell
python -m http.server 5600
```
Open `http://localhost:5600/index.html` in your browser.
