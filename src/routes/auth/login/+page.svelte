<script>
	import { Label, Input, Button, Heading, Alert } from "flowbite-svelte";
    import axios from "axios";
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
    import toast, { Toaster } from 'svelte-french-toast';



    let isFail = false
    let LOGINFORM = {
        email : '',
        password : ''
    }

    let formValidator = {
        emailValidator : '',
        passwordValidator : ''
    }



    const handleSubmit = async () => {
        if(LOGINFORM.password.length <= 8){
            formValidator.passwordValidator = 'The minimum length of password is 8 characters'
        }
        const data = {
            email : LOGINFORM.email,
            password : LOGINFORM.password
        }
        await axios.post(`${BASE_URL}/auth/login`, data)
        .then((res) => {
            const token = res.data.token
            const userFirst = res.data.user.firstname
            const userLast = res.data.user.lastname
            const user = userFirst.concat(' ', userLast)
            localStorage.setItem('token', `Bearer ${token}` )
            localStorage.setItem('username', user)

            toast.success('Login successful')

           setTimeout(() => {
            goto('/auth/dashboard')
           }, 2500)
        })
        .catch((err) => {
            isFail = true
            if(err.request.status === 404){
                toast.error(`No user found with email : ${LOGINFORM.email} try creating an acount or try again`)
            }

        })

    }

</script>
<Toaster/>

<Heading tag='h4' class='text-center mb-5'>Login</Heading>


<form on:submit|preventDefault={handleSubmit} class="mx-10 grid grid-row-2 gap-5 md:mx-24 lg:mx-52">
    <div>
        <Label id='email' class='mb-2'>Email</Label>
        <Input type='email' placeholder='eddy@mail.com' bind:value={LOGINFORM.email} required />
    </div>

    <div>
        <Label id='password' class='mb-2'>Password</Label>
        <Input type='password' placeholder='********' bind:value={LOGINFORM.password} required />

        {#if isFail && formValidator.passwordValidator.length != 0}
        <Alert color="red" dismissable class='mt-2'>
            <InfoCircleSolid slot="icon" class="w-4 h-4" />
             {formValidator.passwordValidator}
            <Button slot="close-button" size="xs" let:close on:click={close} class="ml-auto">X</Button>
          </Alert>
        {/if}
    </div>


    <Button type='submit'>Login</Button>
    <div>
        <span class="text-sm">Don't have an account? <a href="/auth/register" class="underline"> Register here</a></span>
    </div>
</form>