import React from 'react';

const EmployeeRow = (props) => {
    return (
        <tr>
        <th scope="row"><img src={props.picture.thumbnail}/></th>
        <td>{props.name.first} {props.name.last}</td>
        <td>{props.dob.age}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
      </tr>
    );
};

export default EmployeeRow;