import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SearchInput from '../../../global-components/search-input'

// TODO: Refactorizar todo (la data debe venir desde el feature, no hacer fetches aca)
// TODO: Las búsquedas no deben hacerse por parámetros, deben ser por la misma URL

@Consumer
class SearchFilterChildSearchFilter extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite, isAdmin } = props

    this.state = {
      sort: !isAdmin && this.getSortFilter(),
      selected: !isAdmin && this.getSectionFilter(),
      showList: false,
    }

    this.fetchContent({
      data: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
          hierarchy: HIERARCHY,
        },
        filter: schemaFilter,
        transform: ({ children = [] } = {}) => {
          const data = { sections: children }
          return { ...data }
        },
      },
    })
  }

  getSortFilter() {
    // Verifica si hay "sort" en la URL o establece valor por defecto
    const { globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}

    return sort || DESC
  }

  getSectionFilter() {
    // Verifica si hay "section" en la URL o establece valor por defecto
    const { globalContentConfig } = this.props
    const { query: { section = '' } = {} } = globalContentConfig || {}

    return section !== '' ? 'section' : ''
  }

  // Replace the parameter from the query
  getUrl(type, value) {
    // Construye la URL para los botones del filtro
    const { globalContentConfig } = this.props
    const {
      query: { uri = '', query = '', section = 'todas', sort = DESC } = {},
    } = globalContentConfig || {}

    // if (query) ->
    let newUri = uri
    switch (type) {
      case SORT:
        newUri = `${BASE_PATH}/${query}/${section}/${value}/`
        break
      case SECTION:
        newUri = `${BASE_PATH}/${query}/${value}/${sort}/`
        break
      default:
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
    const {
      selected,
      showList,
      sort,
      data: { sections = [] } = {},
    } = this.state

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
