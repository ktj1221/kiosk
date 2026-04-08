---
name: NH Cafe Kiosk Playwright E2E Setup
description: NH 통합 키오스크(Cafe+Burger) Playwright 설정, 20개 테스트 전부 통과, 셀렉터 함정 포함
type: project
---

Playwright 1.59.1, 20개 테스트 전부 통과 (2026-04-08 기준).

**Why:** NH Kiosk는 StoreSelector → CafeApp/BurgerApp 두 갈래 SPA. 이전 테스트는 CafeApp 단독 기준이라 StoreSelector 레이어가 없었음.

**How to apply:**

- baseURL: `http://localhost:5173/edu_kiosk/` (vite base: '/edu_kiosk/')
- webServer url도 동일하게 맞춰야 함
- `page.goto('/')` 호출 시 baseURL 기준으로 `/edu_kiosk/`로 이동됨
- testDir: ./e2e, browser: chromium only, retries: 1

## 핵심 셀렉터 함정

**strict mode violation 주의:** 장바구니에 아이템 추가 후 메뉴 화면에서 `getByText('아메리카노')` 사용 시
메뉴 카드와 `.cart-summary-name` 두 곳에 동시 매칭되어 strict mode 오류 발생.
`.cart-summary-name` 클래스로 범위를 좁혀야 함:
```ts
page.locator('.cart-summary-name').filter({ hasText: '아메리카노' })
```

**스토어 이름 중복 매칭:** `page.getByText('NH Cafe')`는 store-name div와 store-desc에서 각각 매칭될 수 있으므로 `.first()` 사용 또는 `getByRole('heading')` 사용.

## 화면별 결제 버튼 차이

- **Cafe PaymentScreen:** 결제 방법 버튼(신용카드/모바일/현금) 클릭 즉시 결제 시작 → 별도 확인 버튼 없음
- **Burger PaymentScreen:** 방법 선택 후 별도 "N원 결제" 버튼 클릭 필요
- 결제 처리 딜레이: Cafe 2초, Burger 2초+1초(성공 후) → timeout: 10000~15000 필요
- Burger 결제 90% 성공률(랜덤) — 실패 시 retry로 커버

## handleNewOrder 동작

- Cafe/Burger 모두 `handleNewOrder` → `setCurrentScreen('home')` → 해당 앱 홈으로 이동
- "처음으로"/"새로운 주문"/"새로운 주문 시작" 버튼은 스토어 선택 화면(NH Kiosk)이 아닌 NH Cafe/NH Burger 홈으로 이동
- 스토어 선택 화면 복귀는 홈에서 "← 매장 선택" 버튼 추가 클릭 필요

## Burger MenuScreen "처음으로"

- `onExit` prop으로 `BurgerApp.onExit` → `setSelectedStore(null)` → NH Kiosk로 복귀
- Cafe MenuScreen은 `window.location.reload()` 사용 (다름) — Cafe 메뉴의 처음으로는 NH Kiosk로 못 돌아감

## 버거 옵션 추가 버튼

- Burger OptionsScreen 추가 버튼: "N개 추가 - N원" 형식 → `getByRole('button', { name: /개 추가/ })`
- Cafe OptionsScreen 추가 버튼: "장바구니 추가" 고정 텍스트
