<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { Icon, CheckCircle, XCircle } from 'svelte-hero-icons';
	import { modal } from '$lib/stores';
	import { unauthorizedModal } from '$lib/types';
	import { deployServerRequest } from '$lib/requests';

	let servername = '';
	let status = '';
	let selectedKind = 'java';

	const update = (v: any) => {
		//console.log('New selection: ', v.value);
		selectedKind = v.value;
	};

	const create = () => {
		if (servername.length > 10 || servername.includes(' '))
			modal.set({
				title: 'Invalid server name.',
				message:
					"Server name must be shorter than 10 characters and can only container lower-case characters or '-'",
				closeCallback: () => null
			});

		status = 'deploying';
		deployServerRequest(selectedKind, servername, (s) => (status = s));
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Create a server!</h1>
			<p class="py-6">This will create a Minecraft 1.20 server for you.</p>
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
				<select class="select select-bordered w-full max-w-xs" on:change={(e) => update(e.target)}>
					<option selected value="java">Paper 1.20.2</option>
					<option value="bedrock">Bedrock 1.20</option>
				</select>
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
