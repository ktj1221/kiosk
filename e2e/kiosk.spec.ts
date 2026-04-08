import { test, expect, Page } from '@playwright/test';

// ──────────────────────────────────────────────
// 헬퍼: 스토어 선택 화면으로 이동
// ──────────────────────────────────────────────
async function goToStoreSelector(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'NH Kiosk' })).toBeVisible();
}

// 헬퍼: Cafe 홈 화면까지 이동
async function goToCafeHome(page: Page) {
  await goToStoreSelector(page);
  await page.getByText('NH Cafe').first().click();
  await expect(page.getByRole('heading', { name: 'NH Cafe' })).toBeVisible();
}

// 헬퍼: Cafe 메뉴 화면까지 이동 (매장식사)
async function goToCafeMenu(page: Page) {
  await goToCafeHome(page);
  await page.getByText('매장 식사').click();
  await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
}

// 헬퍼: Burger 홈 화면까지 이동
async function goToBurgerHome(page: Page) {
  await goToStoreSelector(page);
  await page.getByText('NH Burger').first().click();
  await expect(page.getByRole('heading', { name: 'NH Burger' })).toBeVisible();
}

// 헬퍼: Burger 메뉴 화면까지 이동 (매장식사)
async function goToBurgerMenu(page: Page) {
  await goToBurgerHome(page);
  await page.getByText('매장 식사').click();
  await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
}

// ══════════════════════════════════════════════
// 스토어 선택 화면
// ══════════════════════════════════════════════
test.describe('스토어 선택 화면', () => {
  test('1. NH Kiosk 타이틀과 두 매장 카드 표시 확인', async ({ page }) => {
    await goToStoreSelector(page);
    await expect(page.getByRole('heading', { name: 'NH Kiosk' })).toBeVisible();
    await expect(page.getByText('NH Cafe').first()).toBeVisible();
    await expect(page.getByText('NH Burger').first()).toBeVisible();
  });

  test('2. NH Cafe 선택 → Cafe 홈 화면 이동', async ({ page }) => {
    await goToStoreSelector(page);
    await page.getByText('NH Cafe').first().click();
    await expect(page.getByRole('heading', { name: 'NH Cafe' })).toBeVisible();
    await expect(page.getByText('매장 식사')).toBeVisible();
    await expect(page.getByText('포장')).toBeVisible();
  });

  test('3. NH Burger 선택 → Burger 홈 화면 이동', async ({ page }) => {
    await goToStoreSelector(page);
    await page.getByText('NH Burger').first().click();
    await expect(page.getByRole('heading', { name: 'NH Burger' })).toBeVisible();
    await expect(page.getByText('매장 식사')).toBeVisible();
    await expect(page.getByText('포장')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// NH Cafe 흐름
// ══════════════════════════════════════════════
test.describe('NH Cafe 흐름', () => {
  test('4. 매장 선택 버튼으로 스토어 선택 화면 복귀', async ({ page }) => {
    await goToCafeHome(page);
    await page.getByText('← 매장 선택').click();
    await expect(page.getByRole('heading', { name: 'NH Kiosk' })).toBeVisible();
  });

  test('5. 매장식사 선택 → 메뉴 화면 이동', async ({ page }) => {
    await goToCafeHome(page);
    await page.getByText('매장 식사').click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
  });

  test('6. 커피/음료/디저트 카테고리 탭 전환', async ({ page }) => {
    await goToCafeMenu(page);
    // 기본 커피 탭
    await expect(page.locator('.category-tab.active')).toContainText('커피');

    // 음료 탭 클릭
    await page.locator('.category-tab').filter({ hasText: '음료' }).click();
    await expect(page.locator('.category-tab.active')).toContainText('음료');
    await expect(page.getByText('아이스티')).toBeVisible();

    // 디저트 탭 클릭
    await page.locator('.category-tab').filter({ hasText: '디저트' }).click();
    await expect(page.locator('.category-tab.active')).toContainText('디저트');
    await expect(page.getByText('크루아상')).toBeVisible();
  });

  test('7. 아메리카노 선택 → 옵션 화면 이동', async ({ page }) => {
    await goToCafeMenu(page);
    await page.getByText('아메리카노').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();
    // 사이즈, 온도 옵션 표시 확인
    await expect(page.getByText('사이즈 (Size)')).toBeVisible();
    await expect(page.getByText('온도 (Temperature)')).toBeVisible();
  });

  test('8. 옵션 선택 후 장바구니 추가 → 메뉴 복귀', async ({ page }) => {
    await goToCafeMenu(page);
    await page.getByText('아메리카노').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();

    // Large 사이즈 선택
    await page.getByText('대 (L)').click();
    // Iced 선택
    await page.getByText('차가운 (Iced) 🧊').click();
    // 장바구니 추가
    await page.getByText('장바구니 추가').click();

    // 메뉴 화면으로 복귀
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
    // 장바구니 요약에 아메리카노 표시 (cart-summary-name 셀렉터로 정확하게)
    await expect(page.locator('.cart-summary-name').filter({ hasText: '아메리카노' })).toBeVisible();
  });

  test('9. 장바구니 이동 → 결제하기 → 결제 화면', async ({ page }) => {
    await goToCafeMenu(page);
    // 아메리카노 추가
    await page.getByText('아메리카노').click();
    await page.getByText('장바구니 추가').click();

    // 메뉴 화면에서 주문하기 버튼 클릭
    await page.getByText('주문하기 →').click();
    await expect(page.getByRole('heading', { name: '장바구니' })).toBeVisible();

    // 결제하기 버튼 (Cafe CartScreen: "원 결제" 텍스트 포함)
    await page.getByRole('button', { name: /원 결제/ }).click();
    await expect(page.getByRole('heading', { name: '결제' })).toBeVisible();
  });

  test('10. 결제 후 완료 화면 → 처음으로 → 스토어 선택 화면', async ({ page }) => {
    await goToCafeMenu(page);
    await page.getByText('아메리카노').click();
    await page.getByText('장바구니 추가').click();
    await page.getByText('주문하기 →').click();
    await page.getByRole('button', { name: /원 결제/ }).click();

    // Cafe 결제: 버튼 클릭 즉시 결제 시작 (신용카드 클릭)
    await page.getByText('신용카드').click();

    // 결제 처리 2초 → 완료 화면 대기
    await expect(page.getByRole('heading', { name: '주문 완료' })).toBeVisible({ timeout: 10000 });

    // 처음으로 버튼
    await page.getByRole('button', { name: '처음으로' }).click();
    // CafeApp의 handleNewOrder → home screen (NH Cafe), 그 후 onExit으로 스토어 선택 불가
    // handleNewOrder는 setCurrentScreen('home') 호출 → NH Cafe HomeScreen으로 이동
    await expect(page.getByRole('heading', { name: 'NH Cafe' })).toBeVisible();
    // 거기서 "← 매장 선택" 클릭 → NH Kiosk
    await page.getByText('← 매장 선택').click();
    await expect(page.getByRole('heading', { name: 'NH Kiosk' })).toBeVisible();
  });

  test('11. 디저트(크루아상) 선택 시 수량만 선택 가능 확인', async ({ page }) => {
    await goToCafeMenu(page);
    await page.locator('.category-tab').filter({ hasText: '디저트' }).click();
    await page.getByText('크루아상').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();

    // 수량 옵션만 있어야 함 (사이즈/온도 없음)
    await expect(page.getByText('수량 (Quantity)')).toBeVisible();
    await expect(page.getByText('사이즈 (Size)')).not.toBeVisible();
    await expect(page.getByText('온도 (Temperature)')).not.toBeVisible();
  });
});

// ══════════════════════════════════════════════
// NH Burger 흐름
// ══════════════════════════════════════════════
test.describe('NH Burger 흐름', () => {
  test('12. 매장식사 선택 → 메뉴 화면', async ({ page }) => {
    await goToBurgerHome(page);
    await page.getByText('매장 식사').click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
  });

  test('13. 버거/사이드/음료 탭 전환', async ({ page }) => {
    await goToBurgerMenu(page);
    // 기본 버거 탭
    await expect(page.locator('.category-tab.active')).toContainText('버거');

    // 사이드 탭 클릭
    await page.locator('.category-tab').filter({ hasText: '사이드' }).click();
    await expect(page.locator('.category-tab.active')).toContainText('사이드');
    await expect(page.getByText('감자튀김')).toBeVisible();

    // 음료 탭 클릭
    await page.locator('.category-tab').filter({ hasText: '음료' }).click();
    await expect(page.locator('.category-tab.active')).toContainText('음료');
    await expect(page.getByText('콜라')).toBeVisible();
  });

  test('14. 클래식버거 선택 → 옵션 화면 (단품/세트, 패티굽기, 소스)', async ({ page }) => {
    await goToBurgerMenu(page);
    await page.getByText('클래식버거').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();
    // 주문 유형 (단품/세트)
    await expect(page.getByText('주문 유형')).toBeVisible();
    await expect(page.getByRole('button', { name: '단품' })).toBeVisible();
    await expect(page.getByRole('button', { name: /세트/ })).toBeVisible();
    // 패티 굽기
    await expect(page.getByText('패티 굽기')).toBeVisible();
    // 소스 선택
    await expect(page.getByText('소스 선택')).toBeVisible();
  });

  test('15. 버거 옵션 선택 후 장바구니 추가', async ({ page }) => {
    await goToBurgerMenu(page);
    await page.getByText('클래식버거').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();

    // Well Done 선택
    await page.getByRole('button', { name: 'Well Done' }).click();
    // 스파이시 소스 선택
    await page.getByRole('button', { name: '스파이시' }).click();

    // 장바구니 추가 버튼 (버거: "N개 추가 - N원" 형식)
    await page.getByRole('button', { name: /개 추가/ }).click();

    // 메뉴 화면으로 복귀
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();
    // 장바구니 요약에 클래식버거 표시 (cart-summary-name 셀렉터로 정확하게)
    await expect(page.locator('.cart-summary-name').filter({ hasText: '클래식버거' })).toBeVisible();
  });

  test('16. 감자튀김(사이드) 선택 → 사이즈 옵션', async ({ page }) => {
    await goToBurgerMenu(page);
    await page.locator('.category-tab').filter({ hasText: '사이드' }).click();
    await page.getByText('감자튀김').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();
    // 사이드 사이즈 옵션
    await expect(page.getByText('사이즈')).toBeVisible();
    await expect(page.getByRole('button', { name: 'M' })).toBeVisible();
  });

  test('17. 장바구니 → 결제 → 완료', async ({ page }) => {
    await goToBurgerMenu(page);
    await page.getByText('클래식버거').click();
    await page.getByRole('button', { name: /개 추가/ }).click();

    // 주문하기 버튼
    await page.getByText('주문하기 →').click();
    await expect(page.getByRole('heading', { name: '장바구니' })).toBeVisible();

    // 결제하기 버튼 (Burger CartScreen: "결제하기 (N개)" 형식)
    await page.getByRole('button', { name: /결제하기/ }).click();
    await expect(page.getByRole('heading', { name: '결제하기' })).toBeVisible();

    // 결제 방식 선택 후 결제 버튼 클릭 (Burger: 별도 결제 버튼, 90% 성공률)
    await page.getByRole('button', { name: /원 결제/ }).click();

    // 결제 처리 대기 — 실패 시 다시 시도 버튼 클릭 후 재시도
    await page.waitForTimeout(3500);
    const retryBtn = page.getByRole('button', { name: '다시 시도' });
    if (await retryBtn.isVisible()) {
      await retryBtn.click();
      await page.getByRole('button', { name: /원 결제/ }).click();
    }
    await expect(page.getByRole('heading', { name: '주문 완료' })).toBeVisible({ timeout: 15000 });
  });

  test('18. 처음으로(메뉴에서) → 스토어 선택 화면 복귀', async ({ page }) => {
    await goToBurgerMenu(page);
    // 버거 메뉴 화면 하단의 처음으로 버튼 (BurgerApp.onExit 호출)
    await page.getByRole('button', { name: '처음으로' }).click();
    await expect(page.getByRole('heading', { name: 'NH Kiosk' })).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// E2E 전체 플로우
// ══════════════════════════════════════════════
test.describe('E2E 전체 플로우', () => {
  test('19. NH Cafe 처음부터 끝까지 full flow', async ({ page }) => {
    // 1. 스토어 선택
    await goToStoreSelector(page);
    await page.getByText('NH Cafe').first().click();
    await expect(page.getByRole('heading', { name: 'NH Cafe' })).toBeVisible();

    // 2. 매장식사 선택
    await page.getByText('매장 식사').click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();

    // 3. 카페라떼 선택
    await page.getByText('카페라떼').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();

    // 4. 옵션 설정
    await page.getByText('대 (L)').click();
    await page.getByText('차가운 (Iced) 🧊').click();

    // 5. 장바구니 추가
    await page.getByText('장바구니 추가').click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();

    // 6. 주문하기(장바구니로 이동)
    await page.getByText('주문하기 →').click();
    await expect(page.getByRole('heading', { name: '장바구니' })).toBeVisible();

    // 7. 결제 화면으로
    await page.getByRole('button', { name: /원 결제/ }).click();
    await expect(page.getByRole('heading', { name: '결제' })).toBeVisible();

    // 8. 신용카드 결제
    await page.getByText('신용카드').click();
    await expect(page.getByRole('heading', { name: '주문 완료' })).toBeVisible({ timeout: 10000 });

    // 9. 처음으로 → Cafe Home으로 (handleNewOrder → home)
    await page.getByRole('button', { name: '처음으로' }).click();
    await expect(page.getByRole('heading', { name: 'NH Cafe' })).toBeVisible();
  });

  test('20. NH Burger 처음부터 끝까지 full flow', async ({ page }) => {
    // 1. 스토어 선택
    await goToStoreSelector(page);
    await page.getByText('NH Burger').first().click();
    await expect(page.getByRole('heading', { name: 'NH Burger' })).toBeVisible();

    // 2. 매장식사 선택
    await page.getByText('매장 식사').click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();

    // 3. 치즈버거 선택
    await page.getByText('치즈버거').click();
    await expect(page.getByRole('heading', { name: '옵션 선택' })).toBeVisible();

    // 4. 세트 선택 → 사이드/음료 선택 노출
    await page.getByRole('button', { name: /세트/ }).click();
    // 사이드: 감자튀김 클릭
    await page.getByText('감자튀김').click();
    // 음료: 콜라 클릭
    await page.getByText('콜라').click();

    // 5. 장바구니 추가
    await page.getByRole('button', { name: /개 추가/ }).click();
    await expect(page.getByRole('heading', { name: '메뉴 선택' })).toBeVisible();

    // 6. 주문하기(장바구니로 이동)
    await page.getByText('주문하기 →').click();
    await expect(page.getByRole('heading', { name: '장바구니' })).toBeVisible();

    // 7. 결제하기 버튼
    await page.getByRole('button', { name: /결제하기/ }).click();
    await expect(page.getByRole('heading', { name: '결제하기' })).toBeVisible();

    // 8. 결제 버튼 클릭 (90% 성공률 — 실패 시 재시도)
    await page.getByRole('button', { name: /원 결제/ }).click();
    await page.waitForTimeout(3500);
    const retryBtn2 = page.getByRole('button', { name: '다시 시도' });
    if (await retryBtn2.isVisible()) {
      await retryBtn2.click();
      await page.getByRole('button', { name: /원 결제/ }).click();
    }

    // 9. 주문 완료 대기
    await expect(page.getByRole('heading', { name: '주문 완료' })).toBeVisible({ timeout: 15000 });

    // 10. 새로운 주문 시작 → Burger Home으로 (handleNewOrder → home)
    await page.getByRole('button', { name: '새로운 주문 시작' }).click();
    await expect(page.getByRole('heading', { name: 'NH Burger' })).toBeVisible();
  });
});
