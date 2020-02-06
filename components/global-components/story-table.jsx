import React from 'react'
import UtilListKey from '../utilities/list-keys'

const classes = {
  // TODO: Si la clase table rompe algo, quitar con confianza
  table:
    'story-table w-full h-auto mt-15 mb-15 mr-0 ml-0 table border-1 border-solid border-gray',
  row: 'story-table__row',
  cell: `story-table__cell secondary-font border-b-1 border-r-1 border-solid border-gray text-black text-sm line-h-sm`,
}

const StoryCotentChildTable = props => {
  const { data: { header = [], rows = [] } = {} } = props

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {header &&
            header.map((item, i) => (
              <th
                key={UtilListKey(i)}
                dangerouslySetInnerHTML={{ __html: item.content }}></th>
            ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((rowItem = [], rowIndex = {}) => (
            <tr
              className={classes.row}
              data-editor={rowIndex}
              key={UtilListKey(rowIndex)}>
              {rowItem &&
                rowItem.map((itemCell, index) => (
                  <td
                    className={classes.cell}
                    data-editor={rowIndex}
                    key={UtilListKey(index)}
                    dangerouslySetInnerHTML={{ __html: itemCell.content }}></td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default StoryCotentChildTable
