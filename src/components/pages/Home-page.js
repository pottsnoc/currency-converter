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
                    {Object.values(props.currencies).map(items)}
                </tbody>
            </table>
        </div>
    )
}

const items = (currency) => {
    const gap = currency.Value - currency.Previous;
    const arrowStyle = gap > 0 ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
    return (
        <tr key={currency.ID}>
            <td>{currency.CharCode}</td>
            <td>{currency.Name}</td>
            <td>{currency.Value.toFixed(2)}</td>
            <td className='text-right'>
                <span>{gap.toFixed(2)} </span>
                <i className={arrowStyle} aria-hidden='true'></i> 
            </td>
        </tr>
    )
}

const mapStateToProps = ({currencies}) => ({currencies});

export default connect(mapStateToProps)(HomePage);