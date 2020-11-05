import React, { useState }  from 'react'
const MEDIA_BASE = 'https://resultadosopta.minoticia.pe/'
const API_BASE = 'http://localhost:8000/depor/'
const ANONIMO = '6f3015f2281091770eb7b700b87b547883b03bd916e5b705cc7dd70ae63ba89c'

const classes = {
    'box': 'flow-1x1', 
    'match': 'flow-match', 
    'end_match': 'flow-match flow-last',
    'header': 'match-header', 
    'group': 'group', 
    'stadium': 'stadium-name', 
    'icon_camp': 'icon-camp', 
    'date': 'match-date', 
    'teams': 'match-teams', 
    'form': 'frm frm-score ui-validate',
    'form_row': 'row ui-row ui-form-row', 
    'team_text': 'team-txt', 
    'team_score': 'team-score',
    'input': 'input_default', 
    'vs': 'team-vs', 
    'send': 'game-link',
    'edit_send': 'game-link edit',
    'disable_send': 'game-link disable'
}

const MatchBox = ({
        estadio, 
        fecha, 
        fechaHora, 
        equipo1, 
        equipo1Bandera, 
        equipo1Goles, 
        equipo2, 
        equipo2Bandera, 
        equipo2Goles, 
        estado,
        jornada,  
        resultadoFinal, 
        puntos
    }) => {
    const [goals, setGoals] = useState([]);
    const usuario = ANONIMO

    let clasSend = classes.send
    let textSend = 'Pronosticar resultado'
    if(equipo1Goles !== "" && equipo2Goles !== ""){
        clasSend = classes.edit_send
        textSend = 'Editar mi pronóstico'
    }
    if(estado === 3){
        clasSend = classes.disable_send
        textSend = 'Partido finalizado'
    }

    const handleValue = (event) => {

    }
        
    const registroPronostico = () => {
        const url = `${API_BASE}usuario${usuario}/pronostico/`
        console.log(url)
    }

    return (
        <div className={classes.box}>
            <div className={estado === 3 ? classes.end_match : classes.match}>
                <div className={classes.header}>
                <span className={classes.group}>{jornada}</span>
                    <span className={classes.stadium}><i className={classes.icon_camp}></i>{estadio}</span>
                    <span className={classes.date}>{fecha}</span>
                </div>
                <div className={classes.teams}>
                    <form className={classes.form}>
                        <div className={classes.form_row}>
                            <span className={classes.team_text}>
                                <img src={MEDIA_BASE + equipo1Bandera} alt={equipo1} /><strong>{equipo1}</strong>
                            </span>
                            <input type="text" placeholder=" - " className={classes.input} defaultValue={equipo1Goles}/>
                        </div>
                        <div className={classes.form_row}>
                            <span className={classes.vs}>VS</span>
                            { (estado === 3) && 
                            <span className={classes.team_text}>Resultado final:<strong>{resultadoFinal}</strong></span>
                            }
                        </div>
                        <div className={classes.form_row}>
                            <input type="text" placeholder=" - " className={classes.input} defaultValue={equipo2Goles} />
                            <span className={classes.team_text}>
                                <img src={MEDIA_BASE + equipo2Bandera} alt={equipo2} /><strong>{equipo2}</strong>
                            </span>
                        </div>
                    </form>
                    { (estado === 3) &&
                    <span className={classes.team_score}>Haz obtenido<strong>{puntos} puntos</strong></span>
                    }
                </div>
                <a href="#" className={clasSend} onClick={registroPronostico}>{textSend}</a>
            </div>
        </div>
    );
}

export default MatchBox;