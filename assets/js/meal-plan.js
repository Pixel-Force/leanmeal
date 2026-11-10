/* ==========================================================================
   LeanMeal — 6-Step Interactive Meal Plan Customizer Wizard
   Mirrors & enhances the full multi-step customizer workflow:
   Step 1: Package Selection (6 / 12 / 18 / 24 meals) + FAQ Accordion
   Step 2: Protein Selection (mix & match plates, variants, live counter)
   Step 3: Sides Selection per Plate (Side 1 & Side 2, duplicate guard, repeat cascade)
   Step 4: Healthy Add-Ons + Split Wednesday/Sunday Delivery & Cutoff Rules
   Step 5: Customer Information & GTA Address Autocomplete
   Step 6: Review, Promo Code, Ontario HST (13%) & Printable Order Receipt
   ========================================================================== */

(function () {
  'use strict';

  const App = window.LeanMealApp;
  const Data = window.LEANMEAL_DATA;
  if (!App || !Data) return;

  const state = {
    step: 1,
    packageMeals: 12,
    perMealPrice: 11.00,
    plates: [], // [{ uid, proteinId, name, variant, calories, protein, fat, carbs, image, side1, side2 }]
    addons: {}, // { itemId: qty }
    fulfillment: 'delivery', // 'delivery' | 'pickup'
    pickupHubId: Data.partners[0].id,
    startMode: 'earliest', // 'earliest' | 'advance'
    advanceDate: App.getMinAdvanceDateISO(),
    proteinFilter: 'All',
    proteinSearch: '',
    promoCode: '',
    customer: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      postal: '',
      notes: ''
    },
    pendingVariantItem: null
  };

  function getPackageObj(meals) {
    return Data.packages.find(p => p.meals === meals) || Data.packages[1];
  }

  function initFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const mealsParam = parseInt(params.get('meals'), 10);
    if ([6, 12, 18, 24].includes(mealsParam)) {
      const pkg = getPackageObj(mealsParam);
      state.packageMeals = pkg.meals;
      state.perMealPrice = pkg.perMeal;
    }
    const user = App.getUser();
    if (user) {
      state.customer.fullName = user.name || '';
      state.customer.email = user.email || '';
      state.customer.phone = user.phone || '';
      state.customer.address = user.address || '';
    }
  }

  /* ------------------------------------------------------------------------
     Step Navigation & Progress Bar
     ------------------------------------------------------------------------ */
  function goToStep(targetStep) {
    if (targetStep > state.step) {
      if (state.step === 2 && state.plates.length !== state.packageMeals) {
        App.showToast(`Please select ${state.packageMeals} protein plates (${state.plates.length}/${state.packageMeals} chosen).`);
        return;
      }
      if (state.step === 3) {
        const incomplete = state.plates.findIndex(p => !p.side1 || !p.side2);
        if (incomplete !== -1) {
          App.showToast(`Please select both Side 1 and Side 2 for Meal #${incomplete + 1}.`);
          return;
        }
      }
      if (state.step === 5 && !validateCustomerForm(true)) {
        return;
      }
    }

    state.step = Math.max(1, Math.min(6, targetStep));
    document.querySelectorAll('.lm-wizard-step').forEach(el => {
      el.style.display = parseInt(el.dataset.step, 10) === state.step ? 'block' : 'none';
    });
    document.querySelectorAll('.lm-step-pill').forEach(pill => {
      const s = parseInt(pill.dataset.stepPill, 10);
      pill.classList.toggle('active', s === state.step);
      pill.classList.toggle('done', s < state.step);
    });

    if (state.step === 2) renderStep2Proteins();
    if (state.step === 3) renderStep3Sides();
    if (state.step === 4) renderStep4ScheduleAndAddons();
    if (state.step === 5) syncCustomerInputs();
    if (state.step === 6) renderStep6Review();

    window.scrollTo({ top: 140, behavior: 'smooth' });
  }

  /* ------------------------------------------------------------------------
     Step 1: Package Cards & FAQ Accordion
     ------------------------------------------------------------------------ */
  function renderStep1() {
    const grid = document.getElementById('lm-package-grid');
    if (grid) {
      grid.innerHTML = Data.packages.map(pkg => `
        <div class="lm-package-card ${state.packageMeals === pkg.meals ? 'selected' : ''}" data-select-pkg="${pkg.meals}">
          <span class="lm-package-tag">${App.escapeHtml(pkg.badge)}</span>
          <div class="lm-package-count">${pkg.meals}</div>
          <div style="font-weight:600; font-size:1rem; margin:4px 0 8px;">Meals Package</div>
          <div style="font-size:0.86rem; color:var(--lm-forest); font-weight:700;">CA$${pkg.perMeal.toFixed(2)} / meal</div>
          <div style="font-size:1.35rem; font-weight:700; color:var(--lm-ink); margin:8px 0 6px;">CA$${pkg.total.toFixed(2)}</div>
          <div style="font-size:0.78rem; color:var(--lm-muted);">${App.escapeHtml(pkg.subtitle)}</div>
        </div>
      `).join('');
    }

    const faqWrap = document.getElementById('lm-wizard-faq');
    if (faqWrap && !faqWrap.dataset.rendered) {
      faqWrap.dataset.rendered = '1';
      faqWrap.innerHTML = Data.faqs.map((item, idx) => `
        <div class="lm-faq-item ${idx === 0 ? 'open' : ''}">
          <button type="button" class="lm-faq-trigger" data-faq-toggle>
            <span>${App.escapeHtml(item.q)}</span>
            <span class="lm-faq-plus">+</span>
          </button>
          <div class="lm-faq-body">${App.escapeHtml(item.a)}</div>
        </div>
      `).join('');
    }
  }

  /* ------------------------------------------------------------------------
     Step 2: Select Proteins (Multi-plate + Variant Modal)
     ------------------------------------------------------------------------ */
  function getEligibleProteins() {
    return Data.menuItems.filter(m => m.proteinEligible);
  }

  function renderStep2Proteins() {
    const meterText = document.getElementById('lm-protein-meter-text');
    const meterFill = document.getElementById('lm-protein-meter-fill');
    const pkgPriceEl = document.getElementById('lm-step2-pkg-total');
    const continueBtn = document.getElementById('lm-btn-step2-next');
    const tray = document.getElementById('lm-selected-tray');
    const grid = document.getElementById('lm-protein-grid');

    const count = state.plates.length;
    const pct = Math.min(100, Math.round((count / state.packageMeals) * 100));
    if (meterText) meterText.textContent = `Selected: ${count} / ${state.packageMeals} proteins`;
    if (meterFill) meterFill.style.width = `${pct}%`;
    if (pkgPriceEl) pkgPriceEl.textContent = App.formatCAD(state.packageMeals * state.perMealPrice);
    if (continueBtn) continueBtn.disabled = count !== state.packageMeals;

    if (tray) {
      if (count === 0) {
        tray.innerHTML = `<span style="font-size:0.84rem; color:var(--lm-muted);">Click <strong>+ Add Plate</strong> on any entrée below to fill your ${state.packageMeals}-meal box.</span>`;
      } else {
        const grouped = {};
        state.plates.forEach(p => {
          const key = `${p.name} (${p.variant})`;
          grouped[key] = (grouped[key] || 0) + 1;
        });
        tray.innerHTML = Object.entries(grouped).map(([label, qty]) => `
          <span class="lm-macro-pill pro" style="padding:6px 12px; font-size:0.8rem;">
            ${qty}× ${App.escapeHtml(label)}
          </span>
        `).join('');
      }
    }

    if (!grid) return;
    const allProteins = getEligibleProteins().filter(p => {
      const matchesSearch = !state.proteinSearch || p.name.toLowerCase().includes(state.proteinSearch.toLowerCase());
      const matchesFilter = state.proteinFilter === 'All' ||
        (state.proteinFilter === 'Chicken' && p.name.toLowerCase().includes('chicken')) ||
        (state.proteinFilter === 'Beef' && p.name.toLowerCase().includes('beef')) ||
        (state.proteinFilter === 'Seafood' && p.name.toLowerCase().includes('salmon')) ||
        (state.proteinFilter === 'High Protein' && p.protein >= 45);
      return matchesSearch && matchesFilter;
    });

    grid.innerHTML = allProteins.map(item => {
      const itemCount = state.plates.filter(pl => pl.proteinId === item.id).length;
      return `
        <article class="lm-dish-card">
          <div class="lm-dish-media">
            <img src="${App.escapeHtml(item.image)}" alt="${App.escapeHtml(item.name)}" />
            <div class="lm-dish-badges">
              <span class="lm-badge lm-badge-halal">${item.halal ? 'Halal' : 'Fresh'}</span>
              <span class="lm-badge lm-badge-cal">${item.calories} kcal</span>
            </div>
          </div>
          <div class="lm-dish-body">
            <h3 class="lm-dish-title">${App.escapeHtml(item.name)}</h3>
            <div class="lm-macro-pill-row" style="margin-bottom:8px;">
              <span class="lm-macro-pill pro">P: ${item.protein}g</span>
              <span class="lm-macro-pill">C: ${item.carbs}g</span>
              <span class="lm-macro-pill">F: ${item.fat}g</span>
            </div>
            <p class="lm-dish-desc">${App.escapeHtml(item.description)}</p>
            <div class="lm-dish-footer">
              <span style="font-size:0.8rem; font-weight:600; color:var(--lm-forest);">
                ${itemCount > 0 ? `${itemCount} plate${itemCount > 1 ? 's' : ''} added` : 'Included in Plan'}
              </span>
              <div style="display:flex; gap:6px; align-items:center;">
                ${itemCount > 0 ? `<button type="button" class="lm-icon-btn" data-remove-protein="${App.escapeHtml(item.id)}" aria-label="Remove one plate">−</button>` : ''}
                <button type="button" class="lm-btn lm-btn-primary lm-btn-sm" data-add-protein="${App.escapeHtml(item.id)}"
                        ${count >= state.packageMeals ? 'disabled' : ''}>
                  + Add Plate
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function addProteinPlateWithVariant(item, variant) {
    if (state.plates.length >= state.packageMeals) {
      App.showToast(`Package limit of ${state.packageMeals} plates reached.`);
      return;
    }
    const defaultSide1 = Data.sides[0].id;
    const defaultSide2 = Data.sides[4].id;
    state.plates.push({
      uid: 'plate_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      proteinId: item.id,
      name: item.name,
      variant: variant || (item.subProteins ? item.subProteins[0] : 'Chef Classic'),
      calories: item.calories,
      protein: item.protein,
      fat: item.fat,
      carbs: item.carbs,
      image: item.image,
      side1: defaultSide1,
      side2: defaultSide2
    });
    renderStep2Proteins();
  }

  function openVariantModal(item) {
    state.pendingVariantItem = item;
    let modal = document.getElementById('lm-variant-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lm-variant-modal';
      modal.className = 'lm-modal';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="lm-backdrop" data-close-modal="lm-variant-modal"></div>
      <div class="lm-modal-dialog" style="width:min(460px,100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="margin:0;">Select Prep Style</h3>
          <button type="button" class="lm-icon-btn" data-close-modal="lm-variant-modal">&times;</button>
        </div>
        <p style="font-size:0.88rem; color:var(--lm-muted); margin:0 0 16px;">
          Choose your preparation preference for <strong>${App.escapeHtml(item.name)}</strong>:
        </p>
        <div style="display:grid; gap:10px;">
          ${(item.subProteins || ['Chef Classic']).map(sp => `
            <button type="button" class="lm-btn lm-btn-outline" style="justify-content:space-between;" data-pick-variant="${App.escapeHtml(sp)}">
              <span>${App.escapeHtml(sp)}</span>
              <span>+ Add Plate</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    modal.classList.add('open');
  }

  /* ------------------------------------------------------------------------
     Step 3: Select 2 Sides per Plate + Duplicate Prevention + Repeat Cascade
     ------------------------------------------------------------------------ */
  function renderStep3Sides() {
    const list = document.getElementById('lm-sides-list');
    if (!list) return;

    list.innerHTML = state.plates.map((plate, idx) => {
      const s1Obj = Data.sides.find(s => s.id === plate.side1);
      const s2Obj = Data.sides.find(s => s.id === plate.side2);
      const plateCals = plate.calories + (s1Obj ? s1Obj.calories : 0) + (s2Obj ? s2Obj.calories : 0);
      const platePro = (plate.protein + (s1Obj ? s1Obj.protein : 0) + (s2Obj ? s2Obj.protein : 0)).toFixed(1);
      const remaining = state.plates.length - 1 - idx;

      const side1Opts = Data.sides
        .filter(s => s.id !== plate.side2)
        .map(s => `<option value="${s.id}" ${s.id === plate.side1 ? 'selected' : ''}>${App.escapeHtml(s.name)} (+${s.calories} kcal)</option>`)
        .join('');

      const side2Opts = Data.sides
        .filter(s => s.id !== plate.side1)
        .map(s => `<option value="${s.id}" ${s.id === plate.side2 ? 'selected' : ''}>${App.escapeHtml(s.name)} (+${s.calories} kcal)</option>`)
        .join('');

      return `
        <div class="lm-plate-box" data-plate-index="${idx}">
          <div class="lm-plate-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${App.escapeHtml(plate.image)}" alt="${App.escapeHtml(plate.name)}"
                   style="width:52px; height:52px; border-radius:10px; object-fit:cover;" />
              <div>
                <div style="font-weight:700; font-size:0.96rem;">Meal #${idx + 1}: ${App.escapeHtml(plate.name)}</div>
                <div style="font-size:0.78rem; color:var(--lm-muted);">Style: ${App.escapeHtml(plate.variant)}</div>
              </div>
            </div>
            <div class="lm-macro-pill-row" style="margin:0;">
              <span class="lm-macro-pill pro">Total ${platePro}g Protein</span>
              <span class="lm-macro-pill">${plateCals} kcal</span>
            </div>
          </div>

          <div class="lm-sides-row">
            <div class="lm-field">
              <label>Side 1 (Included)</label>
              <select class="lm-select" data-side-select="side1" data-idx="${idx}">
                <option value="">Choose Side 1</option>
                ${side1Opts}
              </select>
            </div>
            <div class="lm-field">
              <label>Side 2 (Included — Distinct from Side 1)</label>
              <select class="lm-select" data-side-select="side2" data-idx="${idx}">
                <option value="">Choose Side 2</option>
                ${side2Opts}
              </select>
            </div>
          </div>

          ${remaining > 0 ? `
            <div class="lm-cascade-bar">
              <span style="color:var(--lm-muted);">Quick Repeat:</span>
              <button type="button" class="lm-chip" data-cascade="${idx}" data-qty="${Math.min(2, remaining)}">
                Copy to next ${Math.min(2, remaining)} meal${remaining > 1 ? 's' : ''}
              </button>
              <button type="button" class="lm-chip" data-cascade="${idx}" data-qty="${remaining}">
                Apply to all remaining (${remaining})
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  /* ------------------------------------------------------------------------
     Step 4: Healthy Add-Ons + Wednesday/Sunday Split Schedule & Cutoff
     ------------------------------------------------------------------------ */
  function getAddonCatalog() {
    return Data.menuItems.filter(m => m.isAddon);
  }

  function getAddonStats() {
    const catalog = getAddonCatalog();
    let count = 0;
    let total = 0;
    Object.entries(state.addons).forEach(([id, qty]) => {
      const item = catalog.find(i => i.id === id);
      if (item && qty > 0) {
        count += qty;
        total += item.price * qty;
      }
    });
    return { count, total };
  }

  function renderStep4ScheduleAndAddons() {
    const addonList = document.getElementById('lm-addon-list');
    const addonCatalog = getAddonCatalog();
    if (addonList) {
      addonList.innerHTML = addonCatalog.map(item => {
        const qty = state.addons[item.id] || 0;
        return `
          <div style="display:flex; gap:12px; align-items:center; background:#fff; padding:12px; border-radius:12px; border:1px solid var(--lm-border);">
            <img src="${App.escapeHtml(item.image)}" alt="${App.escapeHtml(item.name)}"
                 style="width:56px; height:56px; border-radius:10px; object-fit:cover; flex-shrink:0;" />
            <div style="flex:1; min-width:0;">
              <div style="font-weight:600; font-size:0.86rem;">${App.escapeHtml(item.name)}</div>
              <div style="font-size:0.75rem; color:var(--lm-muted);">${item.calories} kcal · ${App.formatCAD(item.price)}</div>
            </div>
            <div class="lm-qty-stepper">
              <button type="button" data-addon-dec="${item.id}">-</button>
              <span>${qty}</span>
              <button type="button" data-addon-inc="${item.id}">+</button>
            </div>
          </div>
        `;
      }).join('');
    }

    const stats = getAddonStats();
    const countEl = document.getElementById('lm-addon-count');
    const totalEl = document.getElementById('lm-addon-total');
    if (countEl) countEl.textContent = String(stats.count);
    if (totalEl) totalEl.textContent = App.formatCAD(stats.total);

    // Pickup hub selector visibility
    const hubWrap = document.getElementById('lm-pickup-hub-wrap');
    const hubSelect = document.getElementById('lm-pickup-hub');
    if (hubWrap) hubWrap.style.display = state.fulfillment === 'pickup' ? 'block' : 'none';
    if (hubSelect && !hubSelect.dataset.filled) {
      hubSelect.dataset.filled = '1';
      hubSelect.innerHTML = Data.partners.map(p =>
        `<option value="${p.id}" ${p.id === state.pickupHubId ? 'selected' : ''}>${App.escapeHtml(p.name)} — ${App.escapeHtml(p.address)}</option>`
      ).join('');
    }

    const advWrap = document.getElementById('lm-advance-date-wrap');
    const advInput = document.getElementById('lm-advance-date');
    if (advWrap) advWrap.style.display = state.startMode === 'advance' ? 'block' : 'none';
    if (advInput) {
      advInput.min = App.getMinAdvanceDateISO();
      advInput.value = state.advanceDate;
    }

    // Calculate split schedule
    const schedule = App.computeDeliverySchedule(
      state.packageMeals,
      state.startMode === 'advance' ? state.advanceDate : null
    );
    const previewEl = document.getElementById('lm-schedule-preview');
    if (previewEl) {
      previewEl.innerHTML = `
        ${schedule.cutoffNotice ? `
          <div style="background:#fff4e5; border:1px solid #ffd599; color:#7a4f01; padding:10px 14px; border-radius:10px; font-size:0.82rem; margin-bottom:14px;">
            ⚠️ ${App.escapeHtml(schedule.cutoffNotice)}
          </div>
        ` : ''}
        <div class="lm-schedule-grid">
          ${schedule.drops.map(drop => `
            <div class="lm-delivery-split-card">
              <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--lm-forest);">${App.escapeHtml(drop.label)}</div>
              <div style="font-size:1.05rem; font-weight:700; margin:6px 0 4px;">${App.escapeHtml(drop.formatted)}</div>
              <div style="font-size:0.86rem; color:var(--lm-muted);">
                ${drop.meals} freshly prepared meals (${state.fulfillment === 'pickup' ? 'Ready for Partner Pickup' : 'Home Doorstep Delivery'})
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  /* ------------------------------------------------------------------------
     Step 5: Customer Info & GTA Address Suggestions
     ------------------------------------------------------------------------ */
  function syncCustomerInputs() {
    const map = {
      'lm-cust-name': 'fullName',
      'lm-cust-email': 'email',
      'lm-cust-phone': 'phone',
      'lm-cust-address': 'address',
      'lm-cust-postal': 'postal',
      'lm-cust-notes': 'notes'
    };
    Object.entries(map).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.value = state.customer[key] || '';
    });

    const addrBlock = document.getElementById('lm-cust-addr-block');
    if (addrBlock) {
      addrBlock.style.display = state.fulfillment === 'pickup' ? 'none' : 'grid';
    }
  }

  function readCustomerInputs() {
    state.customer.fullName = (document.getElementById('lm-cust-name')?.value || '').trim();
    state.customer.email = (document.getElementById('lm-cust-email')?.value || '').trim();
    state.customer.phone = (document.getElementById('lm-cust-phone')?.value || '').trim();
    state.customer.address = (document.getElementById('lm-cust-address')?.value || '').trim();
    state.customer.postal = (document.getElementById('lm-cust-postal')?.value || '').trim();
    state.customer.notes = (document.getElementById('lm-cust-notes')?.value || '').trim();
  }

  function validateCustomerForm(showAlert) {
    readCustomerInputs();
    if (!state.customer.fullName || !state.customer.email || !state.customer.phone) {
      if (showAlert) App.showToast('Please enter your full name, email address, and phone number.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.customer.email)) {
      if (showAlert) App.showToast('Please enter a valid email address.');
      return false;
    }
    if (state.fulfillment === 'delivery' && state.customer.address.length < 5) {
      if (showAlert) App.showToast('Please enter a valid delivery street address.');
      return false;
    }
    return true;
  }

  /* ------------------------------------------------------------------------
     Step 6: Order Summary, Pricing Breakdown & Order Confirmation
     ------------------------------------------------------------------------ */
  function calculateWizardTotals() {
    const packageTotal = state.packageMeals * state.perMealPrice;
    const addonStats = getAddonStats();
    const subtotal = packageTotal + addonStats.total;
    const promo = state.promoCode ? (Data.promoCodes || {})[state.promoCode.toUpperCase().trim()] : null;
    let discount = 0;
    if (promo) {
      discount = promo.type === 'percent' ? subtotal * (promo.value / 100) : Math.min(subtotal, promo.value);
    }
    const taxable = Math.max(0, subtotal - discount);
    const tax = taxable * Data.brand.taxRate;
    const grandTotal = taxable + tax;
    return { packageTotal, addonStats, subtotal, discount, promo, tax, grandTotal };
  }

  function renderStep6Review() {
    const totals = calculateWizardTotals();
    const schedule = App.computeDeliverySchedule(
      state.packageMeals,
      state.startMode === 'advance' ? state.advanceDate : null
    );
    const hub = Data.partners.find(p => p.id === state.pickupHubId) || Data.partners[0];

    const reviewEl = document.getElementById('lm-review-details');
    if (reviewEl) {
      reviewEl.innerHTML = `
        <div class="lm-plate-box">
          <h4 style="margin:0 0 10px;">👤 Customer &amp; Fulfillment</h4>
          <p style="margin:0; font-size:0.9rem;">
            <strong>${App.escapeHtml(state.customer.fullName)}</strong> · ${App.escapeHtml(state.customer.email)} · ${App.escapeHtml(state.customer.phone)}<br/>
            ${state.fulfillment === 'pickup'
              ? `<strong>Partner Pickup:</strong> ${App.escapeHtml(hub.name)} (${App.escapeHtml(hub.address)})`
              : `<strong>Delivery Address:</strong> ${App.escapeHtml(state.customer.address)} ${App.escapeHtml(state.customer.postal)}`
            }
          </p>
        </div>

        <div class="lm-plate-box">
          <h4 style="margin:0 0 10px;">📦 Split Delivery Schedule</h4>
          <div style="display:grid; gap:8px; font-size:0.88rem;">
            ${schedule.drops.map(d => `
              <div><strong>${App.escapeHtml(d.label)}:</strong> ${App.escapeHtml(d.formatted)} — <strong>${d.meals} meals</strong></div>
            `).join('')}
          </div>
        </div>

        <div class="lm-plate-box">
          <h4 style="margin:0 0 12px;">🍗 ${state.packageMeals} Customized Meals &amp; Sides</h4>
          <div style="display:grid; gap:8px; max-height:300px; overflow-y:auto;">
            ${state.plates.map((p, i) => {
              const s1 = Data.sides.find(s => s.id === p.side1);
              const s2 = Data.sides.find(s => s.id === p.side2);
              return `
                <div style="background:#fff; padding:10px 14px; border-radius:10px; border:1px solid var(--lm-border); font-size:0.84rem;">
                  <strong>Meal #${i + 1}: ${App.escapeHtml(p.name)}</strong> (${App.escapeHtml(p.variant)})<br/>
                  <span style="color:var(--lm-muted);">Sides: ${App.escapeHtml(s1?.name || '')} + ${App.escapeHtml(s2?.name || '')}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    const summaryEl = document.getElementById('lm-review-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <h3 style="margin:0 0 16px;">Order Summary</h3>
        <div class="lm-line-row">
          <span>${state.packageMeals}-Meal Package (${App.formatCAD(state.perMealPrice)}/meal)</span>
          <strong>${App.formatCAD(totals.packageTotal)}</strong>
        </div>
        <div class="lm-line-row">
          <span>Healthy Add-Ons (${totals.addonStats.count})</span>
          <span>${App.formatCAD(totals.addonStats.total)}</span>
        </div>
        <div class="lm-line-row">
          <span>Split Delivery (Wed &amp; Sun)</span>
          <span style="color:var(--lm-forest); font-weight:600;">FREE</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="lm-line-row" style="color:var(--lm-forest);">
            <span>Promo (${App.escapeHtml(state.promoCode.toUpperCase())})</span>
            <strong>−${App.formatCAD(totals.discount)}</strong>
          </div>
        ` : ''}
        <div class="lm-line-row">
          <span>Ontario HST (13%)</span>
          <span>${App.formatCAD(totals.tax)}</span>
        </div>
        <div class="lm-line-row total">
          <span>Grand Total</span>
          <span>${App.formatCAD(totals.grandTotal)}</span>
        </div>

        <div style="display:flex; gap:8px; margin:16px 0;">
          <input type="text" id="lm-wizard-promo" class="lm-input" placeholder="Promo code (e.g. LEAN10)" value="${App.escapeHtml(state.promoCode)}" />
          <button type="button" id="lm-apply-promo" class="lm-btn lm-btn-outline lm-btn-sm">Apply</button>
        </div>

        <button type="button" id="lm-place-plan-order" class="lm-btn lm-btn-primary" style="width:100%;">
          Confirm &amp; Place Meal Plan Order
        </button>
      `;
    }
  }

  function placeMealPlanOrder() {
    const totals = calculateWizardTotals();
    const schedule = App.computeDeliverySchedule(
      state.packageMeals,
      state.startMode === 'advance' ? state.advanceDate : null
    );
    const orderId = 'LM-' + Math.floor(100000 + Math.random() * 900000);
    const order = {
      id: orderId,
      type: 'Custom Meal Plan',
      createdAt: new Date().toISOString(),
      status: 'Confirmed — Scheduled for Prep',
      packageMeals: state.packageMeals,
      plates: state.plates,
      addons: state.addons,
      fulfillment: state.fulfillment,
      schedule: schedule.drops,
      customer: { ...state.customer },
      totals
    };
    App.saveOrder(order);

    const modal = document.getElementById('lm-order-confirm-modal');
    if (modal) {
      modal.innerHTML = `
        <div class="lm-backdrop" data-close-modal="lm-order-confirm-modal"></div>
        <div class="lm-modal-dialog" style="text-align:center;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--lm-lime); color:var(--lm-forest); display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 14px;">✓</div>
          <span class="lm-eyebrow">Order Confirmed</span>
          <h2 class="lm-serif" style="margin:10px 0 6px; font-size:2.1rem;">Thank You, ${App.escapeHtml(state.customer.fullName)}!</h2>
          <p style="color:var(--lm-muted); font-size:0.92rem; margin:0 0 18px;">
            Reference <strong>${orderId}</strong> · Total Paid: <strong>${App.formatCAD(totals.grandTotal)}</strong>
          </p>
          <div style="background:var(--lm-mist); padding:16px; border-radius:14px; text-align:left; font-size:0.86rem; margin-bottom:20px;">
            <div><strong>First Drop:</strong> ${App.escapeHtml(schedule.drops[0].formatted)} (${schedule.drops[0].meals} meals)</div>
            <div style="margin-top:6px;"><strong>Second Drop:</strong> ${App.escapeHtml(schedule.drops[1].formatted)} (${schedule.drops[1].meals} meals)</div>
          </div>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button type="button" onclick="window.print()" class="lm-btn lm-btn-outline lm-btn-sm">Print Receipt</button>
            <a href="account.html" class="lm-btn lm-btn-primary lm-btn-sm">View in My Account</a>
          </div>
        </div>
      `;
      modal.classList.add('open');
    }
  }

  /* ------------------------------------------------------------------------
     Event Delegation for Wizard
     ------------------------------------------------------------------------ */
  function bindWizardEvents() {
    document.addEventListener('click', (e) => {
      const t = e.target;

      const pill = t.closest('[data-step-pill]');
      if (pill) {
        const s = parseInt(pill.dataset.stepPill, 10);
        if (s <= state.step) goToStep(s);
        return;
      }

      const pkgCard = t.closest('[data-select-pkg]');
      if (pkgCard) {
        const meals = parseInt(pkgCard.dataset.selectPkg, 10);
        const pkg = getPackageObj(meals);
        state.packageMeals = pkg.meals;
        state.perMealPrice = pkg.perMeal;
        if (state.plates.length > meals) {
          state.plates = state.plates.slice(0, meals);
        }
        renderStep1();
        return;
      }

      const faqBtn = t.closest('[data-faq-toggle]');
      if (faqBtn) {
        faqBtn.closest('.lm-faq-item').classList.toggle('open');
        return;
      }

      const addProt = t.closest('[data-add-protein]');
      if (addProt) {
        const item = getEligibleProteins().find(p => p.id === addProt.dataset.addProtein);
        if (item) {
          if (item.subProteins && item.subProteins.length > 1) {
            openVariantModal(item);
          } else {
            addProteinPlateWithVariant(item);
          }
        }
        return;
      }

      const pickVar = t.closest('[data-pick-variant]');
      if (pickVar && state.pendingVariantItem) {
        addProteinPlateWithVariant(state.pendingVariantItem, pickVar.dataset.pickVariant);
        state.pendingVariantItem = null;
        document.getElementById('lm-variant-modal')?.classList.remove('open');
        return;
      }

      const remProt = t.closest('[data-remove-protein]');
      if (remProt) {
        const idx = state.plates.map(p => p.proteinId).lastIndexOf(remProt.dataset.removeProtein);
        if (idx !== -1) {
          state.plates.splice(idx, 1);
          renderStep2Proteins();
        }
        return;
      }

      const protFilter = t.closest('[data-protein-filter]');
      if (protFilter) {
        state.proteinFilter = protFilter.dataset.proteinFilter;
        document.querySelectorAll('[data-protein-filter]').forEach(el =>
          el.classList.toggle('active', el.dataset.proteinFilter === state.proteinFilter)
        );
        renderStep2Proteins();
        return;
      }

      const autoFillBtn = t.closest('#lm-autofill-proteins');
      if (autoFillBtn) {
        const pool = getEligibleProteins();
        let i = 0;
        while (state.plates.length < state.packageMeals) {
          addProteinPlateWithVariant(pool[i % pool.length]);
          i++;
        }
        App.showToast(`Auto-filled remaining plates up to ${state.packageMeals} meals!`);
        return;
      }

      const cascadeBtn = t.closest('[data-cascade]');
      if (cascadeBtn) {
        const srcIdx = parseInt(cascadeBtn.dataset.cascade, 10);
        const qty = parseInt(cascadeBtn.dataset.qty, 10);
        const src = state.plates[srcIdx];
        if (!src || !src.side1 || !src.side2) {
          App.showToast('Please select both sides on this meal first.');
          return;
        }
        for (let k = srcIdx + 1; k <= Math.min(state.plates.length - 1, srcIdx + qty); k++) {
          state.plates[k].side1 = src.side1;
          state.plates[k].side2 = src.side2;
        }
        App.showToast(`Applied sides from Meal #${srcIdx + 1} to next ${qty} meal(s).`);
        renderStep3Sides();
        return;
      }

      const addonToggle = t.closest('#lm-addon-toggle');
      if (addonToggle) {
        const body = document.getElementById('lm-addon-list');
        if (body) body.style.display = body.style.display === 'none' ? 'grid' : 'none';
        return;
      }

      const addInc = t.closest('[data-addon-inc]');
      if (addInc) {
        const id = addInc.dataset.addonInc;
        state.addons[id] = (state.addons[id] || 0) + 1;
        renderStep4ScheduleAndAddons();
        return;
      }

      const addDec = t.closest('[data-addon-dec]');
      if (addDec) {
        const id = addDec.dataset.addonDec;
        state.addons[id] = Math.max(0, (state.addons[id] || 0) - 1);
        renderStep4ScheduleAndAddons();
        return;
      }

      const applyPromo = t.closest('#lm-apply-promo');
      if (applyPromo) {
        const code = (document.getElementById('lm-wizard-promo')?.value || '').trim().toUpperCase();
        if (!code || !Data.promoCodes[code]) {
          App.showToast('Invalid promo code. Try LEAN10, FRESH15, or WELCOME5.');
          state.promoCode = '';
        } else {
          state.promoCode = code;
          App.showToast(`Applied promo: ${Data.promoCodes[code].label}`);
        }
        renderStep6Review();
        return;
      }

      const placeBtn = t.closest('#lm-place-plan-order');
      if (placeBtn) {
        placeMealPlanOrder();
        return;
      }

      const navNext = t.closest('[data-next-step]');
      if (navNext) {
        goToStep(parseInt(navNext.dataset.nextStep, 10));
        return;
      }

      const navPrev = t.closest('[data-prev-step]');
      if (navPrev) {
        goToStep(parseInt(navPrev.dataset.prevStep, 10));
        return;
      }
    });

    document.addEventListener('change', (e) => {
      const t = e.target;
      if (t.matches('[data-side-select]')) {
        const idx = parseInt(t.dataset.idx, 10);
        const key = t.dataset.sideSelect;
        state.plates[idx][key] = t.value;
        renderStep3Sides();
      }
      if (t.name === 'lm-fulfillment') {
        state.fulfillment = t.value;
        renderStep4ScheduleAndAddons();
      }
      if (t.id === 'lm-pickup-hub') {
        state.pickupHubId = t.value;
      }
      if (t.name === 'lm-start-mode') {
        state.startMode = t.value;
        renderStep4ScheduleAndAddons();
      }
      if (t.id === 'lm-advance-date') {
        state.advanceDate = t.value;
        renderStep4ScheduleAndAddons();
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.id === 'lm-protein-search') {
        state.proteinSearch = e.target.value;
        renderStep2Proteins();
      }
      if (e.target.id === 'lm-cust-address') {
        const list = document.getElementById('lm-addr-suggestions');
        if (!list) return;
        const val = e.target.value.trim().toLowerCase();
        if (val.length < 2) {
          list.style.display = 'none';
          return;
        }
        const matches = Data.gtaSuggestions.filter(a => a.toLowerCase().includes(val));
        if (matches.length === 0) {
          list.style.display = 'none';
          return;
        }
        list.innerHTML = matches.map(addr => `
          <button type="button" class="lm-chip" style="width:100%; text-align:left; border-radius:8px;" data-pick-addr="${App.escapeHtml(addr)}">
            📍 ${App.escapeHtml(addr)}
          </button>
        `).join('');
        list.style.display = 'grid';
      }
    });

    document.addEventListener('click', (e) => {
      const pick = e.target.closest('[data-pick-addr]');
      if (pick) {
        const inp = document.getElementById('lm-cust-address');
        if (inp) inp.value = pick.dataset.pickAddr;
        const list = document.getElementById('lm-addr-suggestions');
        if (list) list.style.display = 'none';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('lm-meal-wizard')) return;
    initFromQuery();
    renderStep1();
    bindWizardEvents();
    goToStep(1);
  });
})();
