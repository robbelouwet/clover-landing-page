<script lang="ts">
	import TableRow from '$lib/components/TableRow.svelte';
	import { servers } from '$lib/stores';
</script>

<div>
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th class="w-[20%]">Server Name</th>
				<th>Server Type</th>
				<th class="w-[30%]">Server Host</th>
				<th>Player Count</th>
				<th>Ping</th>
			</tr>
		</thead>
		<tbody>
			{#each $servers as server}
				<TableRow {server} />
			{/each}
		</tbody>
	</table>
</div>
