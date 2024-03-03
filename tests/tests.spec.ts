import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test('price from should filter products', async ({ page }) => {
  const initialProductListLength = (
    await page.locator('app-products-list>ul li').all()
  ).length
  expect(initialProductListLength).toBe(10)

  await page.getByRole('slider').fill('1512')

  const filteredProductListLength = (
    await page.locator('app-products-list>ul li').all()
  ).length
  expect(filteredProductListLength).not.toBe(initialProductListLength)
})

test('category should filter products', async ({ page }) => {
  const initialProductListLength = (
    await page.locator('app-products-list>ul li').all()
  ).length
  expect(initialProductListLength).toBe(10)

  await page.getByRole('combobox').selectOption('smartphones')

  const filteredProductListLength = (
    await page.locator('app-products-list>ul li').all()
  ).length
  expect(filteredProductListLength).not.toBe(initialProductListLength)
})

test('cart should open', async ({ page }) => {
  const button = page.locator('app-cart').getByRole('button').first()
  const aside = page.locator('app-cart>aside')
  expect(await aside.getAttribute('class')).toContain('translate-x-full')
  await button.click()
  expect(await aside.getAttribute('class')).toContain('translate-x-0')
})

test('products should be added to cart', async ({ page }) => {
  const product = page.locator('app-products-list>ul li').first()
  const button = product.getByRole('button')
  expect(await button.getAttribute('class')).toContain('bg-blue-400')

  await button.click()
  expect(await button.getAttribute('class')).toContain('bg-red-400')

  const cartProds = page.locator('app-cart>aside>ul li').all()
  const cartProdsLength = (await cartProds).length

  const productText = await product.textContent()
  const expectedProductText = productText?.split(' ').slice(0, 2).join(' ')
  const cartProductText = await (await cartProds).at(0)?.textContent()

  expect(cartProdsLength).toBe(1)
  expect(cartProductText).toContain(expectedProductText)
})

test('product should be removed from cart', async ({ page }) => {
  const product = page.locator('app-products-list>ul li').first()
  const button = product.getByRole('button')
  expect(await button.getAttribute('class')).toContain('bg-blue-400')

  await button.click()
  expect(await button.getAttribute('class')).toContain('bg-red-400')

  await button.click()
  expect(await button.getAttribute('class')).toContain('bg-blue-400')

  const cartProds = page.locator('app-cart>aside>ul li').all()
  const cartProdsLength = (await cartProds).length

  expect(cartProdsLength).toBe(0)
})

test('products should be removed from cart when clear cart clicked', async ({
  page,
}) => {
  await page
    .locator('app-products-list>ul li')
    .first()
    .getByRole('button')
    .click()
  await page.locator('app-cart').getByRole('button').first().click()

  const initialCartProds = (
    await page.locator('app-cart>aside>ul cart-item').all()
  ).length

  expect(initialCartProds).toBe(1)

  await page.getByRole('complementary').getByRole('button').nth(1).click()

  const expectedCartProds = (
    await page.locator('app-cart>aside>ul cart-item').all()
  ).length

  expect(expectedCartProds).not.toBe(initialCartProds)
})
