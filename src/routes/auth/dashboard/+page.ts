import { BASE_URL } from "$lib"
import axios from "axios"
import type { BOOKS } from "../../../models/books"

export const load = async () => {
    const response = await axios.get(`${BASE_URL}/books`, {headers : {Authorization : localStorage.getItem('token') as string}})

    const books:BOOKS[] = await response.data.books


    console.log(books)

    return {
        books
    }
}