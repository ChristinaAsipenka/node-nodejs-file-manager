import fs from 'node:fs/promises';
import path from 'node:path';
import { colorForText } from "./messageColors.js";

export async function renameFile(oldFilePath, newFileName) {
    const absoluteOldPath = path.isAbsolute(oldFilePath) ? oldFilePath : path.resolve(process.cwd(), oldFilePath);
    const newFilePath = path.resolve(path.dirname(absoluteOldPath), newFileName);

    try {
        await fs.rename(absoluteOldPath, newFilePath);
        console.log(colorForText.Green, `File renamed successfully to ${newFileName}.`);
    } catch (error) {
        console.log(colorForText.Red, 'Operation failed: Unable to rename file', error.message);
    }
}