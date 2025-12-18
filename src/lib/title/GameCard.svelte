<script lang="ts">
	interface Props {
		title: string;
		tags: string[];
		image: string;
		href: string;
	}

	let { title, tags, image, href }: Props = $props();
</script>

<a
	{href}
	class="card bg-base-200 hover:bg-base-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
>
	<figure class="px-4 pt-4">
		<img src={image} alt={title} class="rounded-xl w-full h-48 object-cover" />
	</figure>
	<div class="card-body">
		<h2 class="card-title text-2xl text-accent">{title}</h2>
		<div class="flex flex-wrap gap-2 mt-2">
			{#each tags as tag}
				<span class="badge badge-primary">{tag}</span>
			{/each}
		</div>
	</div>
</a>
