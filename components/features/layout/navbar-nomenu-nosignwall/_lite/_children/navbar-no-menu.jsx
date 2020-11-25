import React from 'react'

const classes = {
  bar: 'navbar-nm w-full h-full',
  container: 'navbar-nm__container f just-between alg-center h-full',
  left: 'navbar-nm__left f f-center',
  list: 'navbar-nm__list f',
  item: 'navbar-nm__item',
  link: 'navbar-nm__link',
  btn: 'navbar-nm__btn f f-center',
  search: 'navbar-nm__search h-full pos-rel',
  iconSearch: 'navbar-nm__icon-search f f-center h-full',
  boxSearch: 'navbar-nm__box-search pos-abs',
  formSearch: 'f f-center just-center',
  inputSearch: 'navbar-nm__input-search',
  btnSearch: 'navbar-nm__btn-search',
  btnLogin: 'navbar-nm__btn-sign',
}

export default props => {
  const { list } = props

  /* document.addEventListener('DOMContentLoaded', () => {
    requestIdle(() => {
      document
        .body
        .querySelector('.navbar-nm__icon-search')
        .addEventListener('click', () => {
          document
            .querySelector('.navbar-nm__box-search')
            .classList.toggle('active')
        })
      const searchInput = document.body.querySelector('.navbar-nm__input-search')
      document.body
        .querySelector(".navbar-nm__box-search").firstChild
        .addEventListener('submit', (e) => {
          e.preventDefault()
          if (searchInput.value) {
            const newQuery = encodeURIComponent(searchInput.value).replace(
              /%20/g,
              '+'
            )
            window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
          }
        })
    })
  }) */

  const { children: dataList = [] } = list
  return (
    <div className={classes.bar}>
      <div className={classes.container}>
        <div className={classes.left}>
          <ul className={classes.list}>
            {dataList.map(
              ({ _id: id, url, name = '', display_name: displayName = '' }) => {
                return (
                  <li className={classes.item}>
                    <a
                      itemProp="url"
                      className={classes.link}
                      href={url || id || '/'}>
                      {name || displayName}
                    </a>
                  </li>
                )
              }
            )}
          </ul>
        </div>

        <div className={classes.search}>
          <button type="button" className={classes.iconSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-basic__search"
              width="19"
              height="19"
              viewBox="0 0 14 14">
              <title>abrir cuadro de búsqueda</title>
              <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
            </svg>
          </button>
          <div className={classes.boxSearch}>
            <form className={classes.formSearch} action="">
              <input
                type="search"
                className={classes.inputSearch}
                placeholder="Buscar"
              />
              <button className={classes.btnSearch} type="submit">
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.body.querySelector(".navbar-nm__icon-search").addEventListener("click",function(){document.body.querySelector(".navbar-nm__box-search").classList.toggle("active")});var e=document.body.querySelector(".navbar-nm__input-search");document.body.querySelector(".navbar-nm__box-search").firstChild.addEventListener("submit",function(n){if(n.preventDefault(),e.value){var t=encodeURIComponent(e.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(t,"/todas/descendiente/?query=").concat(t)}})})});`,
        }}
      />
    </div>
  )
}
