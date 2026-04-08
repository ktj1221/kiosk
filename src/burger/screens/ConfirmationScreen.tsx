/**
 * 주문 확인 화면 - 주문 완료 및 주문번호 표시
 */

import { CartItem } from '../types/index';
import './ConfirmationScreen.css';

interface ConfirmationScreenProps {
  orderNumber: string;
  orderItems: CartItem[];
  dineIn: boolean;
  onNewOrder: () => void;
}

const calcItemPrice = (item: CartItem) => {
  let price = item.menuItem.price;

  if (item.menuItem.category === 'burger' && 'isSet' in item.options && item.options.isSet) {
    price += 2000;
  }

  return price * item.quantity;
};

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  orderNumber,
  orderItems,
  dineIn,
  onNewOrder,
}) => {
  const subtotal = orderItems.reduce((sum, item) => sum + calcItemPrice(item), 0);
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
    <div className="screen confirmation-screen">
      <div className="screen-header confirmation-header">
        <h1>주문 완료</h1>
        <p className="subtitle">Order Complete</p>
      </div>

      <div className="screen-content confirmation-content">
        {/* 주문 성공 메시지 */}
        <div className="success-section">
          <div className="success-emoji">🎉</div>
          <h2>주문이 완료되었습니다!</h2>
          <p className="success-message">Your order has been placed successfully.</p>
        </div>

        {/* 주문번호 */}
        <div className="order-number-card">
          <h3>주문번호</h3>
          <div className="order-number-display">
            <span className="order-number">{orderNumber}</span>
          </div>
          <p className="order-number-note">주문이 준비될 때까지 계산대에서 주문번호를 확인해주세요.</p>
        </div>

        {/* 주문 정보 */}
        <div className="order-info">
          <div className="info-row">
            <span className="label">주문 방식</span>
            <span className={`badge ${dineIn ? 'dine-in' : 'to-go'}`}>
              {dineIn ? '매장식사' : '포장'}
            </span>
          </div>

          <div className="divider"></div>

          {/* 주문 아이템 */}
          <div className="order-items-section">
            <h4>주문 내역</h4>
            <div className="order-items-list">
              {orderItems.map((item) => (
                <div key={item.id} className="order-item-row">
                  <span className="item-emoji">{item.menuItem.emoji}</span>
                  <div className="item-details">
                    <div className="item-name">{item.menuItem.name}</div>
                    <div className="item-option">{getOptionDescription(item)}</div>
                  </div>
                  <span className="item-quantity">×{item.quantity}</span>
                  <span className="item-price">{calcItemPrice(item).toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          {/* 가격 정보 */}
          <div className="price-info">
            <div className="price-row">
              <span>소계</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>
            <div className="price-row">
              <span>세금</span>
              <span>{tax.toLocaleString()}원</span>
            </div>
            <div className="price-row total">
              <span>총액</span>
              <span className="total-amount">{total.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="notice-section">
          <h4>안내사항</h4>
          <ul className="notice-list">
            <li>주문이 준비되면 주문번호를 호출합니다.</li>
            <li>최근 주문 현황은 계산대에서 확인할 수 있습니다.</li>
            {dineIn && <li>매장 내 어디서나 편하게 기다리실 수 있습니다.</li>}
            {!dineIn && <li>준비 완료 시 카운터에서 받아가시기 바랍니다.</li>}
          </ul>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer confirmation-footer">
        <button
          className="btn btn-primary btn-large new-order-btn"
          onClick={onNewOrder}
        >
          새로운 주문 시작
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
