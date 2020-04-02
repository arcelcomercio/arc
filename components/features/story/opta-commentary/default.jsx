import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'

import ItemCommentary from './_children/item-commentary'

const classes = {
  commentaries: 'direct__wrapper p-10',
  list: 'direct__list',
}

const icons = {
  'yellow card': 'amarilla.png',
  'red card': 'roja.png',
  'penalty won': 'penal.png',
  start: 'inicio.png',
  substitution: 'cambio-jugador.png',
  goal: 'gol.png',
  corner: 'corner.png',
  'own goal': 'gol.png',
  'end 14': 'final.png',
  'end 1': 'final.png',
}

@Consumer
class OptaCommentary extends Component {
  render() {
    const {
      globalContent: {
        opta_commentaries: { items: listCommentary = [] },
        adsMatch = '',
      } = {},
    } = this.props

    return (
      <div className={classes.commentaries}>
        <ul className={classes.list}>
          {listCommentary &&
            listCommentary.map(commentary => {
              const {
                commentary_id: id = '',
                time = '',
                commentary_type: { name: type = '' },
                comment = '',
                icon = icons[type],
              } = commentary

              let addTime
              let mainTime
              if (time !== null) {
                if (time.indexOf('+') !== -1) {
                  addTime = time.substr(time.indexOf('+'))
                }
                mainTime = time.replace(addTime, '')
              }

              const data = {
                mainTime,
                addTime,
                icon,
                comment,
                type,
                adsMatch,
              }
              return <ItemCommentary key={id} {...data} />
            })}
        </ul>
      </div>
    )
  }
}

OptaCommentary.label = 'Comentarios de Opta'

OptaCommentary.propTypes = {
  customFields,
}

export default OptaCommentary
