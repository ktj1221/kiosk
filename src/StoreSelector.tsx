import './StoreSelector.css';

type StoreType = 'cafe' | 'burger';

interface StoreSelectorProps {
  onSelect: (store: StoreType) => void;
}

function StoreSelector({ onSelect }: StoreSelectorProps) {
  return (
    <div className="selector-screen">
      <div className="selector-header">
        <h1>NH Kiosk</h1>
        <p className="selector-subtitle">어느 매장을 이용하시겠습니까?</p>
        <p className="selector-subtitle-en">Which store would you like to visit?</p>
      </div>

      <div className="selector-content">
        <button className="store-card cafe-card" onClick={() => onSelect('cafe')}>
          <div className="store-emoji">☕</div>
          <div className="store-name">NH Cafe</div>
          <div className="store-desc">커피 · 음료 · 디저트</div>
          <div className="store-desc-en">Coffee · Beverages · Dessert</div>
        </button>

        <button className="store-card burger-card" onClick={() => onSelect('burger')}>
          <div className="store-emoji">🍔</div>
          <div className="store-name">NH Burger</div>
          <div className="store-desc">버거 · 사이드 · 음료</div>
          <div className="store-desc-en">Burger · Side · Beverage</div>
        </button>
      </div>
    </div>
  );
}

export default StoreSelector;
