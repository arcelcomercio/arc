import React from 'react'

const classes = {
  bar: 'navbar-nm w-full pr-5 pl-5 h-full',
  container: 'navbar-nm__container flex justify-between h-full',
  left: 'navbar-nm__left flex items-center',
  list: 'navbar-nm__list flex',
  item: 'navbar-nm__item mr-15',
  link: 'navbar-nm__link text-md text-gray-100 pt-5 pb-5 block secondary-font',
  right: 'navbar-nm__right flex items-center h-full',
  btns: 'navbar-nm__btns flex items-center',
  news: 'navbar-nm__n flex alg-center',
  lt: 'navbar-nm__lt flex alg-center',
  btn:
    'navbar-nm__btn flex items-center text-gray-100 pt-5 pb-5 pr-10 pl-10 mr-5 secondary-font text-md rounded-sm border-solid border-1 border-white',
  search: 'navbar-nm__search cursor-pointer h-full position-relative pr-5 pl-5',
  iconSearch:
    'navbar-nm__icon-search icon-search text-gray-100 flex items-center h-full',
  boxSearch: 'navbar-nm__box-search position-absolute p-15',
  formSearch: 'flex items-center justify-center',
  inputSearch: 'navbar-nm__input-search',
  btnSearch: 'navbar-nm__btn-search capitalize',
  btnLogin: 'navbar-nm__btn-sign',
}

export default (props) => {
  const { list, arcSite } = props

  /* document.addEventListener('DOMContentLoaded', () => {
    requestIdle(() => {
      document
        .body
        .querySelector('.navbar-nm__icon-search')
        .addEventListener('click', () => {
          document
            .querySelector('.navbar-nm__box-search')
            .classList.toggle('hidden')
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
          {arcSite !== 'trome' && (
            <>
              <a href="/suscripcion-newsletter/" className={classes.news}>
                <svg width="20" height="16" viewBox="0 0 20 16">
                  <path d="M20,2a2.006,2.006,0,0,0-2-2H2A2.006,2.006,0,0,0,0,2V14a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2ZM18,2,10,6.99,2,2Zm0,12H2V4l8,5,8-5Z" />
                </svg>
                <span>Newsletter</span>
              </a>
            </>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.btns}>
            {/* <a itemProp="url" className={classes.btn} href="/">
              Ingresa
            </a>
            <a itemProp="url" className={classes.btn} href="/">
              Registrate
            </a> */}
          </div>
          <div className={classes.search}>
            <button
              type="button"
              className={classes.iconSearch}
              aria-label="Buscar">
              <span hidden>Buscar</span>
            </button>
            <div className={`${classes.boxSearch} hidden`}>
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
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.body.querySelector(".navbar-nm__icon-search").addEventListener("click",function(){document.body.querySelector(".navbar-nm__box-search").classList.toggle("hidden")});var e=document.body.querySelector(".navbar-nm__input-search");document.body.querySelector(".navbar-nm__box-search").firstChild.addEventListener("submit",function(n){if(n.preventDefault(),e.value){var t=encodeURIComponent(e.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(t,"/todas/descendiente/?query=").concat(t)}})})});`,
        }}
      />
    </div>
  )
}
