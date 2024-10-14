import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs/promises';
import {colorForText} from "./messageColors.js";

export async function moveFile(sourceFilePath, destinationDirectory) {
    const absoluteSourcePath = path.isAbsolute(sourceFilePath) ? sourceFilePath : path.resolve(process.cwd(), sourceFilePath);
    const fileName = path.basename(absoluteSourcePath);
    const destinationPath = path.resolve(destinationDirectory, fileName);

    try {
        await fs.access(absoluteSourcePath);
        await fs.access(destinationDirectory);

        const readStream = createReadStream(absoluteSourcePath);
        const writeStream = createWriteStream(destinationPath);

        readStream.pipe(writeStream);

        readStream.on('error', (error) => {
            console.log(colorForText.Red, 'Operation failed: Unable to read the file', error.message);
        });

        writeStream.on('error', (error) => {
            console.log(colorForText.Red, 'Operation failed: Unable to write to the destination', error.message);
        });

        writeStream.on('finish', async () => {
            try {
                await fs.unlink(absoluteSourcePath);
                console.log(colorForText.Green, `File moved successfully to ${destinationPath}`);
            } catch (error) {
                console.log(colorForText.Red, 'Operation failed: Unable to delete original file', error.message);
            }
        });
    } catch (error) {
        console.log(colorForText.Red, 'Operation failed: Invalid file or directory', error.message);
    }
}
