import React from 'react';
import { FormatClassName } from '../../src/utilsJs/utilities'

import NavLayout from './components/Nav-layout'
import HeaderLayout from './components/Header-layout'
import ZocaloLayout from './components/Zocalo-layout'

import ContentLayout from './components/Content-layout'
import SidebarLayout from './components/Sidebar-layout'
import FooterLayout from './components/Footer-layout'

const styles = [
    'flex',
    'flex__justify--center'
]

const Article = props => {
    return (
        <div className={styles.join(' ')}>
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