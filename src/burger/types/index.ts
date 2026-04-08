/**
 * 햄버거 키오스크 타입 정의
 * 메뉴 아이템, 카트 아이템, 주문 등의 인터페이스를 정의합니다.
 */

export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  category: 'burger' | 'side' | 'beverage';
  price: number;
  emoji: string;
  image?: string;
  isSetAvailable?: boolean; // 버거: 세트 가능 여부
}

export type BurgerSize = 'Single' | 'Double'; // 단품/세트 아님, 더블로 표현
export type SideSize = 'S' | 'M' | 'L';
export type BeverageSize = 'S' | 'M' | 'L';

export interface BurgerOption {
  isSet: boolean; // true = 세트, false = 단품
  doneness: 'WellDone' | 'Medium';
  sauce: 'Basic' | 'Spicy' | 'BBQ';
  sideItem?: MenuItem; // 세트 선택 시 사이드
  sideSize?: SideSize;
  beverageItem?: MenuItem; // 세트 선택 시 음료
  beverageSize?: BeverageSize;
  beverageTemperature?: 'Hot' | 'Iced';
}

export interface SideOption {
  size: SideSize;
}

export interface BeverageOption {
  size: BeverageSize;
  temperature: 'Hot' | 'Iced';
}

export type OrderOption = BurgerOption | SideOption | BeverageOption;

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
