<script>
	export let rating = 0;
	export let maxStars = 5;
</script>

<div class="inline-flex gap-0.5 text-xl text-yellow-200">
	{#each Array(maxStars) as _, i}
		{#if i < Math.floor(rating)}
			<span class="text-yellow-200">★</span>
		{:else if i < rating}
			<span class="text-gray-600">☆</span>
		{:else}
			<span class="text-gray-300">☆</span>
		{/if}
	{/each}
</div>
