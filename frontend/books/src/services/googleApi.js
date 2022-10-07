import axios from 'axios'

const getBook = async (book_id) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${book_id}`
  )
  return response.data
}

const searchBooks = async (query) => {
  try {
    const books = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40 `
    )
    window.localStorage.setItem(
      'lastSearch',
      JSON.stringify({
        query,
        books: books.data.items ? books.data : { ...books.data, items: [] },
      })
    )
    // console.log('found', books.data)
    const data = books.data.items ? books.data : { ...books.data, items: [] }

    return data
  } catch (error) {
    console.log('WOLOLO')
    console.error(error.response.data.error)
  }
}

export default { getBook, searchBooks }
