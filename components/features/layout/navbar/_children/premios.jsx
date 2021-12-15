/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react'

import searchQuery from '../../../../utilities/client/search'
import Header from '../../../statics/content-premios-depor/_children/header'
// import SignwallComponent from '../../../signwall/main/default'
// import { slugify } from '../../../utilities/parse/slugify'
// const rutaArchivos = "https://cdna.depor.com/resources/dist/depor/premios-depor/"

// const isLogedIn = true

class HeaderChildPremiosDepor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSearchActive: false,
      searchInputText: '',
    }
    this.searchInput = React.createRef()
  }

  handleSearchInput(e) {
    this.setState({ searchInputText: e.target.value })
  }

  handleSubmit(e) {
    const { searchInputText } = this.state
    searchQuery(searchInputText)
    e.preventDefault()
  }

  toggleSearchInputs() {
    const { isSearchActive } = this.state
    this.setState({ isSearchActive: !isSearchActive })
  }

  render() {
    const { device, deviceList } = this.props

    // const isPreview = /^\/preview\//.test(requestUri)

    const handleHide = () => {
      switch (device) {
        case 'desktop':
          return deviceList.showInDesktop

        case 'tablet':
          return deviceList.showInTablet

        case 'mobile':
          return deviceList.showInMobile

        default:
          return true
      }
    }

    return handleHide() && <Header />
  }
}

export default HeaderChildPremiosDepor
