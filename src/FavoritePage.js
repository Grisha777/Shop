import { Link } from "react-router-dom"
import { Card } from "./Components/Cards/card"

export const FavoritePage = ({favoriteProducts, addToFavorite, favoriteId}) => {
    return (
        <div>
            {favoriteProducts.length ? (
                favoriteProducts.map(el => (
                <Card 
                    key={el.id}
                    id={el.id}
                    img={el.img} 
                    brand={el.brand}
                    name={el.name}
                    rating={el.rating}
                    price={el.price}
                    category={el.category}
                    addToFavorite={() => {}}
                    favoriteId={[]}
                />
                ))
            ) : (
                <p>Нет избранных товаров</p>
            )}
            <Link to="/">
                <div>Назад на главную</div>
            </Link>
        </div>
    )
}