<svelte:options runes={true} />

<script lang="ts">
    import type { QuestionCardData } from "$lib/binaryToDecimal/types/questionCardData";
    import { default as scoreObject } from "$lib/binaryToDecimal/stores/score";
    import { generateQuestions, generateDecimalChoices } from "$lib/binaryToDecimal/scripts/generateQuestions";
    import type { DecimalChoice } from "$lib/binaryToDecimal/types/decimalChoice";
    import DecimalChoices from "$lib/binaryToDecimal/components/DecimalChoices.svelte";
    import QuestionCard from "$lib/binaryToDecimal/components/QuestionCard.svelte";
    import { onMount } from "svelte";
    import { Confetti } from "svelte-canvas-confetti";
    import { browser } from "$app/environment";

    let questions: QuestionCardData[] = $state([]);
    let currentQuestionIndex = $state(0);
    let currentQuestion = $derived(questions[currentQuestionIndex]);
    let bitCount = $state(0);
    let isInputEnabled = $state(true);
    let areIndicatorsEnabled = $state(false);
    let sendConfetti = $state(false);
    let decimalChoices: DecimalChoice[] = $state([]);
    let shakeChoices = $state(false);

    let decimalChoicesComponent: DecimalChoices;

    let score = $derived($scoreObject);

    function getQuestions() {
        console.log("Generating questions with score: ", score);
        let nextLevel = generateQuestions(score);
        bitCount = nextLevel.bitCount;
        areIndicatorsEnabled = nextLevel.areIndicatorsEnabled;
        for (let i = 0; i < 3; i++) {
            questions[i] = {
                question: nextLevel.binaryNumbers[i],
                isOn: false,
                isCorrect: false,
            };
        }
        if (questions[0]) {
            decimalChoices = generateDecimalChoices(questions[0].question);
        }
    }

    function nextQuestion() {
        setTimeout(() => {
            if (currentQuestionIndex >= questions.length - 1) {
                getQuestions();
            }
            decimalChoicesComponent.reset();
            isInputEnabled = true;
            currentQuestionIndex =
                (currentQuestionIndex + 1) % questions.length;
            currentQuestion.isOn = true;
            decimalChoices = generateDecimalChoices(currentQuestion.question);
        }, 1000);
    }

    function onSelectedValue(value: number, isCorrect: boolean) {
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
                decimalChoicesComponent.reset();
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
                <DecimalChoices
                    bind:this={decimalChoicesComponent}
                    choices={decimalChoices}
                    enabled={isInputEnabled}
                    {onSelectedValue}
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
