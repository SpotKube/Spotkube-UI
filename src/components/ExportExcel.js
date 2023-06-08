import XLSX from "sheetjs-style";
import { Button, Tooltip } from "@mui/material";

const ExportExcel = async ({ data, mergedCells, fileName }) => {
  // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UFT-8';
  // const fileExtension = '.xlsx';

  // const exportToExcel = async () => {
  //     const ws = XLSX.utils.json_to_sheet(data);
  //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //     const excelBuffer = XLSX.write(wb, { bookType: fileExtension, type: 'array' });
  //     const data = new Blob([excelBuffer], { type: fileType });
  //     FileSaver.saveAs(data, fileName+fileExtension);
  // }

  /*
    [{
        0: 0,
        1: 1,
        2: 2
        }], {
        header: ['0', '1', '2'],
        }
    */
  console.log(mergedCells);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  const merge = mergedCells;
  ws["!merges"] = merge;

  XLSX.utils.book_append_sheet(wb, ws, "sheet1"); // add worksheet to workbook

  XLSX.writeFile(wb, `${fileName}.xlsx`); // write workbook

  // return(
  //     <>
  //         <Tooltip title='Excel Export'>
  //             <Button
  //                 variant='contained'
  //                 onClick={(e) => exportToExcel()}
  //                 color='primary'
  //             >
  //                 Excel Export
  //             </Button>
  //         </Tooltip>
  //     </>
  // )
};

export default ExportExcel;
