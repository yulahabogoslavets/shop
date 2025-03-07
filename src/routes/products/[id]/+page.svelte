<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';
	import StarRating from '../../components/StarRating.svelte';
	import Lightbox from '../../components/Lightbox.svelte';
	import ButtonAddToCart from '../../components/ButtonAddToCart.svelte';
	import SkeletonItem from '../../components/SkeletonItem.svelte';

	let idProduct = page.params.id;
	let product: any = $state<Product[]>([]);
	let fetching = $state(true);

	onMount(async () => {
		const res = await fetch(`https://dummyjson.com/products/${idProduct}`);
		product = await res.json();
		fetching = false;
	});
</script>

<main class="container mx-auto flex flex-col gap-4 px-4 py-10">
	{#if fetching}
		<SkeletonItem count={1} variant="detail" />
	{:else if product}
		<section class="flex flex-col justify-between gap-4 md:flex-row">
			<Lightbox src={product.thumbnail} alt={product.title} classImg="min-w-40" />
			<div>
				<h1 class="text-3xl font-semibold">{product.title}</h1>
				<p>
					<span><StarRating rating={product.rating} /> {product.rating} </span>

					<a href="#rewiews"> reviews</a>
				</p>
				<p class="font-bold">${product.price}</p>

				{#if product.stock > 0}
					<p class="mb-2">Available: <span class="font-semibold">{product.stock}</span></p>

					<ButtonAddToCart {product} />
				{:else}
					<p>Out of stock</p>
				{/if}

				{#if product.description}
					<h2 class="h3 mt-4 font-semibold">Info zum Produkt</h2>
					<p>{product.description}</p>
				{/if}
			</div>
		</section>

		<section id="rewiews" class="mt-4 flex flex-col gap-4 md:flex-row">
			<h2 class="font-semibold">Kundenrezensionen</h2>

			<ul class="flex flex-col gap-4">
				{#each product.reviews as review}
					<li>
						<strong>
							<StarRating rating={review.rating} />
							{review.reviewerName}
						</strong>
						<p>{review.comment}</p>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<p>Product not found</p>
	{/if}
</main>
