<script>
	import { Heading } from "flowbite-svelte";

    export let data

    const {book} = data
</script>


<main class="mx-10">
    <Heading tag='h3' class='my-5'>{book.title}</Heading>
<span class="grid grid-rows-3 md:flex gap-3 md:space-x-7 ">
    <span><span class="font-medium">By:</span> <span>{book.author}</span> </span>
    <span> <span class="font-medium">Year:</span>  <span>{book.year}</span> </span>
    <span><span class="font-medium">Genre:</span> <span>{book.genre}</span> </span>
</span>

<p class="mt-5">
    {book.content}
</p>
</main>