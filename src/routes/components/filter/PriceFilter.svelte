<script lang="ts">
	import { onMount } from 'svelte';
	let { items, minPrice = $bindable(), maxPrice = $bindable() } = $props();

	let initialMaxPrice = $state(0);
	let initialMinPrice = $state(0);
	let hasPriceFilterChanged = $state(false);

	onMount(() => {
		const max = Math.max(...items.map((p: { price: number }) => p.price));
		const min = Math.min(...items.map((p: { price: number }) => p.price));
		maxPrice = max;
		initialMaxPrice = max;
		minPrice = min;
		initialMinPrice = min;
	});

	function handlePriceChange() {
		if (minPrice < 0) {
			minPrice = 0;
		}
		if (minPrice > maxPrice) {
			maxPrice = minPrice;
		}

		hasPriceFilterChanged = minPrice !== initialMinPrice || maxPrice !== initialMaxPrice;
	}

	function clearPriceFilter() {
		minPrice = initialMinPrice;
		maxPrice = initialMaxPrice;
		hasPriceFilterChanged = false;
	}
</script>

<div class="my-4">
	<div class="mb-2 flex items-center justify-between gap-4">
		<h4 class="text-sm font-medium">Price Filter</h4>

		<!-- Clear filter button only if the filter has changed -->
		{#if hasPriceFilterChanged}
			<button
				class="w-fit rounded bg-sky-700 p-2 text-left text-sm text-white transition-all hover:bg-sky-800 hover:shadow-md focus:bg-sky-800"
				onclick={clearPriceFilter}
			>
				Clear Price Filter
			</button>
		{/if}
	</div>

	<div class="flex items-center gap-2">
		<input
			type="number"
			id="min-price"
			bind:value={minPrice}
			class="w-full rounded border p-2 text-sm"
			min="0"
			step="10"
			oninput={handlePriceChange}
			aria-label="Minimum Price"
		/>
		<span>-</span>
		<input
			type="number"
			id="max-price"
			bind:value={maxPrice}
			class="w-full rounded border p-2 text-sm"
			min="0"
			max={maxPrice}
			step="10"
			oninput={handlePriceChange}
			aria-label="Maximum Price"
		/>
	</div>

	<!-- Range sliders -->
	<div class="relative my-6 w-full">
		<div class="absolute h-1 w-full rounded-sm bg-gray-300"></div>
		<div
			class="absolute h-1 w-full rounded-sm bg-sky-700"
			style="left: {(minPrice / initialMaxPrice) * 100}%; width: {((maxPrice - minPrice) /
				initialMaxPrice) *
				100}%"
		></div>
		<input
			type="range"
			min="0"
			max={initialMaxPrice}
			step="10"
			bind:value={minPrice}
			oninput={handlePriceChange}
			aria-label="Minimum Price"
		/>
		<input
			type="range"
			min="0"
			max={initialMaxPrice}
			step="10"
			bind:value={maxPrice}
			oninput={handlePriceChange}
			aria-label="Maximum Price"
		/>
	</div>
</div>

<style>
	input[type='range'] {
		position: absolute;
		width: 100%;
		height: 8px;
		background: none;
	}

	input[type='range']::-webkit-slider-thumb,
	input[type='range']::-moz-range-thumb {
		width: 24px;
		height: 24px;
		background: blue;
		border-radius: 50%;
		cursor: pointer;
		pointer-events: all;
	}
</style>
