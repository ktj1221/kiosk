/**
 * 장바구니 화면 - 주문 검토 및 결제 진행
 */

import { CartItem } from '../types/index';
import './CartScreen.css';

interface CartScreenProps {
  cartItems: CartItem[];
  onRemove: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onBackToMenu: () => void;
  onCheckout: () => void;
  dineIn: boolean;
}

const calcItemPrice = (item: CartItem) => {
  let price = item.menuItem.price;

  if (item.menuItem.category === 'burger' && 'isSet' in item.options && item.options.isSet) {
    price += 2000;
  }

  return price * item.quantity;
};

const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
  onBackToMenu,
  onCheckout,
  dineIn,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + calcItemPrice(item), 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  const getOptionDescription = (item: CartItem): string => {
    if (item.menuItem.category === 'burger') {
      const opts = item.options as any;
      const parts = [];
      parts.push(opts.isSet ? '세트' : '단품');
      parts.push(opts.doneness === 'WellDone' ? 'Well Done' : 'Medium');
      parts.push(opts.sauce);
      if (opts.sideItem) parts.push(opts.sideItem.name);
      if (opts.beverageItem) parts.push(opts.beverageItem.name);
      return parts.join(' · ');
    } else if (item.menuItem.category === 'side') {
      const opts = item.options as any;
      return opts.size;
    } else {
      const opts = item.options as any;
      return `${opts.size} · ${opts.temperature}`;
    }
  };

  return (
    <div className="screen cart-screen">
      <div className="screen-header">
        <h1>장바구니</h1>
        <p className="subtitle">Order Summary</p>
      </div>

      <div className="screen-content cart-content">
        {cartItems.length > 0 ? (
          <>
            {/* 주문 유형 표시 */}
            <div className="order-type-info">
              <span className={`order-type-badge ${dineIn ? 'dine-in' : 'to-go'}`}>
                {dineIn ? '매장식사 (For Here)' : '포장 (To Go)'}
              </span>
            </div>

            {/* 장바구니 아이템 */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item card">
                  <div className="cart-item-image-wrap">
                    <div className="cart-item-emoji">{item.menuItem.emoji}</div>
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.menuItem.name}</div>
                    <div className="cart-item-option">{getOptionDescription(item)}</div>
                    <div className="cart-item-price">
                      {calcItemPrice(item).toLocaleString()}원
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button
                    className="del-btn"
                    onClick={() => onRemove(item.id)}
                  >✕</button>
                </div>
              ))}
            </div>

            {/* 가격 요약 */}
            <div className="price-summary">
              <div className="price-row">
                <span>소계</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="price-row">
                <span>세금 (10%)</span>
                <span>{tax.toLocaleString()}원</span>
              </div>
              <div className="price-row total">
                <span>총액</span>
                <span className="total-price">{total.toLocaleString()}원</span>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-emoji">🛒</div>
            <h2>장바구니가 비어있습니다</h2>
            <p>메뉴에서 상품을 선택해주세요</p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer cart-footer">
        <button
          className="btn btn-outline btn-large"
          onClick={onBackToMenu}
        >
          메뉴로 돌아가기
        </button>
        <button
          className="btn btn-primary btn-large"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
        >
          결제하기 ({cartItems.length}개)
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
