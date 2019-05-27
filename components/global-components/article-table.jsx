import React from 'react'
import renderHTML from 'react-render-html'
import UtilListKey from '../utilities/list-keys'

const ArticleBodyChildTable = props => {
  const { data: { header = [], rows = [] } = {} } = props

  return (
    <table className="tabla">
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
            <tr data-editor={rowIndex} key={UtilListKey(rowIndex)}>
              {rowItem &&
                rowItem.map((itemCell, index) => (
                  <td data-editor={rowIndex} key={UtilListKey(index)}>
                    {renderHTML(itemCell.content) || ''}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ArticleBodyChildTable
