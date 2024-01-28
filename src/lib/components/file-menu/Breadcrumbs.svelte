<script lang="ts">
	import { path } from '$lib/stores';
	import { Icon, Folder, Home } from 'svelte-hero-icons';

	let crumbs: string[] = [];

	path.subscribe((v) => {
		console.log('crumbs updated!');
		return v !== null ? (crumbs = v.split('/')) : [];
	});
</script>

<div class="text-sm breadcrumbs">
	<ul>
		{#each crumbs as level}
			<li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a>
					{#if level !== ''}
						<Icon src={Folder} size="1rem" />
						<p class="ml-2">{level}</p>
					{:else}
						<Icon src={Home} size="1rem" />
						<p class="ml-2">{'/'}</p>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>
