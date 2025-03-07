<script lang="ts">
	import type { CartProduct } from '$lib/types';
	import { onMount } from 'svelte';
	import CartItem from './cart-item.svelte';
	import Icon from '@iconify/svelte';

	onMount(() => {
		const savedCart = localStorage.getItem('cart');

		if (savedCart) {
			cartProducts = JSON.parse(savedCart);
		}
	});

	type Props = {
		cartProducts: CartProduct[];
	};

	let { cartProducts = $bindable() }: Props = $props();
	let cartOpen = $state(false);

	$effect(() => {
		localStorage.setItem('cart', JSON.stringify(cartProducts));
	});

	const cartStats = $derived.by(() => {
		let quantity = 0;
		let total = 0;
		for (const product of cartProducts) {
			quantity += product.quantity;
			total += product.product.price * product.quantity;
		}
		return {
			quantity,
			total
		};
	});

	function removeFromCart(id: string) {
		cartProducts = cartProducts.filter((product) => product.id !== id);
	}
</script>

<button
	onclick={() => (cartOpen = !cartOpen)}
	class="group flex items-center gap-2 rounded-lg bg-sky-700 p-2 py-2 text-white transition-all hover:bg-sky-800 hover:shadow-md focus:bg-sky-800 sm:px-4"
	title="Cart"
	aria-label="Cart"
>
	<Icon
		icon="mdi-light:cart"
		width="24"
		height="24"
		class="transition-transform group-hover:scale-110"
	/>
	<span class="hidden sm:block">
		Cart {#if cartStats.quantity > 0}({cartStats.quantity}){/if}
	</span>
</button>

{#if cartOpen}
	<div class="absolute right-0 top-8 z-10 mt-2 w-80 rounded-lg bg-white shadow-xl">
		<div class="relative p-4">
			<h2 class="mb-4 text-lg font-semibold">Your Cart</h2>
			<button
				class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
				aria-label="close cart"
				onclick={() => (cartOpen = false)}
			>
				x
			</button>
			{#each cartProducts as _, i}
				<CartItem bind:cartProduct={cartProducts[i]} removeItem={removeFromCart} />
			{/each}

			{#if cartProducts.length === 0}
				<p class="text-gray-500">Your cart is empty</p>
			{/if}

			{#if cartProducts.length > 0}
				<div class="mt-4 border-gray-200 pt-4">
					<p class="text-lg font-semibold">Total: ${cartStats.total.toFixed(2)}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
