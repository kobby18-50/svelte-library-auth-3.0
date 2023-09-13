import { BASE_URL } from '$lib'
import type { BOOKS } from '../../../models/books.js'

export const load = async ({params, fetch}) => {
    const {bookID} = params

    const response = await fetch(`${BASE_URL}/books/all/${bookID}`)

    const res = await response.json()

    const book:BOOKS = res.book

    return {
        book
    }
}