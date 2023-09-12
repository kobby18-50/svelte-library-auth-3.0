<script lang="ts">
	import { Button, Card, Heading, Search } from "flowbite-svelte";
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  import { Categories } from "$lib";


  export let data
  const {books} = data
  
  </script>



  <main class="mx-10">
    <form id="example-form" class=" mt-5">
      <Search/>
    </form>
  
    
    <!-- categories -->

    <ul class="flex justify-between flex-wrap">
      {#each Categories as {genre, id} (id) }
      <li class="capitalize">{genre}</li>
    {/each}
    </ul>



    <Heading tag='h6' class='mt-5'>Recent books</Heading>

    <div class="grid md:grid-cols-3 md:gap-7">
    {#each books as book }
    <Card class='mt-5'>
      <p class="text-xs capitalize font-bold  w-fit p-1 rounded-lg bg-primary-200 text-primary-700">{book.genre}</p>
      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight line-clamp-3">{book.content}</p>
      <Button class="w-fit">
       <a href={`book/${book._id}`} class="flex"> 
      <span>Read more </span>
      <span><ArrowRightOutline class="w-3.5 h-3.5 ml-2 mt-1 text-white" /></span>
      </a>
      </Button>
    </Card>
    {/each}
  </div>





   
  </main>
  