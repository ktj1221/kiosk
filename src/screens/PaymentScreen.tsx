/**
 * 결제 화면 - 결제 방식 선택 및 결제 처리 시뮬레이션
 */

import { useState } from 'react';
import { CartItem } from '../types/index';
import './PaymentScreen.css';

interface PaymentScreenProps {
  cartItems: CartItem[];
  onPaymentComplete: (orderNumber: string) => void;
  onCancel: () => void;
}

type PaymentMethod = 'card' | 'mobile' | 'cash';

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  cartItems,
  onPaymentComplete,
  onCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

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

  /**
   * 결제 처리 시뮬레이션
   */
  const handlePayment = async (method: PaymentMethod) => {
    setPaymentMethod(method);
    setIsProcessing(true);

    // 결제 방식별 메시지
    const messages = {
      card: '카드를 읽는 중입니다...',
      mobile: '모바일 결제를 처리 중입니다...',
      cash: '현금 결제를 확인 중입니다...',
    };

    setProcessingMessage(messages[method]);

    // 2초 후 결제 완료 (시뮬레이션)
    setTimeout(() => {
      // 주문 번호 생성 (YYYYMMDD + 랜덤 숫자)
      const today = new Date();
      const dateStr = today
        .toLocaleDateString('ko-KR')
        .replace(/\./g, '')
        .replace(/\s/g, '');
      const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      const orderNumber = `${dateStr}${randomNum}`;

      onPaymentComplete(orderNumber);
    }, 2000);
  };

  return (
    <div className="screen payment-screen">
      <div className="screen-header">
        <h1>결제</h1>
        <p className="subtitle">Payment</p>
      </div>

      <div className="screen-content">
        {!isProcessing ? (
          <>
            {/* 결제 금액 요약 */}
            <div className="payment-summary card">
              <div className="summary-title">결제 금액</div>
              <div className="summary-total">{totalPrice.toLocaleString()}원</div>
              <div className="summary-items-count">상품 {cartItems.length}개</div>
            </div>

            {/* 결제 방식 선택 */}
            <div className="payment-methods">
              <button
                className={`payment-method-btn card ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => handlePayment('card')}
              >
                <div className="method-icon">💳</div>
                <div className="method-name">신용카드</div>
                <div className="method-desc">Credit Card</div>
              </button>

              <button
                className={`payment-method-btn card ${paymentMethod === 'mobile' ? 'selected' : ''}`}
                onClick={() => handlePayment('mobile')}
              >
                <div className="method-icon">📱</div>
                <div className="method-name">모바일 결제</div>
                <div className="method-desc">Mobile Payment</div>
              </button>

              <button
                className={`payment-method-btn card ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => handlePayment('cash')}
              >
                <div className="method-icon">💰</div>
                <div className="method-name">현금</div>
                <div className="method-desc">Cash Payment</div>
              </button>
            </div>

            {/* 결제 주의사항 */}
            <div className="payment-notice card">
              <div className="notice-icon">ℹ️</div>
              <div className="notice-text">
                <p>
                  <strong>주의:</strong> 이 키오스크는 시뮬레이션입니다.
                </p>
                <p>실제 결제가 처리되지 않습니다.</p>
              </div>
            </div>
          </>
        ) : (
          /* 결제 처리 중 화면 */
          <div className="payment-processing">
            <div className="spinner"></div>
            <div className="processing-message">{processingMessage}</div>
            <div className="processing-amount">{totalPrice.toLocaleString()}원</div>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      {!isProcessing && (
        <div className="screen-footer">
          <button className="btn btn-outline" onClick={onCancel}>
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
