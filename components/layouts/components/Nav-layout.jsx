import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return(
            <nav alt="nav" className="backRed">
                <a href="#">Buscar</a>
                <a href="#">Secciones</a>
                <div>
                    <ul>
                        <li>Politica</li>
                        <li>Deportes</li>
                        <li>Mundo</li>
                        <li>Economia</li>
                        <li>Opinion</li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav;