import path from 'path';
import fs from 'fs/promises';
import {colorForText} from "./messageColors.js";

export async function addFile(fileName) {
    const filePath = path.resolve(process.cwd(), fileName);

    try {
        await fs.writeFile(filePath, '', { flag: 'w' });
        console.log(colorForText.Green, `File ${fileName} created successfully.`);
    } catch (error) {
        console.log(colorForText.Red, 'Operation failed: Unable to create file', error.message);
    }
}