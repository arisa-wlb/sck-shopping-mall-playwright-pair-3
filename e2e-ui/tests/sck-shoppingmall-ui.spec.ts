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

  await test.step("ตรวจสอบผลการค้นหาสินค้า พบชื่อสินค้า Balance Training Bicycle ราคา ฿4,314.60 และเข้าดูข้อมูลสินค้า", async () => {
    await expect(page.locator("#product-card-name-1")).toHaveText("Balance Training Bicycle");
    await expect(page.locator("#product-card-price-1")).toHaveText("฿4,314.60");
    await page.locator("#product-card-name-1").click();
  });

  await test.step("ตรวจสอบข้อมูลสินค้าในหน้า Product Detail พบชื่อสินค้า Balance Training Bicycle ราคา ฿4,314.60 และแต้มที่จะได้รับ 43 Points", async () => {
    await expect(page.locator("#product-detail-product-name")).toHaveText("Balance Training Bicycle");
    await expect(page.locator("#product-detail-price-thb")).toHaveText("฿4,314.60");
    await expect(page.locator("#product-detail-point")).toHaveText("43 Points");
  })

  await test.step("เพิ่มสินค้าลงตะกร้าเป็นจำนวน 3 ชิ้น", async () => {
    await page.locator("[id='product-detail-quantity-increment-btn']").click({ clickCount : 2});
    await page.locator("[id='product-detail-add-to-cart-btn']").click();
    await expect(page.locator("[id='header-menu-cart-badge']")).toHaveText('1');
  });

  await test.step('ตรวจสอบข้อมูลในตะกร้า พบชื่อสินค้า Balance Training Bicycle จำนวน 3 ชิ้น ราคา ฿12,943.80 จำนวนแต้ม 129 Points และยอดรวมราคา ฿12,943.80', async ({ }) => {
    await page.locator('#header-menu-cart-btn').click();
    await expect(page.locator('#product-1-name')).toHaveText('Balance Training Bicycle');
    await expect(page.locator('#product-1-price')).toHaveText('฿12,943.80');
    await expect(page.locator('#product-1-point')).toHaveText('129 Points');
    await expect(page.locator('#product-1-quantity-input')).toHaveValue('3');
    await expect(page.locator('#shopping-cart-subtotal-price')).toHaveText('฿12,943.80');
  });

  await test.step('กด Checkout และกรอกที่อยู่จัดส่ง โดยมีรายละเอียดดังนี้ ชื่อ เกษรา นามสกุล ปิยะชนกวงศ์ รายละเอียดที่อยู่ 1112 ม.3 ซ.ด่านสำโรง33/3 ถ.สุขุมวิท113 ตำบล สำโรงเหนือ อำเภอ เมืองสมุทรปราการ จังหวัด สมุทรปราการ รหัสไปรษณีย์ 10270 เบอร์โทร 0802101111',async ()=> {
    await page.locator('#shopping-cart-checkout-btn').click();
    await page.locator('#shipping-form-first-name-input').fill('เกษรา');
    await page.locator('#shipping-form-last-name-input').fill('ปิยะชนกวงศ์');
    await page.locator('#shipping-form-address-input').fill('1112 ม.3 ซ.ด่านสำโรง33/3 ถ.สุขุมวิท113');
    await page.locator('#shipping-form-province-select').selectOption('สมุทรปราการ');
    await page.locator('#shipping-form-district-select').selectOption('เมืองสมุทรปราการ');
    await page.locator('#shipping-form-sub-district-select').selectOption('สำโรงเหนือ');
    await page.locator('#shipping-form-mobile-input').fill('0802101111');

    await expect(page.locator('#shipping-form-zipcode-input')).toHaveValue('10270');
  });
});

