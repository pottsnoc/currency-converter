import React from 'react';

const HomePage = () => {
    const day = new Date().toLocaleString('ru-RU', {year: 'numeric', month: 'long', day: '2-digit'});
    return(
        <div className='container'>
            <h1>Курсы валют на {day}</h1>
        </div>
    )
}

export default HomePage;