import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { Favorite } from '../Favorite/favorite';
import { Basket } from '../basket';
import cake from '../../images/birthday-cake.svg'
import brick from '../../images/brick-one-by-one-iso.svg'
import star from '../../images/rating.svg'
import './card.css'

export const Card = ({product, openModal, favoriteId, basketId, addToFavorite, addToBasket}) => {
    const { user } = useAuth();
    const {id, informations, name, price, category, rating, age, details, img} = product;

    const handleAddToFavorite = () => {
        if (!user) {
            openModal();
            return;
        }
        addToFavorite(product);
    };

    const handleAddToBasket = () => {
        if (!user) {
            openModal();
            return;
        }
        addToBasket(product);
    };

    // Проверка на undefined
    const isFavorite = Array.isArray(favoriteId) && favoriteId.includes(id);
    const isInBasket = Array.isArray(basketId) && basketId.includes(id);
    
    return(
        <div className='card'>
            <div className="card-header" onClick={handleAddToFavorite}>
                <Favorite activeFavorites={isFavorite}/>
                <div className='informations'>{informations}</div>
            </div>
            <Link to={`/product/${id}`}>
                <img src={img} className='tovars' alt='Фото товара' />
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
                <div className='price'>{price} рублей</div>
                <button className='add-basket' onClick={handleAddToBasket}>
                    <div className='add'>
                        <Basket/>
                        <div className='active'>{isInBasket ? 'Добавлено' : 'Добавить в корзину'}</div>
                    </div>
                </button>
            </div>
        </div>
    )
}