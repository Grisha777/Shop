import { Header } from "../Components/Header/header";
import { Back } from "../Components/back";
import { BasketItem } from "../Components/BasketItem/basketItem";
import { Footer } from "../Components/Footer/footer";
import './BasketPage.css';

export const BasketPage = ({openModal, favoriteProducts, basketProducts, products, addToBasket, updateBasket}) => {

    const basketItems = basketProducts.map(fav => products.find(p => p.id === fav.productId)).filter(Boolean);

    const total = basketItems.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const productCount = basketItems.reduce((acc, product) => acc + product.quantity,0);

    return (
        <>
            <Header favoriteCount={favoriteProducts.length} 
            basketCount={basketProducts.length} openModal={openModal}/>
            <Back/>
                <div className='basket-page-content'>
                    <div className='content'>
                        {basketItems.length ? (
                            basketItems.map(el => (
                            <BasketItem 
                                key={el.id}
                                product={el}
                                basketProducts={basketProducts}
                                addToBasket={addToBasket}
                                updateBasket={updateBasket}/>
                            ))
                        ) : (
                            <p>Нет товаров для покупки</p>
                        )}
                    </div>
                    <div className='total-price'>
                        <div className='result'>
                            <h3>Итого:</h3>
                            <div >{total} рублей</div>
                        </div>
                        <div></div>
                        <div className="list">
                            <b>Кол-во товаров: {productCount}</b>
                            <ul>
                            {basketItems.map(product => (
                                <li key={product.id}>
                                    {product.name} - {product.quantity}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}