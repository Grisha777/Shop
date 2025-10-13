import { Header } from './Components/Header/header'
import { Navbar } from './Components/Navbar/navbar'
import { Card } from './Components/Cards/card'
import { Footer } from './Components/Footer/footer'

export const Main = ({textInput, handleOpen, openNavbar, handleCategory, products, addToFavorite, favoriteId, addToBasket, basketId}) => {
    return (
        <div>
            <Header textInput={textInput} handleOpen={handleOpen}/>
                {openNavbar && <Navbar handleCategory={handleCategory}/>}
            <div className='section-card'>
                {products.map(el => (
                <Card
                    product={el}
                    key={el.id}       
                    addToFavorite={addToFavorite}
                    favoriteId={favoriteId}
                    addToBasket={addToBasket}
                    basketId={basketId}/>
                ))}
            </div>
            <Footer/>
        </div>
    )
}