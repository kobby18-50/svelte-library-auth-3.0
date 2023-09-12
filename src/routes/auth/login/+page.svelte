<script>
	import { Label, Input, Button } from "flowbite-svelte";
    import axios from "axios";
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";


    let LOGINFORM = {
        email : '',
        password : ''
    }


    const handleSubmit = async () => {
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

           goto('/auth/dashboard')
        })
        .catch((err) => {
            console.log(err)
        })

    }

</script>
<main>login</main>


<form on:submit|preventDefault={handleSubmit} class="mx-10 grid grid-row-2 gap-5">
    <div>
        <Label id='email'>Email</Label>
        <Input type='email' placeholder='eddy@mail.com' bind:value={LOGINFORM.email} required />
    </div>

    <div>
        <Label id='password'>Password</Label>
        <Input type='password' placeholder='********' bind:value={LOGINFORM.password} required />
    </div>


    <Button type='submit'>Login</Button>
    <div>
        <span class="text-sm">Don't have an accout? <a href="/auth/register" class="underline"> Register here</a></span>
    </div>
</form>