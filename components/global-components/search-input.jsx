import React, { PureComponent } from 'react'
import { searchQuery } from '../utilities/helpers'

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

  _handleSearch = e => {
    e.preventDefault()
    const { globalContentConfig } = this.props
    const { query: { sort } = {} } = globalContentConfig || {}
    const { value } = this.inputSearch.current /* React ref del input */
    searchQuery(value, sort)
  }

  render() {
    const { globalContentConfig: query  } = this.props
    const queryParams = query.query
    const search = queryParams.query || ''
    return (
      <div className={classes.container}>
        <form className={classes.form} onSubmit={this._handleSearch}>
          <button className={classes.button} type="submit" />
          <input
            className={classes.input}
            ref={this.inputSearch}
            defaultValue={search}
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
