import { Link } from 'react-router-dom';
import { Basket } from '../basket';
import cake from '../../images/birthday-cake.svg'
import brick from '../../images/brick-one-by-one-iso.svg'
import star from '../../images/rating.svg'
import minus from '../../images/minus.svg'
import plus from '../../images/plus.svg'
import './basketItem.css'

export const BasketItem = ({product, basketProducts, addToBasket, updateBasket}) => {
    const {id, informations, name, price, category, rating, age, details, quantity, img} = product;
    
    const isInBasket = Array.isArray(basketProducts) ? basketProducts.some(item => item.productId === product.id) : false;  

    const handleQuantityPlus = () => {
        updateBasket({...product, quantity: quantity + 1})
    }

    const handleQuantityMinus = () => {
        if (quantity > 1) {
            updateBasket({...product, quantity: quantity - 1})
        }
    }

    return (
        <div className='card basket-items'>
            <div className='card-header header-informations'>
                <div className='informations'>{informations}</div>
            </div>
            <Link to={`/product/${id}`}>
                <img src={img} className='tovars' alt='Фото товара'/>
            </Link>
            <div className='card-content'>
                <div className='age-details-rating'>
                    <div className='age'>
                        <div><img src={cake} className='logo' alt='Возраст'/></div>
                        <div>{age}</div>
                    </div>
                    <div className='details'>
                        <div><img src={brick} className='logo' alt='Кол-во деталей'/></div>
                        <div>{details}</div>
                    </div>
                    <div className='rating'>
                        <div><img src={star} className='logo' alt='Кол-во деталей'/></div>
                        <div>{rating}</div>
                    </div>
                </div>
                <div className='name'>
                    <Link to={`/product/${id}`}>
                        {category}: {name}
                    </Link>
                </div>
                <div className='counter-price'>
                    <div className='price'>{price * quantity} рублей</div>
                    <span className='counter'>
                        <button onClick={handleQuantityMinus} 
                        className='minus'><img src={minus} alt='минус'/></button>
                        <input value={quantity}/>
                        <button onClick={handleQuantityPlus}
                        className='plus'><img src={plus} alt='плюс'/></button>
                    </span>
                </div>
                <button className='add-basket' onClick={() => addToBasket(product)}>
                    <div className='add'>
                        <Basket/>
                        <div className='active'>{isInBasket ? 'Убрать из корзины' : 'Добавить в корзину'}</div>
                    </div>
                </button>
            </div>
        </div>
    )
}