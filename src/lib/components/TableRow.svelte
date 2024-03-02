<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { modal } from '$lib/stores';
	import { unauthorizedModal, type Server } from '$lib/types';
	import { onMount } from 'svelte';
	import { ChartBar, Icon } from 'svelte-hero-icons';

	export let server: Server;
	let pingResponse: any = null;

	onMount(() => {
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
	});
</script>

<!-- Only render the row if the ping response was successfulle -->
<tr>
	<td class="">
		<div class="flex items-center gap-3">
			<div class="avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img src="/dirt.png" alt="Avatar Tailwind CSS Component" />
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
			<p class="inline-block align-middle">6.3ms</p>
		{:else}
			<span class="loading loading-dots loading-sm"></span>
		{/if}
	</td>
</tr>
