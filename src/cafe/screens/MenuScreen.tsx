/**
 * 메뉴 화면 - 카테고리별 메뉴 선택
 */

import { useState, useRef, useEffect } from 'react';
import { MenuItem, CartItem } from '../types/index';
import { menuItems, categories } from '../data/menu';
import './MenuScreen.css';

const MenuItemImage = ({ image, emoji, name }: { image?: string; emoji: string; name: string }) => {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return <div className="menu-item-emoji-fallback">{emoji}</div>;
  }
  return (
    <img
      src={image}
      alt={name}
      className="menu-item-image"
      onError={() => setFailed(true)}
    />
  );
};

interface MenuScreenProps {
  onSelectItem: (item: MenuItem) => void;
  cart: CartItem[];
  onGoToCart: () => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemove: (cartItemId: string) => void;
}

const calcItemPrice = (item: CartItem) => {
  let price = item.menuItem.price;
  if (item.options.size === 'Large') price += 1000;
  else if (item.options.size === 'Small') price -= 500;
  price += item.options.extraShots * 500;
  return price * item.quantity;
};

const MenuScreen: React.FC<MenuScreenProps> = ({
  onSelectItem,
  cart,
  onGoToCart,
  onUpdateQuantity,
  onRemove,
}) => {
  const cartItemCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + calcItemPrice(item), 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const updateScrollState = () => {
    const el = listRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 0);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(() => {
    updateScrollState();
  }, [cart]);

  const scroll = (dir: 'up' | 'down') => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ top: dir === 'up' ? -80 : 80, behavior: 'smooth' });
  };

  // 선택된 카테고리의 메뉴 필터링
  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="screen menu-screen">
      <div className="screen-header">
        <h1>메뉴 선택</h1>
        <p className="subtitle">Select Your Drink</p>
      </div>

      {/* 카테고리 탭 */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              selectedCategory === category.id ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-name-en">{category.nameEn}</span>
          </button>
        ))}
      </div>

      {/* 메뉴 그리드 */}
      <div className="screen-content">
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className="menu-item-card card"
              onClick={() => onSelectItem(item)}
            >
              <div className="menu-item-image-wrap">
                <MenuItemImage image={item.image} emoji={item.emoji} name={item.name} />
              </div>
              <div className="menu-item-info">
                <div className="menu-item-name">{item.name}</div>
                <div className="menu-item-name-en">{item.nameEn}</div>
                <div className="menu-item-price">{item.price.toLocaleString()}원</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 장바구니 요약 */}
      <div className="screen-footer">
        <button className="btn btn-outline" onClick={() => window.location.reload()}>
          처음으로
        </button>
        {cartItemCount > 0 ? (
          <div className="cart-summary">
            {canScrollUp && (
              <button className="scroll-arrow scroll-arrow-up" onClick={() => scroll('up')}>▲</button>
            )}
            <div className="cart-summary-list" ref={listRef} onScroll={updateScrollState}>
              {cart.map((item) => (
                <div key={item.id} className="cart-summary-row">
                  <span className="cart-summary-name">
                    {item.menuItem.name}
                    <em>
                      {item.menuItem.category !== 'dessert'
                        ? `${item.options.size} · ${item.options.temperature}${item.options.decaf ? ' · 디카페인' : ''}`
                        : '디저트'}
                    </em>
                  </span>
                  <div className="cart-summary-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(item.id)}
                    >✕</button>
                  </div>
                  <span className="cart-summary-price">
                    {calcItemPrice(item).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
            {canScrollDown && (
              <button className="scroll-arrow scroll-arrow-down" onClick={() => scroll('down')}>▼</button>
            )}
            <div className="cart-summary-footer">
              <span className="cart-summary-total">총 {totalPrice.toLocaleString()}원</span>
              <button className="btn btn-primary cart-checkout-btn" onClick={onGoToCart}>
                주문하기 →
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" disabled>
            장바구니 비어있음
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuScreen;
