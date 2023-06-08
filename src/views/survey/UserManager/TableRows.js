import React, { useEffect, useState } from "react";
import Attributes from "./attributes"

function TableRows({rowsData, deleteTableRows, handleChange, handleAttributes}) {

    const [attributeVal, setattributeVal] = useState([[]])
    const addTableRowsATR = async (index)=>{    
        const rowsInput = [...rowsData[index]["user_deail_Values"]];
        rowsInput.push([]);
        handleAttributes(index,rowsInput)
    }

    const deleteTableRowsATR = (index, indexval)=>{
        const rowsInput = [...rowsData[index]["user_deail_Values"]];
        rowsInput.splice(indexval, 1);
        handleAttributes(index,rowsInput)
    }

    const handleChangeVal = (index,indexval, evnt)=>{  
        // console.log(index)
        // console.log(indexval)
        // console.log(attributeVal)
        const rowsInput = [...rowsData[index]["user_deail_Values"]];
        rowsInput[indexval] = evnt.target.value;
        handleAttributes(index,rowsInput)
    }
    // console.log(rowsData)

    useEffect(() => {
        console.log(rowsData)
    }, [rowsData]);

    return(     
        rowsData.map((data, index)=>{
            const {user_deail, input_type, user_deail_Values}= data;
            return(
                <tr key={index}>
                <td><input type="text" value={user_deail}  onChange={(evnt)=>(handleChange(index, evnt))} name="user_deail" className="form-control"/> </td>
                <td>
                    <select value={input_type}  onChange={(evnt)=>(handleChange(index, evnt))} name="input_type" className="form-control">
                        <option value="dropdown" selected>Dropdown</option>
                        <option value="input">Input</option>
                    </select>
                </td>
                {input_type==="dropdown" ?
                <td>
                    {/* <input type="user_deail_Values" value={user_deail_Values}  onChange={(evnt)=>(handleChange(index, evnt))} name="user_deail_Values" className="form-control" placeholder="Value 1, Value 2, Valu3"/>  */}
                    <Attributes rowsData={rowsData} deleteTableRows={deleteTableRowsATR} addTableRowsATR={addTableRowsATR} handleChangeVal={handleChangeVal} index={index}/>
                </td> :         
                <td></td>}
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;