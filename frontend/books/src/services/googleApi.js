import axios from 'axios'

const getBook = async (book_id)=>{  
    const  response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book_id}`)
    return response.data
}


const searchBooks = async (query)=>{
    const books = await axios.get( `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40 `)
    window.localStorage.setItem(
        'lastSearch',
        JSON.stringify({ query, books: books.data.items })
      )
     return books.data.items  
}

export default {getBook, searchBooks}