<script lang="ts">
	import CarouselItem from '$lib/components/CarouselItem.svelte';
	import {
		Icon,
		ArrowUp,
		Users,
		ServerStack,
		Square3Stack3d,
		CursorArrowRays,
		GlobeAlt,
		CloudArrowDown,
		CloudArrowUp,
		User,
		WrenchScrewdriver,
		CreditCard,
		PuzzlePiece,
		ComputerDesktop,
		Wallet,
		type IconSource
	} from 'svelte-hero-icons';
	let carouselItems: [string, IconSource, string][] = [
		['100% uptime!', ServerStack, '3'],
		['Forget RAM memory and CPU! Rent a server that just works', Users, '1'],
		['Pay per hour! Not playing = not paying.', Wallet, '2'],
		['Vanilla, Bedrock, Paper, Spigot, Forge, we have it all!', Square3Stack3d, '2'],
		['One-click server upgrade!', CursorArrowRays, '3'],
		['More than 20 regions worldwide!', GlobeAlt, '2'],
		['Automaterd backups straight to your google drive!', CloudArrowDown, '2'],
		['Now with parental control!', User, '3'],
		[
			'Play cross-platform: bedrock players can join your java edition server!',
			ComputerDesktop,
			'2'
		],
		['Upload your own world and start where you left off!', CloudArrowUp, '3'],
		['Free domain!', CursorArrowRays, '3'],
		['Custom world presets', WrenchScrewdriver, '3'],
		[
			'Thousands of mods and plugins, literally every mod at CurseForge can be set up with a single click!',
			PuzzlePiece,
			'1'
		],
		['No hidden fees, no surprises at the checkout', CreditCard, '3']
	];
</script>

<div class="absolute inset-x-0 -bottom-[15rem] carousel carousel-center max-w p-4 space-x-4">
	{#each carouselItems as values}
		<CarouselItem text={values[0]} icon={values[1]} margin={values[2]} />
	{/each}
</div>
