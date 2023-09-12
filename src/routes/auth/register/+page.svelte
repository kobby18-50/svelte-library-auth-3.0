<script>
	import { Input, Label, Button } from "flowbite-svelte";
    import axios from "axios";
	import { BASE_URL } from "$lib";


    let REGISTERFORM = {
        firstname : '',
        lastname : '',
        email : '',
        password : ''
    }

    const handleRegister = async () => {
        console.log(REGISTERFORM)
        const data = {
            firstName : REGISTERFORM.firstname,
            lastName : REGISTERFORM.lastname,
            email : REGISTERFORM.email,
            password : REGISTERFORM.password
        }
        await axios.post(`${BASE_URL}/auth/register`, data )
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
</script>

<form on:submit|preventDefault={handleRegister} class="mx-10 grid gap-5">

    <div>
        <Label for='first name'>First Name</Label>
        <Input id='first name' placeholder = 'Edward' bind:value={REGISTERFORM.firstname} required />
    </div>

    <div>
        <Label for='last name'>Last Name</Label>
        <Input id='last name' placeholder = 'Tackie' bind:value={REGISTERFORM.lastname} required />
    </div>

    <div>
        <Label for='email'>Email</Label>
        <Input id='email' type='email' placeholder = 'edward@mail.com' bind:value={REGISTERFORM.email} required/>
    </div>

    <div>
        <Label for='password'>Password</Label>
        <Input id='password' type='password' placeholder = '********' bind:value={REGISTERFORM.password} required/>
    </div>


    <Button type='submit'>Register</Button>
    <div>
        <span class="text-sm">Login if you already have an account. <a href="/auth/login" class="underline">Login</a></span>
    </div>

</form>