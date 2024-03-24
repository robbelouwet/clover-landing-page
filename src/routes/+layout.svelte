<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	import { onMount } from 'svelte';
	import { modal, selectedServer, servers } from '$lib/stores';
	import { unauthorizedModal, type Server } from '$lib/types';
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import {
		CommandLine,
		Folder,
		Icon,
		Play,
		UserCircle,
		CheckCircle,
		NoSymbol,
		ComputerDesktop
	} from 'svelte-hero-icons';
	import Modal from '$lib/components/Modal.svelte';

	onMount(() => {
		fetch(`${PUBLIC_BACKEND_HOST}/get-all-user-servers`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json'
			}
		})
			.then((data) => {
				if (data.status % 400 < 100) {
					modal.set(unauthorizedModal);
					throw new Error('Unauthorized');
				}
				return data.json();
			})
			.then((results) => {
				servers.set(
					results?.map((result: any) => {
						const localServer: Server = {
							serverHost: result['server_host'],
							//port: result['server_port'],
							share: result['share'],
							servername: result['server_name'],
							kind: result['kind']
						};
						return localServer;
					})
				);
				selectedServer.set($servers[0] ?? null);
				console.log('Found user servers: ', $servers, ', selected: ', $selectedServer);
			})
			.catch(console.error);
	});
</script>

<Modal />
<div class="drawer drawer-end">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-1 px-2 mx-2"><a href="/">Clover</a></div>
			<div class="flex-none">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					{#if $selectedServer === null || $selectedServer === undefined}
						<li><a><Icon src={NoSymbol} size="20" style="color: red" />Disconnected</a></li>
					{:else}
						<li>
							<a
								><Icon
									src={CheckCircle}
									size="20"
									style="color: green"
								/>{$selectedServer?.servername}</a
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
					href={`${PUBLIC_BACKEND_HOST}/.auth/login/google?post_login_redirect_uri=/post-login-redirect`}
				>
					<Icon src={UserCircle} size="20" />Login
				</a>
			</li>
			<li>
				<details>
					<summary>
						<Icon src={Play} size="20" />
						Select
					</summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						{#if $servers.length !== 0}
							{#each $servers as localServer}
								<li>
									<a on:click={(_) => selectedServer.set(localServer)}>{localServer.servername}</a>
								</li>
							{/each}
						{/if}
					</ul>
				</details>
			</li>
			<li>
				<a href="/servers">
					<Icon src={ComputerDesktop} size="20" />
					Servers Overview
				</a>
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
			<!-- 			<li>
				<a>
					<Icon src={AdjustmentsHorizontal} size="20" />
					<div class="form-control">
						<label class="label cursor-pointer p-0">
							<span class="label-text">Live Mode</span>
							<input
								type="checkbox"
								class="toggle toggle-success toggle-sm"
								on:change={(e) => handleToggle(e)}
							/>
						</label>
					</div>
				</a>
			</li> -->
		</ul>
	</div>
</div>

<!-- <Nav /> -->
