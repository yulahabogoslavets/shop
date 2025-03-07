<script lang="ts">
	import { onMount } from 'svelte';
	let { items, minPrice = $bindable(), maxPrice = $bindable() } = $props();

	let initialMaxPrice: number;
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
		if (minPrice >= maxPrice) {
			setMaxPrice(minPrice + 10);
		}
		if (maxPrice <= minPrice) {
			setMinPrice(maxPrice - 10);
		}
	}
</script>

<div class="mb-4">
	<h3 class="mb-2 text-lg font-medium">Price Filter</h3>

	<div class="flex items-center gap-2">
		<input
			type="number"
			bind:value={minPrice}
			class="w-full rounded border p-2 text-sm"
			min={minPrice}
			step="10"
			oninput={handlePriceChange}
		/>
		<span>-</span>

		<input
			type="number"
			bind:value={maxPrice}
			class="w-full rounded border p-2 text-sm"
			min={minPrice}
			max={maxPrice}
			step="10"
			oninput={handlePriceChange}
		/>
	</div>
</div>
