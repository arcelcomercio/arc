import React from 'react';

//import NavLayout from './components/Nav-layout'
//import HeaderLayout from './components/Header-layout'
import ContentLayout from './components/Content-layout'
import SidebarLayout from './components/Sidebar-layout'
//import FooterLayout from './components/Footer-layout'

import './styles/Article.scss';

const Article = props => {
    return (
        <div className="layout__basic">
          
            <div className="container-article">
                <ContentLayout 
                    elements={props.children[1]} 
                    />
                <SidebarLayout 
                    elements={props.children[2]}
                    />
            </div>
                    
        </div>
    );
}

Article.sections = ['Cabecera', 'Contenido', 'Lateral', 'Pie de Página']

export default Article;