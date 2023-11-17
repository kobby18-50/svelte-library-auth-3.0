<script>
	import { Input, Label, Button, Heading, Alert, Spinner } from "flowbite-svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import axios from "axios";
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";
    import * as yup from 'yup'
    import { createForm } from "felte";
    import { reporter, ValidationMessage } from "@felte/reporter-svelte";
    import { validator } from "@felte/validator-yup";



    let isLoading = false

    const schema = yup.object().shape({
        firstname : yup.string().min(5, 'First name must be at least 5 characters long').required('First name is required'),
        lastname : yup.string().min(5, 'Last name must be at least 5 characters long').required('Last name is required'),
        email : yup.string().email('Email must be a valid email').required('Email is required'),
        password : yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
    })


    const { form, isValid } = createForm({
        initialValues : {
            firstname : '',
            lastname : '',
            email : '',
            password : ''
        },

        onSubmit(values, context){
            const { firstname, lastname, email, password } = values
            const data = {
                firstName : firstname,
                lastName : lastname,
                email,
                password
            }

            isLoading = true

        axios.post(`${BASE_URL}/auth/register`, data )
        .then((res) => {
            toast.success('User successfully created')
            isLoading = false
            goto('/auth/login')
        })
        .catch((err) => {
            isLoading = false
            toast.error(err.response.data.msg)
        })
        },

        extend : [
            validator({schema}), reporter
        ]

    })   

</script>

<Toaster/>

<Heading tag='h4' class='text-center mb-5'>Register</Heading>

<form use:form class="mx-10 grid gap-5 md:mx-24 lg:mx-52">
   
    <div>
        <Label for='first name' class='mb-2'>First Name</Label>
        <Input id='first name' placeholder = 'Edward' name='firstname'  required />
        <ValidationMessage for ='firstname' let:messages={message}>
            {#if message}
            <Alert class='mt-2'>
                <span>{message || ''}</span>
            </Alert>
            {/if}
        </ValidationMessage>

        
    </div>
   

    <div>
        <Label for='last name' class='mb-2'>Last Name</Label>
        <Input id='last name' placeholder = 'Tackie' name = 'lastname'  required />
        <ValidationMessage for ='lastname' let:messages={message}>
            {#if message}
            <Alert class='mt-2'>
                <span>{message || ''}</span>
            </Alert>
            {/if}
        </ValidationMessage>
        
    </div>

    <div>
        <Label for='email' class='mb-2'>Email</Label>
        <Input id='email' type='email' placeholder = 'edward@mail.com' name='email' required/>
        <ValidationMessage for ='email' let:messages={message}>
            {#if message}
            <Alert class='mt-2'>
                <span>{message || ''}</span>
            </Alert>
            {/if}
        </ValidationMessage>
        
    </div>

    <div>
        <Label for='password' class='mb-2'>Password</Label>
        <Input id='password' type='password' name = 'password' placeholder = '********' required/>
        <ValidationMessage for ='password' let:messages={message}>
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
        Loading ...
      </Button>
    {:else}

    <Button disabled = {$isValid ? false : true} type='submit'>Register</Button>
        
    {/if}

    <div>
        <span class="text-sm">Login if you already have an account. <a href="/auth/login" class="underline">Login</a></span>
    </div>

</form>