<script lang="ts">
	import type { Server } from '$lib/types';
	import { ChartBar, Icon } from 'svelte-hero-icons';

	export let server: Server;
</script>

<tr>
	<td>
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
	<td>
		Paper
		<br />
		<span class="badge badge-ghost badge-sm">1.20.2</span>
	</td>
	<td>{server.serverHost}:{server.port}</td>
	<td>4</td>
	<td
		><Icon class="inline-block align-midle" src={ChartBar} size="20" style="color: green" solid />
		<p class="inline-block align-middle">6.3ms</p></td
	>
</tr>
