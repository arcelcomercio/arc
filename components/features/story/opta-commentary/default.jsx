import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'

import ItemCommentary from './_children/item-commentary'

const classes = {
  commentaries: 'direct__wrapper p-10',
  list: 'direct__list',
}

const listCommentary = [
  {
    commentary_id: '2186702509',
    comment: 'Final del partido, Napoli 1, Barcelona 1.',
    lastModified: '2020-02-25T16:55:18',
    minute: 0,
    second: 0,
    time: ' ',
    period_id: 14,
    commentary_type: {
      id: 1,
      name: 'end 14',
    },
  },
  {
    commentary_id: '2186702495',
    comment: 'Final segunda parte, Napoli 1, Barcelona 1.',
    lastModified: '2020-02-25T16:55:10',
    minute: 95,
    second: 59,
    time: "90'+6'",
    period_id: 2,
    commentary_type: {
      id: 2,
      name: 'end 2',
    },
  },
  {
    commentary_id: '2186702421',
    comment:
      'Samuel Umtiti (Barcelona) ha recibido una falta en la zona defensiva.',
    lastModified: '2020-02-25T16:53:50',
    minute: 94,
    second: 32,
    time: "90'+5'",
    period_id: 2,
    commentary_type: {
      id: 5,
      name: 'free kick won',
    },
  },
  {
    commentary_id: '2186702423',
    comment: 'Falta de Kostas Manolas (Napoli).',
    lastModified: '2020-02-25T16:54:09',
    minute: 94,
    second: 32,
    time: "90'+5'",
    period_id: 2,
    commentary_type: {
      id: 6,
      name: 'free kick lost',
    },
  },
  {
    commentary_id: '2186702397',
    comment: 'Corner,  Napoli. Corner cometido por Nélson Semedo.',
    lastModified: '2020-02-25T16:55:20',
    minute: 94,
    second: 8,
    time: "90'+5'",
    period_id: 2,
    commentary_type: {
      id: 12,
      name: 'corner',
    },
  },
  {
    commentary_id: '2186702147',
    comment:
      'Cambio en Barcelona, entra al campo Clément Lenglet sustituyendo a Gerard Piqué debido a una lesión.',
    lastModified: '2020-02-25T16:51:47',
    minute: 92,
    second: 35,
    time: "90'+3'",
    period_id: 2,
    commentary_type: {
      id: 10,
      name: 'substitution',
    },
  },
  {
    commentary_id: '2186701373',
    comment: 'Arturo Vidal (Barcelona) segunda tarjeta amarilla.',
    lastModified: '2020-02-26T12:27:13',
    minute: 88,
    second: 12,
    time: "89'",
    period_id: 2,
    commentary_type: {
      id: 26,
      name: 'secondyellow card',
    },
  },
  {
    commentary_id: '2186701339',
    comment:
      'Arturo Vidal (Barcelona) ha sido amonestado con tarjeta amarilla por juego peligroso.',
    lastModified: '2020-02-25T16:47:25',
    minute: 88,
    second: 6,
    time: "89'",
    period_id: 2,
    commentary_type: {
      id: 4,
      name: 'yellow card',
    },
  },
  {
    commentary_id: '2186701323',
    comment: 'Mário Rui (Napoli) ha sido amonestado con tarjeta amarilla.',
    lastModified: '2020-02-25T16:47:43',
    minute: 88,
    second: 5,
    time: "89'",
    period_id: 2,
    commentary_type: {
      id: 4,
      name: 'yellow card',
    },
  },
  {
    commentary_id: '2186701187',
    comment: 'Falta de Arturo Vidal (Barcelona).',
    lastModified: '2020-02-25T16:46:47',
    minute: 87,
    second: 30,
    time: "88'",
    period_id: 2,
    commentary_type: {
      id: 6,
      name: 'free kick lost',
    },
  },
]

@Consumer
class OptaCommentary extends Component {
  render() {
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
              } = commentary

              const data = {
                time,
                type,
                comment,
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
