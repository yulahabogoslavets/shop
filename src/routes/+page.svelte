<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import MultiSelectFilter from './components/filter/MultiSelectFilter.svelte';
	import PriceFilter from './components/filter/PriceFilter.svelte';
	import SortOptionFilter from './components/filter/SortOptionFilter.svelte';
	import StarRating from './components/StarRating.svelte';
	import { searchTerm } from '$lib/store/search';
	import ButtonAddToCart from './components/ButtonAddToCart.svelte';

	let { data } = $props();

	let selectedCategories: string[] = $state([]);
	let selectedBrands: string[] = $state([]);

	let minPrice: number = $state(0);
	let maxPrice: number = $state(0);

	let sortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc' = $state('rating_desc');

	let visibleItemsCount = $state(10);
	let loading = $state(false);
	let allItemsLoaded = $state(false);

	// Calculate unique categories with counts
	let categories = $derived.by(() => {
		const counts = data.products.reduce((acc: { [key: string]: number }, product) => {
			acc[product.category] = (acc[product.category] || 0) + 1;
			return acc;
		}, {});
		return Object.entries(counts).map(([key, count]) => ({
			label: key,
			value: key,
			count
		}));
	});

	let brands = $derived.by(() => {
		const counts = data.products.reduce((acc: { [key: string]: number }, product) => {
			acc[product.brand] = (acc[product.brand] || 0) + 1;
			return acc;
		}, {});
		return Object.entries(counts).map(([key, count]) => ({
			label: key,
			value: key,
			count
		}));
	});

	// Filter products by search term, selected categories, and selected brands
	let filteredItems = $derived.by(() => {
		let filtered = data.products.filter((item) => {
			const matchesSearch = item.title.toLowerCase().includes($searchTerm.toLowerCase()); // Use get() here
			const matchesCategory =
				selectedCategories.length === 0 || selectedCategories.includes(item.category);
			const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
			const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

			return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
		});

		// Sort products based on the selected sort option
		if (sortOption === 'price_asc') {
			filtered = filtered.sort((a, b) => a.price - b.price); // Price Ascending
		} else if (sortOption === 'price_desc') {
			filtered = filtered.sort((a, b) => b.price - a.price); // Price Descending
		} else if (sortOption === 'rating_desc') {
			filtered = filtered.sort((a, b) => b.rating - a.rating); // Most Liked (Rating Descending)
		} else if (sortOption === 'rating_asc') {
			filtered = filtered.sort((a, b) => a.rating - b.rating); // Least Liked (Rating Ascending)
		}

		return filtered;
	});

	function handleSortChange(
		newSortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc'
	) {
		sortOption = newSortOption;
	}

	// Function to handle loading more products when needed
	function loadMoreItems() {
		if (filteredItems.length <= visibleItemsCount) {
			allItemsLoaded = true;
			loading = false;
			return;
		}
		loading = true;

		setTimeout(() => {
			if (filteredItems.length <= visibleItemsCount + 5) {
				visibleItemsCount = filteredItems.length;
			} else {
				visibleItemsCount += 5;
			}
			loading = false;
		}, 1000);
	}

	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					loadMoreItems();
				}
			},
			{ threshold: 1.0 }
		);

		const loadMoreElement = document.getElementById('load-more-trigger');
		if (loadMoreElement) {
			observer.observe(loadMoreElement);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<main class="container mx-auto flex justify-between gap-4 bg-gray-100 px-4 py-10">
	<aside class="sticky top-0 z-50 max-h-screen w-1/4 overflow-auto rounded p-4 shadow-md">
		<h3 class="mb-2 text-center text-lg font-medium">Filter</h3>
		<!-- Category Filter -->
		<MultiSelectFilter
			title="Filter by Category"
			items={categories}
			selected={selectedCategories}
			onChange={(updatedCategories: string[]) => (selectedCategories = updatedCategories)}
		/>

		<!-- Brand Filter -->
		<MultiSelectFilter
			title="Filter by Brand"
			items={brands}
			selected={selectedBrands}
			onChange={(updatedBrands: string[]) => (selectedBrands = updatedBrands)}
		/>

		<!-- Price Filter -->
		<PriceFilter items={data.products} bind:minPrice bind:maxPrice />
	</aside>

	<section class="w-3/4">
		<div class="mb-4 flex items-center justify-between">
			<span role="status">
				{filteredItems.length} products
			</span>

			<SortOptionFilter {sortOption} onSortChange={handleSortChange} />
		</div>
		<div class="grid grid-cols-2 gap-6" aria-live="polite">
			{#each filteredItems as product}
				<div class="overflow-hidden rounded-xl bg-white shadow-lg">
					<a
						href="/products/{product.id}"
						title="Show '{product.title}' details"
						aria-label="Show '{product.title}' details"
					>
						<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
					</a>
					<div class="p-4">
						<h2 class="mb-2 truncate text-lg font-medium text-gray-600">
							{product.title}
						</h2>
						<span><StarRating rating={product.rating} /> {product.rating} </span>
						<div class="flex items-center justify-between gap-4">
							<span class="text-xl font-bold">${product.price}</span>
							<ButtonAddToCart {product} />
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Load More Trigger Element -->
		<div id="load-more-trigger" class="h-10"></div>

		<!-- Loading Spinner (only visible while loading) -->
		{#if loading}
			<div class="my-4 text-center">
				<svg
					class="mx-auto h-8 w-8 animate-spin text-blue-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
					></path>
				</svg>
			</div>
		{/if}
	</section>
</main>
