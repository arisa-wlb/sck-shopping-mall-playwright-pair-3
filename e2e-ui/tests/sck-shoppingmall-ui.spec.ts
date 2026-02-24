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
    await page.locator("#l")

  });
});

