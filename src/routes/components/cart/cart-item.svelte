<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { CartProduct } from '$lib/types';

	type Props = {
		cartProduct: CartProduct;
		removeItem: (id: string) => void;
	};

	let { cartProduct = $bindable(), removeItem }: Props = $props();

	let stock = cartProduct.product.stock;
</script>

<div class="flex items-center justify-between gap-2 border-b border-gray-200 py-2">
	<div class="flex items-center">
		<img
			src={cartProduct.product.thumbnail}
			alt="Product"
			class="mr-4 size-12 rounded object-cover"
		/>
		<div>
			<p class="font-medium">{cartProduct.product.title}</p>
			<p class="text-sm">${cartProduct.product.price} each</p>
		</div>
	</div>
	<div class="flex items-center">
		<button
			onclick={() => {
				if (cartProduct.quantity === 1) {
					removeItem(cartProduct.id);
				} else {
					cartProduct.quantity--;
				}
			}}
			class="disabled:opacity-500 group rounded p-1 hover:bg-gray-200 focus:bg-gray-200 disabled:cursor-not-allowed"
			aria-label="Subtract 1 from quantity"
		>
			<Icon
				icon="mdi-light:minus"
				width="24"
				height="24"
				class="transition-transform group-hover:scale-110"
			/>
		</button>
		<span class="mx-2">
			{cartProduct.quantity}
		</span>
		<button
			class="group rounded p-1 hover:bg-gray-200 focus:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
			aria-label="Add 1 to quantity"
			onclick={() => cartProduct.quantity++}
			disabled={cartProduct.quantity >= stock}
		>
			<Icon
				icon="mdi-light:plus"
				width="24"
				height="24"
				class="transition-transform group-hover:scale-110"
			/>
		</button>
		<button
			onclick={() => removeItem(cartProduct.id)}
			class="group ml-4 rounded p-1 text-red-500 hover:bg-red-100 focus:bg-red-100"
		>
			<Icon
				icon="mdi-light:delete"
				width="24"
				height="24"
				class="transition-transform group-hover:scale-110"
			/>
		</button>
	</div>
</div>
