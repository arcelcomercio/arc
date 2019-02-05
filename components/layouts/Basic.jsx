import React from 'react';

import NavLayout from './components/Nav-layout'
import HeaderLayout from './components/Header-layout'
import ContentLayout from './components/Content-layout'
import ZocaloLayout from './components/Zocalo-layout'
import FooterLayout from './components/Footer-layout'

const Basic = props => {
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
                    {props.children[1]} 
                    <FooterLayout 
                        elements={props.children[2]} 
                    />            
                </ContentLayout>
                <ZocaloLayout
                    adElement='zocalo2'
                    device='d'  // This is gonna be variable
                />
            </div>
    );
}

Basic.sections = ['Cabecera', 'Contenido', 'Pie de Página']

export default Basic;