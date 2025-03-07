<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let loading: boolean;
	export let allItemsLoaded: boolean;
	export let loadMore: () => void;

	let observer: IntersectionObserver;
	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !allItemsLoaded && !loading) {
					loadMore();
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

<div>
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

	<!-- Show "Load More" button if not all items are loaded -->
	{#if !allItemsLoaded && !loading}
		<div class="text-center">
			<button
				on:click={loadMore}
				class="rounded bg-sky-700 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-800"
			>
				Load More
			</button>
		</div>
	{/if}

	<!-- Show message when all items are loaded -->
	{#if allItemsLoaded}
		<div class="text-center text-gray-500">
			<span>No more items to load.</span>
		</div>
	{/if}
</div>
