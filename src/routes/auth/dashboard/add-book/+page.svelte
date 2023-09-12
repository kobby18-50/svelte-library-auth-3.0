<script lang="ts">
	import { goto } from "$app/navigation";
    import { BASE_URL, Categories } from "$lib";
import axios from "axios";
	import { Button, Heading, Input, Label, Select, Textarea } from "flowbite-svelte";


    let BOOKFORM = {
        title : '',
        genre : '',
        content : ''
    }

    const handleAddBook = async () => {
        console.log(BOOKFORM)

        const data = {
            title : BOOKFORM.title,
            content : BOOKFORM.content,
            genre : BOOKFORM.genre
        }

        const authorization = localStorage.getItem('token')

        await axios.post(`${BASE_URL}/books`, data, { headers : {Authorization : authorization}})
        .then((res) => {

            if(res.statusText === 'Created'){

                goto('/auth/dashboard')
            }
            console.log(res.statusText )

        })
        .catch((err) => console.log(err))
    }

</script>

<main>

    <Heading tag='h6'>Add Book</Heading>

    <form on:submit|preventDefault={handleAddBook} class="grid gap-5 mx-10">

        <div>
            <Label for='title'>Book title</Label>
            <Input id='title' placeholder='Grief Child' bind:value={BOOKFORM.title} required />
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
            <Textarea id='content' placeholder='Book content' bind:value={BOOKFORM.content} required />
            
        </div>

        <Button type='submit'>Add Book</Button>
        




    

    </form>
    
</main>