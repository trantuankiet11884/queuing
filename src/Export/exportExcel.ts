import ExcelJS from 'exceljs'
import {saveAs} from 'file-saver'
import { NumberType } from '../interface';
export const exportToExcel = async (data: any, filename: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.values = [
        "Số thứ tự",
        "Tên dịch vụ",
        "Thời gian cấp",
        "Tình trạng",
        "Nguồn cấp",
    ];

    worksheet.getColumn("A").width = 15;
    worksheet.getColumn("B").width = 25;
    worksheet.getColumn("C").width = 25;
    worksheet.getColumn("D").width = 20;
    worksheet.getColumn("E").width = 20;
    

    for (let i = 0; i < data.length; i++) {
        const rowData: NumberType = data[i];
        const row = worksheet.getRow(i + 2);

        row.getCell(1).value = rowData.stt;
        row.getCell(2).value = rowData.serviceName;
        row.getCell(3).value = rowData.fromDate;
        row.getCell(4).value = rowData.status;
        row.getCell(5).value = rowData.supply;
       
    }

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber % 2 === 0) {
            row.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "EFEFEF" },
            };
        }
    });

    try {
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${filename}.xlsx`);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
    }
};