<script lang="ts">
	import FileMenu from '$lib/components/file-menu/FileMenu.svelte';
	import { upsertFileContent, loadFileContent } from '$lib/fileShareClient';
	import { openFilePath } from '$lib/stores';
	export let data;

	let contents: string = '';

	const update = (e: Event) => (contents = (e.target as HTMLTextAreaElement).value);

	openFilePath.subscribe((newPath) => {
		console.log('new path: ', newPath);
		if (newPath !== null) loadFileContent(newPath!).then((d) => (contents = d));
	});
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
			<!-- {#if folder !== null && folder !== undefined} -->
			<FileMenu folder={data} level={0} />
			<!-- {/if} -->
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
