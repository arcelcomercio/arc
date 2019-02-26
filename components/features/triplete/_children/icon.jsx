import React from 'react';

const Icon = (props) => {
    const html = (
        <span className='triplete__icon'>
            <i className={`triplete__icon--${props.iconClass}`}></i>
        </span>
    )
    return props.iconClass ? html : ''
} 

export default Icon