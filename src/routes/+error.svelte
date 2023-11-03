<script>
    import {page} from '$app/stores'
	import { Heading } from 'flowbite-svelte';
    import SERVER_DOWN from '../assets/server_err.svg'



</script>

<main>
    {#if $page.url.pathname !== '/'}

    <div class="text-center text-lg">
        <p>{$page.error?.message}</p>
    </div>
    
    
       <figure class=" flex items-center justify-center flex-col my-36">
        <img src={SERVER_DOWN} alt="">

        <figcaption class="mt-20 text-center">
            It seems something went wrong
            <br>

            <a href="/" class='text-primary-700'>Go back to homepage</a>
        </figcaption>
       </figure>

   
        
    {/if}
</main>