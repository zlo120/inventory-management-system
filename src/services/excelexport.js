import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ExcelExport = async (spreadhSheetData) => {
    const originalDate = spreadhSheetData[0].date;
    const fileName = originalDate.replace(/\//g, '-');

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(spreadhSheetData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export default ExcelExport;