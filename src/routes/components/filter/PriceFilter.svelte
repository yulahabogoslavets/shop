<script lang="ts">
	import { onMount } from 'svelte';
	let { items, minPrice = $bindable(), maxPrice = $bindable() } = $props();

	let initialMaxPrice = $state(0);
	let setMinPrice = (value: number) => (minPrice = value);
	let setMaxPrice = (value: number) => (maxPrice = value);

	onMount(() => {
		const max = Math.max(...items.map((p: { price: number }) => p.price));
		maxPrice = max;
		initialMaxPrice = max;

		const min = Math.min(...items.map((p: { price: number }) => p.price));
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

	<div class="mt-4 flex flex-col gap-2">
		<input
			type="range"
			bind:value={minPrice}
			min="0"
			max={initialMaxPrice}
			step="10"
			oninput={handlePriceChange}
			class="w-full"
		/>
		<input
			type="range"
			bind:value={maxPrice}
			min="0"
			max={initialMaxPrice}
			step="10"
			oninput={handlePriceChange}
			class="w-full"
		/>
	</div>
</div>
