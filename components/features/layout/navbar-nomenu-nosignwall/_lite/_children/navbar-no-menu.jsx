import React from 'react'

const classes = {
  bar: 'navbar-nm w-full h-full',
  container: 'navbar-nm__container f just-between alg-center h-full',
  left: 'navbar-nm__left f f-center',
  list: 'navbar-nm__list f',
  item: 'navbar-nm__item',
  link: 'navbar-nm__link',
  btn: 'navbar-nm__btn f f-center',
  search: 'navbar-nm__search f h-full pos-rel sssssss',
  news: 'navbar-nm__n f alg-center',
  lt: 'navbar-nm__lt f alg-center',
  iconSearch: 'navbar-nm__icon-search f f-center h-full',
  boxSearch: 'navbar-nm__box-search pos-abs',
  formSearch: 'f f-center just-center',
  inputSearch: 'navbar-nm__input-search',
  btnSearch: 'navbar-nm__btn-search',
  btnLogin: 'navbar-nm__btn-sign',
}

export default (props) => {
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
              ({ _id: id, url, name = '', display_name: displayName = '' }) => (
                <li className={classes.item}>
                  <a
                    itemProp="url"
                    className={classes.link}
                    href={url || id || '/'}>
                    {name || displayName}
                  </a>
                </li>
              )
            )}
          </ul>
          <a href="/suscripcion-newsletter/" className={classes.news}>
            <svg width="20" height="16" viewBox="0 0 20 16">
              <path d="M20,2a2.006,2.006,0,0,0-2-2H2A2.006,2.006,0,0,0,0,2V14a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2ZM18,2,10,6.99,2,2Zm0,12H2V4l8,5,8-5Z" />
            </svg>
            <span>Newsletter</span>
          </a>
          <a
            href="https://www.lumingo.com/tienda-hincha?ref=depor"
            target="_blank"
            rel="noreferrer"
            className={classes.lt}>
            <svg width="25" height="20" viewBox="0 0 85 74.6">
              <path d="M35.5 49.7h32.4c1.4 0 2.7-.9 3.2-2.3l9.2-29.1c.3-1 .1-2.1-.5-2.9-.6-.8-1.6-1.3-2.7-1.3H20.7L18.1 8c-.2-.5-.7-.8-1.2-.8H6.3c-.4-.5-1-.8-1.6-.8-1.2 0-2.1 1-2.1 2.1 0 1.2 1 2.1 2.1 2.1.7 0 1.3-.3 1.7-.9H16l16.5 37.9c0 .1.1.2.1.2L30 54.4c-.4 0-.8-.1-1.1-.1-4.8 0-8.8 3.9-8.8 8.8s3.9 8.8 8.8 8.8c4.4 0 8-3.2 8.7-7.4h22.1c.7 4.2 4.3 7.4 8.7 7.4 4.8 0 8.8-3.9 8.8-8.8s-3.9-8.8-8.8-8.8c-4.4 0-8 3.2-8.7 7.4H37.5c-.5-2.9-2.3-5.3-4.9-6.6l2.3-5.6c.2.1.4.2.6.2zm29.7-7.8H37.5c-.7 0-1.4-.6-1.4-1.4 0-.7.6-1.4 1.4-1.4h27.7c.7 0 1.4.6 1.4 1.4-.1.8-.7 1.4-1.4 1.4zm2.3-8.6H35.1c-.7 0-1.4-.6-1.4-1.4 0-.7.6-1.4 1.4-1.4h32.4c.7 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm-35.7-9.9c0-.7.6-1.4 1.4-1.4h36.3c.7 0 1.4.6 1.4 1.4 0 .7-.6 1.4-1.4 1.4H33.2c-.7 0-1.4-.6-1.4-1.4z" />
            </svg>
            <span>La Tienda del Hincha</span>
          </a>
        </div>

        <div className={classes.search}>
          <button
            type="button"
            title="abrir cuadro de búsqueda"
            alt="abrir cuadro de búsqueda"
            className={classes.iconSearch}>
            <svg
              className="h-basic__search"
              width="19"
              height="19"
              viewBox="0 0 14 14">
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
