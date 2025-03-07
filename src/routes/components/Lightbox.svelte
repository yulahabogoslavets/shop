<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	export let src = '';
	export let alt = '';
	export let classImg = '';
	let isOpen = false;

	function openLightbox() {
		isOpen = true;
	}

	function closeLightbox() {
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeLightbox();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div
	class="flex w-fit items-center justify-center overflow-hidden rounded-lg border border-gray-300 {classImg}"
>
	<!-- Clickable Thumbnail -->
	<button type="button" onclick={openLightbox} class="group">
		<img {src} {alt} class="w-full transition-transform duration-300 group-hover:scale-110" />
	</button>

	{#if isOpen}
		<!-- Lightbox Modal -->
		<div class="lightbox fixed left-0 top-0 z-50 h-screen w-screen bg-black/80">
			<div class="lightbox-overlay">
				<button class="mt-8 flex w-11/12 justify-end text-4xl text-white" onclick={closeLightbox}>
					&times;
				</button>
				<div class="max-w-11/12 max-h-11/12 flex items-center justify-center">
					<img {src} {alt} class="max-h-full max-w-full rounded-lg bg-white" />
				</div>
			</div>
		</div>
	{/if}
</div>
