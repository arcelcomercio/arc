import React from 'react'

const ArticleBodyChildTable = props => {
  const { data: { header = [], rows = [] } = {} } = props

  return (
    <table className="tabla">
      <thead>
        <tr>{header && header.map(item => <th>{item.content || ''}</th>)}</tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((rowItem = [], rowIndex = {}) => (
            <tr data-editor={rowIndex}>
              {rowItem &&
                rowItem.map(itemCell => (
                  <td data-editor={rowIndex}>{itemCell.content || ''}</td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ArticleBodyChildTable
