<script lang="ts">
	import type { CartProduct } from '$lib/types';
	import Cart from './cart.svelte';

	let { data } = $props();

	let cartProductsMain = $state<CartProduct[]>([]);
</script>

<header class="flex items-center justify-between bg-gray-300 p-4">
	<a href="/" title="Start page">Shop</a>

	<div class="ml-auto">
		<label for="search" class="hidden"> Search </label>
		<input type="search" id="search" placeholder="Search" class="rounded p-1" />
	</div>

	<div class="relative ml-auto flex items-center">
		<Cart bind:cartProducts={cartProductsMain} />
	</div>
</header>

<main class="container mx-auto flex justify-between bg-gray-100 px-4 py-10">
	<aside>Filter</aside>

	<div class="grid grid-cols-2 gap-6">
		{#each data.products as product}
			<div class="overflow-hidden rounded-xl bg-white shadow-lg">
				<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
				<div class="p-4">
					<h2 class="mb-2 truncate text-lg font-medium text-gray-600">
						{product.title}
					</h2>
					<div class="flex items-center justify-between gap-4">
						<span class="text-xl font-bold">${product.price}</span>
						<button
							class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
							onclick={() => {
								cartProductsMain.push({
									id: crypto.randomUUID(),
									quantity: 1,
									product: product
								});
							}}>Add to cart</button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
