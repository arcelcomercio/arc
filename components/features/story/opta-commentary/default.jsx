import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'

import ItemCommentary from './_children/item-commentary'

import { getFootballGameId } from '../../../utilities/get-story-values'

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
  constructor(props) {
    super(props)

    const {
      globalContent: {
        opta_commentaries: { items: listCommentary = [] },
        adsMatch = '',
      } = {},
    } = this.props

    this.state = { listCommentary, adsMatch }

    this.setInsetvalForRequest()
  }

  setInsetvalForRequest = () => {
    const {
      customFields: { intervalTime = 1 },
    } = this.props

    const intervalTimeMilliseconds = intervalTime * 60000

    const interval = setInterval(
      () => this.getDataCommentary(),
      intervalTimeMilliseconds
    )
    // eslint-disable-next-line react/no-unused-state
    this.setState({ interval })
  }

  getDataCommentary = () => {
    const { globalContent } = this.props

    const footballGameId = getFootballGameId(globalContent)

    const url = `https://cdna-resultadosopta.minoticia.pe/api/v2/comments/?format=json&limit=200&offset=0&muid=${footballGameId}`
    fetch(url)
      .then(data => data.json())
      .then(commentaryData => {
        const { items: listCommentary = [] } = commentaryData
        const { adsMatch = '' } = this.state
        this.setState({
          listCommentary,
          adsMatch,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { listCommentary, adsMatch } = this.state

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
