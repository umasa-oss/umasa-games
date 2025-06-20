<script lang="ts">

    import { Lock, Check} from '@lucide/svelte';
    import type { QuestionCardData } from '../types/questionCardData';

    let data:QuestionCardData = $props();

</script>

<label class="swap swap-flip" class:swap-active={data.isOn}>
    <div class="swap-on card bg-base-200 text-primary-content shadow-xl">
        <div class="card-body mx-4 md:mx-8">
            <h2 class="card-title justify-center text-base-content">
                {data.question}
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
                    <Check class="text-success-content"/>
                {:else}
                    <Lock />
                {/if}
            </h2>
        </div>
    </div>
</label>