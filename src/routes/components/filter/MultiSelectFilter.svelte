<script lang="ts">
	let { items, selected = [], onChange, title } = $props();
	let isOpen = $state(false);
	let dropdownRef: HTMLElement | null = null;

	// Toggle the dropdown visibility
	function toggleDropdown(event: MouseEvent) {
		event.preventDefault(); // Prevent default behavior
		isOpen = !isOpen;
	}

	// Toggle selection for an item
	function toggleSelection(value: string) {
		let updatedSelection = selected.includes(value)
			? selected.filter((item) => item !== value)
			: [...selected, value];

		// Trigger the callback prop
		if (onChange) {
			onChange(updatedSelection);
		}
	}

	// Clear all selections
	function clearSelections(event: MouseEvent) {
		event.stopPropagation(); // Prevent event bubbling
		if (onChange) {
			onChange([]);
		}
	}

	// Handle keyboard interaction
	function handleKeydown(event: KeyboardEvent, value: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleSelection(value);
		}
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// Attach and detach event listener for clicks outside the dropdown
	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="relative mb-4" bind:this={dropdownRef}>
	<h4 class="mb-2 text-sm font-medium">{title}:</h4>
	<!-- Dropdown toggle button -->
	<button
		class="flex w-full items-center justify-between rounded-sm bg-gray-200 p-2"
		onclick={toggleDropdown}
		aria-expanded={isOpen ? 'true' : 'false'}
		aria-haspopup="listbox"
	>
		<span class="text-gray-700">
			{selected.length > 0 ? `${selected.length} selected` : 'Select...'}
		</span>
	</button>

	{#if isOpen}
		<div class="absolute left-0 z-10 mt-1 w-full rounded-sm bg-white shadow-lg">
			<!-- Clear selection button -->
			<button
				class="w-full rounded-t bg-sky-700 p-2 text-left text-sm text-white transition-all hover:bg-sky-800 hover:shadow-md focus:bg-sky-800"
				onclick={clearSelections}
			>
				Clear Selection
			</button>

			<ul class="max-h-64 overflow-y-auto" role="listbox">
				{#each items as { label, value, count }}
					<li
						class="flex items-center justify-between p-2 hover:bg-gray-100 focus:bg-gray-200"
						role="option"
						aria-selected={selected.includes(value) ? 'true' : 'false'}
					>
						<button
							class="flex w-full items-center justify-between text-left"
							onclick={() => toggleSelection(value)}
							onkeydown={(event) => handleKeydown(event, value)}
						>
							<span>{label}</span>
							<div class="flex items-center gap-2">
								<span class="text-xs text-gray-500">({count})</span>
								<input
									type="checkbox"
									checked={selected.includes(value)}
									class="rounded-sm border-gray-300"
									readonly
								/>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
