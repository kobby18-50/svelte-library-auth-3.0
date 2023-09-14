<script lang="ts">
	import { Button, Card, Heading, Search, CardPlaceholder } from "flowbite-svelte";
  import { ArrowRightOutline, SearchOutline } from 'flowbite-svelte-icons';
  import { Categories } from "$lib";
	import type { BOOKS } from "../models/books.js";
  
	import EmptyCart from "../components/EmptyCart.svelte";


  export let data

  const {books} = data

  let searchValue = ''
  $:searchValue = ''

  let sortGenre = 'All Books'
  $: sortGenre

  let filteredBooks:BOOKS[]

  $: filteredBooks = books.filter((book) => {
    if(sortGenre === '' || sortGenre === 'All Books'){
      return book
    }
    else if(searchValue){
      return book.title.includes(searchValue)

    }
    else{
      return book.genre.includes(sortGenre)
    }
  })
  

  const handleSearch = () => {
    filteredBooks = filteredBooks.filter((book) => {
      if(searchValue){
        return book.title.includes(searchValue)
      }
      else {
        return book
      }
    })
  }


 
  
  </script>



  <main class="mx-10">
  

    <form class="flex gap-2 mt-5" on:submit={handleSearch}>
      <Search size="lg" bind:value={searchValue} placeholder='Search by book title' />
      <Button class="!p-2.5" type='submit'>
        <SearchOutline class="w-5 h-5" />
      </Button>
    </form>
  
    
    <!-- categories -->

    <ul class="flex mt-5 justify-between flex-wrap">
      <li class="hover:bg-primary-300 px-1.5 py-1 rounded-lg hover:transition hover: delay-150 hover:text-primary-800"><button on:click={()=>{sortGenre = 'All Books'}}>All Books</button></li>
      {#each Categories as {genre, id} (id) }
      <li class="hover:bg-primary-300 px-1.5 py-1 rounded-lg hover:transition hover: delay-150 hover:text-primary-800">
        <button class="text capitalize" on:click={() => {sortGenre = genre}}>{genre}</button>
      </li>
    {/each}
    </ul>



    <Heading tag='h6' class='mt-5 capitalize'>{sortGenre}</Heading>

    <div class="grid md:grid-cols-3 md:gap-7">
   {#if filteredBooks.length === 0}
      <div></div>
   <EmptyCart/>

   {:else}

   {#each filteredBooks as book }
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

   {:else}
   <CardPlaceholder/>

   {/each}
    
   {/if}
  </div>
  </main>

  
  