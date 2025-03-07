<script lang="ts">
	import { onMount } from 'svelte';
	let { items, minPrice = $bindable(), maxPrice = $bindable() } = $props();

	let initialMaxPrice = $state(0);

	onMount(() => {
		const max = Math.max(...items.map((p: { price: number }) => p.price));
		const min = Math.min(...items.map((p: { price: number }) => p.price));
		maxPrice = max;
		initialMaxPrice = max;
		minPrice = min;
	});

	function handlePriceChange() {
		if (minPrice < 0) {
			minPrice = 0;
		}
		if (minPrice > maxPrice) {
			maxPrice = minPrice;
		}
	}
</script>

<div class="mb-4">
	<h4 class="mb-2 text-sm font-medium">Price Filter</h4>

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
	<div class="relative mt-4 w-full">
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
			class="w-full"
		/>
		<input
			type="range"
			min="0"
			max={initialMaxPrice}
			step="10"
			bind:value={maxPrice}
			oninput={handlePriceChange}
			class="w-full"
		/>
	</div>
</div>

<style>
	input[type='range'] {
		position: absolute;
		width: 100%;
		height: 6px;
		background: none;
		pointer-events: none;
		-webkit-appearance: none;
	}

	input[type='range']::-webkit-slider-thumb,
	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background: blue;
		border-radius: 50%;
		cursor: pointer;
		pointer-events: all;
	}
</style>
