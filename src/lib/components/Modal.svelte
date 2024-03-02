<script lang="ts">
	import { modal } from '$lib/stores';

	let isOpen: boolean = false;

	modal.subscribe((v) => {
		if (v != null) isOpen = true;
	});
</script>

<dialog id="my_modal_1" open={isOpen} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{$modal?.title}</h3>
		<p class="py-4">{$modal?.message}</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button on:click={() => (isOpen = false)} class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
