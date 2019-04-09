import React from 'react';
import {connect} from 'react-redux';

import ErrorIndicator from '../Error-Indicator';

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null
        }
    }
    componentDidCatch(error) {
        this.setState({error});
    }
    render() {
        if(this.state.error) return <ErrorIndicator error={this.state.error}/>
        if(this.props.error) return <ErrorIndicator error={this.props.error}/>
        return this.props.children
    }
}

const mapStateToProps = ({error}) => ({error});
export default connect(mapStateToProps)(ErrorBoundary);