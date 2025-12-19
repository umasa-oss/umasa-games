<svelte:options runes={true} />

<script lang="ts">
	import type { QuestionData } from '$lib/components/QuestionCard.svelte';
	import { default as scoreObject } from '$lib/games/decimalToHex/score';
	import {
		generateQuestions,
		generateHexChoices
	} from '$lib/games/decimalToHex/generateQuestions';
	import type { Choice } from '$lib/components/ChoiceInput.svelte';
	import ChoiceInput from '$lib/components/ChoiceInput.svelte';
	import QuestionCard from '$lib/components/QuestionCard.svelte';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-canvas-confetti';
	import { browser } from '$app/environment';

	let questions: QuestionData[] = $state([]);
	let currentQuestionIndex = $state(0);
	let currentQuestion = $derived(questions[currentQuestionIndex]);
	let isInputEnabled = $state(true);
	let sendConfetti = $state(false);
	let hexChoices: Choice[] = $state([]);
	let shakeChoices = $state(false);

	let choiceInputComponent: ChoiceInput;

	let score = $derived($scoreObject);

	function getQuestions() {
		let nextLevel = generateQuestions(score);
		for (let i = 0; i < 3; i++) {
			questions[i] = {
				question: nextLevel.decimalNumbers[i].toString(),
				isOn: false,
				isCorrect: false,
				base: 'decimal'
			};
		}
		if (questions[0]) {
			hexChoices = generateHexChoices(nextLevel.decimalNumbers[0]);
		}
	}

	function nextQuestion() {
		setTimeout(() => {
			if (currentQuestionIndex >= questions.length - 1) {
				getQuestions();
			}
			choiceInputComponent.reset();
			isInputEnabled = true;
			currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
			currentQuestion.isOn = true;
			hexChoices = generateHexChoices(parseInt(currentQuestion.question));
		}, 1000);
	}

	function onSelectedValue(value: string, isCorrect: boolean) {
		if (currentQuestion && isCorrect) {
			isInputEnabled = false;
			currentQuestion.isCorrect = true;
			currentQuestion.isOn = false;
			scoreObject.update((s) => s + 1);
			nextQuestion();
		} else {
			isInputEnabled = false;
			currentQuestion.isCorrect = false;
			shakeChoices = true;
			scoreObject.update((s) => Math.max(0, s - 1));
			setTimeout(() => {
				shakeChoices = false;
				choiceInputComponent.reset();
				isInputEnabled = true;
			}, 500);
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
			<div class="w-full flex justify-center" class:animate-shake={shakeChoices}>
				<ChoiceInput
					bind:this={choiceInputComponent}
					choices={hexChoices}
					enabled={isInputEnabled}
					base="hex"
					{onSelectedValue}
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
