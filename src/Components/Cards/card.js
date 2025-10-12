import './card.css'
import { Favorite } from '../Favorite/favorite';

export const Card = ({id, img, brand, name, rating, price, category, addToFavorite, favoriteId}) => {
    return(
        <div className='card'>
            <img src={img} alt="Фото товара"/>
            <div className='cart-content'>
                <div>
                    <div>{brand}</div>
                    <div>{name}</div>
                    <div>рейтинг: {rating}</div>
                    <h3>{price}рублей</h3>
                    <div>{category}</div>
                </div>
                <div className="cardIcon" onClick={() => addToFavorite(id)}>
                    <Favorite active={favoriteId.includes(id)}/>
                </div>
            </div>
        </div>
    )
}