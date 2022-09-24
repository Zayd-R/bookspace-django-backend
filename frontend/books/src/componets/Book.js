import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMatch, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Book = () => {
  const [book, setBook] = useState([])

  const user = useSelector((state) => state.user)

  // if refresh the page , search google api and get the book
  const match = useMatch('/books/:id')
  useEffect(() => {
    if (match) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes/${match.params.id}`)
        .then((result) => {
          console.log(result.data, 'result of axios')
          setBook(result.data)
          console.log(book, 'book in useEffect')
        })
        .catch((error) => console.log(error))
    }
  }, [match, book])

  // loaidng screen to prevent crashes till the book is found
  if (book.length < 1) {
    return <h1>Loading....</h1>
  }

  return (
    <section className='hero-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-7 pt-5 mb-5 align-self-center'>
            <div className='promo pe-md-3 pe-lg-5'>
              <h1 className='headline mb-3'>
                {book.volumeInfo.title} <br />
              </h1>
              <hr />
              <br />
              <div className='subheadline mb-4'>
                <div>
                  Authors:{' '}
                  {book.volumeInfo.authors.map((author) => {
                    return <span key={author}>{author}, </span>
                  })}
                </div>
                <br />
                <div>Publisher: {book.volumeInfo.publisher.slice(1, -1)}</div>
                <br />
                <div>Published Date: {book.volumeInfo.publishedDate}</div>
                <br />
                <div>Number of Pages: {book.volumeInfo.pageCount}</div>
                {!user ? null : (
                  <div className='rating'>
                    <input type='radio' name='rating' value='5' id='5' />
                    <label htmlFor='5'>☆</label>
                  </div>
                )}
              </div>
              <hr />
              <h1>Description </h1>
              <br />
              <div className='subheadline mb-4'>
                {/* <h6>`${book.volumeInfo.description}`</h6> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: book.volumeInfo.description
                      ? book.volumeInfo.description
                      : 'No description available',
                  }}
                />
              </div>
              {!user ? null : (
                <div className='cta-holder row gx-md-3 gy-3 gy-md-0'>
                  <div className='col-12 col-md-auto'>
                    <a
                      className='btn btn-primary w-100'
                      href={book.volumeInfo.previewLink}
                    >
                      Read a sample
                    </a>
                  </div>
                  <div className='col-12 col-md-auto'>
                    <a
                      className='btn btn-secondary scrollto w-100'
                      href={book.volumeInfo.infoLink}
                    >
                      Check on GooglePLay
                    </a>
                  </div>
                </div>
              )}
              <div className='hero-quotes mt-5'>
                <div
                  id='quotes-carousel'
                  className='quotes-carousel carousel slide carousel-fade mb-5'
                  data-bs-ride='carousel'
                  data-bs-interval='8000'
                ></div>
              </div>
            </div>
          </div>

          <div className='col-50 col-md-5 mb-8 '>
            <br />
            <br />
            <div className='book-cover-holder'>
              <img
                style={{ width: '70%' }}
                src={
                  book.volumeInfo.imageLinks.large
                    ? book.volumeInfo.imageLinks.large
                    : book.volumeInfo.imageLinks.thumbnail
                }
                alt='book cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Book
