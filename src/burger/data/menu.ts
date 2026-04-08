/**
 * 메뉴 데이터
 * 햄버거 키오스크에서 판매할 메뉴 아이템들을 정의합니다.
 */

import { MenuItem } from '../types/index';

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`;

export const menuItems: MenuItem[] = [
  // 버거 카테고리
  {
    id: 1,
    name: '클래식버거',
    nameEn: 'Classic Burger',
    category: 'burger',
    price: 8000,
    emoji: '🍔',
    image: unsplash('1568901346375-23c9450c58cd'),
    isSetAvailable: true,
  },
  {
    id: 2,
    name: '치즈버거',
    nameEn: 'Cheese Burger',
    category: 'burger',
    price: 9000,
    emoji: '🧀',
    image: unsplash('1550547990-25967503a36e'),
    isSetAvailable: true,
  },
  {
    id: 3,
    name: '더블버거',
    nameEn: 'Double Burger',
    category: 'burger',
    price: 11000,
    emoji: '🍔',
    image: unsplash('1555939594-58d7cb561404'),
    isSetAvailable: true,
  },
  {
    id: 4,
    name: '베이컨버거',
    nameEn: 'Bacon Burger',
    category: 'burger',
    price: 10000,
    emoji: '🥓',
    image: unsplash('1542025783-6db0e0b6fa9e'),
    isSetAvailable: true,
  },
  {
    id: 5,
    name: '치킨버거',
    nameEn: 'Chicken Burger',
    category: 'burger',
    price: 9500,
    emoji: '🍗',
    image: unsplash('1561321503-daffa666d156'),
    isSetAvailable: true,
  },
  {
    id: 6,
    name: '새우버거',
    nameEn: 'Shrimp Burger',
    category: 'burger',
    price: 10500,
    emoji: '🦐',
    image: unsplash('1599599810694-b5ac4dd77c94'),
    isSetAvailable: true,
  },

  // 사이드 카테고리
  {
    id: 11,
    name: '감자튀김',
    nameEn: 'French Fries',
    category: 'side',
    price: 4000,
    emoji: '🍟',
    image: unsplash('1585238341710-4811a188e59e'),
  },
  {
    id: 12,
    name: '어니언링',
    nameEn: 'Onion Ring',
    category: 'side',
    price: 5000,
    emoji: '🧅',
    image: unsplash('1610312043908-e10a82a5b8ee'),
  },
  {
    id: 13,
    name: '치킨너겟',
    nameEn: 'Chicken Nugget',
    category: 'side',
    price: 5500,
    emoji: '🍗',
    image: unsplash('1562547256-c1ff170e1b12'),
  },
  {
    id: 14,
    name: '코울슬로',
    nameEn: 'Coleslaw',
    category: 'side',
    price: 3500,
    emoji: '🥬',
    image: unsplash('1546069901-ba9599a7e63c'),
  },

  // 음료 카테고리
  {
    id: 21,
    name: '콜라',
    nameEn: 'Cola',
    category: 'beverage',
    price: 2500,
    emoji: '🥤',
    image: unsplash('1554866585-acbb2b199f58'),
  },
  {
    id: 22,
    name: '사이다',
    nameEn: 'Lemonade',
    category: 'beverage',
    price: 2500,
    emoji: '🥤',
    image: unsplash('1473093295771-39db8d0ee5e5'),
  },
  {
    id: 23,
    name: '오렌지주스',
    nameEn: 'Orange Juice',
    category: 'beverage',
    price: 3500,
    emoji: '🧃',
    image: unsplash('1600271886742-f049cd451bba'),
  },
  {
    id: 24,
    name: '아이스티',
    nameEn: 'Iced Tea',
    category: 'beverage',
    price: 2500,
    emoji: '🍵',
    image: unsplash('1517701550927-30cf4ba53e57'),
  },
  {
    id: 25,
    name: '커피',
    nameEn: 'Coffee',
    category: 'beverage',
    price: 3000,
    emoji: '☕',
    image: unsplash('1510707577719-ae7c14805e3a'),
  },
];

export const categories = [
  { id: 'burger', name: '버거', nameEn: 'Burger' },
  { id: 'side', name: '사이드', nameEn: 'Side' },
  { id: 'beverage', name: '음료', nameEn: 'Beverage' },
];
