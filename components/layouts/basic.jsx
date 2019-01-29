/*  /components/layouts/basic.jsx  */

import React from 'react'

const BasicLayout = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        
        {props.children[0]}
      </header>
      <main className='col-xs-12'>
        {props.children[1]}
      </main>
      <footer className='col-xs-12'>
        {props.children[2]}
        
      </footer>
    </div>
  )
}

BasicLayout.sections = ['header', 'main', 'footer']

export default BasicLayout