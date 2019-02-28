import React, { Fragment } from 'react'

const Tables = props => {
  const { header, rows } = props.data

  return (
    <table className="tabla">
      <thead>
        <tr>
          {header.map(item => (
            <th>{item.content}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((itemRows, indexRow) => (
          <tr data-editor={indexRow}>
            {itemRows.map(itemRows2 => (
              <td data-editor={indexRow}>{itemRows2.content}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Tables
