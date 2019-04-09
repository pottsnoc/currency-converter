import React from 'react';

import './error-indicator.css';

const ErrorIndicator = (props) => {
    return (
        <div className="error-indicator-frame">
            <div className='error-indicator'>
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <h1>Упс! Что-то пошло не так!</h1>
                <i className='error-code'>({props.error.message})</i>
            </div>
        </div>
    )
}

export default ErrorIndicator;