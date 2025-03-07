<script lang="ts">
	import type { CartProduct } from '$lib/types';
	import Cart from './components/cart/cart.svelte';

	let { data } = $props();

	let cartProductsMain = $state<CartProduct[]>([]);

	// Function to add product to cart or increase quantity if already exists
	function addToCart(product: CartProduct['product']) {
		// Check if product already exists in the cart
		const existingProduct = cartProductsMain.find((p) => p.product.id === product.id);

		if (existingProduct) {
			// Increase the quantity if the product is already in the cart
			existingProduct.quantity += 1;
		} else {
			// Add the product as a new entry in the cart
			cartProductsMain.push({
				id: crypto.randomUUID(),
				quantity: 1,
				product
			});
		}
	}

	let searchTerm: string = $state('');
	let selectedCategory: string = $state('');

	let categories = $derived.by(() => {
		return Array.from(new Set(data.products.map((item) => item.category)));
	});

	let filteredItems = $derived.by(() => {
		return data.products.filter((item) => {
			const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = selectedCategory ? item.category === selectedCategory : true; // Show all if no category selected
			return matchesSearch && matchesCategory;
		});
	});
</script>

<header class="flex items-center justify-between bg-gray-300 p-4">
	<a href="/" title="Start page">Shop</a>

	<div class="ml-auto">
		<label for="search" class="hidden"> Search </label>
		<input
			type="search"
			id="search"
			placeholder="Search"
			class="rounded p-1"
			bind:value={searchTerm}
		/>
	</div>

	<div class="relative ml-auto flex items-center">
		<Cart bind:cartProducts={cartProductsMain} />
	</div>
</header>

<main class="container mx-auto flex justify-between bg-gray-100 px-4 py-10">
	<aside class="w-1/4">
		<h3 class="mb-2 text-lg font-medium">Filter by Category</h3>
		<select bind:value={selectedCategory} class="w-full rounded border border-gray-300 p-2">
			<option value="">All Categories</option>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</aside>

	<div class="grid grid-cols-2 gap-6">
		{#each filteredItems as product}
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
							onclick={() => addToCart(product)}>Add to cart</button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
