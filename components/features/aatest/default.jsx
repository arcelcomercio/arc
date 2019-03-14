import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../resources/components/destaque'

@Consumer
class Aatest extends Component {
  render() {
    return (
      <Destaque
        title={{ name: 'Mi titulo del destaque estático', url: '' }}
        category={{ name: 'Estático', url: '' }}
        author={{ name: 'Alvaro', url: '' }}
        image="https://www.mundodeportivo.com/r/GODO/MD/p6/Barca/Imagenes/2019/03/13/Recortada/img_pmorata_20190313-225439_imagenes_md_propias_pmorata_fcbarcelonalyon2982-165-kt7-U461019062957JKB-980x554@MundoDeportivo-Web.JPG"
        imageSize="complete"
        size="oneCol"
      />
    )
  }
}

export default Aatest
