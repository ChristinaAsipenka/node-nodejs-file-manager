import fs from 'node:fs/promises';

export async function listDirectoryContents() {
    try {
        const items = await fs.readdir(process.cwd(), { withFileTypes: true });
        const content = [];

        for (const item of items) {
            if (item.isDirectory()) {
                content.push({ name: item.name, type: 'directory' });
            } else if (item.isFile()) {
                content.push({ name: item.name, type: 'file' });
            }
        }
        
        content.sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name);
            }
            return a.type === 'directory' ? -1 : 1;
        });

        console.log('Index | Name                | Type');
        console.log('-----------------------------------');

        content.forEach((item, index) => {
            console.log(`${index + 1}     | ${item.name.padEnd(20)} | ${item.type}`);
        });

    } catch (error) {
        console.log('Operation failed: Unable to read directory', error.message);
    }
}
