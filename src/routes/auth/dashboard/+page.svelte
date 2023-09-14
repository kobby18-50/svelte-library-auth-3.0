<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    const user = localStorage.getItem('username')


   export let data

   const {books} = data

 
</script>

<main>Welcome - {user} </main>


<main>

    <Button><a href="/auth/dashboard/add-book">Add book</a></Button>


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