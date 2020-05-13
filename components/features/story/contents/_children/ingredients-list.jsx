import React from 'react'

const classes = {
  headerList: 'ingredients__header',
  list: 'ingredients__list',
  item: 'ingredients__item',
  unit: 'ingredients__unit',
  text: 'ingredients__text',
}

const StoryContentChildIngredientList = ({ data }) => {
  const list = data.split(',')
  return (
    <div>
      <h2 className={classes.headerList}>Ingredientes</h2>
      <ul className={classes.list}>
        {list &&
          list.map(item => {
            const arrayString = item.trim().match(/^(\[(.+)\])(.*)/)
            const units = arrayString ? arrayString[2] : ''
            const text = arrayString ? arrayString[3] : item.trim()
            return (
              <li className={classes.item}>
                <span className={classes.unit} width="50">
                  {units}
                </span>
                <span className={classes.text}>{text}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default StoryContentChildIngredientList
