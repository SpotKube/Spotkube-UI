import React from "react";
import TableRows from "./TableRows"
function Options({ numOfoptions, setnumOfoptions }){
    
    const addTableRows = async ()=>{
        const rowsInput={
            options_val:'',
        } 
        setnumOfoptions([...numOfoptions, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...numOfoptions];
        rows.splice(index, 1);
        setnumOfoptions(rows);
   }
 
    const handleChange = (index, evnt)=>{  
        const { name, value } = evnt.target;
        const rowsInput = [...numOfoptions];
        rowsInput[index][name] = value;
        setnumOfoptions(rowsInput);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="w-max">
                <table className="table">
                    <thead>
                      <tr>
                          <th>Alternative Name</th>
                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                        <TableRows rowsData={numOfoptions} deleteTableRows={deleteTableRows} handleChange={handleChange}/>
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
    )
}
export default Options