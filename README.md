# ☕ 커피 주문 키오스크 (Coffee Kiosk)

완전히 프론트엔드 기반으로 동작하는 React + TypeScript 커피 주문 키오스크 애플리케이션입니다.

## 특징

- **세로형 레이아웃**: 1080x1920 키오스크 화면에 최적화
- **터치 친화적**: 최소 80px 터치 타겟으로 디자인
- **풀 프론트엔드**: 백엔드 없이 완전히 프론트엔드에서 동작
- **한영 이중 언어**: 한국어와 영어 지원
- **완전한 주문 플로우**:
  1. 홈 화면 (매장식사/포장 선택)
  2. 메뉴 선택 (카테고리별)
  3. 옵션 선택 (사이즈, 온도, 샷, 단맛)
  4. 장바구니 관리
  5. 결제 시뮬레이션
  6. 주문 완료

## 기술 스택

- **React 18**: 최신 React 라이브러리
- **TypeScript**: 완전한 타입 안전성
- **Vite**: 빠른 개발 및 빌드 툴
- **CSS3**: 현대적인 스타일링 및 애니메이션

## 설치 및 실행

### 사전 요구사항
- Node.js 16+ 
- npm 또는 yarn

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd kiosk

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 자동으로 열립니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

### 빌드 결과물 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
kiosk/
├── src/
│   ├── screens/              # 각 화면 컴포넌트
│   │   ├── HomeScreen.tsx       # 홈 화면
│   │   ├── MenuScreen.tsx       # 메뉴 선택 화면
│   │   ├── OptionsScreen.tsx    # 옵션 선택 화면
│   │   ├── CartScreen.tsx       # 장바구니 화면
│   │   ├── PaymentScreen.tsx    # 결제 화면
│   │   └── ConfirmationScreen.tsx # 주문 완료 화면
│   ├── data/
│   │   └── menu.ts           # 메뉴 데이터
│   ├── types/
│   │   └── index.ts          # TypeScript 타입 정의
│   ├── styles/
│   │   └── colors.ts         # 색상 팔레트
│   ├── App.tsx               # 메인 앱 컴포넌트
│   ├── App.css               # 전역 스타일
│   └── main.tsx              # React 진입점
├── index.html                # HTML 진입점
├── vite.config.ts            # Vite 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 프로젝트 메타데이터
```

## 주요 기능

### 1. 메뉴 관리
`src/data/menu.ts`에서 메뉴 아이템을 정의합니다:

```typescript
{
  id: 1,
  name: '아메리카노',
  nameEn: 'Americano',
  category: 'coffee',
  price: 4000,
  emoji: '☕',
  availableIced: true,
  availableSizes: ['Small', 'Medium', 'Large'],
}
```

**메뉴 커스터마이징 방법:**
- `name`: 한국어 메뉴 이름
- `nameEn`: 영문 메뉴 이름
- `category`: 카테고리 ('coffee', 'non-coffee', 'dessert')
- `price`: 기본 가격 (원)
- `emoji`: 메뉴 이모지
- `availableIced`: Iced 옵션 제공 여부
- `availableSizes`: 제공하는 사이즈 배열

### 2. 색상 커스터마이징
`src/styles/colors.ts`에서 색상 팔레트를 수정:

```typescript
export const colors = {
  primary: '#2C5F2D',      // 메인 색상 (초록)
  secondary: '#8B4513',    // 보조 색상 (갈색)
  accent: '#D4AF37',       // 강조 색상 (금색)
  // ... 기타 색상들
};
```

### 3. 옵션 설정
각 상품에서 선택 가능한 옵션:
- **사이즈**: Small(-500원), Medium(기본), Large(+1000원)
- **온도**: Hot 또는 Iced (availableIced가 true인 경우만)
- **샷 추가**: 0~5샷 (+500원/샷)
- **단맛**: 덜 달게, 보통, 더 달게

### 4. 주문 관리
장바구니에서 가능한 작업:
- 상품 추가/제거
- 수량 조정
- 실시간 가격 계산
- 결제 전 주문 검토

### 5. 결제 시뮬레이션
3가지 결제 방식 지원:
- 신용카드 (💳 Credit Card)
- 모바일 결제 (📱 Mobile Payment)
- 현금 (💰 Cash Payment)

**주의**: 실제 결제가 처리되지 않으며, 시뮬레이션만 진행됩니다.

## 학습 포인트

이 프로젝트는 다음 개념들을 학습하기에 좋습니다:

### React 개념
- **컴포넌트 구조**: 화면별 컴포넌트 분리
- **State 관리**: useState를 사용한 상태 관리
- **Props 전달**: 부모에서 자식으로 데이터 전달
- **이벤트 처리**: 클릭, 입력 등 사용자 이벤트 처리

### TypeScript
- **인터페이스**: MenuItem, CartItem 등 데이터 타입 정의
- **제네릭**: React.FC와 제네릭 타입 사용
- **타입 안전성**: 잘못된 데이터 타입 사용 방지

### CSS 및 디자인
- **CSS 변수**: --primary, --secondary 등 색상 변수 활용
- **Flexbox/Grid**: 반응형 레이아웃 구현
- **애니메이션**: @keyframes를 사용한 부드러운 애니메이션
- **터치 친화적 디자인**: 최소 터치 타겟 크기 (80px)

### 기타
- **환경 설정**: Vite, TypeScript 설정
- **모듈화**: 기능별로 파일 분리
- **상태 관리 패턴**: 주문 흐름에 따른 화면 전환

## 커스터마이징 가이드

### 새로운 메뉴 아이템 추가

1. `src/data/menu.ts` 파일 열기
2. `menuItems` 배열에 새로운 항목 추가:

```typescript
{
  id: 15,
  name: '딸기 에이드',
  nameEn: 'Strawberry Ade',
  category: 'non-coffee',
  price: 5500,
  emoji: '🍓',
  availableIced: true,
  availableSizes: ['Small', 'Medium', 'Large'],
}
```

### 새로운 카테고리 추가

1. `src/data/menu.ts`에서 `categories` 배열 수정
2. `src/types/index.ts`의 `MenuItem` 인터페이스 업데이트

### 색상 테마 변경

1. `src/styles/colors.ts` 수정
2. `src/App.css`의 CSS 변수(`:root`) 업데이트

### 사이즈 가격 조정

`src/screens/OptionsScreen.tsx`의 `calculatePrice` 함수 수정:

```typescript
const calculatePrice = () => {
  let price = menuItem.price;

  if (size === 'Large') {
    price += 2000; // 1000에서 2000으로 변경
  } else if (size === 'Small') {
    price -= 1000; // 500에서 1000으로 변경
  }

  price += extraShots * 500;
  return price;
};
```

## 주문 번호 형식

주문 번호는 다음 형식으로 생성됩니다:
- `YYYYMMDDNNNN` (날짜 + 4자리 랜덤 숫자)
- 예: `20240102A1234`

## 반응형 디자인

이 키오스크는 다음 화면 크기에 최적화되어 있습니다:
- **목표**: 1080x1920 (세로형 키오스크)
- **지원**: 600px 이상 모든 화면 크기

## 성능 최적화

- React.FC 타입 사용으로 타입 안전성 확보
- 필요한 컴포넌트만 렌더링
- CSS 변수를 활용한 효율적인 스타일 관리

## 브라우저 호환성

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- 모던 브라우저 권장

## 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용, 수정, 배포할 수 있습니다.

## 문제 해결

### 포트 5173이 이미 사용 중인 경우
```bash
npm run dev -- --port 5174
```

### 타입 에러 발생 시
```bash
# TypeScript 재컴파일
npm run build
```

### 의존성 문제
```bash
# node_modules 삭제 및 재설치
rm -rf node_modules package-lock.json
npm install
```

## 기여 및 개선

이 프로젝트는 학습용이므로 다음과 같은 개선을 시도해보세요:

1. 새로운 옵션 추가 (예: 온도 선택지 확장)
2. 할인 코드 시스템 구현
3. 주문 이력 저장 (localStorage 활용)
4. 다국어 지원 확장
5. 결제 API 통합 (실제 결제 시스템)
6. 주문 추적 기능
7. 매출 분석 대시보드

---

**마지막 업데이트**: 2024년 4월 2일
**개발**: Claude Code
**버전**: 1.0.0
