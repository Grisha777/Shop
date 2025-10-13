import { Card } from "../Components/Cards/card"
import { Back } from "../Components/Bask/back";
import './FavoritePage.css';

export const FavoritePage = ({favoriteProducts, favoriteId, addToFavorite, basketId, addToBasket}) => {
    return (
        <div>
            <div className="content">
                {favoriteProducts.length ? (
                    favoriteProducts.map(el => (
                    <Card 
                        key={el.id}
                        product={el}
                        favoriteId={favoriteId}
                        addToFavorite={addToFavorite}
                        basketId={basketId}
                        addToBasket={addToBasket}
                    />))
                ) : (
                    <div>Нет избранных товаров</div>
                )}
                <Back/>
            </div>
        </div>
    )
}