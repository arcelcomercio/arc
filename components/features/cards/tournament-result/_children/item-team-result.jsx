import React from 'react'

const classes = {
  itemTeamResult: 'flex flex-row',
}

const ItemTeamResult = () => {
  return (
    <div className={classes.itemTeamResult}>
      <div>Germany</div>
      <div>bandera</div>
      <div>
        <div>
          <span>8</span>
          <span>1</span>
        </div>
        <span>En vivo</span>
      </div>
      <div>bandera</div>
      <div>Brasil</div>
    </div>
  )
}

export default ItemTeamResult
