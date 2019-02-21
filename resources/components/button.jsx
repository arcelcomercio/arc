import React from 'react'

export default (props) => {

    const { iconClass, btnClass, btnText, btnLink } = props

    return(
        <a className={btnClass} href={btnLink}>
            {iconClass && <i className={iconClass}></i>}
            {btnText}
        </a>
    )
}