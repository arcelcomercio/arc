import React, { Fragment } from "react";

const Table = (props) => {

    const { header, rows } = props.data;

    // console.log(header); debugger;

    return (
        <Fragment>
            <table className='table'>
                <thead>
                    <tr>
                        {header.map((item) => (
                            <th>
                                {item.content}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {rows.map((itemRows, indexRow) => (
                            <tr data-editor={indexRow} >
                             {rows[indexRow].map((itemRows2) => (
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
