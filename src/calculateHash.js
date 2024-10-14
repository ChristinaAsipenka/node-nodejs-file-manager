import crypto from 'node:crypto';
import fs from 'node:fs';
import { colorForText } from "./messageColors.js";

export async function calculateHash(filePath) {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('readable', () => {
        const data = input.read();
        if (data) {
            hash.update(data);
        } else {
            console.log(colorForText.Cyan, `Hash: ${hash.digest('hex')}`);
        }
    });

    input.on('error', (error) => {
        console.log(colorForText.Red, 'Operation failed: Unable to read the file', error.message);
    });
}
