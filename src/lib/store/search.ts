import { writable } from 'svelte/store';

// Instead of an object, we directly store the string.
export const searchTerm = writable('');
