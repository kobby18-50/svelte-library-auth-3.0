<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {user_name} from '$lib/stores/userStore.js'   



   export let data

   const {books} = data

    const profile = $user_name

    

 
</script>

<main class="text-center">Welcome - {profile} </main>


<main class="mx-10">

<Table hoverable={true}>
    <TableHead>
        <TableHeadCell>Title</TableHeadCell>
        <TableHeadCell>Genre</TableHeadCell>
        <TableHeadCell>Content</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
        
    </TableHead>


    <TableBody>
        {#each books as {content, genre, title, _id} (_id) }
        <TableBodyRow>
            <TableBodyCell>{title}</TableBodyCell>
            <TableBodyCell>{genre}</TableBodyCell>
            <TableBodyCell>{content.slice(0, 100)}</TableBodyCell>
            <TableBodyCell>
                <Button>
                    <a href={`/auth/dashboard/book/${_id}`}>View</a>
                </Button>
            </TableBodyCell>

            </TableBodyRow>
            {/each}
    </TableBody>
</Table>
</main>