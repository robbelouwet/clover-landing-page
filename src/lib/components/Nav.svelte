<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
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
				<a href={`${PUBLIC_BACKEND_HOST}/.auth/login/google?post_login_redirect_uri=${host}`}>
					<Icon src={UserCircle} size="20" />
					Login
				</a>
			</li>
		</ul>
	</div>
</div>
