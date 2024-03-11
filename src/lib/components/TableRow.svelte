<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { modal, selectedServer, servers } from '$lib/stores';
	import { unauthorizedModal, type Server } from '$lib/types';
	import { onMount } from 'svelte';
	import { ChartBar, Trash, Icon } from 'svelte-hero-icons';

	export let server: Server;
	let pingResponse: any = null;
	let deleting: boolean = false;

	const deleteServer = () => {
		console.log('Deleting!');
		deleting = true;
		fetch(`${PUBLIC_BACKEND_HOST}/delete-paper-dedicated?servername=${server.servername}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json'
			}
		})
			.then((resp) => {
				if (resp.status % 400 < 100) {
					modal.set(unauthorizedModal);
					throw new Error('Unauthorized');
				}
				if (resp.ok) {
					const e = $servers.find((s) => s.servername === server.servername);
					const i = $servers.indexOf(e!);
					if ($selectedServer?.servername === server.servername) selectedServer.set(null);
					$servers.splice(i, 1);
					servers.set([...$servers]);
				}
			})
			.catch(console.error);
	};

	const pingState = () => {
		fetch(`${PUBLIC_BACKEND_HOST}/ping-server?servername=${server.servername}`, {
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
			.then((response) => {
				pingResponse = response;
			})
			.catch(console.error);
	};

	onMount(() => {
		pingState();
	});
</script>

<tr>
	<td class="">
		<div class="flex items-center gap-3">
			<div class="avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img src="/dirt.png" alt="Minecraft dirt" />
				</div>
			</div>
			<div>
				<div class="font-bold">{server.servername}</div>
				<div class="text-sm opacity-50">West Europe</div>
			</div>
		</div>
	</td>
	<td class="hidden sm:table-cell">
		{#if pingResponse !== null}
			{pingResponse['description']['text']}
			<br />
			<span class="badge badge-ghost badge-sm bg-green">
				{pingResponse['version']['name']}
			</span>
		{:else}
			<span class="loading loading-dots loading-sm"></span>
		{/if}
	</td>
	<td class="break-all">{server.serverHost}:{server.port}</td>
	<td class="hidden sm:table-cell"
		>{#if pingResponse !== null}
			<p>{pingResponse['players']['online']}/{pingResponse['players']['max']}</p>
		{:else}
			<span class="loading loading-dots loading-sm"></span>
		{/if}
	</td>
	<td class="hidden sm:table-cell">
		{#if pingResponse !== null}
			<Icon class="inline-block align-midle" src={ChartBar} size="20" style="color: green" solid />

			<!-- Change to pingResponse ping time originating from ping packet? -->
			<p class="inline-block align-middle">6.3ms</p>
		{:else}
			<span class="loading loading-dots loading-sm"></span>{/if}
	</td>
	<td class="hidden sm:table-cell">
		{#if deleting}
			<span class="loading loading-dots loading-sm"></span>
		{:else}
			<button
				on:click={() => {
					modal.set({
						title: 'Are you sure?',
						message: `Are you sure you want to delete you server ${server.servername}?`,
						closeCallback: deleteServer
					});
					console.log('clicked!');
				}}
			>
				<Icon class="inline-block align-midle" src={Trash} size="20" style="color: red" />
			</button>
		{/if}
	</td>
</tr>
