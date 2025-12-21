<svelte:options runes={true} />

<script lang="ts">
	import { default as scoreObject } from '$lib/games/binaryAddition/score';
	import { generateQuestions } from '$lib/games/binaryAddition/generateQuestions';
	import BinaryInput from '$lib/components/BinaryInput.svelte';
	import BinaryAdditionDisplay from '$lib/games/binaryAddition/components/BinaryAdditionDisplay.svelte';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-canvas-confetti';
	import { browser } from '$app/environment';
	import { decimalToBinary } from '$lib/utils/conversionUtils';

	let bitCount = $state(0);
	let isSumEnabled = $state(false);
	let isInputEnabled = $state(true);
	let areIndicatorsEnabled = $state(false);
	let sendConfetti = $state(false);

	// Store both addends for the current question
	let addend1 = $state(0);
	let addend2 = $state(0);
	let expectedSum = $state(0);

	let binaryInput: BinaryInput;

	let score = $derived($scoreObject);

	function generateNewQuestion() {
		const maxValue = Math.pow(2, bitCount) - 1;
		// Generate two numbers that when added don't overflow
		addend1 = Math.floor(Math.random() * (maxValue / 2));
		addend2 = Math.floor(Math.random() * (maxValue / 2));
		expectedSum = addend1 + addend2;
	}

	function updateDifficulty() {
		console.log('Updating difficulty with score: ', score);
		let nextLevel = generateQuestions(score);
		bitCount = nextLevel.bitCount;
		isSumEnabled = nextLevel.isSumEnabled;
		areIndicatorsEnabled = nextLevel.areIndicatorsEnabled;
		generateNewQuestion();
	}

	function nextQuestion() {
		setTimeout(() => {
			binaryInput.reset();
			isInputEnabled = true;
			generateNewQuestion();
		}, 1000);
	}

	function onUpdatedValue(binaryString: string) {
		const targetBinary = decimalToBinary(expectedSum).padStart(bitCount, '0');
		if (binaryString === targetBinary) {
			console.log('Correct answer!');
			isInputEnabled = false;
			scoreObject.update((s) => s + 1);
			nextQuestion();
		}
	}

	$effect(() => {
		if (score % 25 == 0 && score > 0) {
			confetti();
		}
	});

	function confetti() {
		sendConfetti = true;
		setTimeout(() => {
			sendConfetti = false;
		}, 5000);
	}

	onMount(() => {
		updateDifficulty();
	});
</script>

{#if browser && sendConfetti}
	<Confetti
		origin={[window.innerWidth - 50, 100]}
		angle={180}
		force={30}
		spread={45}
		particleCount={score}
	/>
{/if}

<div class="w-full flex justify-end">
	<div class="stats bg-primary shadow pr-10">
		<div class="stat">
			<div class="stat-title text-primary-content">Score</div>
			<div class="stat-value text-primary-content">{score}</div>
		</div>
	</div>
</div>

<div class="flex justify-between">
	<div></div>
	<div class="basis-1/2 flex justify-center">
		<div class="mt-48 w-full">
			<div class="w-full flex flex-col items-center gap-4">
				<BinaryAdditionDisplay
					{bitCount}
					{addend1}
					{addend2}
					{areIndicatorsEnabled}
				/>

				<!-- Equals Sign and BinaryInput -->
				<div class="flex flex-row justify-center items-center">
					<div class="relative">
						<span class="text-3xl font-bold absolute -left-12 top-3 md:top-6">=</span>
						<BinaryInput
							bind:this={binaryInput}
							{areIndicatorsEnabled}
							{bitCount}
							enabled={isInputEnabled}
							{isSumEnabled}
							sumBase={'decimal'}
							{onUpdatedValue}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div></div>
</div>
