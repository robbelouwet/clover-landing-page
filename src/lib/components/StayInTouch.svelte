<script lang="ts">
	import { PUBLIC_BACKEND_HOST } from '$env/static/public';
	import { modal } from '$lib/stores';
	import { unauthorizedModal } from '$lib/types';

	let email: string;

	const subscribe = () => {
		fetch(`${PUBLIC_BACKEND_HOST}/subscribe-info?email=${email}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		})
			.then((resp) => {
				if (resp.status % 400 < 100) {
					modal.set(unauthorizedModal);
					throw new Error('Unauthorized');
				}
				if (resp.ok) {
					modal.set({
						title: 'Subscribed!',
						message:
							"You have been successfully subscribed to our mailing list. You'll be the first to know when our alpha releases!",
						closeCallback: () => null
					});
				}
			})
			.catch(console.error);
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Stay in the loop!</h1>
			<p class="py-6">
				Enter our mailing list to receive purely informational emails and keep up-to-date with alpha
				& beta releases and more!
			</p>
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body" on:submit={(_) => subscribe()}>
				<div class="form-control inline">
					<input
						type="email"
						placeholder="Enter your email address."
						bind:value={email}
						class="inline-block align-middle input input-bordered"
						required
					/>
				</div>
				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary">Subscribe</button>
				</div>
			</form>
		</div>
	</div>
</div>
