/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const LastMatch = () => {
    return (
        <div id="panel-lastgame" className="ui-panel ui-active ranking-inner">
            <div className="flow-match-small"><a href="#">
                <div className="match-header"><span className="group">Grupo B</span></div>
                <div className="match-teams-small"><span className="team-txt">Egi</span><img src="../tmp/bandera_01.jpg" alt="" /><span className="team-vs">VS</span><img src="../tmp/bandera_02.jpg" alt="" /><span className="team-txt">Uru</span></div></a></div>
            <p>Pronostico<strong>2-1</strong></p>
            <p>Resultado final<strong> 2-0</strong></p>
            <p>Punto<strong>+1</strong></p><a href="#" className="btn_link">Ver más</a>
        </div>
    )
}

export default LastMatch;