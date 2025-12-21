<script lang="ts">
	import TitleLogo from '$lib/title/TitleLogo.svelte';
	import GameCard from '$lib/title/GameCard.svelte';

	const games = [
		{
			title: 'Binär zu Dezimal',
			tags: ['Binär', 'Dezimal'],
			image: '/images/binary-to-decimal.svg',
			href: '/binaryToDecimal'
		},
		{
			title: 'Dezimal zu Binär',
			tags: ['Binär', 'Dezimal'],
			image: '/images/decimal-to-binary.svg',
			href: '/decimalToBinary'
		},
		{
			title: 'Binär Addition',
			tags: ['Binär', 'Addition'],
			image: '/images/binary-addition.svg',
			href: '/binaryAddition'
		},
		{
			title: 'Binär zu Hexadezimal',
			tags: ['Hexadezimal', 'Binär'],
			image: '/images/binary-to-hex.svg',
			href: '/binaryToHex'
		},
		{
			title: 'Hexadezimal zu Binär',
			tags: ['Hexadezimal', 'Binär'],
			image: '/images/hex-to-binary.svg',
			href: '/hexToBinary'
		},
		{
			title: 'Hexadezimal zu Dezimal',
			tags: ['Hexadezimal', 'Dezimal'],
			image: '/images/hex-to-decimal.svg',
			href: '/hexToDecimal'
		},
		{
			title: 'Dezimal zu Hexadezimal',
			tags: ['Dezimal', 'Hexadezimal'],
			image: '/images/decimal-to-hex.svg',
			href: '/decimalToHex'
		}
	];
</script>

<div class="container mx-auto px-4">
	<div class="mb-8">
		<TitleLogo />
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
		{#each games as game}
			<GameCard {...game} />
		{/each}
	</div>
</div>
