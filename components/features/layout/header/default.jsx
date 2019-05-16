/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import { setDevice } from '../../../utilities/resizer'

import HeaderChildElcomercio from './_children/elcomercio'

@Consumer
class LayoutHeader extends PureComponent {
  constructor(props) {
    super(props)
    // ------ Checks if you are in desktop or not
    this.state = {
      device: setDevice(),
      data: [],
    }
    this.fetch()
  }

  componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
    window.addEventListener('resize', this._handleResize)
  }

  _handleResize = () => {
    const wsize = window.innerWidth

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.dispatchEvent('displayChange', this.state.device)
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && this.state.device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.dispatchEvent('displayChange', this.state.device)
    } else if (wsize < 640 && this.state.device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.dispatchEvent('displayChange', this.state.device)
    }
  }

  fetch() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'navegacion-cabecera-tema-del-dia',
    }
    const schema = `{ 
      children {
        name
        _id
        display_name
        url
        node_type
      }
    }`

    const { fetched } = this.getContent(source, params, schema)

    fetched.then(response => {
      const { children = [] } = response || {}
      const auxList = children.map(el => {
        return {
          name: el.node_type === 'link' ? el.display_name : el.name,
          url: el.node_type === 'link' ? el.url : el._id,
          node_type: el.node_type,
        }
      })
      this.setState({
        data: auxList || [],
      })
    })
  }

  render() {
    const { data, device } = this.state
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: { siteDomain },
    } = this.props
    const params = { data, siteDomain, deployment, contextPath, arcSite }

    return device === 'desktop' && <HeaderChildElcomercio {...params} />
  }
}

LayoutHeader.label = 'Cabecera de Página'

export default LayoutHeader
