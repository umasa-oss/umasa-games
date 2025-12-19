<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export interface Choice {
		value: string;
		isCorrect: boolean;
	}

	interface ChoiceInputProps {
		choices: Choice[];
		enabled: boolean;
		base: 'decimal' | 'hex';
		onSelectedValue: (value: string, isCorrect: boolean) => void;
	}
	let data: ChoiceInputProps = $props();

	let selectedIndex: number | null = $state(null);
	let flashIndex: number | null = $state(null);

	function handleClick(index: number) {
		if (!data.enabled) return;
		selectedIndex = index;
		flashIndex = index;
		setTimeout(() => (flashIndex = null), 200);
		const choice = data.choices[index];
		data.onSelectedValue(choice.value, choice.isCorrect);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (!data.enabled) return;

		const key = event.key;
		const num = parseInt(key);

		if (!isNaN(num) && num >= 1 && num <= 3) {
			handleClick(num - 1);
		}
	}

	export function reset() {
		selectedIndex = null;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyPress);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyPress);
		}
	});
</script>

<div class="flex flex-row justify-center gap-1 md:gap-3">
	{#each data.choices as choice, index}
		<div>
			<button
				class="btn text-2xl w-12 h-12 md:w-20 md:h-20 transition-transform duration-200"
				class:btn-accent={selectedIndex === index && choice.isCorrect}
				class:btn-error={selectedIndex === index && !choice.isCorrect}
				class:scale-110={flashIndex === index}
				disabled={!data.enabled}
				onclick={() => handleClick(index)}
			>
				<span>{choice.value}<sub>{data.base === 'hex' ? '16' : '10'}</sub></span>
			</button>
		</div>
	{/each}
</div>
