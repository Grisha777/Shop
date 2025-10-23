import { useState, useEffect } from 'react';
import { useAuth } from './Components/AuthContext';
import { Route, Routes } from "react-router-dom";
import { Main } from './Main';
import { FavoritePage } from './Page/FavoritePage'
import { BasketPage } from './Page/BasketPage';
import { CardPage } from './Page/CardPage';
import { Modal } from './Components/Modal/modal'
import './App.css'

function App() {
    // фильтр поиска товаров по имени, по категории
    const [inputName, setInputName] = useState('');
    const [categoryName, setCategory] = useState('');
    const [openNavbar, setOpenNavbar] = useState(false);

    const textInput = (text) => {
        setInputName(text)
    }
        
    const handleCategory = (changedCategory) => {
        changedCategory === categoryName ? setCategory('') : setCategory(changedCategory)
    }
    
    const handleOpen = () => {
        openNavbar === false ? setOpenNavbar(true) : setOpenNavbar(false)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        (openNavbar || isModalOpen ? document.body.style.overflow = 'hidden': document.body.style.overflow = '')
        return () => { document.body.style.overflow = ''; };
    }, [openNavbar, isModalOpen]);


    // запрос на сервер
    const [products, setProducts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [basketProducts, setBasketProducts] = useState([]);
    const [page,setPage] = useState(1)


    // ?q= --- позволяет искать совпадения
    // _like --- ищет нечёткие совпадения
    useEffect(() => {
    const loadProducts = async () => {
        try {
        const response = await fetch(
            `http://localhost:5000/products?_page=${page}&q=${inputName}&category_like=${categoryName}`
        );
        const result = await response.json();
        setProducts(result);
        } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        }
    };

    loadProducts();
    }, [inputName, categoryName, page]);


    // Запрос на сервер добавленных товаров в избранное и в корзину
    const { user } = useAuth();
    const loadFavorites = async () => {
        if (!user) {
            setFavoriteProducts([])
            return
        }

        try {
            const response = await fetch(`http://localhost:5000/favorites?userId=${user.id}`)
            const result = await response.json()
            setFavoriteProducts(result)
        } catch (error) {
            console.log(error)
            setFavoriteProducts([])
        }
    }

    const loadBasket = async () => { 
        if (!user) {
            setBasketProducts([])
            return
        }

        try {
            const response = await fetch(`http://localhost:5000/basket?userId=${user.id}`)
            const result = await response.json()
            setBasketProducts(result)
        } catch (error) {
            console.log(error)
            setBasketProducts([])
        } 
    }

    useEffect(() => {
        loadFavorites()
        loadBasket()
    }, [user])

    // Добавление в избранное и в корзину товаров
    const addToFavorite = async (product) => {
        if (!user) {
            openModal();
            return;
        }

        try {
            // const isAlreadyInFavorites = favoriteProducts.some(el => el.id === product.id);
            const isAlreadyInFavorites = favoriteProducts.find((item) => item.productId === product.id && item.userId === user.id);
            if (isAlreadyInFavorites) {
                await fetch(`http://localhost:5000/favorites/${isAlreadyInFavorites.id}`, {
                method: 'DELETE',
            })
            } else {
                await fetch(`http://localhost:5000/favorites`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user.id,
                        productId: product.id
                    }),
                    headers: {
                    'Content-Type': 'application/json',
                },
            })
            }
            await loadFavorites();
        } catch (error) {
            console.error('Ошибка при работе с избранным:', error);
        }
    };

    const addToBasket = async (product) => {
        if (!user) {
            openModal();
            return;
        }
        
        try {
            const isAlreadyInBasket = basketProducts.find((item) => item.productId === product.id && item.userId === user.id);

            if(isAlreadyInBasket) {
                await fetch(`http://localhost:5000/basket/${isAlreadyInBasket.id}`, {
                method: "DELETE"
            })
            } else {
                await fetch(`http://localhost:5000/basket`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user.id,
                        productId: product.id,
                        quantity: 1
                    }),
                    headers: {
                    'Content-Type': 'application/json',
                },
            })
            }
            await loadBasket();
        } catch (error) {
            console.error('Ошибка при работе с корзиной:', error);
        }
    }

    // Обновление кол-ва товаров в корзине
    const updateBasket = async (product) => {
        try {
            await fetch(`http://localhost:5000/basket/${product.id}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            await loadBasket();
        } catch (error) {
            console.error('Ошибка обновлении корзины:', error);
        }
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <Main 
                    textInput={textInput} 
                    handleOpen={handleOpen}
                    handleCategory={handleCategory}
                    openNavbar={openNavbar}
                    products={products}
                    addToFavorite={addToFavorite}
                    addToBasket={addToBasket}
                    favoriteProducts={favoriteProducts}
                    basketProducts={basketProducts}
                    openModal={openModal}
                    setPage={setPage}/>
                }/>
                <Route path="/product/favorite" element={
                    <FavoritePage
                    favoriteProducts={favoriteProducts}
                    basketProducts={basketProducts}
                    addToFavorite={addToFavorite}
                    addToBasket={addToBasket}
                    openModal={openModal}
                    products={products}/>
                }/>
                <Route path="/product/basket" element={
                    <BasketPage
                    favoriteProducts={favoriteProducts}
                    basketProducts={basketProducts}
                    addToBasket={addToBasket}
                    openModal={openModal}
                    products={products}
                    loadBasket={loadBasket}
                    updateBasket={updateBasket}/>
                }/>
                <Route path="/product/:id" element={
                  <CardPage
                    favoriteProducts={favoriteProducts}
                    basketProducts={basketProducts}
                    addToFavorite={addToFavorite}
                    addToBasket={addToBasket}
                    openModal={openModal}/>
                }/>
            </Routes>
            <Modal isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
}
        
export default App;