import type { Product } from '$lib/types';
import type { PageLoad } from './$types';

// Importing the fallback JSON data
import productsJson from '$lib/data/products.json';

export const load: PageLoad = async ({ fetch }) => {
	let products: Product[];

	try {
		// Attempt to fetch data from the API
		const response = await fetch('https://dummyjson.com/products');
		if (!response.ok) {
			throw new Error('Failed to fetch from API');
		}
		const data = await response.json();
		products = data.products as Product[];
	} catch (error) {
		console.error('Error fetching API, loading fallback data:', error);
		// Fallback to loading data from the local JSON file
		products = productsJson.products as Product[];
	}

	return {
		products
	};
};
