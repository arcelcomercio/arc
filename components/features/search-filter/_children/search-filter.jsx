import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SearchInput from '../../../global-components/search-input'

// TODO: Refactorizar todo (la data debe venir desde el feature, no hacer fetches aca)
// TODO: Las búsquedas no deben hacerse por parámetros, deben ser por la misma URL

@Consumer
class SearchFilterChildSearchFilter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      /* Agrega valor a estos estados fuera del PageBuilder */
      sort: !props.isAdmin && this.getOrder(),
      selected: !props.isAdmin && this.getSection(),
      sections: [],
      showList: false,
    }

    this.fetchSections()
  }

  // Set the sort state from &sort=
  getOrder() {
    const { globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    return sort || 'desc'
  }

  // Set the section state from &category=
  getSection() {
    const { globalContentConfig } = this.props
    const { query: { section = '' } = {} } = globalContentConfig || {}

    return section !== '' ? 'section' : ''
  }

  // Replace the parameter from the query
  getUrl(type, value) {
    const { requestUri } = this.props

    /* Genera la expresión regular basado en el parámetro que se busca */
    const regex = new RegExp(`(\\?|&)${type}=.*?(?=&)`)
    let newUri

    /* Si la URI actual tiene el parámetro que se quiere reemplazar, lo reemplaza */
    if (requestUri.includes(type)) {
      /* Si el parámetro es "query", agrega el "?" al inicio, sino el "&" */
      newUri = requestUri.replace(
        regex,
        `${type === 'query' ? '?' : '&'}${type}=${
          type === 'query'
            ? encodeURIComponent(value).replace(/%20/g, '+')
            : value
        }`
      )
      /* Luego de agregar un parámetro resetea la paginación */
      newUri = newUri.replace(/&page=.*?(?=&|$)/, '')
    } else {
      /*
        Si el parámetro que se quiere reemplazar no está en la URI actual 
        generará la URI desde cero usando los parámetros que ya tiene y
        agregando el nuevo parámetro
      */
      const { globalContentConfig } = this.props
      const { query: params = {} } = globalContentConfig || {}

      /* Por defecto "sort" será "desc", no "vacío" */
      const sort = type === 'sort' ? value : 'desc'
      /*
        Es necesario hacer esto para poder agregar el parámetro "category" 
        aún cuando no está presente en la URI actual
      */
      const category = type === 'category' ? value : ''

      // TODO: Manejar error con "params.section.slice(1)"
      newUri = `/buscar/?query=${encodeURIComponent(params.query || '').replace(
        /%20/g,
        '+'
      )}&category=${(params.section && params.section.slice(1)) ||
        category}&sort=${params.sort || sort || 'desc'}`
      /* El slice(0) es para eliminar el slash de la sección que se agrega para la consulta a la API */
    }

    return newUri /* Retorna la nueva URI armada */
  }

  // Establece el estado "selected" relacionado al filtro seleccionado
  _handleButton = event => {
    this.setState({
      selected: event.target.name,
    })
  }

  fetchSections() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'filter-section',
    }
    const schema = `{
      children {
        _id
        name
      }
    }`
    const { fetched } = this.getContent(source, params, schema)
    fetched
      .then(response => {
        const { children = [] } = response || {}
        if (children.length > 0) {
          this.setState({ sections: children })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  render() {
    const { sections, selected, showList, sort } = this.state
    const { isAdmin, globalContentConfig } = this.props

    const classes = {
      searchFilter: `search-filter flex flex-col-reverse w-full mt-20 p-15 lg:flex-row`,
      containerList: 'position-relative',
      select: `search-filter__select position-relative w-full flex items-center pt-0 pb-0 pl-15 pr-15 lg:h-auto p-0 ${
        showList ? 'bg-white' : 'bg-base-100'
      }`,
      selectName: `search-filter__select-name flex w-full justify-between text-sm lg:hidden`,
      iconButton: 'icon-angle-down',
      list: `search-filter__list bg-white left-0 position-absolute w-full flex-col ${
        showList ? 'flex' : 'hidden'
      } lg:flex lg:flex-row`,
      iemDesc: `search-filter__item ${
        sort === 'desc' || !sort ? 'active' : ''
      } lg:p-0 lg-p-5`,
      itemAsc: `search-filter__item ${
        sort === 'asc' ? 'active' : ''
      } lg:p-0 lg-p-5`,
      itemRel: `search-filter__item ${
        sort === 'rel' ? 'active' : ''
      } lg:p-0 lg-p-5`,
      itemType: `search-filter__item ${
        selected === 'type' ? 'selected' : ''
      } lg:p-0 lg-p-5`,
      itemSection: `search-filter__item ${
        selected === 'section' ? 'selected' : ''
      } lg:p-0 lg-p-5`,
      itemTime: `search-filter__item ${
        selected === 'time' ? 'selected' : ''
      } lg:p-0 lg-p-5`,
      link: `search-filter__link flex uppercase w-full pt-10 pb-10 pl-15 pr-15 text-sm text-gray-300 lg:justify-center lg:items-center lg:text-center lg:p-10 lg:font-thin`,
      subList: `search-filter__sublist flex w-full flex-col pt-0 pb-0 pl-20 pr-20 lg:flex-row lg:mt-10 lg:left-0`,
      subItem: `search-filter__subitem flex items-center position-relative lg:p-0 lg:mr-15`,
      subLink: 'search-filter__sublink capitalize w-full text-xs text-gray-200',
    }

    return (
      <div role="search" className={classes.searchFilter}>
        <div className={classes.containerList}>
          <button
            className={classes.select}
            onClick={() => this.setState({ showList: !showList })}
            onKeyDown={() => this.setState({ showList: !showList })}
            type="button">
            <span className={classes.selectName}>
              Seleccione <span className={classes.iconButton}>+</span>
            </span>
          </button>
          <ul className={classes.list}>
            <li className={classes.iemDesc}>
              <a
                href={!isAdmin && this.getUrl('sort', 'desc')} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="true">
                Más Recientes
              </a>
            </li>
            <li className={classes.itemAsc}>
              <a
                href={!isAdmin && this.getUrl('sort', 'asc')} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="false">
                Menos Recientes
              </a>
            </li>
            <li className={classes.itemRel}>
              <a
                href={!isAdmin && this.getUrl()} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="false">
                Relevancia
              </a>
            </li>
            <li className={classes.itemType}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="type">
                Tipo de Nota
              </button>
            </li>
            <li className={classes.itemSection}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="section">
                Sección
              </button>
              {/* Si el filtro seleccionado es "sección", renderiza la lista de secciones */
              selected === 'section' && sections !== [] && (
                <ul className={classes.subList}>
                  {sections.map(section => (
                    <li key={section._id} className={classes.subItem}>
                      <a
                        href={
                          !isAdmin &&
                          this.getUrl('category', section._id.slice(1))
                        } // (type, value)
                        /* El slice(0) es para eliminar el slash inicial de la sección */
                        className={classes.subLink}>
                        {section.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className={classes.itemTime}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="time">
                Período de tiempo
              </button>
            </li>
          </ul>
        </div>
        <SearchInput globalContentConfig={globalContentConfig} />
      </div>
    )
  }
}

export default SearchFilterChildSearchFilter
