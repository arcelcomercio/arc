import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from './../../../resources/components/listado-noticias'
const classes = {
  container: 'container',
  title: 'container__title',
}
// eslint-disable-next-line react/require-render-return
@Consumer
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
    return (
      <div className="content-grid-base col-3">
        <div className={classes.container}>
          <h1 className={classes.title}>Economia</h1>
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
      </div>
    )
  }
}

export default Default
