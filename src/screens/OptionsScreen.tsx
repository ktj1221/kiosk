/**
 * 옵션 선택 화면 - 사이즈, 온도, 샷, 단맛 등 선택
 */

import { useState } from 'react';
import { MenuItem, OrderOption, Size } from '../types/index';
import './OptionsScreen.css';

interface OptionsScreenProps {
  menuItem: MenuItem;
  onAddToCart: (options: OrderOption, quantity: number) => void;
  onBack: () => void;
}

const OptionsScreen: React.FC<OptionsScreenProps> = ({
  menuItem,
  onAddToCart,
  onBack,
}) => {
  const [size, setSize] = useState<Size>('Medium');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [extraShots, setExtraShots] = useState(0);
  const [sweetness, setSweetness] = useState<'Normal' | 'Less' | 'Extra'>('Normal');
  const [quantity, setQuantity] = useState(1);

  // 온도 옵션 제약 (Iced를 선택할 수 없는 메뉴)
  const canSelectIced = menuItem.availableIced;

  const handleAddToCart = () => {
    const options: OrderOption = {
      size,
      temperature,
      extraShots,
      sweetness,
    };
    onAddToCart(options, quantity);
  };

  // 가격 계산
  const calculatePrice = () => {
    let price = menuItem.price;

    // 사이즈별 추가 요금
    if (size === 'Large') {
      price += 1000;
    } else if (size === 'Small') {
      price -= 500;
    }

    // 샷 추가 요금
    price += extraShots * 500;

    return price;
  };

  const itemPrice = calculatePrice();

  return (
    <div className="screen options-screen">
      <div className="screen-header">
        <h1>옵션 선택</h1>
        <p className="subtitle">{menuItem.name} - {menuItem.nameEn}</p>
      </div>

      <div className="screen-content options-content">
        {/* 메뉴 미리보기 */}
        <div className="item-preview card">
          <div className="preview-emoji">{menuItem.emoji}</div>
          <div className="preview-name">{menuItem.name}</div>
          <div className="preview-price-info">
            <span className="base-price">기본가격: {menuItem.price.toLocaleString()}원</span>
          </div>
        </div>

        {/* 옵션 선택 영역 */}
        <div className="options-container">
          {/* 사이즈 선택 */}
          <div className="option-group">
            <label className="option-label">사이즈 (Size)</label>
            <div className="option-buttons">
              {menuItem.availableSizes.map((s) => (
                <button
                  key={s}
                  className={`option-btn ${size === s ? 'active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s === 'Small' && '소 (S)'}
                  {s === 'Medium' && '중 (M)'}
                  {s === 'Large' && '대 (L)'}
                </button>
              ))}
            </div>
          </div>

          {/* 온도 선택 */}
          <div className="option-group">
            <label className="option-label">온도 (Temperature)</label>
            <div className="option-buttons">
              <button
                className={`option-btn ${temperature === 'Hot' ? 'active' : ''}`}
                onClick={() => setTemperature('Hot')}
              >
                따뜻한 (Hot) ☕
              </button>
              {canSelectIced && (
                <button
                  className={`option-btn ${temperature === 'Iced' ? 'active' : ''}`}
                  onClick={() => setTemperature('Iced')}
                >
                  차가운 (Iced) 🧊
                </button>
              )}
            </div>
          </div>

          {/* 샷 추가 */}
          <div className="option-group">
            <label className="option-label">샷 추가 (+500원/샷)</label>
            <div className="counter-buttons">
              <button
                className="counter-btn"
                onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
              >
                −
              </button>
              <span className="counter-value">{extraShots}샷</span>
              <button
                className="counter-btn"
                onClick={() => setExtraShots(Math.min(5, extraShots + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* 단맛 선택 */}
          <div className="option-group">
            <label className="option-label">단맛 (Sweetness)</label>
            <div className="option-buttons">
              <button
                className={`option-btn ${sweetness === 'Less' ? 'active' : ''}`}
                onClick={() => setSweetness('Less')}
              >
                덜 달게
              </button>
              <button
                className={`option-btn ${sweetness === 'Normal' ? 'active' : ''}`}
                onClick={() => setSweetness('Normal')}
              >
                보통
              </button>
              <button
                className={`option-btn ${sweetness === 'Extra' ? 'active' : ''}`}
                onClick={() => setSweetness('Extra')}
              >
                더 달게
              </button>
            </div>
          </div>

          {/* 수량 선택 */}
          <div className="option-group">
            <label className="option-label">수량 (Quantity)</label>
            <div className="counter-buttons">
              <button
                className="counter-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="counter-value">{quantity}개</span>
              <button
                className="counter-btn"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* 총 가격 */}
          <div className="price-summary">
            <div className="price-row">
              <span>상품가격:</span>
              <span>{itemPrice.toLocaleString()}원 × {quantity}</span>
            </div>
            <div className="price-row total">
              <span>합계:</span>
              <span>{(itemPrice * quantity).toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer">
        <button className="btn btn-outline" onClick={onBack}>
          뒤로가기
        </button>
        <button className="btn btn-success btn-large" onClick={handleAddToCart}>
          장바구니 추가
        </button>
      </div>
    </div>
  );
};

export default OptionsScreen;
