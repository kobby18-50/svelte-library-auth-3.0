<script lang="ts">
	import { Button } from "flowbite-svelte";
    import LOGO from '../assets/logo.svg'

    // const token = localStorage.getItem('token') as string




    
   


</script>

<nav class="flex justify-between mt-5 mx-5">
    <div>
       <a href="/">
        <img src={LOGO} alt="logo" class="w-10">
    </a>

    </div>

    <!-- {#if token?.startsWith('Bearer')}
        <Button>Add Book</Button>
    {:else}
    
    {/if} -->
    
    <Button><a href="/auth/login">Login</a></Button>
   

</nav>