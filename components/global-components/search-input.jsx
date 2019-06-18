import React, { PureComponent } from 'react'

const classes = {
  searchContainer: `search-filter__box-search flex items-center mb-15 lg:mb-0 lg:items-start`,
  searchForm: 'position-relative w-full',
  searchButton: `icon-search search-filter__search-button block position-absolute title-sm lg:h-full lg:flex lg:items-center lg:justify-center lg:right-0`,
  searchInput: `search-filter__search-input w-full pl-15 pr-30 text-lg lg:font-bold`,
}

class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearch = React.createRef() /* React ref del input */
  }

  // TODO: Agrega la nueva "query" a la URI
  _handleSearch = e => {
    e.preventDefault()
    const { contextPath, globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    const { value } = this.inputSearch.current /* React ref del input */

    /* Sólo genera la URI si "query" tiene contenido */
    if (value !== '')
      // eslint-disable-next-line no-restricted-globals
      location.href = `${contextPath}/buscar?query=${encodeURIComponent(
        value
      ).replace(/%20/g, '+')}&category=&sort=${sort || 'desc'}`
    /* Si, la categoría por defecto se vuelve vacía al realizar nueva búsqueda */
  }

  render() {
    return (
      <div className={classes.searchContainer}>
        <form className={classes.searchForm} onSubmit={this._handleSearch}>
          <button className={classes.searchButton} type="submit" />
          <input
            className={classes.searchInput}
            ref={this.inputSearch}
            type="search"
            placeholder="Buscar"
            aria-label="Campo de búsqueda"
          />
        </form>
      </div>
    )
  }
}

export default SearchInput
