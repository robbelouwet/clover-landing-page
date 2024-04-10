<script lang="ts">
	import PriceTier from './PriceTier.svelte';

	let tiers = [
		['Dirt', 2, 4, '/pricing-dirt.jpg'],
		['Sand', 3, 5, '/pricing-sand.jpg'],
		['Stone', 4, 6, '/pricing-cobblestone.jpg'],
		['Redstone', 5, 7, '/pricing-redstone.jpg'],
		['Silver', 6, 8, '/pricing-silver.jpg'],
		['Gold', 7, 9, '/pricing-gold.jpg'],
		['Diamond', 8, 10, '/pricing-diamond.jpg']
	];
</script>

<div class="bg-base-300 rounded-box place-items-center overflow-x-auto">
	<div class="center carousel carousel-center max-w p-4 space-x-4">
		{#each tiers as tier}
			<PriceTier data={tier} />
		{/each}
	</div>
</div>
<div class="divider mt-[3.8rem] mb-[3.8rem]">OR</div>
<div class="bg-base-300 rounded-box place-items-center overflow-x-auto text-center">
	<div class="center carousel carousel-center max-w p-4 space-x-4">
		<div class="carousel-item">
			<div class="card w-96 bg-base-100 shadow-xl glass w-[13vw] m-5">
				<figure>
					<img src="/consumption.jpg" alt="Shoes" />
				</figure>
				<div class="card-body">
					<b><p class="text-center" style="font-size: 1.5rem;">It just works.</p></b>
					<b
						><p class="text-center" style="font-size: large;">
							&euro;{0.08}<br />per player<br />per hour
						</p></b
					>
					<div class="card-actions justify-center">
						<button class="btn btn-primary btn-sm w-full">Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
