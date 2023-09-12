<script lang="ts">
    import { page } from "$app/stores";
	import { BASE_URL } from "$lib";
    import axios from "axios";
	import { Button, Heading } from "flowbite-svelte";
	import { goto } from "$app/navigation";

    
    const {bookID} = $page.params

    export let data

    const {book} = data
   

    const handleDelete = async (id : string) => {
        await axios.delete(`${BASE_URL}/books/${id}`, {headers : {
            Authorization : localStorage.getItem('token')
        }})
        .then((res) => {
            console.log(res)
            goto('/auth/dashboard')
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleEdit = () => {
        goto(`/auth/dashboard/book/edit/${bookID}`)
    }

</script>


<main class="mx-10"> 
    <div class="flex justify-between mt-5">

        <div>
            <a href="/auth/dashboard">Back</a>
        </div>

        <div class="flex space-x-5">
            <Button on:click={handleEdit}><span>Edit book</span></Button>
            <Button on:click={() => handleDelete(book._id)}><span>Delete book</span></Button>
        </div>


    </div>


  
   <main>
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
    
</main> 


