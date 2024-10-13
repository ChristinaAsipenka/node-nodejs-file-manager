import path from 'path';
import { createReadStream } from 'fs';

export async function catFile(filePath) {
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

    try {
        const readStream = createReadStream(absolutePath);

        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        readStream.on('error', (error) => {
            console.log('Operation failed: Unable to read file', error.message);
        });

        readStream.on('end', () => {
            console.log();
        });
    } catch (error) {
        console.log('Operation failed: Invalid path or file', error.message);
    }
}