import React from 'react'
import renderHTML from 'react-render-html'
import UtilListKey from '../utilities/list-keys'

const classes = {
  table: 'table',
  row: 'table__row',
  cell: 'table__cell',
}

const StoryCotentChildTable = props => {
  const { data: { header = [], rows = [] } = {} } = props

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {header &&
            header.map((item, i) => (
              <th key={UtilListKey(i)}>{renderHTML(item.content) || ''}</th>
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
                    key={UtilListKey(index)}>
                    {renderHTML(itemCell.content) || ''}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default StoryCotentChildTable
