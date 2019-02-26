import React from 'react';

const Icon = (props) => {
    const html = (
        <span className='triplete__box-icon'>
            <i className={`triplete__icon triplete__icon--${props.iconClass}`}></i>
        </span>
    )
    return props.iconClass ? html : ''
} 

export default Icon