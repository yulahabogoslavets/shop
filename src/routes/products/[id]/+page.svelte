<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';
	import StarRating from '../../components/StarRating.svelte';
	import Lightbox from '../../components/Lightbox.svelte';
	import ButtonAddToCart from '../../components/ButtonAddToCart.svelte';

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
		<section class="flex justify-between gap-4">
			<!-- Lightbox Skeleton -->
			<div class="skeleton" style="width: 200px; height: 200px; margin-right: 20px;"></div>

			<div class="flex w-full flex-col gap-4">
				<!-- Title Skeleton -->
				<div class="skeleton skeleton-title skeleton-pulse"></div>

				<!-- Rating & Reviews Skeleton -->
				<div class="skeleton skeleton-pulse" style="width: 30%;"></div>
				<div class="skeleton skeleton-pulse" style="width: 20%;"></div>

				<!-- Price Skeleton -->
				<div class="skeleton skeleton-price skeleton-pulse"></div>

				<!-- Stock Availability Skeleton -->
				<div class="skeleton skeleton-pulse" style="width: 40%;"></div>

				<!-- Button Skeleton -->
				<div class="skeleton skeleton-button skeleton-pulse"></div>

				<!-- Description Skeleton -->
				<div class="skeleton skeleton-pulse" style="width: 90%;"></div>
				<div class="skeleton skeleton-pulse" style="width: 90%;"></div>
			</div>
		</section>

		<section id="rewiews" class="mt-4 flex gap-4">
			<div class="skeleton skeleton-title skeleton-pulse"></div>
			<div class="skeleton skeleton-pulse" style="width: 60%;"></div>
			<div class="skeleton skeleton-pulse" style="width: 80%;"></div>
		</section>
	{:else if product}
		<section class="flex justify-between gap-4">
			<Lightbox src={product.thumbnail} alt={product.title} />
			<div>
				<h1 class="text-3xl font-semibold">{product.title}</h1>
				<p>
					<span><StarRating rating={product.rating} /> {product.rating} </span>

					<a href="#rewiews"> reviews</a>
				</p>
				<p>${product.price}</p>

				{#if product.stock > 0}
					<p class="mb-2">Available: {product.stock}</p>

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

		<section id="rewiews" class="mt-4 flex gap-4">
			<h2>Kundenrezensionen</h2>

			<div>
				{#each product.reviews as review}
					<ul class="flex flex-col gap-4">
						<li>
							<strong>
								<StarRating rating={review.rating} />
								{review.reviewerName}
							</strong>
							<p>{review.comment}</p>
						</li>
					</ul>
				{/each}
			</div>
		</section>
	{:else}
		<p>Product not found</p>
	{/if}
</main>

<style>
	.skeleton {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 20px;
		width: 100%;
		margin-bottom: 10px;
	}
	.skeleton-title {
		height: 30px;
		width: 80%;
	}

	.skeleton-price {
		height: 20px;
		width: 50%;
	}
	.skeleton-button {
		height: 40px;
		width: 100%;
	}
	.skeleton-pulse {
		animation: pulse 1.5s infinite ease-in-out;
	}
	@keyframes pulse {
		0% {
			background-color: #e0e0e0;
		}
		50% {
			background-color: #c9c9c9;
		}
		100% {
			background-color: #e0e0e0;
		}
	}
</style>
