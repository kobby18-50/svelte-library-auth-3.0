<script lang="ts">
	import { goto } from "$app/navigation";
    import { BASE_URL, Categories } from "$lib";
    import {user_token} from '$lib/stores/tokenStore'
    import axios from "axios";
	import { Alert, Button, Heading, Input, Label, Select, Spinner, Textarea } from "flowbite-svelte";
    import toast, { Toaster } from 'svelte-french-toast';
	import { InfoCircleSolid } from "flowbite-svelte-icons";

    let isFail = false
    let isLoading = false
    let BOOKFORM = {
        title : '',
        genre : '',
        content : ''
    }

    let bookValidator = {
        titleValidator : '',
        contentValidator : ''
    }

    const handleAddBook = async () => {
        isLoading = true
       

        if(BOOKFORM.title.length <= 8){
            bookValidator.titleValidator = 'The minimum length of book title is 8 characters'
        }
        if(BOOKFORM.content.length <= 40){
            bookValidator.contentValidator = 'The minimum length of book content is 40 characters'
        }

        const data = {
            title : BOOKFORM.title,
            content : BOOKFORM.content,
            genre : BOOKFORM.genre
        }

        const authorization = $user_token

        await axios.post(`${BASE_URL}/books`, data, { headers : {Authorization : `Bearer ${authorization}`}})
        .then((res) => {

            if(res.status === 201){
                toast.success('Book successfully created')

                isLoading = false
              
                goto('/auth/dashboard')
              
            }
           

        })
        .catch((err) =>{
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

    <Heading tag='h6' class='text-center mb-5'>Add Book</Heading>

    <form on:submit|preventDefault={handleAddBook} class="mx-10 grid grid-row-2 gap-5 md:mx-24 lg:mx-52">

        <div>
            <Label for='title'>Book title</Label>
            <Input id='title' placeholder='Grief Child' bind:value={BOOKFORM.title} required />

            {#if isFail && bookValidator.titleValidator.length != 0}
            <Alert color="red" dismissable class='mt-2'>
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                 {bookValidator.titleValidator}
                <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
              </Alert>
            {/if}
        </div>

        <div>
            <Label for='title'>Book Genre</Label>
           <Select bind:value={BOOKFORM.genre} required >
            {#each Categories as {genre, id} (id) }
                <option value={genre}>{genre}</option>
            {/each}
           </Select>
        </div>

        
        <div>
            <Label for='content'>Book Content</Label>
            <Textarea id='content' placeholder='Book content' rows='4' bind:value={BOOKFORM.content} required />
            
            {#if isFail && bookValidator.contentValidator.length != 0}
            <Alert color="red" dismissable class='mt-2'>
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                 {bookValidator.contentValidator}
                <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
              </Alert>
            {/if}
        </div>


        {#if isLoading}
    <Button disabled>
        <Spinner class="mr-3" size="4" color="white" />
        Adding Book Please wait ...
    </Button>
    {:else}
    
    
    <Button type='submit'>Add Book</Button>
    
        
    {/if}
    </form>
    
</main>