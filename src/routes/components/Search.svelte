<script lang="ts">
	import { searchTerm } from '$lib/store/search';
</script>

<div class="ml-auto">
	<label for="search" class="hidden"> Search </label>
	<input
		type="search"
		id="search"
		placeholder="Search"
		class="rounded p-1"
		bind:value={$searchTerm}
	/>
</div>
