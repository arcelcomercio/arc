import React, { PureComponent } from 'react'

const classes = {
  container: `search-input__container flex items-center mb-15 lg:mb-0 lg:items-start lg:w-full`,
  form: 'position-relative w-full',
  button: `search-input__btn icon-search block position-absolute title-sm bg-white lg:h-full lg:flex lg:items-center lg:justify-center lg:right-0`,
  input: `search-input w-full pl-15 pr-30 text-xl lg:font-bold lg:pr-0`,
}

class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearch = React.createRef() /* React ref del input */
  }

  // TODO: Agrega la nueva "query" a la URI
  _handleSearch = e => {
    e.preventDefault()
    const { globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    const { value } = this.inputSearch.current /* React ref del input */
    console.log(globalContentConfig)
    /* Sólo genera la URI si "query" tiene contenido */
    if (value !== '')
      // eslint-disable-next-line no-restricted-globals
      location.href = `/buscar/${encodeURIComponent(value).replace(
        /%20/g,
        '+'
      )}/todas/${sort || 'descendiente'}/`
    /* Si, la categoría por defecto se vuelve vacía al realizar nueva búsqueda */
  }

  render() {
    return (
      <div className={classes.container}>
        <form className={classes.form} onSubmit={this._handleSearch}>
          <button className={classes.button} type="submit" />
          <input
            className={classes.input}
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
