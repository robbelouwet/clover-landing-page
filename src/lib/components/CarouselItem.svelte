<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	export let icon: IconSource;
	export let text: string;
	export let margin: string;
</script>

<div class="carousel-item">
	<div
		class="bg-gradient-to-b from-green-950 p-5 artboard-demo phone-1 w-[300px] h-[400px] bg-neutral"
	>
		<div class="h-[50%] mb-2">
			<Icon src={icon} size="192" />
		</div>
		<div class="h-[50%]" style="margin-top: {margin}rem;">
			<article class="text-center text-xl align-middle h-[100%]">{text}</article>
		</div>
	</div>
</div>
