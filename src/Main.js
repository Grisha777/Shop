import { Pagination } from 'antd';
import { Header } from './Components/Header/header'
import { Navbar } from './Components/Navbar/navbar'
import { Card } from './Components/Cards/card'
import { Footer } from './Components/Footer/footer'

export const Main = ({textInput, handleOpen, favoriteProducts, basketProducts, openModal, 
    openNavbar, handleCategory, products, addToFavorite, favoriteId, addToBasket, basketId, setPage}) => {
    return (
        <>
            <Header 
                textInput={textInput} 
                handleOpen={handleOpen}
                favoriteCount={favoriteProducts.length}
                basketCount={basketProducts.length}
                openModal={openModal}/>
                {openNavbar && <Navbar handleCategory={handleCategory}/>}
            <div className='section-card'>
                {products.map(el => (
                <Card
                    product={el}
                    key={el.id}       
                    addToFavorite={addToFavorite}
                    favoriteId={favoriteId}
                    addToBasket={addToBasket}
                    basketId={basketId}
                    />
                ))}
            </div>
            <Pagination total={20} onChange={page => setPage(page)}/>;
            <Footer/>
        </>
    )
}