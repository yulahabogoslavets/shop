<script lang="ts">
	import { searchTerm } from '$lib/store/search';
	import Icon from '@iconify/svelte';
</script>

<div class="relative ml-auto w-full max-w-28">
	<label for="search" class="hidden"> Search </label>
	<Icon
		icon="mdi-light:magnify"
		width="24"
		height="24"
		class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
	/>
	<input
		type="search"
		id="search"
		placeholder="Search"
		class="w-full rounded border border-gray-300 py-1 pl-10 pr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		bind:value={$searchTerm}
	/>
</div>
