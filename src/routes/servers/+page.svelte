<script lang="ts">
	import TableRow from '$lib/components/TableRow.svelte';
	import { servers } from '$lib/stores';
	import { onMount } from 'svelte';
	import Create from './Create.svelte';

	let create: boolean = false;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const localCreate = urlParams.get('create');

		create = !!localCreate;
	});
</script>

<div role="tablist" class="tabs tabs-lifted">
	<input
		type="radio"
		name="my_tabs_2"
		role="tab"
		class="tab"
		aria-label="My Servers"
		checked={!create}
	/>
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>Server Name</th>
					<th class="hidden sm:table-cell">Server Type</th>
					<th>Server Host</th>
					<th class="hidden sm:table-cell">Player Count</th>
					<th class="hidden sm:table-cell">Usage</th>
					<th></th><!-- Leave room for nameless column -->
					<th class="hidden sm:table-cell"></th><!-- Leave room for nameless column -->
				</tr>
			</thead>
			<tbody>
				{#each $servers as server}
					<TableRow {server} />
				{/each}
			</tbody>
		</table>
	</div>

	<input
		type="radio"
		name="my_tabs_2"
		role="tab"
		class="tab"
		aria-label="Create"
		checked={create}
	/>
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<Create />
	</div>
</div>
