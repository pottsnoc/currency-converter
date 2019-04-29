import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../Header';
import Spinner from '../Spinner';
import {HomePage, ConverterPage} from '../pages';
import * as actions from '../../actions';
import CurrencyDataService from '../../services/currency-data-service';

const service = new CurrencyDataService();

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(actions.currencyRequest());
        service.getData()
               .then((data) => {
                    dispatch(actions.currencyLoaded(data));
                    this.loadFromLocalStorage();
               })
               .catch((err) => {
                    dispatch(actions.currencyFailed(err));
               });
    }
    loadFromLocalStorage() {
        const {dispatch, currencies} = this.props;
        const {base, favs} = localStorage;
        if(base) dispatch(actions.changeBaseCurrency(currencies, base));
        if(favs) {
            favs.split(',')
                .forEach(item => {
                    dispatch(actions.toggleCurrencyValueFav(this.props.currencies, item))
                });
        }
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