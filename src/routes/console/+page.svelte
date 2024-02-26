<script lang="ts">
	import { selectedServer } from '$lib/stores';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { get } from 'svelte/store';

	let consoleOutput: string[] = [];
	let input = '';
	let socket: WebSocket;

	const connectWebSocket = () => {
		if (get(selectedServer) === null)
			throw new Error('Opening ws channel when user is not logged in!');
		const url = `ws://${get(selectedServer)!.serverHost}:${get(selectedServer)!.port + 1}`;
		console.log('server: ', get(selectedServer), ', Connecting ws to ', url, '!');
		socket = new WebSocket(url);

		socket.addEventListener('open', () => {
			console.log('Connected to WebSocket server');
			// Uncomment this line if you want to send a message when connected
			// socket.send('Hello, server!');
		});

		socket.addEventListener('message', (event) => {
			//console.log('Received from server:', event.data);
			consoleOutput = [...consoleOutput, event.data];
		});

		socket.addEventListener('close', (d) => {
			console.log('WebSocket connection closed: ', d);
			// retryWebSocket();
		});

		socket.addEventListener('error', (event) => {
			console.error('WebSocket connection error: ', event);
			// retryWebSocket();
		});
	};

	selectedServer.subscribe((s) => {
		if (s !== null) connectWebSocket();
	});

	onMount(() => {
		if (!socket || socket.readyState === WebSocket.CLOSED) {
			// Initialize or reconnect the WebSocket
			connectWebSocket();
		}
	});

	let update = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;

		console.log('Sending input to ws: ', input);
		socket.send(input);
		input = '';
	};

	afterUpdate(() => scrollToBottom());

	const scrollToBottom = () => {
		var scrollableDiv = document.getElementById('console-output');
		// Set the scrollTop property to the maximum scroll height
		scrollableDiv!.scrollTop = scrollableDiv!.scrollHeight;
	};
</script>

<div id="terminal" class="p-5">
	<div class="relative mockup-code w-[100%] h-[60vh]">
		<div id="console-output" class="pb-[5rem] overflow-scroll h-full">
			{#if consoleOutput.length !== 0}
				{#each consoleOutput as line}
					<pre data-prefix="$"><code>{line}</code></pre>
				{/each}
			{:else}
				<div class="skeleton mb-4 ml-5 h-3 w-[90%] bg-white opacity-10"></div>
			{/if}
		</div>

		<input
			type="text"
			placeholder=">"
			bind:value={input}
			on:keydown={update}
			class="absolute inset-x-0 bottom-0 input input-ghost w-full text-white"
		/>
	</div>
</div>
