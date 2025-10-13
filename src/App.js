import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { Main } from './Main';
import { FavoritePage } from './Page/FavoritePage'
import { BasketPage } from './Page/BasketPage';
import { CardPage } from './Page/CardPage';
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
  

  // запрос на сервер
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [basketProducts, setBasketProducts] = useState([]);

  // ?q= --- позволяет искать совпадения
  // (что-то)_like --- ищет нечёткие совпадения
  useEffect(() => {
    fetch(`http://localhost:5000/products?q=${inputName}&category_like=${categoryName}`)
    .then((response) => response.json())
    .then((result) => setProducts(result))
    .catch((error) => console.log(error))
  }, [inputName, categoryName])

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
  }, [])

  useEffect(() => {
    loadBasket()
  }, [])


  // Добавление в избранное и в корзину товаров
  // const [favoriteId, setFavoriteIds] = useState([])
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
  // console.log(favoriteId)

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

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Main 
            textInput={textInput} 
            handleOpen={handleOpen}
            handleCategory={handleCategory}
            openNavbar={openNavbar}
            // setCategory={setCategory}
            products={products}
            addToFavorite={addToFavorite}
            favoriteId={favoriteProducts.map(i => i.id)}
            addToBasket={addToBasket}
            basketId={basketProducts.map(i => i.id)}/>
          }/>
        <Route path="/product/favorite" element={
          <FavoritePage 
            //  favoriteId={favoriteId}
            favoriteProducts={favoriteProducts}
            addToFavorite={addToFavorite}
            addToBasket={addToBasket}
            favoriteId={favoriteProducts.map(i => i.id)}
            basketId={basketProducts.map(i => i.id)}
            />
          }/>
          <Route path="/product/basket" element={
          <BasketPage
            basketProducts={basketProducts}
            addToFavorite={addToFavorite}
            addToBasket={addToBasket}
            favoriteId={favoriteProducts.map(i => i.id)}
            basketId={basketProducts.map(i => i.id)}/>
          }/>
          <Route path="/product/:id" element={<CardPage/>} />
      </Routes>
    </div>
  );
}

export default App;