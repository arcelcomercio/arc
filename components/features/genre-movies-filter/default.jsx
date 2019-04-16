import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class GenreMoviesFilter extends Component {
  classes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getBillboard()
  }

  getBillboard() {
    const { fetched } = this.getContent('cinema-billboard', { website: '' })

    fetched.then(response => {
      const { estrenos = [] } = response || {}
      this.setState({
        premieres: estrenos,
      })
    })
  }

  render() {
    return ()
  }
}

GenreMoviesFilter.label = 'Carrusel de Películas'

export default GenreMoviesFilter
