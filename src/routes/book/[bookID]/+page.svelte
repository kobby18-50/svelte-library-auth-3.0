<script>
	import { Heading } from "flowbite-svelte";

    export let data

    const {book} = data
</script>


<main class="mx-10">
    <Heading tag='h3' class='my-5'>{book.title}</Heading>
<span class="flex space-x-5 mb-5">
    <span>By: <span>{book.author}</span> </span>
    <span>Year: <span>{book.year}</span> </span>
    <span>Genre: <span>{book.genre}</span> </span>
</span>

<p>
    {book.content}
</p>
</main>