import { BASE_URL } from "$lib"
import axios from "axios"
import type { BOOKS } from "../../../../../../models/books"

export const load = async ({params}) => {
    const {bookID} = params
    const response = await axios.get(`${BASE_URL}/books/${bookID}`, { headers : {Authorization : localStorage.getItem('token') as string}})

    const book:BOOKS = await response.data.book

    console.log(book)

    

    return{
        book
    }
}