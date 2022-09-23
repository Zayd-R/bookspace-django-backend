import reading_pic from '../images/reading_books.png'
import {Link} from "react-router-dom"
const HomePage = ()=>{
    
    return(
        <div className="improtant">
            <h2 >The importance of reading books</h2>
            <Link to='/search'>Search here</Link>
            <section>
                <img src={reading_pic} width='30%'/>
            </section>
        </div>
    )
}

export default HomePage