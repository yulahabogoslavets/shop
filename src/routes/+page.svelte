<script lang="ts">
	import MultiSelectFilter from './components/filter/MultiSelectFilter.svelte';
	import PriceFilter from './components/filter/PriceFilter.svelte';
	import SortOptionFilter from './components/filter/SortOptionFilter.svelte';
	import StarRating from './components/StarRating.svelte';
	import { searchTerm } from '$lib/store/search';
	import ButtonAddToCart from './components/ButtonAddToCart.svelte';
	import LoadMore from './components/LoadMore.svelte';
	import SkeletonItem from './components/SkeletonItem.svelte';
	import Icon from '@iconify/svelte';
	import FocusTrap from '$lib/FocusTrap.svelte';
	import ScrollToTopButton from './components/ScrollToTopButton.svelte';

	let { data } = $props();

	let selectedCategories: string[] = $state([]);
	let selectedBrands: string[] = $state([]);
	let minPrice: number = $state(0);
	let maxPrice: number = $state(0);
	let sortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc' = $state('rating_desc');

	let visibleItemsCount = $state(10);
	let loading = $state(false);
	let allItemsLoaded = $state(false);

	let isOpen = $state(false);
	let toggleButton: HTMLButtonElement;

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

	// Filtered items based on criteria
	let filteredItems = $derived.by(() => {
		let filtered = data.products.filter((item) => {
			const matchesSearch = item.title.toLowerCase().includes($searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategories.length === 0 || selectedCategories.includes(item.category);
			const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
			const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

			return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
		});

		// Sort products based on selected option
		if (sortOption === 'price_asc') {
			filtered = filtered.sort((a, b) => a.price - b.price);
		} else if (sortOption === 'price_desc') {
			filtered = filtered.sort((a, b) => b.price - a.price);
		} else if (sortOption === 'rating_desc') {
			filtered = filtered.sort((a, b) => b.rating - a.rating);
		} else if (sortOption === 'rating_asc') {
			filtered = filtered.sort((a, b) => a.rating - b.rating);
		}

		return filtered;
	});

	// Handle sort changes
	function handleSortChange(
		newSortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc'
	) {
		sortOption = newSortOption;
	}

	// Load more items when triggered
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
		}, 500);
	}

	function openSidebar() {
		isOpen = true;
	}

	function closeSidebar() {
		isOpen = false;
		toggleButton?.focus();
	}
</script>

<main
	class="container mx-auto flex w-[85cqw] flex-col justify-between gap-4 py-10 lg:flex-row lg:gap-8"
>
	<!-- Mobile Toggle Button -->
	<button
		bind:this={toggleButton}
		class="group mx-4 flex items-center justify-center gap-2 rounded-sm bg-sky-700 px-4 py-2 text-white transition-all hover:bg-sky-800 hover:shadow-md focus:bg-sky-800 lg:hidden"
		onclick={openSidebar}
	>
		<Icon
			icon="line-md:filter"
			width="24"
			height="24"
			class="transition-transform group-hover:scale-110"
		/>
		<span>{isOpen ? 'Close Filters' : 'Filters and Sort'}</span>
	</button>

	<!-- Sidebar with Focus Trap -->
	<FocusTrap {isOpen} onClose={closeSidebar}>
		<aside
			class="fixed inset-0 z-50 w-full max-w-xs transform bg-white p-4 pb-8 shadow-md transition-transform duration-300 lg:sticky
			 lg:top-20 lg:z-0 lg:max-h-screen lg:rounded-sm
			{isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0"
			aria-modal="true"
			role="dialog"
			aria-label="Filter Products"
		>
			<!-- Close button for mobile -->
			<button
				class="absolute top-2 right-2 rounded-full bg-gray-200 p-2 lg:hidden"
				onclick={closeSidebar}
			>
				<Icon icon="line-md:close-small" width="24" height="24" />
			</button>

			<h3 class="mb-2 text-center text-lg font-medium">Filter</h3>

			<!-- Filters -->
			<MultiSelectFilter
				title="Filter by Category"
				items={categories}
				selected={selectedCategories}
				onChange={(updatedCategories: string[]) => (selectedCategories = updatedCategories)}
			/>

			<MultiSelectFilter
				title="Filter by Brand"
				items={brands}
				selected={selectedBrands}
				onChange={(updatedBrands: string[]) => (selectedBrands = updatedBrands)}
			/>

			<PriceFilter items={data.products} bind:minPrice bind:maxPrice />

			<div class="flex flex-col gap-2 py-4 lg:hidden">
				<SortOptionFilter {sortOption} onSortChange={handleSortChange} />
			</div>
		</aside>
	</FocusTrap>

	<!-- Mobile overlay to close sidebar -->
	{#if isOpen}
		<button
			class="fixed inset-0 z-10 bg-black/50 md:hidden"
			aria-label="Close sidebar"
			onclick={closeSidebar}
		></button>
	{/if}

	<section class="w-full lg:w-3/4">
		<div
			class="mb-4 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-2 sm:flex-row"
		>
			<span>
				<span class="font-semibold" role="status" aria-live="polite">{filteredItems.length}</span> products
			</span>

			<div class="hidden items-center gap-4 lg:flex">
				<SortOptionFilter {sortOption} onSortChange={handleSortChange} />
			</div>
		</div>

		<div class="grid gap-6 px-4 lg:grid-cols-2" aria-live="polite">
			{#if loading}
				<SkeletonItem count={visibleItemsCount} variant="list" />
			{:else}
				{#each filteredItems.slice(0, visibleItemsCount) as product}
					<div class="rounded-xl bg-white shadow-lg">
						<a
							href="/products/{product.id}"
							title="Show '{product.title}' details"
							aria-label="Show '{product.title}' details"
							class="group block h-48 overflow-hidden shadow-xs"
						>
							<img
								src={product.thumbnail}
								alt={product.title}
								class="h-full w-full object-contain transition-transform group-hover:scale-105"
								loading="lazy"
							/>
						</a>
						<div class="flex flex-col items-center gap-4 p-4">
							<h2
								class="bg-linear-to-r from-orange-600 to-sky-700 bg-clip-text text-center text-lg font-medium hyphens-auto text-gray-600 text-transparent"
							>
								{product.title}
							</h2>
							<span><StarRating rating={product.rating} /> {product.rating} </span>
							<div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
								<span class="text-xl font-bold">${product.price}</span>
								<ButtonAddToCart {product} />
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Load More Component -->
		{#if filteredItems.length > 5}
			<LoadMore {loading} {allItemsLoaded} loadMore={loadMoreItems} />
			<ScrollToTopButton />
		{/if}
		{#if filteredItems.length === 0}
			<p class="text-center text-gray-500">No products found.</p>
		{/if}
	</section>
</main>
