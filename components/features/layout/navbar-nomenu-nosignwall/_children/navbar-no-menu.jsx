import React from 'react'

const classes = {
  bar: 'navbar-nm w-full pr-5 pl-5 bg-black h-full',
  container: 'navbar-nm__container flex justify-between h-full',
  left: 'navbar-nm__left flex items-center',
  list: 'navbar-nm__list flex',
  item: 'navbar-nm__item mr-15',
  link: 'navbar-nm__link text-md text-gray-100 pt-5 pb-5 block secondary-font',
  right: 'navbar-nm__right flex items-center h-full',
  btns: 'navbar-nm__btns flex items-center',
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

export default props => {
  const { list } = props

  /* document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelector('.navbar-nm__icon-search')
      .addEventListener('click', () => {
        document
          .querySelector('.navbar-nm__box-search')
          .classList.toggle('hidden')
      })
    const searchInput = document.querySelector('.navbar-nm__input-search')
    document
      .querySelector('.navbar-nm__btn-search')
      .addEventListener('click', () => {
        if (searchInput.value) {
          const newQuery = encodeURIComponent(searchInput.value).replace(
            /%20/g,
            '+'
          )
          window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
        }
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
                    <a className={classes.link} href={url || id || '/'}>
                      {name || displayName}
                    </a>
                  </li>
                )
              }
            )}
          </ul>
        </div>
        <div className={classes.right}>
          <div className={classes.btns}>
            {/* <a className={classes.btn} href="/">
              Ingresa
            </a>
            <a className={classes.btn} href="/">
              Registrate
            </a> */}
          </div>
          <div className={classes.search}>
            <button type="button" className={classes.iconSearch} />
            <div className={`${classes.boxSearch} hidden`}>
              <form className={classes.formSearch} action="">
                <input
                  type="search"
                  className={classes.inputSearch}
                  placeholder="Buscar"
                />
                <button className={classes.btnSearch} type="button">
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
          __html: `"use strict";document.addEventListener("DOMContentLoaded",function(){document.querySelector(".navbar-nm__icon-search").addEventListener("click",function(){document.querySelector(".navbar-nm__box-search").classList.toggle("hidden")});var e=document.querySelector(".navbar-nm__input-search");document.querySelector(".navbar-nm__btn-search").addEventListener("click",function(){if(e.value){var n=encodeURIComponent(e.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n)}})});`,
        }}
      />
    </div>
  )
}
