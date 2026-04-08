const OFFICIAL_IMG = {
  coffeeChocoGelato: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311185605_1773222965829_ly8Ah2ln9g.png',
  appleShineMuscat: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311190031_1773223231649_LjyoSCUPzU.png',
  mangoJasmine: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311190213_1773223333632_eMkDTsgcY0.png',
  mgcJuice: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311190334_1773223414602_XUZ6HiSMN1.png',
  pistachioFrappe: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260211221323_1770815603192_K0mfCjNXBb.png',
  strawberryLatte: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250116001724_1736954244791_8qDsY0gj14.jpg',
  milkShake: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20251210220621_1765371981583_lnOltIAEKR.png',
  citronGingerTea: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20251210164813_1765352893267_luRv0zqMtP.png',
  chocoGelatoMatcha: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20251210155814_1765349894426_ps9ZwP5Mrb.png',
  orientalRaisinAmericano: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250320000737_1742396857350_ngpQ0A3g9Q.jpg',
  zeroBoostAde: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250320001602_1742397362008_Cf89V3wTT7.jpg',
  blueberryYogurtSmoothie: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250320001659_1742397419024_1vA1lkVesY.jpg',
  blueberryPlumJuice: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250320001735_1742397455107_OhhaM6M3JU.jpg',
  goldKiwiJuice: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20250320001826_1742397506064_08F7Mrhyf3.jpg',
  seasonedCupChicken: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311191804_1773224284801_hUK9UcEHe5.png',
  eggMuffinBrunchBread: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20260311191654_1773224214057_ANurCwqlZI.png'
};

const menuData = [
  { id: 1, name: '아메리카노', category: 'recommend', price: 2500, emoji: '☕', image: OFFICIAL_IMG.coffeeChocoGelato, canSize: true },
  { id: 2, name: '카페라떼', category: 'recommend', price: 3400, emoji: '🥛', image: OFFICIAL_IMG.appleShineMuscat, canSize: true },
  { id: 3, name: '카푸치노', category: 'recommend', price: 3700, emoji: '☕', image: OFFICIAL_IMG.mangoJasmine, canSize: true },
  { id: 4, name: '바닐라라떼', category: 'recommend', price: 3900, emoji: '🍦', image: OFFICIAL_IMG.mgcJuice, canSize: true },
  { id: 5, name: '콜드브루', category: 'recommend', price: 3700, emoji: '🧊', image: OFFICIAL_IMG.pistachioFrappe, canSize: true },
  { id: 6, name: '유자차', category: 'recommend', price: 3200, emoji: '🍊', image: OFFICIAL_IMG.strawberryLatte, canSize: false },

  { id: 11, name: '아메리카노(HOT)', category: 'coffee_hot', price: 2500, emoji: '☕', image: OFFICIAL_IMG.coffeeChocoGelato, canSize: true },
  { id: 12, name: '카페라떼(HOT)', category: 'coffee_hot', price: 3400, emoji: '☕', image: OFFICIAL_IMG.appleShineMuscat, canSize: true },
  { id: 13, name: '카푸치노(HOT)', category: 'coffee_hot', price: 3700, emoji: '☕', image: OFFICIAL_IMG.mangoJasmine, canSize: true },
  { id: 14, name: '바닐라라떼(HOT)', category: 'coffee_hot', price: 3900, emoji: '☕', image: OFFICIAL_IMG.mgcJuice, canSize: true },
  { id: 15, name: '에스프레소', category: 'coffee_hot', price: 2800, emoji: '☕', image: OFFICIAL_IMG.milkShake, canSize: false },

  { id: 21, name: '아메리카노(ICE)', category: 'coffee_ice', price: 2500, emoji: '🧊', image: OFFICIAL_IMG.coffeeChocoGelato, canSize: true },
  { id: 22, name: '카페라떼(ICE)', category: 'coffee_ice', price: 3400, emoji: '🧊', image: OFFICIAL_IMG.appleShineMuscat, canSize: true },
  { id: 23, name: '카푸치노(ICE)', category: 'coffee_ice', price: 3700, emoji: '🧊', image: OFFICIAL_IMG.mangoJasmine, canSize: true },
  { id: 24, name: '바닐라라떼(ICE)', category: 'coffee_ice', price: 3900, emoji: '🧊', image: OFFICIAL_IMG.mgcJuice, canSize: true },
  { id: 25, name: '콜드브루(ICE)', category: 'coffee_ice', price: 3700, emoji: '🧊', image: OFFICIAL_IMG.pistachioFrappe, canSize: true },

  { id: 31, name: '디카페인 아메리카노', category: 'decaf', price: 3000, emoji: '🌙', image: OFFICIAL_IMG.coffeeChocoGelato, canSize: true },
  { id: 32, name: '디카페인 카페라떼', category: 'decaf', price: 3900, emoji: '🌙', image: OFFICIAL_IMG.appleShineMuscat, canSize: true },
  { id: 33, name: '디카페인 바닐라라떼', category: 'decaf', price: 4300, emoji: '🌙', image: OFFICIAL_IMG.mgcJuice, canSize: true },

  { id: 41, name: '그린티 라떼', category: 'smoothie', price: 4200, emoji: '🍵', image: OFFICIAL_IMG.blueberryYogurtSmoothie, canSize: true },
  { id: 42, name: '아이스티', category: 'smoothie', price: 3000, emoji: '🧋', image: OFFICIAL_IMG.blueberryPlumJuice, canSize: true },

  { id: 51, name: '유자 에이드', category: 'ade', price: 3800, emoji: '🍋', image: OFFICIAL_IMG.strawberryLatte, canSize: true },
  { id: 52, name: '블랙티 에이드', category: 'ade', price: 3800, emoji: '🫖', image: OFFICIAL_IMG.goldKiwiJuice, canSize: true },

  { id: 61, name: '유자차', category: 'tea', price: 3200, emoji: '🍊', image: OFFICIAL_IMG.strawberryLatte, canSize: false },
  { id: 62, name: '블랙티', category: 'tea', price: 3000, emoji: '🫖', image: OFFICIAL_IMG.goldKiwiJuice, canSize: false },
  { id: 63, name: '그린티', category: 'tea', price: 3200, emoji: '🍵', image: OFFICIAL_IMG.blueberryYogurtSmoothie, canSize: false },

  { id: 81, name: '양념 컵치킨', category: 'dessert', price: 3900, emoji: '🍗', image: OFFICIAL_IMG.seasonedCupChicken, canSize: false },
  { id: 82, name: '에그 브런치빵', category: 'dessert', price: 3600, emoji: '🧁', image: OFFICIAL_IMG.eggMuffinBrunchBread, canSize: false },
  { id: 83, name: '컵치킨+브런치빵 세트', category: 'dessert', price: 6900, emoji: '🍱', image: OFFICIAL_IMG.seasonedCupChicken, canSize: false },
  { id: 84, name: '브런치빵', category: 'dessert', price: 3500, emoji: '🥯', image: OFFICIAL_IMG.eggMuffinBrunchBread, canSize: false },

  { id: 71, name: '오늘의 할인 아메리카노', category: 'discount', price: 2000, emoji: '🔥', image: OFFICIAL_IMG.coffeeChocoGelato, canSize: true },
  { id: 72, name: '오늘의 할인 카페라떼', category: 'discount', price: 2900, emoji: '🔥', image: OFFICIAL_IMG.appleShineMuscat, canSize: true }
];

let cart = [];
let orderType = null;
let selectedPayment = null;
let currentCat = 'recommend';
let orderNumber = 0;

let modalItem = null;
let modalQty = 1;
let modalSize = 'M';

let remainSeconds = 120;
let remainTimer = null;

function formatPrice(value) {
  return `${value.toLocaleString()}원`;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'screen-menu') {
    startRemainTimer();
  } else {
    stopRemainTimer();
  }

  window.scrollTo(0, 0);
}

function goToOrderType() {
  showScreen('screen-order-type');
}

function selectOrderType(type) {
  orderType = type;
  renderMenu();
  showScreen('screen-menu');
}

function filterCategory(btn, cat) {
  currentCat = cat;
  document.querySelectorAll('.tab-btn').forEach((tab) => tab.classList.remove('active'));
  btn.classList.add('active');
  renderMenu();
}

function renderMenu() {
  const items = menuData.filter((item) => item.category === currentCat);
  const grid = document.getElementById('menu-grid');

  grid.innerHTML = items.map((item) => `
    <button class="menu-card" onclick="openModal(${item.id})">
      <div class="card-img-wrap">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        <span class="card-emoji">${item.emoji}</span>
      </div>
      <div class="card-body">
        <p class="card-name">${item.name}</p>
        <p class="card-price">${formatPrice(item.price)}</p>
      </div>
    </button>
  `).join('');
}

function openModal(id) {
  const item = menuData.find((menu) => menu.id === id);
  if (!item) return;

  modalItem = item;
  modalQty = 1;
  modalSize = 'M';

  document.getElementById('modal-item-name').textContent = item.name;
  document.getElementById('modal-item-base-price').textContent = formatPrice(item.price);
  document.getElementById('modal-qty').textContent = '1';

  const img = document.getElementById('modal-img');
  const fallback = document.getElementById('modal-fallback');
  fallback.textContent = item.emoji;

  img.src = item.image || '';
  img.alt = item.name;
  img.style.display = item.image ? '' : 'none';

  const sizeGroup = document.getElementById('opt-group-size');
  if (item.canSize) {
    sizeGroup.style.display = '';
    document.querySelectorAll('[data-group="size"]').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.val === 'M');
    });
  } else {
    sizeGroup.style.display = 'none';
    modalSize = null;
  }

  updateModalTotal();
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  modalItem = null;
}

function selectOpt(btn) {
  const group = btn.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach((chip) => chip.classList.remove('active'));
  btn.classList.add('active');

  if (group === 'size') {
    modalSize = btn.dataset.val;
    updateModalTotal();
  }
}

function changeModalQty(delta) {
  modalQty = Math.max(1, Math.min(10, modalQty + delta));
  document.getElementById('modal-qty').textContent = String(modalQty);
  updateModalTotal();
}

function updateModalTotal() {
  if (!modalItem) return;
  const extra = modalSize === 'L' ? 500 : 0;
  const total = (modalItem.price + extra) * modalQty;
  document.getElementById('modal-total-price').textContent = formatPrice(total);
}

function confirmAddToCart() {
  if (!modalItem) return;

  const extra = modalSize === 'L' ? 500 : 0;
  const unitPrice = modalItem.price + extra;
  const optionLabel = modalItem.canSize ? (modalSize === 'L' ? 'L' : 'M') : '';
  const cartKey = `${modalItem.id}_${optionLabel || 'single'}`;

  const existing = cart.find((item) => item.cartKey === cartKey);
  if (existing) {
    existing.qty += modalQty;
  } else {
    cart.push({
      cartKey,
      id: modalItem.id,
      name: modalItem.name,
      emoji: modalItem.emoji,
      image: modalItem.image,
      price: unitPrice,
      optLabel: optionLabel,
      qty: modalQty
    });
  }

  updateBottomBar();
  renderOrderPreview();
  closeModal();
  showToast(`${modalItem.name} 담았습니다`);
}

function updateBottomBar() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('bottom-count-num').textContent = String(totalQty);
  document.getElementById('bottom-total-price').textContent = formatPrice(totalPrice);

  const payBtn = document.getElementById('bottom-pay-btn');
  payBtn.disabled = totalQty === 0;
}

function renderOrderPreview() {
  const list = document.getElementById('order-preview-list');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '<p class="preview-empty">선택된 메뉴가 없습니다.</p>';
    return;
  }

  list.innerHTML = cart.map((item) => `
    <div class="preview-item">
      <span class="preview-name">${item.name}${item.optLabel ? ` (${item.optLabel})` : ''}</span>
      <span class="preview-qty">${item.qty}개</span>
      <span class="preview-price">${formatPrice(item.price * item.qty)}</span>
    </div>
  `).join('');
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  updateBottomBar();
  renderOrderPreview();
  showToast('장바구니를 비웠습니다');
}

function showCart() {
  if (cart.length === 0) {
    showToast('장바구니가 비어 있습니다');
    return;
  }
  showScreen('screen-cart');
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'flex';
    footer.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  footer.style.display = 'block';

  container.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="ci-thumb">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        <span>${item.emoji}</span>
      </div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        ${item.optLabel ? `<div class="ci-opts">옵션: ${item.optLabel}</div>` : ''}
        <div class="ci-unit">${formatPrice(item.price)}</div>
      </div>
      <div class="ci-controls">
        <button class="ci-qty-btn" onclick="changeQty('${item.cartKey}',-1)">-</button>
        <span class="ci-qty-num">${item.qty}</span>
        <button class="ci-qty-btn" onclick="changeQty('${item.cartKey}',1)">+</button>
      </div>
      <div class="ci-right">
        <div class="ci-price">${formatPrice(item.price * item.qty)}</div>
        <button class="ci-del-btn" onclick="removeItem('${item.cartKey}')">삭제</button>
      </div>
    </div>
  `).join('');

  document.getElementById('total-price').textContent = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  );
}

function changeQty(cartKey, delta) {
  const item = cart.find((entry) => entry.cartKey === cartKey);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(cartKey);
    return;
  }

  updateBottomBar();
  renderOrderPreview();
  renderCart();
}

function removeItem(cartKey) {
  cart = cart.filter((item) => item.cartKey !== cartKey);
  updateBottomBar();
  renderOrderPreview();
  renderCart();
}

function goToPayment() {
  if (!cart.length) {
    showToast('장바구니가 비어 있습니다');
    return;
  }

  selectedPayment = null;
  document.querySelectorAll('.pay-card').forEach((card) => card.classList.remove('active'));
  document.getElementById('btn-pay-confirm').disabled = true;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const typeLabel = orderType === 'dine-in' ? '매장 이용' : '포장';

  document.getElementById('payment-summary').innerHTML = `
    <div class="pay-sum-row"><span>이용 방법</span><span>${typeLabel}</span></div>
    <div class="pay-sum-row"><span>주문 수량</span><span>${itemCount}개</span></div>
    <div class="pay-sum-row"><span>결제 금액</span><span>${formatPrice(total)}</span></div>
  `;

  showScreen('screen-payment');
}

function selectPayment(btn, method) {
  document.querySelectorAll('.pay-card').forEach((card) => card.classList.remove('active'));
  btn.classList.add('active');
  selectedPayment = method;
  document.getElementById('btn-pay-confirm').disabled = false;
}

function placeOrder() {
  if (!selectedPayment) {
    showToast('결제 방법을 선택해 주세요');
    return;
  }

  orderNumber += 1;
  document.getElementById('order-number').textContent = String(orderNumber).padStart(3, '0');

  const payLabel = {
    card: '카드 결제',
    cash: '현금 결제',
    kakao: '카카오페이',
    samsung: '삼성페이'
  };

  const typeLabel = orderType === 'dine-in' ? '매장 이용' : '포장';
  document.getElementById('complete-tags').innerHTML = `
    <span class="ctag">${typeLabel}</span>
    <span class="ctag">${payLabel[selectedPayment]}</span>
  `;

  cart = [];
  selectedPayment = null;
  updateBottomBar();
  renderOrderPreview();
  showScreen('screen-complete');
}

function startOver() {
  cart = [];
  orderType = null;
  selectedPayment = null;
  currentCat = 'recommend';

  document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.cat === 'recommend');
  });

  updateBottomBar();
  renderOrderPreview();
  renderMenu();
  showScreen('screen-welcome');
}

let toastTimer = null;
function showToast(message) {
  document.querySelector('.toast')?.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);

  toastTimer = setTimeout(() => {
    el.remove();
    toastTimer = null;
  }, 1800);
}

function startRemainTimer() {
  stopRemainTimer();
  remainSeconds = 120;
  updateRemainUI();

  remainTimer = setInterval(() => {
    remainSeconds = Math.max(0, remainSeconds - 1);
    updateRemainUI();

    if (remainSeconds === 0) {
      showToast('시간이 만료되어 처음 화면으로 이동합니다');
      startOver();
      stopRemainTimer();
    }
  }, 1000);
}

function stopRemainTimer() {
  if (!remainTimer) return;
  clearInterval(remainTimer);
  remainTimer = null;
}

function updateRemainUI() {
  const target = document.getElementById('remain-seconds');
  if (target) target.textContent = String(remainSeconds);
}

renderMenu();
updateBottomBar();
renderOrderPreview();

