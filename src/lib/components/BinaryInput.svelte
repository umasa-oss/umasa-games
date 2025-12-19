<script lang="ts">
	import { binaryArrayToDecimal, binaryToHex } from '$lib/utils/conversionUtils';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface BinaryInputProps {
		areIndicatorsEnabled: boolean;
		bitCount: number;
		enabled: boolean;
		isSumEnabled: boolean;
		sumBase: 'decimal' | 'hex';
		onUpdatedValue: (binaryString: string) => void;
	}
	let data: BinaryInputProps = $props();

	let values: boolean[] = $state(Array(data.bitCount).fill(false));
	let displayValue: string = $state('0');

	export function reset() {
		values = Array(data.bitCount).fill(false);
		displayValue = '0';
		const binaryString = values.map((v) => (v ? '1' : '0')).join('');
		data.onUpdatedValue(binaryString);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (!data.enabled) return;

		const key = event.key;
		const num = parseInt(key);

		if (!isNaN(num) && num >= 1 && num <= 9 && num <= data.bitCount) {
			const targetIndex = data.bitCount - num;
			values[targetIndex] = !values[targetIndex];
		}
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

	$effect(() => {
		const binaryString = values.map((v) => (v ? '1' : '0')).join('');
		const decimalValue = binaryArrayToDecimal(values.map((v) => (v ? 1 : 0)));

		if (data.sumBase === 'hex') {
			displayValue = binaryToHex(binaryString);
		} else {
			displayValue = decimalValue.toString();
		}

		data.onUpdatedValue(binaryString);
	});
</script>

<div class="flex flex-row justify-center gap-1 md:gap-3">
	{#each Array(data.bitCount) as _, index}
		<div>
			<label class="swap text-2xl">
				<input type="checkbox" bind:checked={values[index]} disabled={!data.enabled} />
				<div
					class="btn swap-on btn-accent text-2xl flex items-center justify-center w-12 h-12 md:w-20 md:h-20"
				>
					<div class="m-5">1</div>
				</div>
				<div
					class="btn swap-off text-2xl flex items-center justify-center w-12 h-12 md:w-20 md:h-20"
				>
					<div class="m-5">0</div>
				</div>
			</label>
			{#if data.areIndicatorsEnabled}
				<p class="w-full flex justify-center">
					<span>{Math.pow(2, data.bitCount - 1 - index)}<sub class="text-xs">10</sub></span>
				</p>
			{/if}
		</div>
	{/each}
	{#if data.isSumEnabled}
		<p class="text-2xl flex items-center justify-center w-20 h-20">
			<span
				>{displayValue}<sub class="text-sm">{data.sumBase === 'hex' ? '16' : '10'}</sub></span
			>
		</p>
	{/if}
</div>
