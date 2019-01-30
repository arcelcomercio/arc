import React from 'react';

import NavLayout from './components/Nav-layout'
import HeaderLayout from './components/Header-layout'
import ContentLayout from './components/Content-layout'
import SidebarLayout from './components/Sidebar-layout'
import FooterLayout from './components/Footer-layout'

import './styles/Article.scss';

const Basic = props => {
    return (
        <div>
            <NavLayout />
            <HeaderLayout 
                elements={props.children[0]} 
                />
            <div className="container-article">
                <ContentLayout 
                    elements={props.children[1]} 
                    />
                <SidebarLayout 
                    elements={props.children[2]}
                    />
            </div>
            <FooterLayout 
                elements={props.children[3]} 
                />            
        </div>
    );
}

Basic.sections = ['Cabecera', 'Contenido', 'Lateral', 'Pie de Página']

export default Basic;