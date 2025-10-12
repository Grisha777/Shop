import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Main } from './Main';
import { FavoritePage } from './FavoritePage'
import { BasketPage } from './BasketPage'

import photo1 from './images/city-1.jpg';
import photo2 from './images/marvel-1.jpg';
import photo3 from './images/space-1.jpg';
import photo4 from './images/city-2.jpg';
import photo5 from './images/marvel-2.jpg';
import photo6 from './images/space-2.jpg';
import photo7 from './images/city-3.jpg';
import photo8 from './images/marvel-3.jpg';
import photo9 from './images/space-3.jpg';
import photo10 from './images/city-4.jpg';

import './App.css'

function App() {

  const products = [
    {id: 1, brand: "red", name: "Пожарные", price: 100, category: "Город", rating: 3, img: photo1},
    {id: 2, brand: "blue", name: "Мстители", price: 200, category: "Марвел", rating: 3, img: photo2},
    {id: 3, brand: "green", name: "Cynder", price: 300, category: "Звездные войны", rating: 3, img: photo3},
    {id: 4, brand: "red", name: "Лес", price: 400, category: "Город", rating: 3, img: photo4},
    {id: 5, brand: "blue", name: "Infinity saga", price: 500, category: "Марвел", rating: 3, img: photo5},
    {id: 6, brand: "green", name: "AT-AT", price: 600, category: "Звездные войны", rating: 3, img: photo6},
    {id: 7, brand: "red", name: "Тюрьма", price: 700, category: "Город", rating: 3, img: photo7},
    {id: 8, brand: "blue", name: "Корабль", price: 800, category: "Марвел", rating: 3, img: photo8},
    {id: 9, brand: "green", name: "ARC-170", price: 900, category: "Звездные войны", rating: 3, img: photo9},
    {id: 10, brand: "red", name: "Площадь", price: 1000, category: "Город", rating: 3, img: photo10}
  ]


  // фильтр поиска товаров по имени, по категории
  const [inputName, setInputName] = useState('');
  const [categoryName, setCategory] = useState('');

  const textInput = (text) => {
    setInputName(text)
  }
  
  const handleCategory = (changedCategory) => {
    changedCategory === categoryName ? setCategory('') : setCategory(changedCategory)
  }
  
  // const filteredProduc = inputName ? products.filter(el => el.name.includes(inputName)) : products; фильтрация отдельно по имени
  const filteredProduct = products.filter(el => el.category.includes(categoryName) && el.name && el.name.toLowerCase().includes(inputName.toLowerCase()));


  const [openNavbar, setOpenNavbar] = useState(false);
  
  const handleOpen = () => {
    openNavbar === false ? setOpenNavbar(true) : setOpenNavbar(false)
  }


  // Добавление в избранное
  const [favoriteId, setFavoriteIds] = useState([]);

  const addToFavorite = (id) => {
    if (favoriteId.includes(id)) {
      setFavoriteIds(favoriteId.filter(i => i !== id)) // убирает из избранного уже имеющееся
      return
    } else {
      setFavoriteIds([...favoriteId, id]) // деструкторизация. Добавляем к тому что было, что выбрали
    }
  }

  const favoriteProducts = products.filter(product => favoriteId.includes(product.id));

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Main 
          textInput={textInput} 
          handleOpen={handleOpen}
          openNavbar={openNavbar}
          handleCategory={handleCategory}
          setCategory={setCategory}
          filteredProduct={filteredProduct}
          addToFavorite={addToFavorite}
          favoriteId={favoriteId}/>
        }/>
          
        <Route path="/favorite" element={
          <FavoritePage 
          favoriteProducts={favoriteProducts}
          addToFavorite={addToFavorite}
          favoriteId={favoriteId}/>
        }/>

        <Route path="/basket" element={<BasketPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
