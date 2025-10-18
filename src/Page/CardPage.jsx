import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "../Components/Header/header"
import { Back } from "../Components/back"
import { Basket } from '../Components/basket';
import { Favorite } from '../Components/Favorite/favorite';
import next from '../images/chevron-right-solid.svg'
import minus from '../images/minus.svg'
import plus from '../images/plus.svg'
import '../Components/BasketItem/basketItem.css'
import './CardPage.css'

export const CardPage = ({favoriteId, addToFavorite, basketId, addToBasket}) => {
    const { id } = useParams();
    const productId = Number(id);
    const [product, setProduct] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${productId}`)
                const result = await response.json()
                setProduct(result);
            } catch(error) {
                console.log(error)
            }
        };
        fetchProduct()
    }, [productId])

    const isFavorite = Array.isArray(favoriteId) && favoriteId.includes(productId);
    const isInBasket = Array.isArray(basketId) && basketId.includes(productId);

    return (
        <>
            <Header/>
            <div className='card-page-container'>
                <div className='links'>
                    <Back/>
                    <img src={next} alt='следующий'/>
                    <Link to='/'>
                        {product.category}
                    </Link>
                    <img src={next} alt='следующий'/>
                    {product.name}
                </div>
                <div className='card card-page basket-items'>
                    <div className='left-section'>
                        <div className='tovar'>
                            <h1>Фотки</h1>
                            <img src={product.img} alt='Фото товара'/>
                        </div>
                        <div className='attributes'>
                            <div className='age-details-rating attribute-item'>
                                <div className='age card-age'>
                                    <div>{product.age}</div>
                                    <div>Возраст</div>
                                </div>
                                <div className='details card-details'>
                                    <div>{product.details}</div>
                                    <div>Деталей</div>
                                </div>
                                <div className='rating card-item'>
                                    <div>{product.id}</div>
                                    <div>Элемент</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-section'>
                        <div className='card-header header-item header-informations'>
                            <div className='informations'>{product.informations}</div>
                        </div>
                        <div className='card-content'>
                            <div className='name name-item'>
                                {product.name}
                                <img src='' alt='иконка категории'/>
                            </div>
                            <div className='counter-price counter-price-item'>
                                <div className='price'>{product.price * product.quantity} рублей</div>
                                <span className='counter'>
                                    <button 
                                    className='minus'><img src={minus} alt='минус'/></button>
                                    <input value={product.quantity}/>
                                    <button
                                    className='plus'><img src={plus} alt='плюс'/></button>
                                </span>
                            </div>
                            <div className='buttons-item'>
                                <button className='add-basket add-basket-item' onClick={() => addToBasket(product)}>
                                    <div className='add'>
                                        <Basket/>
                                        <div className='active'>{isInBasket ? 'Убрать из корзины' : 'Добавить в корзину'}</div>
                                    </div>
                                </button>
                                <div className="card-header card-header-item" onClick={() => addToFavorite(product)}>
                                    <Favorite activeFavorites={isFavorite}/>            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};