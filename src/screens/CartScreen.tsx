/**
 * 장바구니 화면
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

const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
  onBackToMenu,
  onCheckout,
  dineIn,
}) => {
  // 총 가격 계산
  const calculateItemPrice = (item: CartItem) => {
    let price = item.menuItem.price;

    if (item.options.size === 'Large') {
      price += 1000;
    } else if (item.options.size === 'Small') {
      price -= 500;
    }

    price += item.options.extraShots * 500;

    return price * item.quantity;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + calculateItemPrice(item),
    0
  );

  return (
    <div className="screen cart-screen">
      <div className="screen-header">
        <h1>장바구니</h1>
        <p className="subtitle">
          {dineIn ? '매장 식사' : '포장'} · {cartItems.reduce((sum, item) => sum + item.quantity, 0)}개
        </p>
      </div>

      <div className="screen-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>장바구니가 비어있습니다</h2>
            <p className="text-secondary">메뉴를 선택해주세요</p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item card">
                  <div className="cart-item-header">
                    <div className="item-info">
                      <div className="item-emoji">{item.menuItem.emoji}</div>
                      <div className="item-details">
                        <div className="item-name">{item.menuItem.name}</div>
                        <div className="item-options">
                          {item.options.size} · {item.options.temperature}
                          {item.options.extraShots > 0 && ` · +${item.options.extraShots}샷`}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => onRemove(item.id)}
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="cart-item-footer">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-price">
                      {calculateItemPrice(item).toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 결제 정보 */}
            <div className="payment-info card">
              <div className="info-row">
                <span>소계:</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="info-row">
                <span>할인:</span>
                <span>0원</span>
              </div>
              <div className="info-row total">
                <span>합계:</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="order-type">
                {dineIn ? '🍴 매장 식사' : '📦 포장'}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer">
        <button className="btn btn-outline" onClick={onBackToMenu}>
          메뉴로 돌아가기
        </button>
        <button
          className="btn btn-success btn-large"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
        >
          {totalPrice.toLocaleString()}원 결제
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
