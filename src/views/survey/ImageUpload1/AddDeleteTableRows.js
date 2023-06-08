import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import api, { registerAccessToken } from "../../../api";
import TableRows from "./TableRows";
import { accessToken } from "../../../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ulid } from 'ulid'



function AddDeleteTableRows({imgdata, setimageData}){
    const history = useHistory();
    const dispatch = useDispatch();
 
    const addTableRows = ()=>{
  
        const rowsInput={
            image_data: '',
            image_description:''  
        } 
        setimageData([...imgdata, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...imgdata];
        rows.splice(index, 1);
        setimageData(rows);
   }
 
    const handleChange = (index, evnt)=>{ 
        const { name, value } = evnt.target;
        const rowsInput = [...imgdata];
        rowsInput[index][name] = value;
        setimageData(rowsInput);
    }

    const handleChangeImage = async (index, e) => {
        let unique_id = ulid()
        if (!registerAccessToken(accessToken(), history, dispatch)) return;
        console.log(e.target.value)
        let res;
        let data;
        [res, data] = await api.designer.uploadImage(
        {
            "ContentType": "image/png",
            "Key": unique_id
        });
        console.log(data)
        console.log(res)

        var file = e.target.files[0];
        
        var reader = new FileReader();
        reader.onload = function(e) {
        const req = new XMLHttpRequest();
            req.open("PUT", data.url, true);
            req.onload = (event) => {
            // Uploaded
                console.log("EVENT", event)
            };

            const blob = new Blob([e.target.result], { type: "image/png" });
            req.send(blob);
        };
        reader.onerror = function(e) {
        // error occurred
        console.log('Error : ' + e.type);
        }

        reader.readAsArrayBuffer(file);
        const rowsInput = [...imgdata];
        rowsInput[index]["image_data"] = unique_id;
        setimageData(rowsInput);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="w-max">
                <table className="table">
                    <thead>
                      <tr>
                          <th>Select Image</th>
                          <th>Image Link</th>
                          <th>Image Description</th>
                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={imgdata} deleteTableRows={deleteTableRows} handleChange={handleChange} handleChangeImage={handleChangeImage} />
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