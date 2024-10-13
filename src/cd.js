import path from "path";
import {promises as fs} from "fs";

export async function changeDirectory(dir) {
    try {
        const newPath = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);

        const rootPath = path.parse(newPath).root;
        if (newPath.startsWith(rootPath)) {
            await fs.access(newPath);
            process.chdir(newPath);
        } else {
            console.log("Operation failed: You can't go above the root directory");
        }
    } catch (error) {
        console.log('Operation failed: Invalid path or directory');
    }
}