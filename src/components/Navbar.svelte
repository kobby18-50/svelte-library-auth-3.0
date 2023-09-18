<script lang="ts">
    import {user_name} from '$lib/stores/userStore'
	import { Button } from "flowbite-svelte";
    import LOGO from '../assets/logo.svg'
	import { goto } from '$app/navigation';
    import toast, { Toaster } from 'svelte-french-toast';



    let name 

    user_name.subscribe(value => {
        name = value
    })

    const handleLogout = () => {
       user_name.update((value) => {
        return value = ""
       })

       toast.success('Logging out')
       setTimeout(() => {
        goto('/')
    }, 2000)
        
    }
   


</script>
<Toaster/>
<nav class="flex justify-between mt-5 mx-5">
    <div>
       <a href="/">
        <img src={LOGO} alt="logo" class="w-10">
    </a>

    </div>

   {#if name.length === 0}
   <Button><a href="/auth/login">Login</a></Button>

   {:else}

   
   <div class="flex space-x-4 ">
    <Button size='xs'><a href="/auth/dashboard/add-book">Add book</a></Button>
   <Button size='xs' on:click={handleLogout}>Log out</Button>
   </div>
    
   {/if}
    
   

</nav>