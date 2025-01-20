import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();
export function actionToUpdateImageAnnotatorJsonFile(fileName,payload){
    let jsonObjectName = `${fileName}.txt`;
    const filePath = path.join(`${__dirname}/public_data/${jsonObjectName}`);
    if (fs.existsSync(filePath)) {
        // Write the updated JSON back to the file
        fs.writeFile(filePath, payload.fabricCanvasJson, (writeErr) => {
            if (writeErr) {
                console.error('Error writing to the file:', writeErr);
            } else {
                console.log('File updated successfully:', filePath);
            }
        });
    }
}