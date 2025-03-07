<script lang="ts">
	import { onMount } from 'svelte';

	export let isOpen = false;
	export let onClose: () => void;
	let container: HTMLElement;

	function trapFocus(event: KeyboardEvent) {
		const focusableElements = container?.querySelectorAll(
			'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		if (!focusableElements?.length) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.key === 'Tab') {
			if (event.shiftKey && document.activeElement === firstElement) {
				// Shift + Tab on first element → Move focus to last
				event.preventDefault();
				(lastElement as HTMLElement).focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				// Tab on last element → Move focus to first
				event.preventDefault();
				(firstElement as HTMLElement).focus();
			}
		} else if (event.key === 'Escape') {
			onClose();
		}
	}

	onMount(() => {
		if (isOpen) {
			container?.focus();
			document.addEventListener('keydown', trapFocus);
		}
	});
</script>

<!-- Slot for the content -->
<div bind:this={container} tabindex="-1">
	<slot />
</div>
