<script lang="ts">
	import Cart from './cart/cart.svelte';
	import { cartProductsMain } from '$lib/store/cart';
	import Search from './Search.svelte';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
</script>

<header class="sticky top-0 z-50 bg-orange-50 p-4 shadow-lg">
	<div class="container mx-auto flex items-center justify-between gap-2">
		<a href="/" title="Start page" aria-label="Start page" class="group">
			<Icon
				icon="mdi-light:home"
				class="h-6 w-6 text-sky-500 transition-colors delay-300 group-hover:text-sky-700"
			/>
		</a>

		{#if !page.params?.id}
			<Search />
		{/if}

		<div class="relative ml-auto flex items-center">
			<Cart bind:cartProducts={$cartProductsMain} />
		</div>
	</div>
</header>
