<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	import { onMount } from 'svelte';
	import { server } from '$lib/stores';
	import { type Server } from '$lib/types';
	import { get } from 'svelte/store';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import {
		CommandLine,
		Folder,
		Icon,
		Play,
		UserCircle,
		CheckCircle,
		NoSymbol
	} from 'svelte-hero-icons';
	import { env } from '$env/dynamic/public';

	let servers: Server[] = [];
	let selectedServer: Server | null = null;

	server.subscribe((s) => {
		console.log('Selected new server: ', s);
		selectedServer = s;
	});

	onMount(() => {
		fetch(`${PUBLIC_BACKEND_HOST}/get-all-user-servers`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json'
			}
		})
			.then((data) => data.json())
			.then((results) => {
				results?.forEach((result: any) => {
					const localServer: Server = {
						serverHost: result['server_host'],
						port: result['server_port'],
						share: result['share'],
						servername: result['server_name']
					};

					servers = [...servers, localServer];
				});

				server.set(servers[0] ?? null);

				console.log('Found user servers: ', servers);
			})
			.catch(console.error);
	});
</script>

<div class="drawer drawer-end">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-1 px-2 mx-2">Clover</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					{#if selectedServer === null || selectedServer === undefined}
						<li><a><Icon src={NoSymbol} size="20" style="color: red" />Disconnected</a></li>
					{:else}
						<li>
							<a
								><Icon
									src={CheckCircle}
									size="20"
									style="color: green"
								/>{selectedServer?.servername}</a
							>
						</li>
					{/if}
				</ul>
			</div>
			<div class="flex-none">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</label>
			</div>
		</div>
		<!-- Page content here -->
		<slot />
		<Footer />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 min-h-full bg-base-200">
			<!-- Sidebar content here -->
			<li>
				<a
					href={`${env.PUBLIC_BACKEND_HOST}/.auth/login/google?post_login_redirect_uri=/post-login-redirect`}
				>
					<Icon src={UserCircle} size="20" />
					Login
				</a>
			</li>
			<li>
				<details>
					<summary>
						<Icon src={Play} size="20" />
						Connect
					</summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						{#if servers.length !== 0}
							{#each servers as localServer}
								<li><a on:click={(_) => server.set(localServer)}>{localServer.servername}</a></li>
							{/each}
						{/if}
					</ul>
				</details>
			</li>
			<li>
				<a href="/files">
					<Icon src={Folder} size="20" />
					Files
				</a>
			</li>
			<li>
				<a href="/console">
					<Icon src={CommandLine} size="20" />
					Console
				</a>
			</li>
		</ul>
	</div>
</div>

<!-- <Nav /> -->
