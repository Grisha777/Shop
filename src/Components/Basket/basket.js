import './basket.css'
import basket from '../../images/basket.svg';

export const Basket = () =>{
    return (
        <div>
            <img src={basket} class='basket-img' alt="Корзина"/>
            {/* количество в корзине */}
        </div>
    )
}