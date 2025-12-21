<script lang="ts">
	import { decimalToBinary } from '$lib/utils/conversionUtils';

	interface BinaryAdditionDisplayProps {
		bitCount: number;
		addend1: number;
		addend2: number;
		areIndicatorsEnabled: boolean;
	}
	let data: BinaryAdditionDisplayProps = $props();

	let binary1 = $derived(decimalToBinary(data.addend1).padStart(data.bitCount, '0').split(''));
	let binary2 = $derived(decimalToBinary(data.addend2).padStart(data.bitCount, '0').split(''));
</script>

<div class="flex flex-col items-center gap-2">
	<!-- First Binary Number -->
	<div class="flex flex-row justify-center gap-1 md:gap-3">
		{#each binary1 as bit, index}
			<div>
				<div
					class="btn text-2xl flex items-center justify-center w-12 h-12 md:w-20 md:h-20 opacity-70 pointer-events-none"
					class:btn-accent={bit === '1'}
				>
					<div class="m-5">{bit}<sub class="text-xs">2</sub></div>
				</div>
				{#if data.areIndicatorsEnabled}
					<p class="w-full flex justify-center">
						<span>{Math.pow(2, data.bitCount - 1 - index)}<sub class="text-xs">10</sub></span>
					</p>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Plus Sign and Second Binary Number -->
	<div class="flex flex-row justify-center items-center">
		<div class="flex flex-row gap-1 md:gap-3 relative">
			<span class="text-3xl font-bold absolute -left-12 top-3 md:top-6">+</span>
			{#each binary2 as bit, index}
				<div>
					<div
						class="btn text-2xl flex items-center justify-center w-12 h-12 md:w-20 md:h-20 opacity-70 pointer-events-none"
						class:btn-accent={bit === '1'}
					>
						<div class="m-5">{bit}<sub class="text-xs">2</sub></div>
					</div>
					{#if data.areIndicatorsEnabled}
						<p class="w-full flex justify-center">
							<span>{Math.pow(2, data.bitCount - 1 - index)}<sub class="text-xs">10</sub></span>
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Horizontal Line -->
	<div class="w-full flex justify-center">
		<div class="border-t-4 border-base-content" style="width: {data.bitCount * 64 + 64}px;"></div>
	</div>
</div>
