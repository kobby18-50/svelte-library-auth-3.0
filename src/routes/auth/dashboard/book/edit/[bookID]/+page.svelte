<script lang="ts">
	import { BASE_URL, Categories } from "$lib";
	import axios from "axios";
	import { onMount } from "svelte";
    import { page } from "$app/stores";
	import { Button, Heading, Input, Label, Select, Textarea } from "flowbite-svelte";
	import { goto } from "$app/navigation";

   

    export let data

   let book = data.book

    console.log(book)


   
const handleEdit = async () => {
    const data = {
        title : book.title,
        content : book.content,
        genre : book.genre
    }


    await axios.patch(`${BASE_URL}/books/${book._id}`, data, {headers : {Authorization : localStorage.getItem('token')}})
    .then((res) => {
        console.log(res)
        goto('/auth/dashboard')
    })
    .catch((err) => {
        console.log(err)
    })
}

</script>



<main>

    <Heading tag='h6'>Edit Book</Heading>

    <form on:submit|preventDefault={handleEdit} class="grid gap-5 mx-10">

        <div>
            <Label for='title'>Book title</Label>
            <Input id='title' placeholder='Grief Child' bind:value={book.title} required />
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
            <Textarea id='content' placeholder='Book content' bind:value={book.content} required />
            
        </div>

        <Button type='submit'>Edit Book</Button>
        




    

    </form>
    
</main>
    
