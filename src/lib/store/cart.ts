import { writable } from 'svelte/store';
import type { CartProduct } from '$lib/types';

// Create a writable store for cart products
export const cartProductsMain = writable<CartProduct[]>([]);

// Function to add an item to the cart
export function addToCart(product: CartProduct['product']) {
	cartProductsMain.update((cart) => {
		const existingProduct = cart.find((p) => p.product.id === product.id);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			cart.push({
				id: crypto.randomUUID(),
				quantity: 1,
				product
			});
		}
		return cart; // Return the updated cart array
	});
}
