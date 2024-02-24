<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import HeroCards from '$lib/components/HeroCards.svelte';
	import { beforeUpdate } from 'svelte';
	import { server } from '$lib/stores';
	import { type Server } from '$lib/types';
	import { get } from 'svelte/store';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';

	// export let data: Server;

	beforeUpdate(() => {
		fetch(`${PUBLIC_BACKEND_HOST}/get-user-server?servername=robbe`)
			.then((data) => data.json())
			.then((result) => {
				const localServer: Server = {
					serverHost: result['server_host'],
					port: result['server_port'],
					share: result['share'],
					username: result['user_name']
				};

				server.set(localServer);
				console.log('Loaded server: ', localServer);
			})
			.catch(console.error);
	});
</script>

<Hero />
<HeroCards />
