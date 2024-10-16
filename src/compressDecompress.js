import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { colorForText } from "./messageColors.js";

export async function compressFile(sourceFilePath, destinationPath) {
    const input = createReadStream(sourceFilePath);
    const output = createWriteStream(destinationPath);
    const brotliCompress = createBrotliCompress();

    input.pipe(brotliCompress).pipe(output);

    output.on('finish', () => {
        console.log(colorForText.Green, `File compressed successfully to ${destinationPath}`);
    });

    input.on('error', (error) => {
        console.log(colorForText.Red, 'Operation failed: Unable to read the file', error.message);
    });

    output.on('error', (error) => {
        console.log(colorForText.Red, 'Operation failed: Unable to write to the destination', error.message);
    });
}

export async function decompressFile(sourceFilePath, destinationPath) {
    const input = createReadStream(sourceFilePath);
    const output = createWriteStream(destinationPath);
    const brotliDecompress = createBrotliDecompress();

    input.pipe(brotliDecompress).pipe(output);

    output.on('finish', () => {
        console.log(colorForText.Green, `File decompressed successfully to ${destinationPath}`);
    });

    input.on('error', (error) => {
        console.log(colorForText.Red, 'Operation failed: Unable to read the file', error.message);
    });

    output.on('error', (error) => {
        console.log(colorForText.Red, 'Operation failed: Unable to write to the destination', error.message);
    });
}
