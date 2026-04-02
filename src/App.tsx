/**
 * 커피 주문 키오스크 - 메인 애플리케이션
 *
 * 화면 구성:
 * 1. Home: 매장식사 / 포장 선택
 * 2. Menu: 메뉴 선택 (카테고리별)
 * 3. Options: 상품 옵션 선택 (사이즈, 온도, 샷, 단맛)
 * 4. Cart: 장바구니 검토
 * 5. Payment: 결제 시뮬레이션
 * 6. Confirmation: 주문 완료
 */

import { useState } from 'react';
import './App.css';
import { ScreenType, CartItem, MenuItem, OrderOption } from './types/index';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import OptionsScreen from './screens/OptionsScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

function App() {
  // 화면 상태 관리
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // 주문 설정
  const [dineIn, setDineIn] = useState(true);

  // 선택된 메뉴 아이템 (옵션 선택 시)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // 장바구니
  const [cart, setCart] = useState<CartItem[]>([]);

  // 주문 번호
  const [orderNumber, setOrderNumber] = useState('');

  /**
   * 홈 화면에서 매장식사/포장 선택
   */
  const handleSelectDineOption = (isDineIn: boolean) => {
    setDineIn(isDineIn);
    setCurrentScreen('menu');
  };

  /**
   * 메뉴에서 상품 선택 시 옵션 화면으로 이동
   */
  const handleSelectMenuItem = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setCurrentScreen('options');
  };

  /**
   * 옵션 선택 후 장바구니 추가
   */
  const handleAddToCart = (options: OrderOption, quantity: number) => {
    if (!selectedMenuItem) return;

    const cartItemId = `${selectedMenuItem.id}-${Date.now()}`;
    const newCartItem: CartItem = {
      id: cartItemId,
      menuItem: selectedMenuItem,
      options,
      quantity,
    };

    setCart([...cart, newCartItem]);
    setCurrentScreen('menu');
    setSelectedMenuItem(null);
  };

  /**
   * 장바구니에서 상품 제거
   */
  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
  };

  /**
   * 장바구니에서 수량 변경
   */
  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  /**
   * 장바구니에서 결제 화면으로 이동
   */
  const handleCheckout = () => {
    setCurrentScreen('payment');
  };

  /**
   * 결제 완료 처리
   */
  const handlePaymentComplete = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentScreen('confirmation');
  };

  /**
   * 새로운 주문 시작
   */
  const handleNewOrder = () => {
    setCart([]);
    setDineIn(true);
    setSelectedMenuItem(null);
    setOrderNumber('');
    setCurrentScreen('home');
  };

  /**
   * 메뉴로 돌아가기
   */
  const handleBackToMenu = () => {
    setSelectedMenuItem(null);
    setCurrentScreen('menu');
  };

  /**
   * 현재 화면에 따라 컴포넌트 렌더링
   */
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSelectDine={handleSelectDineOption} />;

      case 'menu':
        return (
          <MenuScreen
            onSelectItem={handleSelectMenuItem}
            cartItemCount={cart.length}
            onGoToCart={() => setCurrentScreen('cart')}
          />
        );

      case 'options':
        return selectedMenuItem ? (
          <OptionsScreen
            menuItem={selectedMenuItem}
            onAddToCart={handleAddToCart}
            onBack={handleBackToMenu}
          />
        ) : null;

      case 'cart':
        return (
          <CartScreen
            cartItems={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onBackToMenu={() => setCurrentScreen('menu')}
            onCheckout={handleCheckout}
            dineIn={dineIn}
          />
        );

      case 'payment':
        return (
          <PaymentScreen
            cartItems={cart}
            onPaymentComplete={handlePaymentComplete}
            onCancel={() => setCurrentScreen('cart')}
          />
        );

      case 'confirmation':
        return (
          <ConfirmationScreen
            orderNumber={orderNumber}
            orderItems={cart}
            dineIn={dineIn}
            onNewOrder={handleNewOrder}
          />
        );

      default:
        return <HomeScreen onSelectDine={handleSelectDineOption} />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;
