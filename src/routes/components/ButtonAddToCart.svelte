<script lang="ts">
	import type { Product } from '$lib/types';
	import { addToCart, cartProductsMain } from '$lib/store/cart';
	export let product: Product;

	let quantityInCart = 0;
	let isMaxReached = false;
	cartProductsMain.subscribe((cart) => {
		const cartItem = cart.find((item) => item.product.id === product.id);
		quantityInCart = cartItem ? cartItem.quantity : 0;
		isMaxReached = quantityInCart >= product.stock;
	});
</script>

<button
	class="w-full rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-500 md:w-fit"
	onclick={() => addToCart(product)}
	disabled={!product || quantityInCart >= product.stock}
>
	{#if quantityInCart > 0}
		{#if isMaxReached}
			<span>Max quantity reached ({quantityInCart}/{product.stock})</span>
		{:else}
			<span>Add to cart ({quantityInCart}/{product.stock})</span>
		{/if}
	{:else}
		<span>Add to cart </span>
	{/if}
</button>
