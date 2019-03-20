import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
<<<<<<< HEAD
//import Publicidad from '../../../../resources/components/ads'
import Publicidad from '../../../resources/components/ads'

=======
import CardNotice from './../../../resources/components/listado-noticias'
>>>>>>> 3c3f9f9a19430e705340638e7e0484e4a68cb31f
const classes = {
  container: 'container',
  title: 'container__title',
}
// eslint-disable-next-line react/require-render-return
@Consumer
<<<<<<< HEAD
class seccionListado extends Component {
  render() {
    const { globalContent } = this.props

    const params = {
      data: globalContent.content_elements || [],
    }

=======
class Default extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)

  }


  render() {
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
    } = this.props
    const params = {
      data: contentElements || [],
      arcSite,
    }
>>>>>>> 3c3f9f9a19430e705340638e7e0484e4a68cb31f
    return (
      <div className="content-grid-base col-3">
        <div className={classes.container}>
          <h1 className={classes.title}>Economia</h1>
<<<<<<< HEAD
        </div>
        <div>Cuerpo</div>
        <div>
          <Publicidad />
        </div>
=======
        </div>
        <div>
          {params.data.map((el, index) => (
            <CardNotice
              key={index}
              formato="row"
              data={el}
              arcSite={params.arcSite}
            />
          ))}
        </div>
>>>>>>> 3c3f9f9a19430e705340638e7e0484e4a68cb31f
      </div>
    )
  }
}

export default seccionListado
