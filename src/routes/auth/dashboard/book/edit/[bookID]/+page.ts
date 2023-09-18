import { BASE_URL } from "$lib"
import axios from "axios"
import type { BOOKS } from "../../../../../../models/books"
import {user_token} from '$lib/stores/tokenStore'

export const load = async ({params}) => {
    let token

    user_token.subscribe((value) => {
        token = value
    })

    
    const {bookID} = params
    const response = await axios.get(`${BASE_URL}/books/${bookID}`, { headers : {Authorization : `Bearer ${token}`}})

    const book:BOOKS = await response.data.book


    return{
        book
    }
}