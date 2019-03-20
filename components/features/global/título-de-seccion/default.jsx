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
        globalContentConfig: {
          query: { section },
        },
        globalContent: {
          content_elements: [
            {
              taxonomy: { sections },
            },
          ],
        },
      } = this.props
      const realSection = sections.find(item => section === item._id)
      this.setState({
        title: realSection.name,
      })

      /*  */
    }
  }

  render() {
    const { title } = this.state
    return <h1 className={classes.title}>{title.toUpperCase()}</h1>
  }
}

export default ListTitle
