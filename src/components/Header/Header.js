import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'react-select';
import PerfectScrollBar from 'react-perfect-scrollbar';

import {changeBaseCurrency} from '../../actions';
import './header.css';
import "react-perfect-scrollbar/dist/css/styles.css";

const Header = (props) => {
    const changeBase = (input) => {
        props.dispatch(changeBaseCurrency(props.currencies, input.charCode));
    }
    const options = props.currencies;
    return(
        <header className='header'>
            <div className='container d-flex justify-content-between'>
                <Select options={options}
                        components={{MenuList}}
                        onChange={changeBase}
                        styles={{container: base => ({...base, minWidth: '100px'})}} 
                        getOptionLabel={option => option.charCode}
                        getOptionValue={({charCode}) => charCode}
                        value={options.find(item => item.base)}/>
                <nav>
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
            </div>
        </header>
    )
}
const MenuList = (props) => {
    return (
            <PerfectScrollBar style={{height: '300px'}} containerRef={ref => props.innerRef(ref)}>
                {props.children}
            </PerfectScrollBar>

    )
}
const mapStateToProps = ({currencies}) => ({currencies})
export default connect(mapStateToProps)(Header);