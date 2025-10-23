// import { user } from "react";
import { useAuth } from '../Components/AuthContext';
import { Header } from "../Components/Header/header";
import { Back } from "../Components/back";
import { BasketItem } from "../Components/BasketItem/basketItem";
import { Footer } from "../Components/Footer/footer";
import './BasketPage.css';

export const BasketPage = ({openModal, favoriteProducts, basketProducts, products, loadBasket, addToBasket, updateBasket}) => {

    const basketItems = basketProducts.map(fav => products.find(p => p.id === fav.productId)).filter(Boolean);

    const total = basketItems.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const productCount = basketItems.reduce((acc, product) => acc + product.quantity,0);

    const { user } = useAuth();
    // Эмуляция платежного шлюза
    const handleCheckout = async () => {

    if (basketItems.length === 0) return;
    alert('Перенаправление на окно оплаты...');

    setTimeout(async () => {        
        if (window.confirm('Оплатить заказ на ' + total + ' руб.?')) {

        try {
            await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                items: basketItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
            })
            });

            setTimeout(async () => {
                await Promise.all(
                basketProducts.map(item => 
                    fetch(`http://localhost:5000/basket/${item.id}`, { 
                        method: 'DELETE' 
                    }))
                );
                await loadBasket()
                alert('Оплата прошла успешно! Спасибо за заказ!');
            },1000)

        } catch (err) {
            console.error('Ошибка при оформлении заказа:', err);
            alert('Не удалось оформить заказ. Попробуйте позже.');
        }
        }
    }, 500);
    };

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
                        <div className="buy">
                            <button 
                                className="buy-button"
                                onClick={handleCheckout}
                                disabled={basketItems.length === 0}>
                                Оплатить {total} рублей
                            </button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}