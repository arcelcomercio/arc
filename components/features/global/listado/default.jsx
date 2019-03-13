import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import customFields from './_children/customFields'
import filterSchema from './_children/filterSchema'

import HeaderList from './_children/HeaderList'
import ListItemNews from './_children/ListItemNews'

const classes = {
  lista: 'List',
}

@Consumer
class Lista extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: {
        titleList,
        urlTitle,
        background = '',
        newsNumber,
        seeMore,
        seeMoreurl,
        seeHour,
        seeImageNews,
        section,
      },
    } = this.props || {}

    this.state = {
      titleList,
      urlTitle,
      background,
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      section,
      data: [],
    }
  }

  componentDidMount = () => {
    const { section, newsNumber } = this.state
    const { arcSite: website } = this.props
    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website,
        section,
        news_number: newsNumber,
      },
      filterSchema()
    )
    fetched.then(response => {
      if (!response) {
        // eslint-disable-next-line no-param-reassign
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
      })
    })
  }

  render() {
    const {
      titleList,
      urlTitle,
      background,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      data,
    } = this.state
    return (
      <div className={classes.lista}>
        <HeaderList
          titleList={titleList}
          urlTitle={urlTitle}
          background={background}
          seeMore={seeMore}
          seeMoreurl={seeMoreurl}
        />
        <ListItemNews
          seeHour={seeHour}
          seeImageNews={seeImageNews}
          listNews={data || []}
        />
      </div>
    )
  }
}

Lista.propTypes = {
  customFields,
}

export default Lista
