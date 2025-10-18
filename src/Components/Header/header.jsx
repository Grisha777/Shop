// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Favorite } from '../Favorite/favorite';
import { Basket } from '../basket'
import Logo from '../../images/LEGO.png';
import accountLogo from '../../images/profile.svg';
import burgerMenu from '../../images/burger-menu.svg'
import search from '../../images/search.svg'
import out from '../../images/out.svg'
import { useAuth } from '../AuthContext';
import './header.css';

export const Header = ({textInput, handleOpen, favoriteCount, basketCount, openModal}) => {
    const { user, logout } = useAuth();

    return (
        <header>
            <div className='header-container'>
                <div className='left'>
                    <Link to='/'>
                        <img src={Logo} className='logo' alt='Логотип'/>
                    </Link>
                    <img src={burgerMenu} onClick={handleOpen} class='burgerMenu' alt='Меню'/>
                </div>
                <div className='right'>
                    <div className='search'>
                        <img src={search} alt='Логотип аккаунта'/>
                        <input onChange={(e => textInput(e.target.value))} placeholder='Search...'/>
                    </div>
                    <div className='icons'>
                        <div className='icon-link'>
                            <Link to='/product/favorite'>
                                <Favorite/>
                                {favoriteCount > 0 && <span className='favorite-counter'>{favoriteCount}</span>}
                            </Link>
                        </div>
                        <div className='icon-link'>
                            <Link to='/product/basket'>
                                <Basket/>
                                {basketCount > 0 && <span className='basket-counter'>{basketCount}</span>}
                            </Link>
                        </div>
                        {user ? (
                        <button className='sign-in-btn' onClick={logout}>
                            <span>{user.login}</span>
                            <img src={out}  alt='Аккаунт'/>
                        </button>
                        ) : (
                        <button className='sign-in-btn' onClick={openModal}>
                            <img src={accountLogo} alt='Аккаунт'/>
                            <p>Sign In</p>
                        </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};