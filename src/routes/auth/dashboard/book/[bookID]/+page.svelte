<script lang="ts">
    import { page } from "$app/stores";
	import { BASE_URL } from "$lib";
    import axios from "axios";
	import { Button, Heading, Modal } from "flowbite-svelte";
    import toast, {Toaster} from "svelte-french-toast";
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { goto } from "$app/navigation";
    import {user_token} from '$lib/stores/tokenStore.js'

    
    const {bookID} = $page.params

    export let data

    const {book} = data

    let popupModal = false;

    $: isDelete = false

    const token = $user_token


    const handleDelete = async (id : string) => {
        popupModal = true
      
            await axios.delete(`${BASE_URL}/books/${id}`, {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then((res) => {
            console.log(res)
          if(res.status === 200){
            toast.success('Book deleted')
          }
          
            goto('/auth/dashboard')
           
            
        })
        .catch((err) => {
            
        })
        

    }



    const handleEdit = () => {
        goto(`/auth/dashboard/book/edit/${bookID}`)
    }


    

</script>

<Toaster/>
<main class="mx-10"> 
    <div class="flex justify-between mt-5">

        <div>
            <a href="/auth/dashboard">Back</a>
        </div>

        <div class="flex space-x-5">
            <Button on:click={handleEdit}><span>Edit book</span></Button>
            <Button on:click={() => popupModal = true}><span>Delete book</span></Button>
        </div>


    </div>


  
   <main>
    <Heading tag='h3' class='my-5'>{book.title}</Heading>
<span class="flex space-x-5 mb-5">
    <span>By: <span>{book.author}</span> </span>
    <span>Year: <span>{book.year}</span> </span>
    <span>Genre: <span class='capitalize'>{book.genre}</span> </span>
</span>

<p>
    {book.content}
</p>
</main>
    
</main> 

<Modal bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this book?</h3>
     
      <Button color="red" on:click={() => handleDelete(book._id)} class="mr-2">Yes, I'm sure</Button>
      <Button color="alternative" >No, cancel</Button>
    </div>
  </Modal>


