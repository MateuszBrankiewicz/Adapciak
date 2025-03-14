import '../App.css';
import { Link } from 'react-router-dom';
function HomePage(){
    return (
        <div>
        <h1>Home Page</h1>
        <button  className='bg-main-button-background text-main-button-text border-main-button-border border-2 rounded-2xl hover:brightness-90' ><Link to='/login'>Login page</Link></button>
        </div>
    )
}
export default HomePage;