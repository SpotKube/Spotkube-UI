const BASE_URL_REMOTE = process.env.REACT_APP_MEDIA_BUCKET_REMOTE;

function TableRows({rowsData, deleteTableRows, handleChange, handleChangeImage}) {
    return(
        
        rowsData.map((data, index)=>{
            const {image_data, image_description }= data;
            let link = `${BASE_URL_REMOTE}/`+ rowsData[index]["image_data"]
            return(
                <tr key={index}>
                <td><input type="file" multiple onChange={(evnt)=>(handleChangeImage(index, evnt))} /> </td>
                <td><a href={`${BASE_URL_REMOTE}/${rowsData[index]["image_data"]}`} alt={link} target="_blank">{rowsData[index]["image_data"]}</a> </td>
                <td><input type="text" value={image_description}  onChange={(evnt)=>(handleChange(index, evnt))} name="image_description" className="form-control"/> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;