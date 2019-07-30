import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../Header';
import Spinner from '../Spinner';
import {HomePage, ConverterPage} from '../pages';
import * as actions from '../../actions';
import * as helpers from '../../helpers';
import CurrencyDataService from '../../services/currency-data-service';

const service = new CurrencyDataService();

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(actions.currencyRequest());
        service.getData()
               .then((data) => {
                    const edited = this.editData(data);
                    dispatch(actions.currencyLoaded(edited));
               })
               .catch((err) => {
                    dispatch(actions.currencyFailed(err));
               });
    }
    editData(data) {
        const {base, favs} = localStorage;
        let result = data;
        if(base) {
            result = helpers.changeBaseCurrency(result, base);
        }
        if(favs) {
            const favList = favs.split(',')
            result = result.map(item => {
                if(favList.includes(item.charCode)) {
                    item.fav = true;
                }
                return item;
            }).sort((a, b) => {
                if(a.fav && b.fav) { 
                    return a.charCode > b.charCode ? 1 : -1;
                }
                return a.fav ? -1 : 
                       b.fav ? 1 :
                       a.charCode > b.charCode ? 1 : -1;
            })
        }
        return result;
    }

    render() {
        if(this.props.loading) return <Spinner />;
        return(
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' component={HomePage} exact/>
                        <Route path='/converter' component={ConverterPage}/>
                    </Switch>
                </div>
            </Router>
        )
    }
    
}

const mapStateToProps = ({loading, error, currencies}) => ({loading, error, currencies});
export default connect(mapStateToProps)(App);