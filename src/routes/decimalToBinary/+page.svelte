<svelte:options runes={true} />

<svelte:head>
	<title>Dezimal zu Binär | Umasa Games</title>
	<meta name="description" content="Übe Dezimal zu Binär Umrechnungen. Lerne spielerisch, wie man Dezimalzahlen in Binärzahlen umwandelt." />
	<meta property="og:title" content="Dezimal zu Binär | Umasa Games" />
	<meta property="og:description" content="Übe Dezimal zu Binär Umrechnungen spielerisch." />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<script lang="ts">
	import type { QuestionData } from '$lib/components/QuestionCard.svelte';
	import { default as scoreObject } from '$lib/games/decimalToBinary/score';
	import { generateQuestions } from '$lib/games/decimalToBinary/generateQuestions';
	import BinaryInput from '$lib/components/BinaryInput.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-canvas-confetti';
	import { browser } from '$app/environment';
	import { decimalToBinary } from '$lib/utils/conversionUtils';

	let questions: QuestionData[] = $state([]);
	let currentQuestionIndex = $state(0);
	let currentQuestion = $derived(questions[currentQuestionIndex]);
	let bitCount = $state(0);
	let isSumEnabled = $state(false);
	let isInputEnabled = $state(true);
	let areIndicatorsEnabled = $state(false);
	let sendConfetti = $state(false);

	let binaryInput: BinaryInput;

	let score = $derived($scoreObject);

	function getQuestions() {
		console.log('Generating questions with score: ', score);
		let nextLevel = generateQuestions(score);
		bitCount = nextLevel.bitCount;
		isSumEnabled = nextLevel.isSumEnabled;
		areIndicatorsEnabled = nextLevel.areIndicatorsEnabled;
		for (let i = 0; i < 3; i++) {
			questions[i] = {
				question: nextLevel.numbers[i].toString(),
				isOn: false,
				isCorrect: false,
				base: 'decimal'
			};
		}
	}

	function nextQuestion() {
		setTimeout(() => {
			if (currentQuestionIndex >= questions.length - 1) {
				getQuestions();
			}
			binaryInput.reset();
			isInputEnabled = true;
			currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
			currentQuestion.isOn = true;
		}, 1000);
	}

	function onUpdatedValue(binaryString: string) {
		if (currentQuestion) {
			const targetBinary = decimalToBinary(parseInt(currentQuestion.question)).padStart(
				bitCount,
				'0'
			);
			if (binaryString === targetBinary) {
				console.log('Correct answer!');
				isInputEnabled = false;
				currentQuestion.isCorrect = true;
				currentQuestion.isOn = false;
				scoreObject.update((s) => s + 1);
				nextQuestion();
			}
		}
	}

	$effect(() => {
		if (score % 25 == 0) {
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
		getQuestions();
		currentQuestion.isOn = true;
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
			<div class="w-full flex justify-center">
				<BinaryInput
					bind:this={binaryInput}
					{areIndicatorsEnabled}
					{bitCount}
					enabled={isInputEnabled}
					{isSumEnabled}
					sumBase="decimal"
					{onUpdatedValue}
				/>
			</div>
			<div class="mt-8 space-x-4 flex justify-center">
				<QuestionCard {...questions[0]} />
				<QuestionCard {...questions[1]} />
				<QuestionCard {...questions[2]} />
			</div>
		</div>
	</div>
	<div></div>
</div>
