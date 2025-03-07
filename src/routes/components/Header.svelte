<script lang="ts">
	import Cart from './cart/cart.svelte';
	import { cartProductsMain } from '$lib/store/cart';
	import Search from './Search.svelte';
	import { page } from '$app/state';
</script>

<header class="flex items-center justify-between bg-gray-300 p-4">
	<a href="/" title="Start page">Shop</a>

	{#if !page.params?.id}
		<Search />
	{/if}

	<div class="relative ml-auto flex items-center">
		<Cart bind:cartProducts={$cartProductsMain} />
	</div>
</header>
