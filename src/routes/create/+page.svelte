<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { type Server } from '$lib/types';
	import { Icon, CheckCircle, XCircle } from 'svelte-hero-icons';

	let servername = '';
	let status = '';

	const create = () => {
		if (servername.length > 10 || servername.includes(' '))
			alert(
				"Server name must be shorter than 10 characters and can only container lower-case characters or '-'"
			);

		status = 'deploying';
		fetch(`${PUBLIC_BACKEND_HOST}/deploy-paper-dedicated?cpu=2&memory=4&servername=${servername}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json'
			}
		})
			.then((r) => {
				if (r.status >= 200 && r.status <= 299) status = 'success';
				else status = 'error';
			})
			.catch(console.error);
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Create a server!</h1>
			<p class="py-6">This will create a Minecraft 1.20.2 Java Edition server for you.</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body">
				<div class="form-control inline">
					<input
						type="text"
						placeholder="Server Name"
						bind:value={servername}
						class="inline-block align-middle input input-bordered"
					/>{#if status === 'deploying'}<span
							class="ml-5 inline-block align-middle loading loading-spinner loading-lg"
						></span>{/if}{#if status === 'success'}<a
							><Icon
								src={CheckCircle}
								class="ml-5 inline-block align-middle "
								style="color: green"
								size="40"
							/></a
						>{/if}{#if status === 'error'}<a
							><Icon
								src={XCircle}
								class="ml-5 inline-block align-middle "
								size="40"
								style="color: red"
							/></a
						>{/if}
				</div>
				<div class="form-control mt-6">
					<button
						on:click={(_) => create()}
						class="btn btn-primary"
						disabled={status ? true : false}>Create</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
