import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from '../Header';
import {HomePage, ConverterPage} from '../pages';


const App = () => {
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

export default App;