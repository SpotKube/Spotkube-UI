import React from "react";
import TableRows from "./TableRows"
function AddDeleteTableRows({usrData, setusrData}){
 
    const addTableRows = ()=>{
  
        const rowsInput={
            user_deail:'',
            input_type: 'dropdown',
            user_deail_Values:[]  
        } 
        setusrData([...usrData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...usrData];
        rows.splice(index, 1);
        setusrData(rows);
   }
 
    const handleChange = (index, evnt)=>{ 
        const { name, value } = evnt.target;
        const rowsInput = [...usrData];
        rowsInput[index][name] = value;
        setusrData(rowsInput);
    }

    const handleAttributes = (index, value)=>{  
        const rowsInput = [...usrData];
        console.log(rowsInput)
        console.log(rowsInput[index]["user_deail_Values"])
        rowsInput[index]["user_deail_Values"] = value;
        setusrData(rowsInput);
        console.log(usrData)
    }

    console.log(usrData)

    return(
        <div className="container">
            <div className="row">
                <div className="w-max">
                <table className="table">
                    <thead>
                      <tr>
                          <th>User Detail</th>
                          <th>Input Type</th>
                          <th>User Detail Value</th>
                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={usrData} deleteTableRows={deleteTableRows} handleChange={handleChange} handleAttributes={handleAttributes}/>
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
    )
}
export default AddDeleteTableRows