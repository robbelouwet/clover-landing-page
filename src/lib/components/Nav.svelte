<script lang="ts">
	import { CommandLine, Folder, Icon } from 'svelte-hero-icons';
</script>

<div class="inset-x-0 top-0 navbar bg-base-100 p-0">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl pl-3 ml-3">Clover</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/files">
					<Icon src={Folder} size="20" />
					Files
				</a>
			</li>
			<li>
				<a href="/console">
					<Icon src={CommandLine} size="20" />
					Console
				</a>
			</li>
		</ul>
	</div>
</div>
