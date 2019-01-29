import React from 'react';
import Nav from './components/Nav'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import './styles/Basic.scss';

const Basic = props => {
    return (
        <div>
            <Nav />
            <Header elements={props.children[0]} />
            <Content elements={props.children[1]} />
            <Footer elements={props.children[2]} />            
        </div>
    );
}
Basic.sections = ['Cabecera', 'Contenido', 'Pie de Página']

export default Basic;