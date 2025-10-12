import { Header } from './Components/Header/header'
import { Navbar } from './Components/Navbar/navbar'
import { Card } from './Components/Cards/card'

export const Main = ({textInput, handleOpen, openNavbar, handleCategory, setCategory, filteredProduct, addToFavorite , favoriteId}) => {
    return (
        <div>
            <Header textInput={textInput} handleOpen={handleOpen}/>
            {openNavbar && <Navbar handleCategory={handleCategory} setCategory={setCategory}/>}
            <div className='container'>
                {filteredProduct.map(el => (
                <Card 
                addToFavorite={addToFavorite}
                favoriteId={favoriteId}
                id={el.id}
                key={el.id}
                img={el.img} 
                brand={el.brand}
                name={el.name}
                rating={el.rating}
                price={el.price}
                category={el.category}          
                />
                ))}
            </div>
        </div>
    )
}