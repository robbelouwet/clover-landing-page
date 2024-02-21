<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import HeroCards from '$lib/components/HeroCards.svelte';
	import { beforeUpdate } from 'svelte';
	import { server } from '$lib/stores';
	import { type Server } from '$lib/types';
	import { get } from 'svelte/store';

	// export let data: Server;

	// beforeUpdate(() => {
	// 	server.set(data);
	// 	console.log('Loaded server: ', data);
	// });
</script>

<Hero />
<HeroCards />
