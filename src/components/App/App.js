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
               })
               .catch((err) => {
                    dispatch(actions.currencyFailed(err));
               })
    }
    render() {
        if(this.props.loading) return <Spinner />;
        return(
            <Router>
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

const mapStateToProps = ({loading, error}) => ({loading, error});
export default connect(mapStateToProps)(App);