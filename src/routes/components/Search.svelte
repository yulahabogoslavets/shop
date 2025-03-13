<script lang="ts">
	import { searchTerm } from '$lib/store/search';
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	const isOpen = writable(false);

	function toggleSearch() {
		isOpen.update((state) => !state);
	}

	function closeSearch() {
		isOpen.set(false);
	}
</script>

<!-- Desktop Search -->
<div class="relative ml-auto hidden lg:block lg:w-full lg:max-w-sm">
	<label for="search" class="sr-only">Search</label>
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
		class="w-full rounded-sm border border-gray-300 py-1 pl-10 pr-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
		bind:value={$searchTerm}
	/>
</div>

<!-- Mobile Search -->
<div class="relative ml-auto lg:hidden">
	<!-- Search Button -->
	<button
		onclick={toggleSearch}
		aria-label={$isOpen ? 'Close search' : 'Open search'}
		class="rounded-md bg-sky-700 p-2 text-white transition-all hover:bg-sky-800 hover:shadow-md focus:ring-2 focus:ring-blue-500"
	>
		<Icon icon={$isOpen ? 'line-md:close-small' : 'mdi-light:magnify'} width="24" height="24" />
	</button>

	{#if $isOpen}
		<!-- Full-width Search Input -->
		<div class="fixed left-0 top-16 z-50 w-screen bg-orange-50 pb-2 shadow-md transition-all">
			<div class="relative mx-auto flex w-full max-w-xs items-center">
				<Icon
					icon="mdi-light:magnify"
					width="24"
					height="24"
					class="absolute left-4 text-gray-500"
				/>

				<input
					type="search"
					id="search"
					placeholder="Search"
					class="w-full rounded-sm border border-gray-300 py-1 pl-10 pr-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
					bind:value={$searchTerm}
				/>

				<!-- Close Button -->
				<button
					onclick={closeSearch}
					class="absolute right-4 text-gray-500"
					aria-label="Close search"
				>
					<Icon icon="line-md:close-small" width="24" height="24" />
				</button>
			</div>
		</div>
	{/if}
</div>
