import { useState, useEffect } from 'react';
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
        fetch(`http://localhost:5000/products?_page=${page}&q=${inputName}&category_like=${categoryName}`)
        .then((response) => response.json())
        .then((result) => setProducts(result))
        .catch((error) => console.log(error))
    }, [inputName, categoryName, page])


    // Запрос на сервер добавленных товаров в избранное и в корзину
    const loadFavorites = () => {
        fetch(`http://localhost:5000/favorites`)
        .then((response) => response.json())
        .then((result) => setFavoriteProducts(result))
        .catch((error) => console.log(error))
    }

    const loadBasket = () => {
        fetch(`http://localhost:5000/basket`)
        .then((response) => response.json())
        .then((result) => setBasketProducts(result))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        loadFavorites()
        loadBasket()
    }, [])

    // Добавление в избранное и в корзину товаров
    const addToFavorite = (product) => {
        favoriteProducts.some(el => el.id === product.id) ? (
        fetch(`http://localhost:5000/favorites/${product.id}`, {
        method: "DELETE"
        },
        ).then((result) => loadFavorites()) //перед обновлением страницы вернуть массив из имеющихся обновленных в избранном
    ) : (
        fetch(`http://localhost:5000/favorites`, {
        method: "POST",
        body: JSON.stringify(product), // данные могу быть строкой или обьектом
        headers: {
            "Content-Type": "application/json",
        },
        }).then((result) => loadFavorites())
    )
    }

    const addToBasket = (product) => {
        basketProducts.some(el => el.id === product.id) ? (
        fetch(`http://localhost:5000/basket/${product.id}`, {
        method: "DELETE"
        },
        ).then((result) => loadBasket())
    ) : (
        fetch(`http://localhost:5000/basket`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json",
        },
        }).then((result) => loadBasket())
    )
    }

    // Обновление кол-ва товаров в корзине
    const updateBasket = (product) => {
        fetch(`http://localhost:5000/basket/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json",
        },
        }).then((result) => loadBasket())
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
                    favoriteId={favoriteProducts.map(i => i.id)}
                    addToBasket={addToBasket}
                    basketId={basketProducts.map(i => i.id)}
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
                    favoriteId={favoriteProducts.map(i => i.id)}
                    basketId={basketProducts.map(i => i.id)}/>
                }/>
                <Route path="/product/basket" element={
                    <BasketPage
                    favoriteProducts={favoriteProducts}
                    basketProducts={basketProducts}
                    basketId={basketProducts.map(i => i.id)}
                    addToBasket={addToBasket}
                    updateBasket={updateBasket}/>
                }/>
                <Route path="/product/:id" element={
                  <CardPage
                    favoriteId={favoriteProducts.map(i => i.id)}
                    addToFavorite={addToFavorite}
                    basketId={basketProducts.map(i => i.id)}
                    addToBasket={addToBasket}/>
                }/>
            </Routes>
            <Modal isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
}
        
export default App;