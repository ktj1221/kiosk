/**
 * 주문 완료 화면
 */

import { useEffect, useState } from 'react';
import { CartItem } from '../types/index';
import './ConfirmationScreen.css';

interface ConfirmationScreenProps {
  orderNumber: string;
  orderItems: CartItem[];
  dineIn: boolean;
  onNewOrder: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  orderNumber,
  orderItems,
  dineIn,
  onNewOrder,
}) => {
  const [countdown, setCountdown] = useState(30); // 30초 후 자동으로 홈으로 이동

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        onNewOrder();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onNewOrder]);

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

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + calculateItemPrice(item),
    0
  );

  return (
    <div className="screen confirmation-screen">
      <div className="screen-header success-header">
        <div className="success-icon">✓</div>
        <h1>주문 완료</h1>
        <p className="subtitle">Order Confirmed</p>
      </div>

      <div className="screen-content confirmation-content">
        {/* 주문 번호 */}
        <div className="order-number-card card">
          <div className="order-label">주문 번호</div>
          <div className="order-number">{orderNumber}</div>
          <div className="order-hint">위 번호를 기억해주세요</div>
        </div>

        {/* 주문 정보 */}
        <div className="order-info card">
          <div className="info-section">
            <div className="info-label">주문 유형</div>
            <div className="info-value">
              {dineIn ? '🍴 매장 식사' : '📦 포장'}
            </div>
          </div>

          <div className="divider"></div>

          <div className="info-section">
            <div className="info-label">예상 대기시간</div>
            <div className="info-value">약 5-10분</div>
          </div>
        </div>

        {/* 주문 항목 */}
        <div className="order-items card">
          <div className="items-title">주문 항목</div>
          {orderItems.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-left">
                <span className="item-emoji">{item.menuItem.emoji}</span>
                <div className="item-text">
                  <div className="item-name">{item.menuItem.name}</div>
                  <div className="item-detail">
                    {item.options.size} · {item.options.temperature}
                  </div>
                </div>
              </div>
              <div className="item-right">
                <span className="item-qty">×{item.quantity}</span>
                <span className="item-price">
                  {calculateItemPrice(item).toLocaleString()}원
                </span>
              </div>
            </div>
          ))}

          <div className="divider"></div>

          <div className="total-row">
            <span>총 결제 금액</span>
            <span className="total-price">{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

        {/* 감사 메시지 */}
        <div className="thank-you-message">
          <p>주문해주셔서 감사합니다!</p>
          <p className="text-secondary">Thank you for your order!</p>
        </div>

        {/* 자동 이동 카운트다운 */}
        <div className="countdown-notice">
          <p>{countdown}초 후 처음 화면으로 이동합니다</p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer">
        <button className="btn btn-outline" onClick={onNewOrder}>
          새로운 주문
        </button>
        <button className="btn btn-primary btn-large" onClick={onNewOrder}>
          처음으로
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
