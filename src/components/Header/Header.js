import React from 'react';
import {NavLink} from 'react-router-dom';

import './header.css';

const Header = () => {
    return(
        <header className='header'>
            <nav className='container'>
                <ul>
                    <li className='header-nav-item'>
                        <NavLink 
                            to='/' 
                            className='header-nav-link' 
                            activeClassName='active' 
                            exact
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className='header-nav-item'>
                        <NavLink 
                            to='/converter' 
                            className='header-nav-link' 
                            activeClassName='active' 
                            exact
                        >
                            Конвертер
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;