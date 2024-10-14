import path from "node:path";
import { promises as fs } from "node:fs";
import { colorForText } from "./messageColors.js";

export async function changeDirectory(dir) {
    try {
        const newPath = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
        const rootPath = path.parse(newPath).root;
        if (newPath.startsWith(rootPath)) {
            await fs.access(newPath);
            process.chdir(newPath);
        } else {
            console.log(colorForText.Red, "Operation failed: You can't go above the root directory");
        }
    } catch (error) {
        console.log(colorForText.Red, 'Operation failed: Invalid path or directory');
    }
}