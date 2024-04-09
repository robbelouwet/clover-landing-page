<script>
	import Carousel from '$lib/components/Carousel.svelte';
</script>

<div
	class="hero min-h-[90vh] bg-gradient-to-b from-inherit text-white saturate-200"
	style="background-image: url(background.jpg);"
>
	<!-- <Menu /> -->
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Minecraft Server Hosting</h1>
			<p class="mb-5">Cheap, resilient minecraft servers that Just. Work.</p>
			<a href="/servers?create=true"><button class="btn btn-primary">Get Started</button></a>
		</div>
	</div>
	<Carousel />
</div>
