<script>
	import { Input, Label, Button, Heading, Alert, Spinner } from "flowbite-svelte";
    import { InfoCircleSolid } from 'flowbite-svelte-icons';
    import toast, { Toaster } from 'svelte-french-toast';
    import axios from "axios";
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";



    let isLoading = false

    $: isSuccess = false
    let isFail = false
    let REGISTERFORM = {
        firstname : '',
        lastname : '',
        email : '',
        password : ''
    }

    let formValidator = {
        fnameValidator : '',
        lnameValidator : '',
        emailValidator : '',
        passwordValidator : ''
    }

    const handleRegister = async () => {
        isLoading = true
        // console.log(REGISTERFORM)
        if(REGISTERFORM.firstname.length <= 5){
            formValidator.fnameValidator = 'The minimum length of firstname is 5 characters'
        }
        if(REGISTERFORM.lastname.length <= 5){
            formValidator.lnameValidator = 'The minimum length of lastname is 5 characters'
        }
        if(REGISTERFORM.password.length < 8){
            formValidator.passwordValidator = 'The minimum length of password is 8 characters'
        }
        const data = {
            firstName : REGISTERFORM.firstname,
            lastName : REGISTERFORM.lastname,
            email : REGISTERFORM.email,
            password : REGISTERFORM.password
        }
        await axios.post(`${BASE_URL}/auth/register`, data )
        .then((res) => {
            toast.success('User successfully created')
            isLoading = false
            goto('/auth/login')
        })
        .catch((err) => {
            isFail = true
            isLoading = false
            

            toast.error(err.response.data.msg)
            
            
        })
    }

</script>

<Toaster/>

<Heading tag='h4' class='text-center mb-5'>Register</Heading>

<form on:submit|preventDefault={handleRegister} class="mx-10 grid gap-5 md:mx-24 lg:mx-52">
   
    <div>
        <Label for='first name' class='mb-2'>First Name</Label>
        <Input id='first name' placeholder = 'Edward' bind:value={REGISTERFORM.firstname} required />

        {#if isFail && formValidator.fnameValidator.length != 0}
        <Alert color="red" dismissable class='mt-2'>
            <InfoCircleSolid slot="icon" class="w-4 h-4" />
            {formValidator.fnameValidator} 
            <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
          </Alert>
            
        {/if}
    </div>
   

    <div>
        <Label for='last name' class='mb-2'>Last Name</Label>
        <Input id='last name' placeholder = 'Tackie' bind:value={REGISTERFORM.lastname} required />
        {#if isFail && formValidator.lnameValidator.length != 0}
        <Alert color="red" dismissable class='mt-2'>
            <InfoCircleSolid slot="icon" class="w-4 h-4" />
            {formValidator.lnameValidator} 
            <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
          </Alert>
            
        {/if}
    </div>

    <div>
        <Label for='email' class='mb-2'>Email</Label>
        <Input id='email' type='email' placeholder = 'edward@mail.com' bind:value={REGISTERFORM.email} required/>
        {#if isFail && formValidator.emailValidator.length != 0}
    
             <Alert color="red" dismissable class='mt-2'>
            <InfoCircleSolid slot="icon" class="w-4 h-4" />
             {formValidator.emailValidator}
            <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
          </Alert>
        {/if}
    </div>

    <div>
        <Label for='password' class='mb-2'>Password</Label>
        <Input id='password' type='password' placeholder = '********' bind:value={REGISTERFORM.password} required/>
        {#if isFail && formValidator.passwordValidator.length}
        <Alert color="red" dismissable class='mt-2'>
            <InfoCircleSolid slot="icon" class="w-4 h-4" />
             {formValidator.passwordValidator}
            <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
          </Alert>
        {/if}
    </div>


    {#if isLoading}
    <Button disabled>
        <Spinner class="mr-3" size="4" color="white" />
        Loading ...
      </Button>
    {:else}

    <Button type='submit'>Register</Button>
        
    {/if}

    <div>
        <span class="text-sm">Login if you already have an account. <a href="/auth/login" class="underline">Login</a></span>
    </div>

</form>