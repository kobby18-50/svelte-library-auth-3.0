<script lang="ts">
    import {user_name} from '$lib/stores/userStore'
	import { Button, Avatar, Dropdown, DropdownItem } from "flowbite-svelte";
    import LOGO from '../assets/logo.svg'
	import { goto } from '$app/navigation';
    import toast, { Toaster } from 'svelte-french-toast';



    let name:string = ''
    let userfull:string = ''

    user_name.subscribe(value => {
        name = value

        userfull = name

        let first = name.split(' ')[0]?.charAt(0)
        let second = name.split(' ')[1]?.charAt(0)

        name = first.concat(second)

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

   {#if userfull.length === 0}
   <Button><a href="/auth/login">Login</a></Button>

   {:else}

   
   <div class="hover:cursor-pointer">
    <Avatar class='acs' dot={{color : 'green'}}>{name}</Avatar>
    <Dropdown triggeredBy = '.acs'>
        <div slot="header" class="px-4 py-2">
            <span>{userfull}</span>
        </div>

        <DropdownItem>
            <a href="/auth/dashboard/add-book">Add Book</a>
        </DropdownItem>

        <DropdownItem slot = 'footer' on:click={handleLogout}>
            Sign Out
        </DropdownItem>

    </Dropdown>
   </div>
    
   {/if}
    
   

</nav>