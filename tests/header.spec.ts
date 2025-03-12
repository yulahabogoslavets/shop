import { test, expect } from '@playwright/test';

test('header has the correct elements', async ({ page }) => {
	// Navigate to the homepage
	await page.goto('/');

	// Check that the header contains specific elements:
	// Check the logo link
	const logo = page.locator('header a[title="Start page"]');
	await expect(logo).toBeVisible();
	await expect(logo).toHaveAttribute('href', '/');

	// Check the search input
	const searchInput = page.locator('header input[type="search"]');
	await expect(searchInput).toBeVisible();
	await expect(searchInput).toHaveAttribute('placeholder', 'Search');

	// Check cart button
	const cartButton = page.locator('header button[title="Cart"]');
	await expect(cartButton).toBeVisible();
});
