import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

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
        globalContent: { section_name: sectionName },
      } = this.props
      this.setState({
        title: sectionName,
      })
    }
  }

  render() {
    const { title } = this.state
    return <h1 className={classes.title}>{title.toUpperCase()}</h1>
  }
}

export default ListTitle
