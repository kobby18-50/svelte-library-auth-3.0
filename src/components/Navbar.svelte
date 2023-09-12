<script lang="ts">
	import { Button } from "flowbite-svelte";

    // const token = localStorage.getItem('token') as string




    
   


</script>

<nav class="flex justify-between mt-5 mx-5">
    <div>
       <a href="/">LOGO</a>

    </div>

    <!-- {#if token?.startsWith('Bearer')}
        <Button>Add Book</Button>
    {:else}
    
    {/if} -->
    
    <Button><a href="/auth/login">Login</a></Button>
   

</nav>