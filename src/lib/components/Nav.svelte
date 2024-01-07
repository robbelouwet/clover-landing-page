<script>
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
				<a href="/server">
					<Icon src={CommandLine} size="20" />
					Console
				</a>
			</li>
			<li>
				<details>
					<summary> Parent </summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						<li><a>Link 1</a></li>
						<li><a>Link 2</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>
