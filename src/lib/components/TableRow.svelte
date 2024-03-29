<script lang="ts">
	import {
		deleteServerRequest,
		getServerStateRequest,
		pingServerRequest,
		startServerRequest,
		stopServerRequest
	} from '$lib/requests';
	import { modal } from '$lib/stores';
	import { type Server } from '$lib/types';
	import { onMount } from 'svelte';
	import { ChartBar, Trash, Icon, Play, Stop, QuestionMarkCircle } from 'svelte-hero-icons';

	export let server: Server;
	let pingResponse: any = null;
	let deleting: boolean = false;
	let serverState: 'offline' | 'online' | 'loading' | 'unknown' = 'loading';

	const deleteServer = () => {
		console.log('Deleting!');
		deleting = true;

		deleteServerRequest(server);
	};

	const setPing = (p: any) => {
		pingResponse = p;
	};

	onMount(() => {
		getServerStateRequest(server.servername, (s) => {
			serverState = s;
			console.log('pingresp: ', pingResponse, 'serverState: ', serverState);
			if (serverState === 'online') pingServerRequest(server, setPing);
		});
	});
</script>

<tr>
	<td class="">
		<div class="flex items-center gap-3">
			<div class="hidden sm:block avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img src={`/dirt-${server.kind}.png`} alt="Minecraft dirt" />
				</div>
			</div>
			<div>
				<div class="font-bold">{server.servername}</div>
				<div class="text-sm opacity-50">West Europe</div>
			</div>
		</div>
	</td>
	<td class="hidden sm:table-cell">
		{#if serverState === 'online' && pingResponse !== null}
			{pingResponse['description']['text']}
			<br />
			<span class="badge badge-ghost badge-sm bg-green">
				{pingResponse['version']['name']}
			</span>
		{:else if serverState === 'offline'}
			N/A
		{:else}
			<span class="loading loading-dots loading-sm"></span>
		{/if}
	</td>
	<td class="break-all">{server.serverHost}</td>
	<td class="hidden sm:table-cell"
		>{#if serverState === 'online' && pingResponse !== null}
			<p>{pingResponse['players']['online']}/{pingResponse['players']['max']}</p>
		{:else if serverState === 'offline'}
			N/A
		{:else}
			<span class="loading loading-dots loading-sm"></span>
		{/if}
	</td>
	<td class="hidden sm:table-cell">
		{#if serverState === 'online' && pingResponse !== null}
			<p class="inline-block align-middle">8h45</p>
		{:else if serverState === 'offline'}
			N/A
		{:else}
			<span class="loading loading-dots loading-sm"></span>{/if}
	</td>
	<td>
		{#if serverState === 'offline'}
			<button
				on:click={() => startServerRequest(server.servername, (s) => (serverState = s))}
				class="btn btn-circle btn-outline btn-sm btn-success"
			>
				<Icon src={Play} class="pl-1" size={'1.7rem'} />
			</button>
		{:else if serverState === 'online'}
			<button
				on:click={() => stopServerRequest(server.servername, (s) => (serverState = s))}
				class="btn btn-circle btn-outline btn-sm btn-error"
			>
				<Icon src={Stop} class="pl-[0.036rem]" size={'1.7rem'} />
			</button>
		{:else if serverState === 'loading'}
			<span class="loading loading-spinner loading-md"></span>
		{:else}
			<Icon src={QuestionMarkCircle} size={'1.7rem'} />
		{/if}
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
