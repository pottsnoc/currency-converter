import React from 'react';
import {connect} from 'react-redux';

import {toggleCurrencyValueFav} from '../../actions';
import './Home-page.css';

class HomePage extends React.Component {
    render() {
        const day = new Date().toLocaleString('ru-RU', {year: 'numeric', month: 'long', day: '2-digit'});
        const {dispatch, currencies} = this.props;
        const items = (currency, idx) => {
            if(currency.base) return null;
            const gap = currency.value - currency.previous;
            const arrowStyle = gap > 0 ? 'fa fa-sort-asc' : 
                               gap < 0 ? 'fa fa-sort-desc' : 'fa fa-caret-right';
            return (
                <tr key={currency.id}>
                    <td className='button-cell'>
                        <button className='btn btn-info btn-sm'
                                onClick={() => dispatch(toggleCurrencyValueFav(currencies, idx))}>
                            <i className={`fa ${currency.fav ? 'fa-star' : 'fa-star-o'}`} aria-hidden="true"></i>
                        </button>
                    </td>
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
        return(
            <div className='container'>
                <h1>Курсы валют на {day}</h1>
                <table className='table table-striped table-hover currency-table'>
                    <tbody>
                        {currencies.map(items)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({currencies}) => ({currencies});

export default connect(mapStateToProps)(HomePage);