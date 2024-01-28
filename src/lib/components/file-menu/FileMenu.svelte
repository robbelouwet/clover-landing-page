<script lang="ts">
	import { expandFolderRecursively } from '$lib/fileShareClient';
	import { openFilePath } from '$lib/stores';
	import type { UserFolder } from '$lib/types';

	export let folder: UserFolder;
	export let level: number;

	console.log('component folder: ', folder);

	const expandFolder = async (path: string, dirLevel: number) => {
		folder = { ...(await expandFolderRecursively(folder, path, dirLevel)) };
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<ul class="menu menu-xs bg-base-200 rounded-lg max-w-xs min-w-full">
	{#each folder.subfolders as item}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li>
			<details>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<summary on:click={(e) => expandFolder(item.path, level)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
						/></svg
					>
					{item.name}
				</summary>
				{#if item.files.length === 0 && item.subfolders.length === 0}
					<div class="w-fill flex justify-center">
						<span class="loading loading-dots loading-xs" />
					</div>
				{:else}
					<svelte:self folder={item} level={level + 1} />
				{/if}
			</details>
		</li>
	{/each}
	{#each folder.files as file}
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li on:click={(e) => openFilePath.update((v) => file.filepath)}>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
					/></svg
				>
				{file.name}
			</a>
		</li>
	{/each}
</ul>
