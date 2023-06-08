import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect } from "react";
// import { CMultiSelect } from '@coreui/react-pro'


function TableRows({rowsData, deleteTableRows, handleChange, addTableRowsATR, handleChangeVal, index}) {

    useEffect(() => {
        console.log(rowsData)
    }, [rowsData]);

    return(  
        <>
            <th className='flex'><button className="btn btn-outline-success" onClick={() => addTableRowsATR(index)} >+</button></th>
            {rowsData[index]["attribute_Values"].map((data, indexval)=>{
                return (
                    <tr key={indexval}>
                        <td><input type="text" value={data}  onChange={(evnt)=>(handleChangeVal(index,indexval, evnt))} name="attributesVal" className="form-control"/> </td>
                        {/* <td><CMultiSelect options={optionsdata} label="Framework" text="Please select your framework." /></td> */}       
                        <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index, indexval))}>x</button></td>
                    </tr>
                )
            })}
        </>
    )
    
}
export default TableRows;