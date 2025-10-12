import { Link } from 'react-router-dom';
import Logo from '../../images/LEGO.png';
import accountLogo from '../../images/profile.svg';
import burgerMenu from '../../images/burger-menu.svg'
import search from '../../images/search.svg'
import { Favorite } from '../Favorite/favorite';
import { Basket } from '../Basket/basket'
import './header.css';

export const Header = ({textInput, handleOpen, openModal}) => {
    return (
        <div className='header-container'>
            <div className='header'>
                <div className='left'>
                    <img src={Logo} class="logo" alt='Логотип' />
                    <img src={burgerMenu} onClick={handleOpen} class='burgerMenu' alt='Меню'/>
                </div>
                
                <div className='right'>
                    <div className='search'>
                        <img src={search} alt='Логотип аккаунта'/>
                        <input onChange={(e => textInput(e.target.value))} placeholder='Search...'/>
                    </div>
                    <div className='icons'>
                        <Link to="/favorite">
                            <Favorite/>
                        </Link>
                        <Link to="/basket">
                            <Basket/>
                        </Link>
                        <button onClick={openModal} className='sign-in-btn'>
                            <img src={accountLogo} alt='Логотип аккаунта'/>
                            <p>Sign In</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};