import { test, expect } from '@playwright/test';

test("Login สำเร็จด้วย username เท่ากับ user_15 password เท่ากับ P@ssw0rd ค้นหาสินค้า Balance Training Bicycle สั่งซื้อ 3 ชิ้ิ้น จัดส่งด้วย  Thaipost และชำระเงินด้วยบัตรเครดิตสำเร็จ", async ({ page }) => {
  await test.step("เปิด Browser แล้วไปยังหน้าที่จะทดสอบ", async() => {
    await page.goto("http://139.59.225.96/auth/login");
    });

  await test.step("Loin เข้าสู่ระบบ username เท่ากับ user_15 password เท่ากับ P@ssw0rd", async() => {
    await page.locator("#login-username-input").fill("user_15")
    await page.locator("#login-password-input").fill("P@ssw0rd")
    await page.locator("#login-btn").click();
  });

  await test.step("ค้นหาสินค้าด้วยคำว่า Bicycle", async () => {
    await page.locator("#search-product-input").fill("Bicycle");
    await page.locator("#search-product-input").press("Enter");
  });

  await test.step("ตรวจสอบผลการค้นหาสินค้า และเข้าดูข้อมูลสินค้า", async () => {
    await expect(page.locator("#product-card-name-1")).toHaveText("Balance Training Bicycle");
    await expect(page.locator("#product-card-price-1")).toHaveText("฿4,314.60");
    await page.locator("#product-card-name-1").click();
  });
  await test.step("ตรวจสอบข้อมูลราคา และแต้มที่จะได้รับ", async () => {
    await expect(page.locator("#product-detail-product-name")).toHaveText("Balance Training Bicycle");
    await expect(page.locator("#product-detail-price-thb")).toHaveText("฿4,314.60");
    await expect(page.locator("#product-detail-point")).toHaveText("43 Points");
  })
  await test.step("เลือกจำนวนสินค้า และกด Add to Cart", async () => {
    await page.locator("[id='product-detail-quantity-increment-btn']").click({ clickCount : 2});
    await page.locator("[id='product-detail-add-to-cart-btn']").click();
    await expect(page.locator("[id='header-menu-cart-badge']")).toHaveText('1');
  });
});

