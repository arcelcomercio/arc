import React, { PureComponent } from 'react'

const classes = {
  containerSearch: 'search-filter__box-search',
  inputSearch: 'search-filter__search',
  iconSearch: 'icon-search',
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
      <div className={classes.containerSearch}>
        <form className={classes.inputSearch} onSubmit={this._handleSearch}>
          <button className={classes.iconSearch} type="submit" />
          <input
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
