/* ==========================================================================
   LeanMeal — Core Application Engine
   Shared Header/Drawer, Cart State, Macro Modal, Delivery Cutoff Calculator,
   Auth Session & Order History (localStorage)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    CART: 'leanmeal_cart_v1',
    ORDERS: 'leanmeal_orders_v1',
    USER: 'leanmeal_user_v1',
    FAVORITES: 'leanmeal_favs_v1',
    INQUIRIES: 'leanmeal_inquiries_v1'
  };

  function getData() {
    return window.LEANMEAL_DATA || {};
  }

  function formatCAD(val) {
    return 'CA$' + Number(val || 0).toFixed(2);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------------
     Toast Notifications
     ------------------------------------------------------------------------ */
  function showToast(message) {
    let wrap = document.getElementById('lm-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'lm-toast-wrap';
      wrap.className = 'lm-toast-wrap';
      document.body.appendChild(wrap);
    }
    const toast = document.createElement('div');
    toast.className = 'lm-toast';
    toast.textContent = message;
    wrap.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3000);
  }

  /* ------------------------------------------------------------------------
     Cart Management
     ------------------------------------------------------------------------ */
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
    renderCartDrawer();
  }

  function addToCart(product, qty) {
    const quantity = Math.max(1, parseInt(qty, 10) || 1);
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category || 'Meal',
        calories: product.calories || null,
        qty: quantity
      });
    }
    saveCart(cart);
    showToast(`Added ${quantity} × ${product.name} to your bag.`);
    openCartDrawer();
  }

  function updateCartQty(id, delta) {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === id);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
  }

  function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotals(promoCode) {
    const cart = getCart();
    const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
    const data = getData();
    const promo = promoCode ? (data.promoCodes || {})[promoCode.toUpperCase().trim()] : null;
    let discount = 0;
    if (promo && subtotal > 0) {
      discount = promo.type === 'percent' ? subtotal * (promo.value / 100) : Math.min(subtotal, promo.value);
    }
    const taxable = Math.max(0, subtotal - discount);
    const taxRate = (data.brand && data.brand.taxRate) || 0.13;
    const tax = taxable * taxRate;
    const total = taxable + tax;
    return {
      count: cart.reduce((sum, it) => sum + it.qty, 0),
      subtotal,
      discount,
      promoLabel: promo ? promo.label : null,
      tax,
      total
    };
  }

  function renderCartDrawer() {
    const badges = document.querySelectorAll('[data-cart-count]');
    const cart = getCart();
    const totals = getCartTotals();
    badges.forEach(el => {
      el.textContent = String(totals.count);
      el.style.display = totals.count > 0 ? 'inline-flex' : 'none';
    });

    const body = document.getElementById('lm-cart-body');
    const subtotalEl = document.getElementById('lm-cart-subtotal');
    const taxEl = document.getElementById('lm-cart-tax');
    const totalEl = document.getElementById('lm-cart-total');
    const checkoutBtn = document.getElementById('lm-cart-checkout-btn');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding: 48px 12px;">
          <p style="font-size:2.4rem; margin:0 0 10px;">🥗</p>
          <h4 style="margin:0 0 8px;">Your bag is empty</h4>
          <p style="font-size:0.88rem; color:var(--lm-muted); margin:0 0 20px;">
            Explore our macro-balanced chef dishes or build a custom 6–24 meal package.
          </p>
          <a href="meal-plan.html" class="lm-btn lm-btn-primary lm-btn-sm">Build Meal Plan</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = formatCAD(0);
      if (taxEl) taxEl.textContent = formatCAD(0);
      if (totalEl) totalEl.textContent = formatCAD(0);
      if (checkoutBtn) checkoutBtn.setAttribute('aria-disabled', 'true');
      return;
    }

    body.innerHTML = cart.map(item => `
      <div style="display:flex; gap:14px; padding:14px 0; border-bottom:1px solid var(--lm-border); align-items:center;">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"
             style="width:68px; height:68px; border-radius:12px; object-fit:cover; background:var(--lm-mist); flex-shrink:0;" />
        <div style="flex:1; min-width:0;">
          <div style="font-weight:600; font-size:0.9rem; line-height:1.3;">${escapeHtml(item.name)}</div>
          <div style="font-size:0.78rem; color:var(--lm-muted); margin:3px 0 8px;">
            ${formatCAD(item.price)} ${item.calories ? '· ' + item.calories + ' kcal' : ''}
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <div class="lm-qty-stepper">
              <button type="button" data-cart-dec="${escapeHtml(item.id)}" aria-label="Decrease quantity">-</button>
              <span>${item.qty}</span>
              <button type="button" data-cart-inc="${escapeHtml(item.id)}" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" data-cart-del="${escapeHtml(item.id)}"
                    style="background:none; border:0; color:var(--lm-danger); font-size:0.78rem; font-weight:600; cursor:pointer;">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = formatCAD(totals.subtotal);
    if (taxEl) taxEl.textContent = formatCAD(totals.tax);
    if (totalEl) totalEl.textContent = formatCAD(totals.total);
    if (checkoutBtn) checkoutBtn.removeAttribute('aria-disabled');
  }

  function openCartDrawer() {
    const drawer = document.getElementById('lm-cart-drawer');
    if (drawer) {
      renderCartDrawer();
      drawer.classList.add('open');
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('lm-cart-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  /* ------------------------------------------------------------------------
     Dish Card Renderer & Nutrition Modal
     ------------------------------------------------------------------------ */
  function renderDishCard(item) {
    return `
      <article class="lm-dish-card" data-category="${escapeHtml(item.category)}" data-dish-id="${escapeHtml(item.id)}">
        <div class="lm-dish-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" />
          <div class="lm-dish-badges">
            ${item.halal ? '<span class="lm-badge lm-badge-halal">Halal</span>' : '<span></span>'}
            <span class="lm-badge lm-badge-cal">${item.calories} kcal</span>
          </div>
        </div>
        <div class="lm-dish-body">
          <h3 class="lm-dish-title">${escapeHtml(item.name)}</h3>
          <div class="lm-macro-pill-row" style="margin-bottom:10px;">
            <span class="lm-macro-pill pro">P: ${item.protein}g</span>
            <span class="lm-macro-pill">C: ${item.carbs}g</span>
            <span class="lm-macro-pill">F: ${item.fat}g</span>
            ${item.weight ? `<span class="lm-macro-pill">${escapeHtml(item.weight)}</span>` : ''}
          </div>
          <p class="lm-dish-desc">${escapeHtml(item.description)}</p>
          <div class="lm-dish-footer">
            <span class="lm-dish-price">${formatCAD(item.price)}</span>
            <div class="lm-dish-actions">
              <button type="button" class="lm-icon-btn" data-quick-view="${escapeHtml(item.id)}" title="Nutrition &amp; Ingredients" aria-label="View nutrition for ${escapeHtml(item.name)}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </button>
              <button type="button" class="lm-btn lm-btn-primary lm-btn-sm" data-add-dish="${escapeHtml(item.id)}">
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function openNutritionModal(itemId) {
    const data = getData();
    const item = (data.menuItems || []).find(m => m.id === itemId);
    if (!item) return;

    let modal = document.getElementById('lm-nutrition-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lm-nutrition-modal';
      modal.className = 'lm-modal';
      document.body.appendChild(modal);
    }

    const totalGrams = Math.max(1, item.protein + item.carbs + item.fat);
    const pPct = Math.round((item.protein / totalGrams) * 100);
    const cPct = Math.round((item.carbs / totalGrams) * 100);
    const fPct = Math.max(0, 100 - pPct - cPct);

    modal.innerHTML = `
      <div class="lm-backdrop" data-close-modal="lm-nutrition-modal"></div>
      <div class="lm-modal-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.name)} nutrition details">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:16px;">
          <div>
            <span class="lm-eyebrow">${escapeHtml(item.category)} ${item.halal ? '· Certified Halal' : ''}</span>
            <h2 class="lm-serif" style="margin:8px 0 0; font-size:2rem; line-height:1.1;">${escapeHtml(item.name)}</h2>
          </div>
          <button type="button" class="lm-icon-btn" data-close-modal="lm-nutrition-modal" aria-label="Close modal">&times;</button>
        </div>

        <div class="lm-modal-split">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"
               style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:16px;" />
          <div>
            <p style="margin:0 0 12px; font-size:0.9rem; color:var(--lm-muted);">${escapeHtml(item.description)}</p>
            <div class="lm-modal-macros">
              <div style="background:var(--lm-mist); padding:10px 12px; border-radius:10px;">
                <div style="font-size:0.72rem; color:var(--lm-muted);">Calories</div>
                <div style="font-weight:700; font-size:1.1rem; color:var(--lm-forest);">${item.calories} kcal</div>
              </div>
              <div style="background:rgba(196,255,136,0.35); padding:10px 12px; border-radius:10px;">
                <div style="font-size:0.72rem; color:var(--lm-forest);">Protein</div>
                <div style="font-weight:700; font-size:1.1rem; color:var(--lm-forest);">${item.protein}g</div>
              </div>
              <div style="background:var(--lm-mist); padding:10px 12px; border-radius:10px;">
                <div style="font-size:0.72rem; color:var(--lm-muted);">Carbs</div>
                <div style="font-weight:700; font-size:1.05rem;">${item.carbs}g</div>
              </div>
              <div style="background:var(--lm-mist); padding:10px 12px; border-radius:10px;">
                <div style="font-size:0.72rem; color:var(--lm-muted);">Healthy Fat</div>
                <div style="font-weight:700; font-size:1.05rem;">${item.fat}g</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:18px;">
          <div style="font-size:0.78rem; font-weight:600; margin-bottom:6px;">Macronutrient Ratio (${pPct}% Protein · ${cPct}% Carbs · ${fPct}% Fat)</div>
          <div style="height:10px; border-radius:999px; overflow:hidden; display:flex; background:var(--lm-mist);">
            <div style="width:${pPct}%; background:var(--lm-forest);"></div>
            <div style="width:${cPct}%; background:var(--lm-lime-rich);"></div>
            <div style="width:${fPct}%; background:#d99b26;"></div>
          </div>
        </div>

        <div style="background:var(--lm-cream-soft); padding:14px 16px; border-radius:12px; border:1px solid var(--lm-border); margin-bottom:20px;">
          <strong style="font-size:0.82rem; display:block; margin-bottom:4px;">Fresh Ingredients (${escapeHtml(item.weight || 'Chef Portion')})</strong>
          <span style="font-size:0.84rem; color:var(--lm-muted);">${escapeHtml(item.ingredients || '')}</span>
        </div>

        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
          <strong style="font-size:1.3rem; color:var(--lm-forest);">${formatCAD(item.price)}</strong>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${item.proteinEligible ? `<a href="meal-plan.html" class="lm-btn lm-btn-outline lm-btn-sm">Include in Meal Plan</a>` : ''}
            <button type="button" class="lm-btn lm-btn-primary lm-btn-sm" data-modal-add="${escapeHtml(item.id)}">Add to Bag</button>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('open');
  }

  /* ------------------------------------------------------------------------
     Wednesday & Sunday Split Delivery Schedule & Cutoff Rules
     - Rule 1: Deliveries occur on Wednesdays (3) & Sundays (0).
     - Rule 2: Tuesday orders cannot receive next-day Wednesday delivery.
     - Rule 3: Saturday orders cannot receive next-day Sunday delivery.
     - Rule 4: Package splits 50/50 across Delivery #1 and Delivery #2.
     ------------------------------------------------------------------------ */
  function formatLongDate(d) {
    return d.toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function toISODate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function computeDeliverySchedule(totalMeals, startDateISO) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let cursor;
    let cutoffNotice = null;

    if (startDateISO) {
      const parts = startDateISO.split('-').map(Number);
      cursor = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      cursor = new Date(now);
      const dow = now.getDay();
      if (dow === 2) {
        // Tuesday -> skip next-day Wednesday, jump +2 days to Thursday
        cursor.setDate(cursor.getDate() + 2);
        cutoffNotice = 'Tuesday cutoff applied: next-day Wednesday delivery is closed; scheduled for Sunday & following Wednesday.';
      } else if (dow === 6) {
        // Saturday -> skip next-day Sunday, jump +2 days to Monday
        cursor.setDate(cursor.getDate() + 2);
        cutoffNotice = 'Saturday cutoff applied: next-day Sunday delivery is closed; scheduled for Wednesday & following Sunday.';
      } else {
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    const drops = [];
    const probe = new Date(cursor);
    for (let i = 0; i < 21 && drops.length < 2; i++) {
      const d = probe.getDay();
      if (d === 0 || d === 3) {
        drops.push(new Date(probe));
      }
      probe.setDate(probe.getDate() + 1);
    }

    const firstMeals = Math.ceil(totalMeals / 2);
    const secondMeals = Math.floor(totalMeals / 2);

    return {
      cutoffNotice,
      drops: [
        {
          label: 'Delivery #1 (First Half)',
          date: drops[0],
          iso: toISODate(drops[0]),
          formatted: formatLongDate(drops[0]),
          meals: firstMeals
        },
        {
          label: 'Delivery #2 (Second Half)',
          date: drops[1],
          iso: toISODate(drops[1]),
          formatted: formatLongDate(drops[1]),
          meals: secondMeals
        }
      ]
    };
  }

  function getMinAdvanceDateISO() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 7);
    return toISODate(d);
  }

  /* ------------------------------------------------------------------------
     User Account & Order History (localStorage)
     ------------------------------------------------------------------------ */
  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
    } catch {
      return null;
    }
  }

  function saveUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    } catch {
      return [];
    }
  }

  function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return order;
  }

  function saveInquiry(payload) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    list.unshift({ ...payload, submittedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
  }

  /* ------------------------------------------------------------------------
     Shared Chrome Injection (Cart Drawer + Mobile Drawer) & Global Events
     ------------------------------------------------------------------------ */
  function injectSharedDrawers() {
    if (!document.getElementById('lm-cart-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'lm-cart-drawer';
      drawer.className = 'lm-drawer';
      drawer.innerHTML = `
        <div class="lm-backdrop" data-close-cart></div>
        <aside class="lm-drawer-panel" role="dialog" aria-label="Shopping Bag">
          <div class="lm-drawer-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="margin:0; font-size:1.15rem;">Your Fresh Bag</h3>
              <span style="font-size:0.76rem; color:var(--lm-muted);">Cooked fresh · Zero preservatives</span>
            </div>
            <button type="button" class="lm-icon-btn" data-close-cart aria-label="Close bag">&times;</button>
          </div>
          <div class="lm-drawer-body" id="lm-cart-body"></div>
          <div class="lm-drawer-footer">
            <div class="lm-line-row"><span>Subtotal</span><strong id="lm-cart-subtotal">CA$0.00</strong></div>
            <div class="lm-line-row"><span>Ontario HST (13%)</span><span id="lm-cart-tax">CA$0.00</span></div>
            <div class="lm-line-row total"><span>Estimated Total</span><span id="lm-cart-total">CA$0.00</span></div>
            <div class="lm-drawer-actions">
              <a href="meal-plan.html" class="lm-btn lm-btn-outline lm-btn-sm">Custom Plan</a>
              <a href="checkout.html" id="lm-cart-checkout-btn" class="lm-btn lm-btn-primary lm-btn-sm">Checkout</a>
            </div>
          </div>
        </aside>
      `;
      document.body.appendChild(drawer);
    }

    if (!document.getElementById('lm-mobile-nav')) {
      const mob = document.createElement('div');
      mob.id = 'lm-mobile-nav';
      mob.className = 'lm-mobile-nav';
      const current = window.location.pathname.split('/').pop() || 'index.html';
      const links = [
        ['index.html', 'Home'],
        ['about-us.html', 'About Us'],
        ['our-menu.html', 'Our Menu'],
        ['meal-plan.html', 'Meal Plan Builder'],
        ['shop.html', 'Weekly Plans'],
        ['contact-us.html', 'Contact Us'],
        ['account.html', 'My Account']
      ];
      mob.innerHTML = `
        <div class="lm-backdrop" data-close-mobile></div>
        <div class="lm-mobile-panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="lm-logo">LeanMeal</span>
            <button type="button" class="lm-icon-btn" data-close-mobile aria-label="Close menu">&times;</button>
          </div>
          <nav class="lm-mobile-links">
            ${links.map(([href, label]) => `<a href="${href}" class="${current === href ? 'active' : ''}">${label}</a>`).join('')}
          </nav>
          <a href="meal-plan.html" class="lm-btn lm-btn-primary" style="margin-top:auto;">Build Meal Plan</a>
        </div>
      `;
      document.body.appendChild(mob);
    }
  }

  function bindGlobalListeners() {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.lm-header');
      if (header) header.classList.toggle('scrolled', window.scrollY > 18);
    }, { passive: true });

    document.addEventListener('click', (e) => {
      const t = e.target;

      // Open/close cart drawer
      if (t.closest('[data-open-cart]')) {
        openCartDrawer();
        return;
      }
      if (t.closest('[data-close-cart]')) {
        closeCartDrawer();
        return;
      }

      // Open/close mobile nav
      if (t.closest('[data-open-mobile]')) {
        const mob = document.getElementById('lm-mobile-nav');
        if (mob) mob.classList.add('open');
        return;
      }
      if (t.closest('[data-close-mobile]')) {
        const mob = document.getElementById('lm-mobile-nav');
        if (mob) mob.classList.remove('open');
        return;
      }

      // Close modal
      const closeModalBtn = t.closest('[data-close-modal]');
      if (closeModalBtn) {
        const modal = document.getElementById(closeModalBtn.getAttribute('data-close-modal'));
        if (modal) modal.classList.remove('open');
        return;
      }

      // Cart steppers
      const inc = t.closest('[data-cart-inc]');
      if (inc) { updateCartQty(inc.getAttribute('data-cart-inc'), 1); return; }
      const dec = t.closest('[data-cart-dec]');
      if (dec) { updateCartQty(dec.getAttribute('data-cart-dec'), -1); return; }
      const del = t.closest('[data-cart-del]');
      if (del) { removeFromCart(del.getAttribute('data-cart-del')); return; }

      // Quick view nutrition modal
      const qv = t.closest('[data-quick-view]');
      if (qv) { openNutritionModal(qv.getAttribute('data-quick-view')); return; }

      // Add dish to bag
      const addDish = t.closest('[data-add-dish]');
      if (addDish) {
        const id = addDish.getAttribute('data-add-dish');
        const data = getData();
        const item = (data.menuItems || []).find(m => m.id === id) ||
                     (data.weeklyPlans || []).find(w => w.id === id);
        if (item) addToCart(item, 1);
        return;
      }

      const modalAdd = t.closest('[data-modal-add]');
      if (modalAdd) {
        const id = modalAdd.getAttribute('data-modal-add');
        const item = (getData().menuItems || []).find(m => m.id === id);
        if (item) {
          addToCart(item, 1);
          const modal = document.getElementById('lm-nutrition-modal');
          if (modal) modal.classList.remove('open');
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        const mob = document.getElementById('lm-mobile-nav');
        if (mob) mob.classList.remove('open');
        document.querySelectorAll('.lm-modal.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectSharedDrawers();
    bindGlobalListeners();
    renderCartDrawer();
  });

  window.LeanMealApp = {
    formatCAD,
    escapeHtml,
    showToast,
    getCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getCartTotals,
    openCartDrawer,
    renderDishCard,
    openNutritionModal,
    computeDeliverySchedule,
    getMinAdvanceDateISO,
    getUser,
    saveUser,
    getOrders,
    saveOrder,
    saveInquiry
  };
})();
