import { BASE_URL } from "$lib"
import axios from "axios"
import type { BOOKS } from "../../../models/books"
import {user_token} from '$lib/stores/tokenStore'

export const load = async () => {
    let token 
    user_token.subscribe((value) => {
        token = value
    })

    const response = await axios.get(`${BASE_URL}/books`, {headers : {Authorization : `Bearer ${token}`}})

    const books:BOOKS[] = await response.data.books

    return {
        books
    }
}