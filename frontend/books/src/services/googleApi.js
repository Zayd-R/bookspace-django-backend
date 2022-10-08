import axios from 'axios'

const getBook = async (book_id) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${book_id}`
    )
    return response.data
  } catch (error) {
    console.error(error.response.data.error)
  }
}

const searchBooks = async (query) => {
  try {
    const books = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40 `
    )

    const data = books.data.items ? books.data : { ...books.data, items: [] }

    window.localStorage.setItem(
      'lastSearch',
      JSON.stringify({
        query,
        books: data,
      })
    )

    return data
  } catch (error) {
    console.error(error.response.data.error)
  }
}

export default { getBook, searchBooks }
