import fs from 'node:fs/promises';

export async function listDirectoryContents() {
    try {
        const items = await fs.readdir(process.cwd(), { withFileTypes: true });
        const directories = [];
        const files = [];

        for (const item of items) {
            if (item.isDirectory()) {
                directories.push(`${item.name}/`);
            } else if (item.isFile()) {
                files.push(item.name);
            }
        }

        directories.sort();
        files.sort();

        console.log('Directories:');
        directories.forEach(dir => console.log(`   ${dir}`));

        console.log('Files:');
        files.forEach(file => console.log(`   ${file}`));

    } catch (error) {
        console.log(error.message);
        console.log('Operation failed: Unable to read directory');
    }
}