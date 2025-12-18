<script lang="ts">
	import { Gamepad } from '@lucide/svelte';
</script>

<div class="flex flex-col items-center justify-center w-full py-12">
	<div class="flex items-center gap-4">
		<Gamepad class="text-accent h-24 w-24 animate-wiggle-rotate" />
		<div class="flex flex-col items-baseline gap-3">
			<span class="text-7xl font-bold text-accent animate-wiggle-delayed-1">Umasa</span>
			<span class="text-7xl font-bold text-accent animate-wiggle-delayed-2">Games</span>
		</div>
	</div>
</div>
