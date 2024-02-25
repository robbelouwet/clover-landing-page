<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import { CommandLine, Folder, Icon, Play, UserCircle } from 'svelte-hero-icons';

	let host = '';

	onMount(() => (host = window.location.host));
</script>

<div class="inset-x-0 top-0 navbar bg-base-100 p-0">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl pl-3 ml-3">Clover</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/create">
					<Icon src={Play} size="20" />
					Connect
				</a>
			</li>
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
			<li>
				<a
					href={`${env.PUBLIC_BACKEND_HOST}/.auth/login/google?post_login_redirect_uri=/post-login-redirect`}
				>
					<Icon src={UserCircle} size="20" />
					Login
				</a>
			</li>
		</ul>
	</div>
</div>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</label>
			</div>
			<div class="flex-1 px-2 mx-2">Navbar Title</div>
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					<li>
						<a href="/connect">
							<Icon src={Play} size="20" />
							Connect
						</a>
					</li>
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
					<li>
						<a
							href={`${env.PUBLIC_BACKEND_HOST}/.auth/login/google?post_login_redirect_uri=/post-login-redirect`}
						>
							<Icon src={UserCircle} size="20" />
							Login
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		Content
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 min-h-full bg-base-200">
			<!-- Sidebar content here -->
			<li><a>Sidebar Item 1</a></li>
			<li><a>Sidebar Item 2</a></li>
		</ul>
	</div>
</div>
