<script lang="ts">
	import TableRow from '$lib/components/TableRow.svelte';
	import { servers } from '$lib/stores';
</script>

<div>
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th>Server Name</th>
				<th class="hidden sm:table-cell">Server Type</th>
				<th>Server Host</th>
				<th class="hidden sm:table-cell">Player Count</th>
				<th class="hidden sm:table-cell">Ping</th>
			</tr>
		</thead>
		<tbody>
			{#each $servers as server}
				<TableRow {server} />
			{/each}
		</tbody>
	</table>
</div>
