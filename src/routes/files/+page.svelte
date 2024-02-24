<script lang="ts">
	import FileMenu from '$lib/components/file-menu/FileMenu.svelte';
	import { upsertFileContent, loadFileContent, loadFolderContent } from '$lib/fileShareClient';
	import { openFilePath, server } from '$lib/stores';
	import type { UserFolder } from '$lib/types';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	// export let data;

	let contents: string = '';
	let folder: UserFolder | null = null;

	const update = (e: Event) => (contents = (e.target as HTMLTextAreaElement).value);

	openFilePath.subscribe((newPath) => {
		console.log('new path: ', newPath);
		if (newPath !== null) loadFileContent(newPath!).then((d) => (contents = d));
	});

	const tryLoad = () => {
		if (get(server) !== null)
			loadFolderContent()
				.then((f) => (folder = f))
				.catch(console.error);
	};

	server.subscribe((_) => tryLoad());

	onMount(tryLoad);
</script>

<div class="flex flex-col w-full lg:flex-row min-h-[80vh] p-5">
	<div class="grid grid-cols-1 lg:w-[33vw] auto-rows-min">
		<!-- <div><Breadcrumbs /></div> -->
		<dv>
			<h3>File Explorer</h3>
		</dv>
		<div
			class="grid lg:flex-grow card bg-base-300 rounded-box overflow-auto h-[70vh] mt-3 hide-scrollbars"
		>
			{#if folder !== null}
				<FileMenu {folder} level={0} />
			{:else}
				<div class="m-3">
					<div class="skeleton mb-4 h-4 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-5 h-3 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-5 h-3 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 h-4 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-5 h-3 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-5 h-3 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
					<div class="skeleton mb-4 ml-10 h-2 w-[90%] bg-white opacity-10"></div>
				</div>
			{/if}
		</div>
	</div>
	<div class="divider lg:divider-horizontal" />
	<div class="grid grid-cols-1 lg:w-[66vw] h-full auto-rows-min">
		<dv class="grid grid-rows-1 grid-flow-col">
			<h3 class="inline justify-self-start">File Editor</h3>

			<button
				on:click={async (e) => {
					console.log('Saving file ', $openFilePath, ', contents: ', contents);
					if ($openFilePath !== null) await upsertFileContent(contents, $openFilePath);
				}}
				class="btn btn-outline btn-xs btn-success justify-self-end"
			>
				Save
			</button>
		</dv>

		<div class="grid lg:flex-grow card bg-base-300 rounded-box h-[70vh] mt-3">
			<textarea
				on:change={(e) => update(e)}
				class="w-full h-full textarea textarea-ghost resize-none"
				style="line-height: 110%;">{contents}</textarea
			>
		</div>
	</div>
</div>
