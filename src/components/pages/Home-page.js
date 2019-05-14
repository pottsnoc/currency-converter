import React from 'react';
import {connect} from 'react-redux';
import BreakPoint from 'react-responsive';

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
                                onClick={() => dispatch(toggleCurrencyValueFav(currencies, currency.charCode))}>
                            <i className={`fa ${currency.fav ? 'fa-star' : 'fa-star-o'}`} aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>{currency.charCode}</td>
                    <td>{currency.name}</td>
                    <td>{currency.value.toFixed(2)}</td>
                    <td className='text-right'>
                        <BreakPoint minWidth={768}>
                            <span>{gap.toFixed(4)} </span>
                        </BreakPoint>
                        <i className={arrowStyle} aria-hidden='true'></i> 
                    </td>
                </tr>
            )
        }
        return(
            <div className='container'>
                <h1 className='home-page-title'>Курсы валют на {day}</h1>
                <BreakPoint minWidth={768}>
                    {(matches) => {
                          if (matches) {
                            return (
                                <table className='table table-striped table-hover currency-table'>
                                    <tbody>
                                        {currencies.map(items)}
                                    </tbody>
                                </table>
                            );
                          } else {
                            return (
                                <table className='table table-sm table-striped table-hover currency-table'>
                                    <tbody>
                                        {currencies.map(items)}
                                    </tbody>
                                </table>
                            );
                          }
                        }
                    }
                </BreakPoint>
            </div>
        )
    }
}

const mapStateToProps = ({currencies}) => ({currencies});

export default connect(mapStateToProps)(HomePage);