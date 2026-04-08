/**
 * 결제 화면 - 결제 방식 선택 및 시뮬레이션
 */

import { useState } from 'react';
import { CartItem } from '../types/index';
import './PaymentScreen.css';

interface PaymentScreenProps {
  cartItems: CartItem[];
  onPaymentComplete: (orderNumber: string) => void;
  onCancel: () => void;
}

const calcItemPrice = (item: CartItem) => {
  let price = item.menuItem.price;

  if (item.menuItem.category === 'burger' && 'isSet' in item.options && item.options.isSet) {
    price += 2000;
  }

  return price * item.quantity;
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  cartItems,
  onPaymentComplete,
  onCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + calcItemPrice(item), 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  // 주문번호 생성 (3자리 랜덤 숫자 100~999)
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 900 + 100).toString();
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    // 결제 시뮬레이션 (2초 대기)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 무작위로 성공/실패 결정 (90% 성공률)
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        const orderNumber = generateOrderNumber();
        setPaymentStatus('success');
        // 1초 후 완료 화면으로 이동
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onPaymentComplete(orderNumber);
      } else {
        setPaymentStatus('error');
        setErrorMessage('결제 처리에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('결제 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="screen payment-screen">
      <div className="screen-header">
        <h1>결제하기</h1>
        <p className="subtitle">Payment</p>
      </div>

      <div className="screen-content payment-content">
        {/* 주문 요약 */}
        <div className="payment-summary">
          <h3>주문 요약</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.menuItem.name} × {item.quantity}</span>
                <span>{calcItemPrice(item).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <div className="total-row">
              <span>소계</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>
            <div className="total-row">
              <span>세금</span>
              <span>{tax.toLocaleString()}원</span>
            </div>
            <div className="total-row grand">
              <span>총액</span>
              <span>{total.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 결제 방식 선택 */}
        {paymentStatus === 'idle' && (
          <>
            <div className="payment-methods">
              <h3>결제 방식 선택</h3>
              <div className="methods-grid">
                <button
                  className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                  disabled={isProcessing}
                >
                  <div className="method-icon">💳</div>
                  <div className="method-name">신용/체크카드</div>
                </button>

                <button
                  className={`payment-method-btn ${paymentMethod === 'mobile' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('mobile')}
                  disabled={isProcessing}
                >
                  <div className="method-icon">📱</div>
                  <div className="method-name">모바일 결제</div>
                </button>

                <button
                  className={`payment-method-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                  disabled={isProcessing}
                >
                  <div className="method-icon">💰</div>
                  <div className="method-name">현금</div>
                </button>
              </div>
            </div>

            {/* 결제 유의사항 */}
            <div className="payment-notice">
              <p>
                {paymentMethod === 'card' && '카드를 결제기에 인식시켜주세요.'}
                {paymentMethod === 'mobile' && '모바일 결제앱으로 결제를 진행합니다.'}
                {paymentMethod === 'cash' && '현금으로 결제를 진행합니다.'}
              </p>
            </div>
          </>
        )}

        {/* 처리 중 */}
        {paymentStatus === 'processing' && (
          <div className="payment-processing">
            <div className="spinner"></div>
            <h3>결제 처리 중...</h3>
            <p>{paymentMethod === 'card' && '카드 인식 중'}
               {paymentMethod === 'mobile' && '모바일 결제 승인 대기 중'}
               {paymentMethod === 'cash' && '결제 처리 중'}</p>
          </div>
        )}

        {/* 성공 */}
        {paymentStatus === 'success' && (
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h3>결제 완료!</h3>
            <p>주문이 접수되었습니다.</p>
          </div>
        )}

        {/* 실패 */}
        {paymentStatus === 'error' && (
          <div className="payment-error">
            <div className="error-icon">✕</div>
            <h3>결제 실패</h3>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer payment-footer">
        {paymentStatus === 'idle' && (
          <>
            <button
              className="btn btn-outline btn-large"
              onClick={onCancel}
              disabled={isProcessing}
            >
              취소
            </button>
            <button
              className="btn btn-primary btn-large"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {total.toLocaleString()}원 결제
            </button>
          </>
        )}

        {paymentStatus === 'error' && (
          <>
            <button
              className="btn btn-outline btn-large"
              onClick={onCancel}
            >
              주문취소
            </button>
            <button
              className="btn btn-primary btn-large"
              onClick={handleRetry}
            >
              다시 시도
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
