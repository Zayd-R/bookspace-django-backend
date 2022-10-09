import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  // console.log('book', book)
  return (
    <Card sx={{ maxWidth: 345, minHeight: 430 }}>
      <CardActionArea component={Link} to={`/books/${book.id}`}>
        {book.volumeInfo.imageLinks ? (
          <CardMedia
            component='img'
            height='140'
            image={book.volumeInfo.imageLinks.smallThumbnail}
            alt='book cover image'
          />
        ) : (
          <CardMedia
            component='img'
            height='140'
            image=''
            alt='book cover image'
          />
        )}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {book.volumeInfo.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            dangerouslySetInnerHTML={{
              __html: book.searchInfo?.textSnippet,
            }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BookCard
