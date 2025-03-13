<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';
	import StarRating from '../../components/StarRating.svelte';
	import Lightbox from '../../components/Lightbox.svelte';
	import ButtonAddToCart from '../../components/ButtonAddToCart.svelte';
	import SkeletonItem from '../../components/SkeletonItem.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	let idProduct = page.params.id;
	let product: any = $state<Product[]>([]);
	let fetching = $state(true);

	onMount(async () => {
		const res = await fetch(`https://dummyjson.com/products/${idProduct}`);
		product = await res.json();
		fetching = false;
	});

	let activeReviewIndex: number | null = $state(null);

	function toggleReview(index: number) {
		activeReviewIndex = activeReviewIndex === index ? null : index;
	}
</script>

<main class="container mx-auto flex w-[85cqw] flex-col gap-4 px-4 py-10">
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

		<section id="reviews" class="mt-4 flex flex-col gap-4 md:flex-row">
			<h2 class="font-semibold">Kundenrezensionen</h2>

			<ul class="flex flex-col gap-4">
				{#each product.reviews as review, index}
					<li
						class="rounded-md border border-gray-200 p-4 hover:border-sky-700 focus:border-sky-700"
					>
						<button
							class="group flex w-full cursor-pointer items-center justify-between gap-2"
							onclick={() => toggleReview(index)}
							onkeydown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									toggleReview(index);
								}
							}}
							aria-expanded={activeReviewIndex === index ? 'true' : 'false'}
							aria-controls={`review-${index}`}
							title={activeReviewIndex === index ? 'Close' : 'Open'}
							aria-label={activeReviewIndex === index ? 'Close' : 'Open'}
						>
							<div class="flex grow items-center gap-2">
								<StarRating rating={review.rating} />
								<strong>{review.reviewerName}</strong>
							</div>

							<Icon
								icon={activeReviewIndex === index ? 'mdi-light:minus' : 'mdi-light:plus'}
								width="24"
								height="24"
								class="transition-transform group-hover:scale-110"
							/>
						</button>

						{#if activeReviewIndex === index}
							<p id={`review-${index}`} in:fade out:fade>{review.comment}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<p>Product not found</p>
	{/if}
</main>
