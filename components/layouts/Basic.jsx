import React from 'react';

import NavLayout from './components/Nav-layout'
import HeaderLayout from './components/Header-layout'
import ContentLayout from './components/Content-layout'
import ZocaloLayout from './components/Zocalo-layout'
import FooterLayout from './components/Footer-layout'

import './styles/Basic.scss';

const Basic = props => {
    return (
        <div className='layout__basic'>
            <NavLayout />
            <HeaderLayout 
                elements={props.children[0]} 
                />
            <div className='content_container'>
                <ZocaloLayout
                    position='left'
                />
                <ContentLayout 
                    elements={props.children[1]} 
                    />
                <ZocaloLayout
                    position='right'
                />
            </div>
            <FooterLayout 
                elements={props.children[2]} 
                />            
        </div>
    );
}

Basic.sections = ['Cabecera', 'Contenido', 'Pie de Página']

export default Basic;