import './basket.css'
import basket from '../../images/basket.svg';

export const Basket = () =>{
    return (
        <>
            <img src={basket} alt="Корзина" 
            width="24px" height="24px"/>
            {/* количество в корзине */}
        </>
    )
}