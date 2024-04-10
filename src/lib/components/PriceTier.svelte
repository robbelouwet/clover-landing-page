<script lang="ts">
	export let data: any;
</script>

<div class="carousel-item">
	<div class="card w-96 bg-base-100 shadow-xl glass w-[13vw] m-5">
		<figure>
			<img src={data[3]} alt="Shoes" />
		</figure>
		<div class="card-body">
			<b><p class="text-center" style="font-size: 1.8rem;">{data[0]}</p></b>
			<div class="text-center">
				<div class="badge badge-neutral text-center">{data[1]}GB RAM</div>
			</div>
			<b><p class="text-center" style="font-size: x-large;">&euro;{data[2]} / month</p></b>
			<div class="card-actions justify-center">
				<button class="btn btn-primary btn-sm w-full">Buy Now</button>
			</div>
		</div>
	</div>
</div>
