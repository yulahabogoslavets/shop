import { writable } from 'svelte/store';
import type { CartProduct } from '$lib/types';

export const cartProductsMain = writable<CartProduct[]>([]);

export function addToCart(product: CartProduct['product']) {
	cartProductsMain.update((cart) => {
		const existingProduct = cart.find((p) => p.product.id === product.id);
		if (existingProduct) {
			if (existingProduct.quantity < product.stock) {
				existingProduct.quantity += 1;
			}
		} else {
			cart.push({
				id: crypto.randomUUID(),
				quantity: 1,
				product
			});
		}
		return cart;
	});
}
