<script lang="ts">
	import TitleLogo from '$lib/title/TitleLogo.svelte';
	import GameCard from '$lib/title/GameCard.svelte';

	const games = [
		{
			title: 'Binär zu Dezimal',
			tags: ['Mathematik', 'Binär', 'Umrechnung'],
			image: '/images/binary-to-decimal.svg',
			href: '/binaryToDecimal'
		},
		{
			title: 'Dezimal zu Binär',
			tags: ['Mathematik', 'Binär', 'Umrechnung'],
			image: '/images/decimal-to-binary.svg',
			href: '/decimalToBinary'
		},
		{
			title: 'Binär zu Hexadezimal',
			tags: ['Mathematik', 'Hexadezimal', 'Umrechnung'],
			image: '/images/binary-to-hex.svg',
			href: '/binaryToHex'
		},
		{
			title: 'Hexadezimal zu Binär',
			tags: ['Mathematik', 'Hexadezimal', 'Umrechnung'],
			image: '/images/hex-to-binary.svg',
			href: '/hexToBinary'
		},
		{
			title: 'Hexadezimal zu Dezimal',
			tags: ['Mathematik', 'Hexadezimal', 'Umrechnung'],
			image: '/images/hex-to-decimal.svg',
			href: '/hexToDecimal'
		},
		{
			title: 'Dezimal zu Hexadezimal',
			tags: ['Mathematik', 'Hexadezimal', 'Umrechnung'],
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
