import axios from 'axios'

const getBook = async (book_id)=>{  
    const  response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book_id}`)
    return response.data
}



export default {getBook}