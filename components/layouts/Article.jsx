import React from 'react';

import NavLayout from './components/Nav-layout'
import HeaderLayout from './components/Header-layout'
import ZocaloLayout from './components/Zocalo-layout'
import ContentLayout from './components/Content-layout'
import SidebarLayout from './components/Sidebar-layout'
import FooterLayout from './components/Footer-layout'

const Article = props => {
    return (
        <div className='main__container'>
                <ZocaloLayout
                    adElement='zocalo1'
                    device='d'  // This is gonna be variable
                />
                <ContentLayout>
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
                </ContentLayout>
                <ZocaloLayout
                    adElement='zocalo2'
                    device='d'  // This is gonna be variable
                />
            </div>
    );
}

Article.sections = ['Cabecera', 'Contenido', 'Lateral', 'Pie de Página']

export default Article;