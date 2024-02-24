<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	import { onMount } from 'svelte';
	import { server } from '$lib/stores';
	import { type Server } from '$lib/types';
	import { get } from 'svelte/store';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';

	onMount(() => {
		fetch(`${PUBLIC_BACKEND_HOST}/get-user-server?servername=robbe`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				Accept: 'application/json'
			}
		})
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

<Nav />
<slot />
<Footer />
