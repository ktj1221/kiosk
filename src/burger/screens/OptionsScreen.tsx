/**
 * 옵션 선택 화면
 * 버거, 사이드, 음료별로 다른 옵션을 제공합니다.
 */

import { useState } from 'react';
import { MenuItem, BurgerOption, SideOption, BeverageOption } from '../types/index';
import { menuItems } from '../data/menu';
import './OptionsScreen.css';

interface OptionsScreenProps {
  menuItem: MenuItem;
  onAddToCart: (options: BurgerOption | SideOption | BeverageOption, quantity: number) => void;
  onBack: () => void;
}

const OptionsScreen: React.FC<OptionsScreenProps> = ({ menuItem, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  // 버거 옵션
  const [isSet, setIsSet] = useState(false);
  const [doneness, setDoneness] = useState<'WellDone' | 'Medium'>('Medium');
  const [sauce, setSauce] = useState<'Basic' | 'Spicy' | 'BBQ'>('Basic');
  const [selectedSide, setSelectedSide] = useState<MenuItem | null>(null);
  const [sideSize, setSideSize] = useState<'S' | 'M' | 'L'>('M');
  const [selectedBeverage, setSelectedBeverage] = useState<MenuItem | null>(null);
  const [beverageSize, setBeverageSize] = useState<'S' | 'M' | 'L'>('M');
  const [beverageTemperature, setBeverageTemperature] = useState<'Hot' | 'Iced'>('Iced');

  // 사이드 단품 옵션
  const [sideItemSize, setSideItemSize] = useState<'S' | 'M' | 'L'>('M');

  // 음료 단품 옵션
  const [beverageItemSize, setBeverageItemSize] = useState<'S' | 'M' | 'L'>('M');
  const [beverageItemTemperature, setBeverageItemTemperature] = useState<'Hot' | 'Iced'>('Iced');

  const sides = menuItems.filter(item => item.category === 'side');
  const beverages = menuItems.filter(item => item.category === 'beverage');

  const sizeOffset = (size: 'S' | 'M' | 'L') =>
    size === 'S' ? -500 : size === 'L' ? 500 : 0;

  const sizeLabel = (size: 'S' | 'M' | 'L') =>
    size === 'S' ? 'S (-500원)' : size === 'L' ? 'L (+500원)' : 'M';

  const getSetPrice = () => menuItem.price + 2000;

  const getCurrentPrice = () => {
    if (menuItem.category === 'burger') return isSet ? getSetPrice() : menuItem.price;
    if (menuItem.category === 'side') return menuItem.price + sizeOffset(sideItemSize);
    if (menuItem.category === 'beverage') return menuItem.price + sizeOffset(beverageItemSize);
    return menuItem.price;
  };

  const handleAddToCart = () => {
    if (menuItem.category === 'burger') {
      const options: BurgerOption = {
        isSet,
        doneness,
        sauce,
        sideItem: isSet ? selectedSide || undefined : undefined,
        sideSize: isSet ? sideSize : undefined,
        beverageItem: isSet ? selectedBeverage || undefined : undefined,
        beverageSize: isSet ? beverageSize : undefined,
        beverageTemperature: isSet && selectedBeverage?.nameEn === 'Coffee' ? beverageTemperature : undefined,
      };
      onAddToCart(options, quantity);
    } else if (menuItem.category === 'side') {
      onAddToCart({ size: sideItemSize }, quantity);
    } else if (menuItem.category === 'beverage') {
      onAddToCart({ size: beverageItemSize, temperature: beverageItemTemperature }, quantity);
    }
  };

  // 카드 그리드 헬퍼
  const ItemCard = ({
    item,
    selected,
    onSelect,
  }: {
    item: MenuItem;
    selected: boolean;
    onSelect: () => void;
  }) => (
    <button
      className={`set-item-card ${selected ? 'active' : ''}`}
      onClick={onSelect}
    >
      <div className="set-item-image-wrap">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="set-item-image"
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
            }}
          />
        ) : null}
        <div className="set-item-emoji" style={{ display: item.image ? 'none' : 'flex' }}>
          {item.emoji}
        </div>
      </div>
      <span className="set-item-name">{item.name}</span>
    </button>
  );

  return (
    <div className="screen options-screen">
      <div className="screen-header">
        <h1>옵션 선택</h1>
        <p className="subtitle">Customize Your Order</p>
      </div>

      <div className="screen-content options-content">
        {/* 메뉴 정보 */}
        <div className="selected-item-info">
          <div className="selected-item-emoji">{menuItem.emoji}</div>
          <div className="selected-item-name">{menuItem.name}</div>
          <div className="selected-item-name-en">{menuItem.nameEn}</div>
        </div>

        {/* 버거 옵션 */}
        {menuItem.category === 'burger' && (
          <>
            <div className="option-section">
              <h3 className="option-title">주문 유형</h3>
              <div className="button-group horizontal">
                <button className={`option-button ${!isSet ? 'active' : ''}`} onClick={() => setIsSet(false)}>단품</button>
                <button className={`option-button ${isSet ? 'active' : ''}`} onClick={() => setIsSet(true)}>세트 (+2,000원)</button>
              </div>
            </div>

            <div className="option-section">
              <h3 className="option-title">패티 굽기</h3>
              <div className="button-group horizontal">
                <button className={`option-button ${doneness === 'Medium' ? 'active' : ''}`} onClick={() => setDoneness('Medium')}>Medium</button>
                <button className={`option-button ${doneness === 'WellDone' ? 'active' : ''}`} onClick={() => setDoneness('WellDone')}>Well Done</button>
              </div>
            </div>

            <div className="option-section">
              <h3 className="option-title">소스 선택</h3>
              <div className="button-group horizontal">
                <button className={`option-button ${sauce === 'Basic' ? 'active' : ''}`} onClick={() => setSauce('Basic')}>NH특제소스</button>
                <button className={`option-button ${sauce === 'Spicy' ? 'active' : ''}`} onClick={() => setSauce('Spicy')}>스파이시</button>
                <button className={`option-button ${sauce === 'BBQ' ? 'active' : ''}`} onClick={() => setSauce('BBQ')}>바비큐</button>
              </div>
            </div>

            {isSet && (
              <>
                <div className="option-section">
                  <h3 className="option-title">사이드 선택</h3>
                  <div className="set-item-grid">
                    {sides.map(side => (
                      <ItemCard key={side.id} item={side} selected={selectedSide?.id === side.id} onSelect={() => setSelectedSide(side)} />
                    ))}
                  </div>
                </div>

                {selectedSide && (
                  <div className="option-section">
                    <h3 className="option-title">사이드 사이즈</h3>
                    <div className="button-group horizontal">
                      {(['S', 'M', 'L'] as const).map(size => (
                        <button key={size} className={`option-button ${sideSize === size ? 'active' : ''}`} onClick={() => setSideSize(size)}>
                          {sizeLabel(size)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="option-section">
                  <h3 className="option-title">음료 선택</h3>
                  <div className="set-item-grid">
                    {beverages.map(bev => (
                      <ItemCard key={bev.id} item={bev} selected={selectedBeverage?.id === bev.id} onSelect={() => setSelectedBeverage(bev)} />
                    ))}
                  </div>
                </div>

                {selectedBeverage && (
                  <>
                    <div className="option-section">
                      <h3 className="option-title">음료 사이즈</h3>
                      <div className="button-group horizontal">
                        {(['S', 'M', 'L'] as const).map(size => (
                          <button key={size} className={`option-button ${beverageSize === size ? 'active' : ''}`} onClick={() => setBeverageSize(size)}>
                            {sizeLabel(size)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedBeverage.nameEn === 'Coffee' && (
                      <div className="option-section">
                        <h3 className="option-title">음료 온도</h3>
                        <div className="button-group horizontal">
                          <button className={`option-button ${beverageTemperature === 'Hot' ? 'active' : ''}`} onClick={() => setBeverageTemperature('Hot')}>핫</button>
                          <button className={`option-button ${beverageTemperature === 'Iced' ? 'active' : ''}`} onClick={() => setBeverageTemperature('Iced')}>아이스</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* 사이드 단품 옵션 */}
        {menuItem.category === 'side' && (
          <div className="option-section">
            <h3 className="option-title">사이즈</h3>
            <div className="button-group horizontal">
              {(['S', 'M', 'L'] as const).map(size => (
                <button key={size} className={`option-button ${sideItemSize === size ? 'active' : ''}`} onClick={() => setSideItemSize(size)}>
                  {sizeLabel(size)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 음료 단품 옵션 */}
        {menuItem.category === 'beverage' && (
          <>
            <div className="option-section">
              <h3 className="option-title">사이즈</h3>
              <div className="button-group horizontal">
                {(['S', 'M', 'L'] as const).map(size => (
                  <button key={size} className={`option-button ${beverageItemSize === size ? 'active' : ''}`} onClick={() => setBeverageItemSize(size)}>
                    {sizeLabel(size)}
                  </button>
                ))}
              </div>
            </div>

            {menuItem.nameEn === 'Coffee' && (
              <div className="option-section">
                <h3 className="option-title">온도</h3>
                <div className="button-group horizontal">
                  <button className={`option-button ${beverageItemTemperature === 'Hot' ? 'active' : ''}`} onClick={() => setBeverageItemTemperature('Hot')}>핫</button>
                  <button className={`option-button ${beverageItemTemperature === 'Iced' ? 'active' : ''}`} onClick={() => setBeverageItemTemperature('Iced')}>아이스</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* 수량 */}
        <div className="option-section quantity-section">
          <h3 className="option-title">수량</h3>
          <div className="quantity-control">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        {/* 가격 */}
        <div className="price-display">
          <span>1개 가격:</span>
          <span className="price">{getCurrentPrice().toLocaleString()}원</span>
        </div>
      </div>

      <div className="screen-footer options-footer">
        <button className="btn btn-outline btn-large" onClick={onBack}>취소</button>
        <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
          {quantity}개 추가 - {(getCurrentPrice() * quantity).toLocaleString()}원
        </button>
      </div>
    </div>
  );
};

export default OptionsScreen;
