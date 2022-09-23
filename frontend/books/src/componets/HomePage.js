import reading_pic from '../images/reading_books.png'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
// basic homepage that still need styling.
const HomePage = ()=>{
    const user = useSelector(state=>state.user)
    return(
        <div className="improtant">
            {user ? <h1>Hello ---{user.username}</h1> : ''}

            <h2 >The importance of reading books</h2>
            <Link to='/search'>Search here</Link>
            <section>
                <img src={reading_pic} width='30%'/>
            </section>
        </div>
    )
}

export default HomePage