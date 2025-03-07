<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let showButton = false;

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});

	function handleScroll() {
		showButton = window.scrollY > 100;
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<button
	class="fixed bottom-4 right-4 transform rounded-full bg-sky-700 p-2 text-white shadow-lg transition-transform hover:scale-105 focus:scale-105"
	style="display: {showButton ? 'block' : 'none'}"
	onclick={scrollToTop}
	aria-label="Scroll to Top"
	title="Scroll to Top"
>
	<Icon icon="line-md:arrow-up" width="24" height="24" />
</button>
