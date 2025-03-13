<script lang="ts">
	export let count: number = 1; // Number of skeleton items to render
	export let variant: 'list' | 'detail' = 'list'; // Variant for different views
</script>

{#each Array(count) as _}
	{#if variant === 'list'}
		<!-- Skeleton for product list (grid view) -->
		<div class="animate-pulse overflow-hidden rounded-xl bg-white shadow-lg">
			<div class="h-48 w-full bg-gray-300"></div>
			<div class="p-4">
				<div class="mb-2 h-6 w-3/4 rounded-sm bg-gray-300"></div>
				<div class="mb-2 h-4 w-1/2 rounded-sm bg-gray-300"></div>
				<div class="flex items-center justify-between gap-4">
					<div class="h-6 w-1/4 rounded-sm bg-gray-300"></div>
					<div class="h-8 w-8 rounded-sm bg-gray-300"></div>
				</div>
			</div>
		</div>
	{:else if variant === 'detail'}
		<!-- Skeleton for product detail page -->
		<div class="flex animate-pulse flex-col gap-6 md:flex-row">
			<div class="h-64 w-full rounded-lg bg-gray-300 md:w-1/2"></div>
			<div class="flex w-full flex-col gap-4 md:w-1/2">
				<div class="h-8 w-3/4 rounded-sm bg-gray-300"></div>
				<div class="h-4 w-1/2 rounded-sm bg-gray-300"></div>
				<div class="h-6 w-1/3 rounded-sm bg-gray-300"></div>
				<div class="h-10 w-1/2 rounded-sm bg-gray-300"></div>
				<div class="h-12 w-1/3 rounded-sm bg-gray-300"></div>
			</div>
		</div>
		<div class="flex animate-pulse flex-col gap-6">
			<div class="h-8 w-1/2 rounded-sm bg-gray-300"></div>
			<div class="h-6 w-1/3 rounded-sm bg-gray-300"></div>
			<div class="h-6 w-1/3 rounded-sm bg-gray-300"></div>
		</div>
	{/if}
{/each}
