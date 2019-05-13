import React from 'react'
import Item from './item'
import ItemShare from './item-share'

const classes={
    resultgraphic: 'internal-survey__result-graphic',
    resulttitle: 'internal-survey__result-title',
    resultcount: 'internal-survey__result-count',
    poolitems: 'internal-survey__result-pool-items',
}

const ViewResultChildSurvey =() =>{

    return (
        <div className={classes.resultgraphic}>
            <h4 className={classes.resulttitle}>Resultados</h4>
            <p className={classes.resultcount}>sobre un total de 3410 votos.</p>
            <ul className={classes.poolitems}>
              <Item result="Si" percent="50" />
              <Item result="No" percent="50" top={false} />
            </ul>
            <ul className={classes.share}>
              <ItemShare socialnetwork="F" url="facebook.com" />
              <ItemShare socialnetwork="T" url="twitter.com" />
            </ul>
          </div>
    )
}

export default ViewResultChildSurvey