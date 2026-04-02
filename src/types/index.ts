/**
 * 커피 키오스크 타입 정의
 * 메뉴 아이템, 카트 아이템, 주문 등의 인터페이스를 정의합니다.
 */

export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  category: 'coffee' | 'non-coffee' | 'dessert';
  price: number;
  emoji: string;
  availableIced: boolean;
  availableSizes: Size[];
}

export type Size = 'Small' | 'Medium' | 'Large';

export interface OrderOption {
  size: Size;
  temperature: 'Hot' | 'Iced';
  extraShots: number;
  sweetness: 'Normal' | 'Less' | 'Extra';
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  options: OrderOption;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  timestamp: Date;
  dineIn: boolean;
}

export type ScreenType = 'home' | 'menu' | 'options' | 'cart' | 'payment' | 'confirmation';
