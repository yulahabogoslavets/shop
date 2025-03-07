<script lang="ts">
	export let sortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc' = 'rating_desc'; // Default to rating descending
	export let onSortChange: (
		newSortOption: 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc'
	) => void;

	// Handle change of sorting option
	function handleSortChange(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		onSortChange(selectElement.value as 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc');
	}
</script>

<div class="flex items-center gap-4">
	<span>Sort by:</span>
	<select
		class="rounded bg-sky-600 py-2 text-white"
		on:change={handleSortChange}
		bind:value={sortOption}
	>
		<option value="rating_desc">Most Liked (Rating)</option>
		<option value="rating_asc">Least Liked (Rating)</option>
		<option value="price_asc">Price: Low to High</option>
		<option value="price_desc">Price: High to Low</option>
	</select>
</div>
