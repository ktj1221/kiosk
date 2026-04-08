import { useState } from 'react';
import './burger-theme.css';
import { ScreenType, CartItem, MenuItem, BurgerOption, SideOption, BeverageOption } from './types/index';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import OptionsScreen from './screens/OptionsScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

interface BurgerAppProps {
  onExit: () => void;
}

function BurgerApp({ onExit }: BurgerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [dineIn, setDineIn] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState('');

  const handleSelectDineOption = (isDineIn: boolean) => {
    setDineIn(isDineIn);
    setCurrentScreen('menu');
  };

  const handleSelectMenuItem = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setCurrentScreen('options');
  };

  const handleAddToCart = (options: BurgerOption | SideOption | BeverageOption, quantity: number) => {
    if (!selectedMenuItem) return;
    const cartItemId = `${selectedMenuItem.id}-${Date.now()}`;
    const newCartItem: CartItem = { id: cartItemId, menuItem: selectedMenuItem, options, quantity };
    setCart([...cart, newCartItem]);
    setCurrentScreen('menu');
    setSelectedMenuItem(null);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
    } else {
      setCart(cart.map((item) => item.id === cartItemId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const handleCheckout = () => setCurrentScreen('payment');

  const handlePaymentComplete = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentScreen('confirmation');
  };

  const handleNewOrder = () => {
    setCart([]);
    setDineIn(true);
    setSelectedMenuItem(null);
    setOrderNumber('');
    setCurrentScreen('home');
  };

  const handleBackToMenu = () => {
    setSelectedMenuItem(null);
    setCurrentScreen('menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSelectDine={handleSelectDineOption} onBack={onExit} />;
      case 'menu':
        return (
          <MenuScreen
            onSelectItem={handleSelectMenuItem}
            cart={cart}
            onGoToCart={() => setCurrentScreen('cart')}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart}
            onExit={onExit}
          />
        );
      case 'options':
        return selectedMenuItem ? (
          <OptionsScreen menuItem={selectedMenuItem} onAddToCart={handleAddToCart} onBack={handleBackToMenu} />
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
        return <HomeScreen onSelectDine={handleSelectDineOption} onBack={onExit} />;
    }
  };

  return <div className="app burger-app">{renderScreen()}</div>;
}

export default BurgerApp;
