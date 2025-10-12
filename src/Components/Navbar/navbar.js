import './navbar.css'

export const Navbar = ({handleCategory}) => {    
    return (
        <div>
            <div className = "navbar">
                <div onClick={() => handleCategory('Город')}>Город</div>
                <div onClick={() => handleCategory('Марвел')}>Марвел</div>
                <div onClick={() => handleCategory('Звездные войны')}>Звездные войны</div>
            </div>
        </div>
    )
}