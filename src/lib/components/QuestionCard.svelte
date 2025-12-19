<script lang="ts">
	import { Lock, Check } from '@lucide/svelte';

	export interface QuestionData {
		question: string;
		isOn: boolean;
		isCorrect: boolean;
		base: 'binary' | 'decimal' | 'hex';
	}

	let data: QuestionData = $props();

	const getBaseSubscript = (base: 'binary' | 'decimal' | 'hex') => {
		switch (base) {
			case 'binary':
				return '2';
			case 'decimal':
				return '10';
			case 'hex':
				return '16';
		}
	};
</script>

<label class="swap swap-flip" class:swap-active={data.isOn}>
	<div class="swap-on card bg-base-200 text-primary-content shadow-xl">
		<div class="card-body mx-4 md:mx-8">
			<h2
				class="card-title justify-center text-base-content"
				class:font-mono={data.base === 'binary'}
				class:text-2xl={data.base === 'binary'}
			>
				<span>{data.question}<sub>{getBaseSubscript(data.base)}</sub></span>
			</h2>
		</div>
	</div>
	<div
		class="swap-off card bg-base-200 text-primary-content shadow-xl"
		class:bg-green-800={data.isCorrect}
	>
		<div class="card-body mx-4 md:mx-8">
			<h2 class="card-title justify-center text-base-content">
				{#if data.isCorrect}
					<Check class="text-success-content" />
				{:else}
					<Lock />
				{/if}
			</h2>
		</div>
	</div>
</label>
