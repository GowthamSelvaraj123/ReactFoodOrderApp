import { useContext } from 'react';
import CartContext from '../store/CartContext';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import UserProgressContext from '../store/UserContent';

export default function Header()
{
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totaltCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
    function handleShowCart()
    {
        userProgressCtx.showCart();
    }
    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>React Food</h1>
            </div>
            <nav>
            <Button textOnly onClick={handleShowCart}>Cart({totaltCartItems})</Button>
            </nav>
        </header>
    )
}