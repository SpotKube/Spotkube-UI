import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from "react";
import Attributes from "./attributes"
// import { CMultiSelect } from '@coreui/react-pro'


function TableRows({rowsData, deleteTableRows, handleChange, optionsdata, handleMultiSelect, handleAttributes}) {
    const [attributeVal, setattributeVal] = useState([])
    // let listofvar = []
    // rowsData.map((data)=>{listofvar.push(data.attribute_Values)})
    // setattributeVal(listofvar)

    const addTableRowsATR = async (index)=>{    
        const rowsInput = [...rowsData[index]["attribute_Values"]];
        rowsInput.push([]);
        handleAttributes(index,rowsInput)
    }

    const deleteTableRowsATR = (index, indexval)=>{
        const rowsInput = [...rowsData[index]["attribute_Values"]];
        rowsInput.splice(indexval, 1);
        handleAttributes(index,rowsInput)
   }

    const handleChangeVal = (index,indexval, evnt)=>{  
        // console.log(index)
        // console.log(indexval)
        // console.log(attributeVal)
        const rowsInput = [...rowsData[index]["attribute_Values"]];
        rowsInput[indexval] = evnt.target.value;
        handleAttributes(index,rowsInput)
    }
    console.log(rowsData)

    useEffect(() => {
        console.log(rowsData)
    }, [rowsData]);

    const generateAttributes = (async () => {
        let listofvar = []
        rowsData.map((data)=>{listofvar.push(data.attribute_Values)})
        setattributeVal(listofvar)
    })

    useEffect(() => {
        generateAttributes()
        console.log(attributeVal)
      }, [attributeVal]);

    return(  
        rowsData.map((data, index)=>{
            const onSelect = (selectedList, selectedItem) => {
                handleMultiSelect(index, selectedList)
            }
            const onRemove = (selectedList, removedItem) => {
                handleMultiSelect(index, selectedList)
            }
            console.log(data.attribute_Values)
            const {attributes, attribute_Values, options_val}= data;
            console.log(attribute_Values)
            // setattributeVal([...attributeVal,attribute_Values])
            return(
                <tr key={index}>
                <td><input type="text" value={attributes}  onChange={(evnt)=>(handleChange(index, evnt))} name="attributes" className="form-control"/> </td>
                <td><Attributes rowsData={rowsData} deleteTableRows={deleteTableRowsATR} addTableRowsATR={addTableRowsATR} handleChangeVal={handleChangeVal} index={index}/> </td>
                <td style={{zIndex:-1}} >
                    <Multiselect
                        options={optionsdata} // Options to display in the dropdown
                        selectedValues={options_val} // Preselected value to persist in dropdown
                        onSelect={(selectedList, selectedItem, id) => onSelect(selectedList, selectedItem, id)} // Function will trigger on select event
                        onRemove={(selectedList, selectedItem, id) => onRemove(selectedList, selectedItem, id)} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        name="options_val"
                        style={{
                        optionContainer: { // To change css for dropdown options
                            zIndex: 1,
                        },
                        multiselectContainer: { // To change css for multiselect (Width,height,etc..)
                            height: "60px",
                            zIndex: 1,
                            overflow:"scroll"
                        },
                        }}
                    />
                </td>
                {/* <td><CMultiSelect options={optionsdata} label="Framework" text="Please select your framework." /></td> */}
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;