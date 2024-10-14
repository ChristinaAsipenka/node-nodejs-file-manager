import fs from 'fs/promises';
import path from 'path';
import {colorForText} from "./messageColors.js";

export async function deleteFile(filePath) {
    const absoluteFilePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

    try {
        await fs.access(absoluteFilePath);
        await fs.unlink(absoluteFilePath); // Deleting the file
        console.log(colorForText.Green, `File deleted successfully: ${absoluteFilePath}`);
    } catch (error) {
        console.log(colorForText.Red, 'Operation failed: Unable to delete the file', error.message);
    }
}
