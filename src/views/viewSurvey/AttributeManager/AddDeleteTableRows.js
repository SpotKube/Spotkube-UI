import React, {useState, useEffect} from "react";
import TableRows from "./TableRows"
function Options({numOfoptions, attributeData, setattributeData }){
    const [optionsdata, setoptionsdata] = useState([]);
    console.log(attributeData)
    useEffect(() => {
        createOptionsVal()
        console.log(attributeData)
      }, [numOfoptions, attributeData]);

    const createOptionsVal = (async () => {
        let optionsVal = []
        for (let i = 0; i < numOfoptions.length ; i++) {
            await optionsVal.push({name: numOfoptions[i]["options_val"], id: i+1})
        }
        setoptionsdata(optionsVal)
    })
    
    const addTableRows = async ()=>{
        const rowsInput={
            attributes:'',
            attribute_Values:[], 
            options_val:''
        } 
        setattributeData([...attributeData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...attributeData];
        rows.splice(index, 1);
        setattributeData(rows);
   }

   const handleAttributes = (index, value)=>{  
        const rowsInput = [...attributeData];
        console.log(rowsInput)
        console.log(rowsInput[index]["attribute_Values"])
        rowsInput[index]["attribute_Values"] = value;
        setattributeData(rowsInput);
        console.log(attributeData)
    }
 
    const handleChange = (index, evnt)=>{  
        const { name, value } = evnt.target;
        const rowsInput = [...attributeData];
        rowsInput[index][name] = value;
        setattributeData(rowsInput);
    }

    const handleMultiSelect = (index, selectedList)=>{  
        const rowsInput = [...attributeData];
        rowsInput[index]["options_val"] = selectedList;
        setattributeData(rowsInput);
    }
    return(
        <div className="container">
            <div className="row">
                <div className="w-max">
                <table className="table">
                    <thead>
                      <tr>
                          <th>Attribute Name</th>
                          <th>List of Values</th>
                          <th>Alternatives</th>
                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={attributeData} deleteTableRows={deleteTableRows} handleChange={handleChange} optionsdata={optionsdata} handleMultiSelect={handleMultiSelect} handleAttributes={handleAttributes}/>
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