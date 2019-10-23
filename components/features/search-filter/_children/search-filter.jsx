import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import SearchInput from '../../../global-components/search-input'
import schemaFilter from '../_dependencies/schema-filter'

// TODO: Refactorizar todo (la data debe venir desde el feature, no hacer fetches aca)
/**
 * INFO:
 * Las estructuras comentadas serán habilitadas luego, por favor, no eliminar.
 */

const classes = {
  searchFilter: `search-filter flex flex-col-reverse bg-base-100 w-full mt-20 p-15 lg:flex-row`,
  containerList: 'search-filter__box position-relative',
  select: `search-filter__select position-relative w-full flex items-center pt-0 pb-0 pl-15 pr-15 lg:h-auto p-0`,
  selectName: `search-filter__select-name flex w-full justify-between text-sm lg:hidden`,
  iconButton: 'icon-angle-down',
  list: `search-filter__list bg-white left-0 position-absolute w-full flex-col lg:flex lg:flex-row`,
  item: `search-filter__item lg:p-0 lg-p-5`,
  link: `search-filter__link flex uppercase w-full pt-10 pb-10 pl-15 pr-15 text-sm text-gray-300 lg:justify-center lg:items-center lg:text-center lg:p-10 lg:font-thin`,
  subList: `search-filter__sublist flex flex-col pt-0 pb-0 pl-20 pr-20 lg:flex-row lg:mt-10 lg:left-0`,
  subItem: `search-filter__subitem flex items-center position-relative lg:p-0 lg:mr-15`,
  subLink: 'search-filter__sublink capitalize text-xs text-gray-200',
}

const DESC = 'descendiente'
const ASC = 'ascendente'
const SORT = 'sort'
const SECTION = 'section'
const BASE_PATH = '/buscar'
const CONTENT_SOURCE = 'navigation-by-hierarchy'
const HIERARCHY = 'search-filter-default'

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

    return section !== '' ? SECTION : ''
  }

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

    return newUri
  }

  // Establece el estado "selected" relacionado al filtro seleccionado
  _handleButton = event => {
    this.setState({
      selected: event.target.name,
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

    return (
      <div role="search" className={classes.searchFilter}>
        <div className={classes.containerList}>
          <button
            className={`${classes.select} ${
              showList ? 'bg-white' : 'bg-base-100'
            }`}
            onClick={() => this.setState({ showList: !showList })}
            onKeyDown={() => this.setState({ showList: !showList })}
            type="button">
            <span className={classes.selectName}>
              Seleccione <span className={classes.iconButton}>+</span>
            </span>
          </button>
          <ul className={`${classes.list} ${showList ? 'flex' : 'hidden'}`}>
            {/* <li
              className={`${classes.item} ${
                selected === 'type' ? 'selected' : ''
              }`}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="type">
                Tipo de Nota
              </button>
            </li> */}
            <li
              className={`${classes.item} ${
                selected === SECTION ? 'selected' : ''
              }`}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="section">
                Sección
              </button>
              {/* Si el filtro seleccionado es "sección", renderiza la lista de secciones */
              selected === SECTION && sections !== [] && (
                <ul className={classes.subList}>
                  {sections.map(section => (
                    <li key={section._id} className={classes.subItem}>
                      <a
                        href={
                          !isAdmin && this.getUrl(SECTION, section._id.slice(1))
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
            {/* <li
              className={`${classes.item} ${
                selected === 'time' ? 'selected' : ''
              }`}>
              <button
                type="button"
                className={classes.link}
                onClick={this._handleButton}
                onKeyDown={this._handleButton}
                name="time">
                Período de tiempo
              </button>
            </li> */}
            <li
              className={`${classes.item} ${
                sort === DESC || !sort ? 'active' : ''
              }`}>
              <a
                href={!isAdmin && this.getUrl(SORT, DESC)} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="true">
                Más Recientes
              </a>
            </li>
            <li
              className={`${classes.item} ${
                sort === ASC || !sort ? 'active' : ''
              }`}>
              <a
                href={!isAdmin && this.getUrl(SORT, ASC)} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="false">
                Menos Recientes
              </a>
            </li>
            {/* <li
              className={`${classes.item} ${
                sort === 'relacionados' || !sort ? 'active' : ''
              }`}>
              <a
                href={!isAdmin && this.getUrl()} // (type, value)
                className={classes.link}
                role="checkbox"
                aria-checked="false">
                Relevancia
              </a>
            </li> */}
          </ul>
        </div>
        <SearchInput globalContentConfig={globalContentConfig} />
      </div>
    )
  }
}

export default SearchFilterChildSearchFilter
