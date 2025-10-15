import { Header } from "../Components/Header/header";
import { Card } from "../Components/Cards/card"
import { Back } from "../Components/back";
import './FavoritePage.css';
import { Footer } from "../Components/Footer/footer";

export const FavoritePage = ({favoriteProducts, basketProducts, favoriteId, addToFavorite, basketId, addToBasket}) => {
    return (
        <>
            <Header favoriteCount={favoriteProducts.length} basketCount={basketProducts.length}/>
            <Back/>
                <div className="favotite-page-content">
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
                </div>
            <Footer/>
        </>
    )
}