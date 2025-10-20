import { Pagination } from 'antd';
import { Header } from './Components/Header/header'
import { Navbar } from './Components/Navbar/navbar'
import { Card } from './Components/Cards/card'
import { Footer } from './Components/Footer/footer'

export const Main = ({textInput, handleOpen, favoriteProducts, basketProducts, openModal, 
    openNavbar, handleCategory, products, addToFavorite, addToBasket, setPage}) => {
    return (
        <>
            <Header 
                textInput={textInput} 
                handleOpen={handleOpen}
                favoriteCount={favoriteProducts.length}
                basketCount={basketProducts.length}
                openModal={openModal}/>
                {openNavbar && <Navbar handleCategory={handleCategory}/>}
            <div className='main-container'>
                <div className='section-card'>
                    {products.map(el => (
                    <Card
                        product={el}
                        key={el.id}       
                        addToFavorite={addToFavorite}
                        favoriteProducts={favoriteProducts}
                        addToBasket={addToBasket}
                        basketProducts={basketProducts}
                        openModal={openModal}/>
                    ))}
                </div>
                <Pagination total={20} onChange={page => setPage(page)}/>
            </div>
            <Footer/>
        </>
    )
}