import { test, expect } from '@playwright/test';

test('list products', async ({ page }) => {
	// Navigate to the homepage
	await page.goto('/');

	// Wait for the main content to load
	await page.waitForSelector('main');

	// Check for the number of products listed
	const productCount = await page.locator('section span[role="status"]').innerText();
	expect(productCount).toMatch(/^\d+$/); // Ensure it matches the expected product count format like "1 products"

	// Ensure there is at least one product visible in the list
	const productList = page.locator('section div[aria-live="polite"]'); // Selector for the product card
	await expect(productList).toBeVisible();

	// Locate the product link by its attributes (use the title or aria-label)
	const productLink = page.locator('a[title="Show \'Essence Mascara Lash Princess\' details"]');

	// Get the href attribute
	const href = await productLink.getAttribute('href');

	// Assert the href attribute is correct (assuming the expected href is "/products/1")
	expect(href).toBe('/products/1');

	productLink.click();

	// Wait for the product page to load
	await page.waitForSelector('main');
	const productTitle = await page.locator('h1').innerText();
	expect(productTitle).toBe('Essence Mascara Lash Princess');
});
