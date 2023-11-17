<script>
	import { Label, Input, Button, Heading, Alert, Spinner } from "flowbite-svelte";
    import axios from "axios";
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";
    import toast, { Toaster } from 'svelte-french-toast';
    import {user_name} from '$lib/stores/userStore'
    import {user_token} from '$lib/stores/tokenStore'
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import * as yup from 'yup'
    import { reporter, ValidationMessage } from '@felte/reporter-svelte'


    let isLoading = false

    // yup schema
    const schema = yup.object().shape({
        email : yup.string().email('Email must be a valid email').required('Email is required'),
        password : yup.string().min(8, ).required('Password is required')
    })


    // felte form 
    const { form, isValid } = createForm({
        initialValues : {
            email : '',
            password : ''
        },



        onSubmit(values, context){
            const { email, password } = values
            

            const data = {
                email, 
                password
            }

            isLoading = true

            axios.post(`${BASE_URL}/auth/login`, data)
            .then((res) => {
            const token = res.data.token
            const userFirst = res.data.user.firstname
            const userLast = res.data.user.lastname
            const user = userFirst.concat(' ', userLast)
          
            user_name.set(user)

            user_token.set(token)

            
            
            toast.success('Login successful')

            isLoading = false
            goto('/auth/dashboard')
            })
            .catch((err) => {
            isLoading = false
            toast.error('Invalid Credentials')

            })
        },

        extend : [
            validator({schema}), reporter
        ]

    })

</script>
<Toaster/>

<Heading tag='h4' class='text-center mb-5'>Login</Heading>


<form use:form class="mx-10 grid grid-row-2 gap-5 md:mx-24 lg:mx-52">
    <div>
        <Label id='email' class='mb-2'>Email</Label>
        <Input type='email' placeholder='eddy@mail.com' name='email' required />
        <ValidationMessage for='email' let:messages={message}>
            {#if message}
                <Alert class='mt-2'>
                   <span> {message || ''}</span>
                </Alert>
            {/if}
        </ValidationMessage>
    </div>

    <div>
        <Label id='password' class='mb-2'>Password</Label>
        <Input type='password' placeholder='********' name ='password' required />
        <ValidationMessage for='password' let:messages={message}>
            {#if message}
                <Alert class='mt-2'>
                    <span>{message || ''}</span>
                </Alert>
            {/if}
        </ValidationMessage>
    </div>


    
    {#if isLoading}
    <Button disabled>
        <Spinner class="mr-3" size="4" color="white" />
        Logging in Please Wait ...
    </Button>
    {:else}
    
    <Button disabled = { $isValid ? false : true} type='submit'>Login</Button>
    
        
    {/if}
    <div>
        <span class="text-sm">Don't have an account? <a href="/auth/register" class="underline"> Register here</a></span>
    </div>
</form>