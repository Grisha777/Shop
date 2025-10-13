import { Card } from "../Components/Cards/card"
import { Back } from "../Components/Bask/back";
import './BasketPage.css';

export const BasketPage = ({basketProducts, basketId, addToBasket, addToFavorite, favoriteId}) => {
    return (
        <div>
            <div className="content">
                {basketProducts.length ? (
                    basketProducts.map(el => (
                    <Card 
                        key={el.id}
                        product={el}
                        basketId={basketId}
                        addToBasket={addToBasket}
                        favoriteId={favoriteId}
                        addToFavorite={addToFavorite}
                    />))
                ) : (
                    <p>Нет товаров для покупки</p>
                )}
                <Back/>
            </div>
        </div>
    )
}