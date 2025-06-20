<script lang="ts">
	import '../app.css';
    import { onMount } from "svelte";

	import { Sun, Moon, Gamepad} from '@lucide/svelte';


    let isLight = $state(false);

    onMount(() => {
        console.log(localStorage.getItem('theme'));
        isLight = localStorage.getItem('theme') == 'light';

    });

    function setTheme(value: boolean) {
        localStorage.setItem('theme', value ? 'light' : 'dark');
    }
	
	let { children } = $props();

</script>

<div class="min-h-screen">
    <header>
        <div class="p-2">
            <div
                class="navbar bg-base-300 flex justify-between items-center p-2 rounded-2xl"
            >
                <a
                    href="/"
                    class="btn btn-ghost rounded-2xl m-2 text-xl flex items-center"
                >
                    <Gamepad class="text-accent h-8 w-8" />
                    <span class="text-2xl text-accent">Umasa Games</span>
                </a>
                    <label
                        class="btn btn-ghost rounded-2xl swap swap-rotate w-12 h-12 m-2"
                    >
                        <!-- this hidden checkbox controls the state -->
                        <input
                            type="checkbox"
                            class="theme-controller"
                            onchange={(e) => setTheme(e.target.checked)}
                            value="retro"
                            checked={isLight}
                        />
                        <Sun
                            class="swap-off fill-current h-8 w-8"
                        />
                        <Moon
                            class="swap-on fill-current h-8 w-8"
                        />
                    </label>
            </div>
        </div>
    </header>
    <main class="flex-1 p-4">
{@render children()}
    </main>
</div>