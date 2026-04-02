/**
 * 메뉴 화면 - 카테고리별 메뉴 선택
 */

import { useState } from 'react';
import { MenuItem } from '../types/index';
import { menuItems, categories } from '../data/menu';
import './MenuScreen.css';

interface MenuScreenProps {
  onSelectItem: (item: MenuItem) => void;
  cartItemCount: number;
  onGoToCart: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  onSelectItem,
  cartItemCount,
  onGoToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');

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
              <div className="menu-item-emoji">{item.emoji}</div>
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-name-en">{item.nameEn}</div>
              <div className="menu-item-price">{item.price.toLocaleString()}원</div>
            </button>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="screen-footer">
        <button className="btn btn-outline" onClick={() => window.location.reload()}>
          처음으로
        </button>
        <button
          className="btn btn-primary"
          onClick={onGoToCart}
          disabled={cartItemCount === 0}
        >
          장바구니 ({cartItemCount})
        </button>
      </div>
    </div>
  );
};

export default MenuScreen;
