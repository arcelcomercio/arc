import React, { useState } from 'react';
import MatchBox from './_children/item'


const classes = {
    'grid': 'flows-grid box-secundary clearfix', 
    'column': 'column', 
    'title': 'box-subtitle', 
    'form': 'frm frm-partidos ui-validate'
}

const ANONIMO = '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'
// const API_BASE = 'http://localhost:8000/depor/'
const API_BASE = 'https://pmdu68gci6.execute-api.us-east-1.amazonaws.com/prod/depor/'

const Polla = () => {
    const [matchs, setMatchs] = useState([]);

    if(matchs.length === 0){
        const usuario = ANONIMO
        fetch(`${API_BASE}usuario/${usuario}/partidos`)
            .then(response => response.json())
            .then(data => {
                setMatchs(data.losPartidos)
            });
    }

    return (
        <div className={classes.grid}>
            <form className={classes.form}>
                <div className={classes.column}>
                    <h2 className={classes.title}>Todos los partidos</h2>
                </div>
            </form>
            {matchs && matchs.map((match, i) => {
                return (
                    <MatchBox key={match.id} {...match} />
                )
            })}
        </div>
    );
}

Polla.label = 'La Polla - Listado'
Polla.static = false

export default Polla;