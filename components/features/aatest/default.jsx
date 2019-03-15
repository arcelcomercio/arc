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
        image="http://resizer.shared.arcpublishing.com/MlSOyG7Zpt_FKAxl4KHNPBxKhYU=/328x374/smart/dvgnzpfv30f28.cloudfront.net/03-13-2019/t_c79f567b1a85498ab0734b1993882bda_name_5c8914ebbbccd.jpeg"
        imageSize="complete"
        size="oneCol"
      />
    )
  }
}

export default Aatest
