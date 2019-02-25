import React, { Component, Fragment } from "react";

const Table = (props) => {

    const { header: header, rows: rows } = props.data;

    // console.log(header); debugger;

    return (
        <Fragment>
            <table className='table'>
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th>
                                {item.content}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                        {rows.map((itemRows, indexRow) => (
                            <tr data-editor={indexRow} >
                             {rows[indexRow].map((itemRows2, indexRow2) => (
                                 <td data-editor={indexRow} >
                               { itemRows2.content}
                                </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </Fragment >
    );
}

export default Table;
