import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import DataStory from '../../../../resources/components/utils/data-story'

const classes = {
  title: 'full-width text-left margin-top',
}

@Consumer
class ListTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    const { isAdmin } = this.props
    if (isAdmin) {
      this.setState({
        title: 'EL TÍTULO SÓLO SE MOSTRARÁ EN LA PÁGINA PUBLICADA',
      })
    } else {
      const {
        globalContent: { content_elements: contentElements },
        arcSite,
      } = this.props

      const element = new DataStory(contentElements[0], arcSite)
      this.setState({
        title: element.section,
      })
    }
  }

  render() {
    const { title } = this.state
    return <h1 className={classes.title}>{title.toUpperCase()}</h1>
  }
}

export default ListTitle
