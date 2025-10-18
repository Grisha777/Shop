import './navbar.css'

export const Navbar = ({handleCategory}) => {    
    return (
        <div className = 'navbar'>
            <div className='sort-category'>
                <div onClick={() => handleCategory('Город')}>Город</div>
                <div onClick={() => handleCategory('Марвел')}>Марвел</div>
                <div onClick={() => handleCategory('Звездные войны')}>Звездные войны</div>
                <div onClick={() => handleCategory('Бэтман')}>Бэтман</div>
            </div>
            <div className='sort-price'>
                <h2>Цена</h2>
                <div className='in-price'>
                    <input type='number' placeholder='от'/>
                    <span>-</span>
                    <input type='number' placeholder='до'/>
                </div>
            </div>
        </div>
    )
}