/**
 * 홈 화면 - 매장식사 / 포장 선택
 */

import './HomeScreen.css';

interface HomeScreenProps {
  onSelectDine: (isDineIn: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectDine }) => {
  return (
    <div className="screen home-screen">
      <div className="screen-header">
        <h1>NH Cafe</h1>
        <p className="subtitle">Welcome to NH Cafe</p>
      </div>

      <div className="screen-content home-content">
        <div className="welcome-message">
          <div className="emoji-large">☕</div>
          <h2>주문 방식을 선택해주세요</h2>
          <p className="text-secondary">Please select your order type</p>
        </div>

        <div className="button-group vertical options-group">
          <button
            className="btn btn-primary btn-large option-btn"
            onClick={() => onSelectDine(true)}
          >
            <div className="option-content">
              <div className="option-icon">🍴</div>
              <div>
                <div className="option-title">매장 식사</div>
                <div className="option-subtitle">For Here</div>
              </div>
            </div>
          </button>

          <button
            className="btn btn-secondary btn-large option-btn"
            onClick={() => onSelectDine(false)}
          >
            <div className="option-content">
              <div className="option-icon">📦</div>
              <div>
                <div className="option-title">포장</div>
                <div className="option-subtitle">To Go</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
