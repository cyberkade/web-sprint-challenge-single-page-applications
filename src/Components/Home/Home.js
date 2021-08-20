import './Home.css'
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <section>
            <div className='pizzaDiv'>
                    <h2>You're favorite food, delivered while coding</h2>
                    <Link to={'/pizza'} id='order-pizza' className='pizzaBtn'>Pizza?</Link>
            </div>
        </section>
    )
}