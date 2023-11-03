<script lang="ts">
	import { BASE_URL, Categories } from "$lib";
	import axios from "axios";
	import { onMount } from "svelte";
    import { page } from "$app/stores";
	import { Alert, Button, Heading, Input, Label, Select, Spinner, Textarea } from "flowbite-svelte";
	import { goto } from "$app/navigation";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
	import toast, {Toaster} from "svelte-french-toast";
    import {user_token} from '$lib/stores/tokenStore.js'

   

    export let data

   let book = data.book

   let isFail = false

   let editValidator = {
        titleValidator : '',
        contentValidator : ''
    }

// token from store
    const token = $user_token



    let isLoading = false

   


   
const handleEdit = async () => {
    isLoading = true
    if(book.title.length <= 8){
            editValidator.titleValidator = 'The minimum length of book title is 8 characters'
        }
        if(book.content.length <= 40){
            editValidator.contentValidator = 'The minimum length of book content is 40 characters'
        }
    const data = {
        title : book.title,
        content : book.content,
        genre : book.genre
    }


    await axios.patch(`${BASE_URL}/books/${book._id}`, data, {headers : {Authorization : `Bearer ${token}`}})
    .then((res) => {
        if(res.status === 200){
            isLoading = false
            toast.success('Book updated successfully')
           
                goto('/auth/dashboard')
            
        }
    })
    .catch((err) => {
        isFail = true
        isLoading = false
      
        if(err.request.response.includes('Duplicate')){
                toast.error('This title has already been used try a different one')
            }else{
                toast.error(err.message)

            }
    })
}

</script>

<Toaster/>



<main>

    <Heading tag='h6' class='text-center mb-5'>Edit Book</Heading>

    <form on:submit|preventDefault={handleEdit} class="mx-10 grid grid-row-2 gap-5 md:mx-24 lg:mx-52">

        <div>
            <Label for='title'>Book title</Label>
            <Input id='title' placeholder='Grief Child' bind:value={book.title} required />

            {#if isFail && editValidator.titleValidator.length != 0}
            <Alert color="red" dismissable class='mt-2'>
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                 {editValidator.titleValidator}
                <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
              </Alert>
            {/if}
        </div>

        <div>
            <Label for='title'>Book Genre</Label>
           <Select bind:value={book.genre} required >
            {#each Categories as {genre, id} (id) }
                <option value={genre}>{genre}</option>
            {/each}
           </Select>
        </div>

        
        <div>
            <Label for='content'>Book Content</Label>
            <Textarea id='content' placeholder='Book content' rows='5' bind:value={book.content} required />

            {#if isFail && editValidator.contentValidator.length != 0}
            <Alert color="red" dismissable class='mt-2'>
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                 {editValidator.contentValidator}
                <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
              </Alert>
            {/if}
            
        </div>

        {#if isLoading}
        <Button disabled >
            <Spinner class="mr-3" size="4" color="white" />
            Updating Book Please wait ...
        </Button>
        {:else}
        
        <Button type='submit'>Edit Book</Button>
        
        
        
            
        {/if}

        




    

    </form>
    
</main>
    
