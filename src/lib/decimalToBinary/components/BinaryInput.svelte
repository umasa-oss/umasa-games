<script lang="ts">
    import { binaryArrayToDecimal } from "../scripts/binaryUtils";
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    interface BinaryInputProps {
        areIndicatorsEnabled: boolean;
        bitCount: number;
        enabled: boolean;
        isSumEnabled: boolean;
        onUpdatedValue: (value: number) => void;
    }
    let data: BinaryInputProps = $props();
    
    let values: boolean[] = $state(Array(data.bitCount).fill(false));
    let decimalValue: number = $state(0);

    export function reset() {
        values = Array(data.bitCount).fill(false);
        decimalValue = 0;
        data.onUpdatedValue(decimalValue);
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
        let value = binaryArrayToDecimal(values.map((v) => (v ? 1 : 0)));
        console.log("Decimal value: ", value);
        decimalValue = value;
        data.onUpdatedValue(value);
    });
</script>

<div class="flex flex-row justify-center gap-1 md:gap-3">
    {#each Array(data.bitCount) as _, index}
        <div>
            <label class="swap text-2xl">
                <input
                    type="checkbox"
                    bind:checked={values[index]}
                    disabled={!data.enabled}
                />
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
                    {Math.pow(2, data.bitCount - 1 - index)}
                </p>
            {/if}
        </div>
    {/each}
    {#if data.isSumEnabled}
        <p class="text-2xl flex items-center justify-center w-20 h-20">
            {decimalValue}
        </p>
    {/if}
</div>
