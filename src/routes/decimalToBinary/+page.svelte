<svelte:options runes={true} />

<script lang="ts">
    import type { QuestionCardData } from "$lib/decimalToBinary/types/questionCardData";
    import { default as scoreObject } from "$lib/decimalToBinary/stores/score";
    import { generateQuestions } from "$lib/decimalToBinary/scripts/generateQuestions";
    import BinaryInput from "$lib/decimalToBinary/components/BinaryInput.svelte";
    import QuestionCard from "$lib/decimalToBinary/components/QuestionCard.svelte";
    import { onMount } from "svelte";
    import { Confetti } from "svelte-canvas-confetti";
    import { browser } from "$app/environment";

    let questions: QuestionCardData[] = $state([]);
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
        console.log("Generating questions with score: ", score);
        let nextLevel = generateQuestions(score);
        bitCount = nextLevel.bitCount;
        isSumEnabled = nextLevel.isSumEnabled;
        areIndicatorsEnabled = nextLevel.areIndicatorsEnabled;
        for (let i = 0; i < 3; i++) {
            questions[i] = {
                question: nextLevel.numbers[i],
                isOn: false,
                isCorrect: false,
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
            currentQuestionIndex =
                (currentQuestionIndex + 1) % questions.length;
            currentQuestion.isOn = true;
        }, 1000);
    }

    function onUpdatedValue(value: number) {
        console.log("Updated value: ", value);
        if (currentQuestion && value === currentQuestion.question) {
            console.log("Correct answer!");
            isInputEnabled = false;
            currentQuestion.isCorrect = true;
            currentQuestion.isOn = false;
            scoreObject.update((s) => s + 1);
            nextQuestion();
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
                    {onUpdatedValue}
                />
            </div>
            <div class="mt-8 space-x-4 flex justify-center">
                <QuestionCard
                    question={questions[0]?.question}
                    isOn={questions[0]?.isOn}
                    isCorrect={questions[0]?.isCorrect}
                />
                <QuestionCard
                    question={questions[1]?.question}
                    isOn={questions[1]?.isOn}
                    isCorrect={questions[1]?.isCorrect}
                />
                <QuestionCard
                    question={questions[2]?.question}
                    isOn={questions[2]?.isOn}
                    isCorrect={questions[2]?.isCorrect}
                />
            </div>
        </div>
    </div>
    <div></div>
</div>
