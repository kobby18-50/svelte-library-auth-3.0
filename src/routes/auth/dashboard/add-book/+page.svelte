<script lang="ts">
	import { goto } from "$app/navigation";
    import { BASE_URL, Categories } from "$lib";
    import {user_token} from '$lib/stores/tokenStore'
    import axios from "axios";
	import { Alert, Button, Heading, Input, Label, Select, Spinner, Textarea } from "flowbite-svelte";
    import toast, { Toaster } from 'svelte-french-toast';
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import * as yup from 'yup'
    import { reporter, ValidationMessage } from '@felte/reporter-svelte'



    let isLoading = false


    // yup schema
    const schema = yup.object().shape({
        title : yup.string().min(8, 'Title must be at least 8 characters long').required('Title is required'),
        content : yup.string().min(40, 'Content must be at least 40 characters long').required('Content is required'),
        genre : yup.string().required('Genre is required')

    })

    const { form, isValid } = createForm({
        initialValues:{
            title : '',
            content : '',
            genre : ''
        },

        onSubmit(values, context) {

            const { title, genre, content} = values
            
            const data = {
                title,
                genre, 
                content
            }

            const authorization = $user_token
            isLoading = true

            axios.post(`${BASE_URL}/books`, data, { headers : {Authorization : `Bearer ${authorization}`}})
            .then((res) => {

            if(res.status === 201){
                toast.success('Book successfully created')

                isLoading = false
              
                goto('/auth/dashboard')
              
            }
           

        })
        .catch((err) =>{           
            isLoading = false
            if(err.request.response.includes('Duplicate')){
                toast.error('This title has already been used try a different one')
            }else{
                toast.error(err.message)

            }
        })
        },

        extend : [
        validator({schema}), reporter
        ]
    })

    
   
</script>

<Toaster/>

<main>

    <Heading tag='h6' class='text-center mb-5'>Add Book</Heading>

    <form use:form class="mx-10 grid grid-row-2 gap-5 md:mx-24 lg:mx-52">

        <div>
            <Label for='title'>Book title</Label>
            <Input id='title' placeholder='Grief Child' name ='title' required />
            <ValidationMessage for ='title' let:messages={message}>
                {#if message}
                <Alert class='mt-2'>
                    <span>{message || ''}</span>
                </Alert>
                {/if}
            </ValidationMessage>

            
        </div>

        <div>
            <Label for='genre'>Book Genre</Label>
           <Select name='genre' required >
            {#each Categories as {genre, id} (id) }
                <option value={genre}>{genre}</option>
            {/each}
           </Select>
           <ValidationMessage for ='genre' let:messages={message}>
            {#if message}
            <Alert class='mt-2'>
                <span>{message || ''}</span>
            </Alert>
            {/if}
        </ValidationMessage>
        </div>

        
        <div>
            <Label for='content'>Book Content</Label>
            <Textarea id='content' placeholder='Book content' rows='4' name='content' required />
            <ValidationMessage for ='content' let:messages={message}>
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
        Adding Book Please wait ...
    </Button>
    {:else}
    
    
    <Button disabled = {$isValid ? false : true} type='submit'>Add Book</Button>
    
        
    {/if}
    </form>
    
</main>