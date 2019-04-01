import React from 'react';
import {connect} from 'react-redux';

import './Home-page.css';

const HomePage = (props) => {
    const day = new Date().toLocaleString('ru-RU', {year: 'numeric', month: 'long', day: '2-digit'});
    return(
        <div className='container'>
            <h1>Курсы валют на {day}</h1>
            <table className='table table-striped table-hover'>
                <tbody>
                    {props.currencies.map(items)}
                </tbody>
            </table>
        </div>
    )
}

const items = (currency) => {
    if(currency.base) return null;
    const gap = currency.value - currency.previous;
    const arrowStyle = gap > 0 ? 'fa fa-sort-asc' : 
                       gap < 0 ? 'fa fa-sort-desc' : 'fa fa-caret-right';
    return (
        <tr key={currency.id}>
            <td>{currency.charCode}</td>
            <td>{currency.name}</td>
            <td>{currency.value.toFixed(4)}</td>
            <td className='text-right'>
                <span>{gap.toFixed(4)} </span>
                <i className={arrowStyle} aria-hidden='true'></i> 
            </td>
        </tr>
    )
}

const mapStateToProps = ({currencies}) => ({currencies});

export default connect(mapStateToProps)(HomePage);