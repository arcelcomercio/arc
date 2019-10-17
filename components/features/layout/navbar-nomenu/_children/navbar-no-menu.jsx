import React, { useState } from 'react'

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
    'navbar-nm__btn flex items-center text-gray-100 pt-5 pb-5 pr-10 pl-10 mr-5 secondary-font text-md rounded-sm border-solid border-1 border-white lg:inline-block ',
  search: 'navbar-nm__search cursor-pointer h-full position-relative pr-5 pl-5',
  iconSearch:
    'navbar-nm__icon-search icon-search text-gray-100 flex items-center h-full',
  boxSearch: 'navbar-nm__box-search position-absolute p-15',
  formSearch: 'flex items-center justify-center',
  inputSearch: 'navbar-nm__input-search',
  btnSearch: 'navbar-nm__btn-search capitalize',
}

export default props => {
  const [toggleSearch, changeSearch] = useState(false)
  const { list } = props

  const { children: dataList = [] } = list
  return (
    <div className={classes.bar}>
      <div className={classes.container}>
        <div className={classes.left}>
          <ul className={classes.list}>
            {dataList.map(item => {
              return (
                <li className={classes.item}>
                  <a className={classes.link} href={item._id}>
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={classes.right}>
          <div className={classes.btns}>
            <a className={classes.btn} href="/">
              Ingresa
            </a>
            <a className={classes.btn} href="/">
              Registrate
            </a>
          </div>
          <div className={classes.search}>
            <button
              type="button"
              className={classes.iconSearch}
              onClick={() => changeSearch(!toggleSearch)}
            />
            <div
              className={`${classes.boxSearch} ${
                toggleSearch ? 'block' : 'hidden'
              }`}>
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
    </div>
  )
}
