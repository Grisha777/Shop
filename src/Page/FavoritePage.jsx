import { Header } from "../Components/Header/header";
import { Card } from "../Components/Cards/card"
import { Back } from "../Components/back";
import './FavoritePage.css';
import { Footer } from "../Components/Footer/footer";

export const FavoritePage = ({openModal, favoriteProducts, basketProducts, addToFavorite, addToBasket, products}) => {
    const favoriteItems = favoriteProducts.map(fav => products.find(p => p.id === fav.productId)).filter(Boolean);

    return (
        <>
            <Header favoriteCount={favoriteProducts.length} 
            basketCount={basketProducts.length} openModal={openModal}/>
            <Back/>
                <div className="favotite-page-content">
                    {favoriteItems.length ? (
                        favoriteItems.map(el => (
                        <Card 
                            key={el.id}
                            product={el}
                            favoriteProducts={favoriteProducts}
                            basketProducts={basketProducts}
                            addToFavorite={addToFavorite}
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