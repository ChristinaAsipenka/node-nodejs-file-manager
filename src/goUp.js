import path from "path";
import { changeDirectory } from "./cd.js";

export async function goUp() {
    const currentDir = process.cwd();
    const parentDir = path.resolve(currentDir, '..');
    const rootDir = path.parse(currentDir).root;

    if (currentDir === rootDir) {
        console.log("Operation failed: You can't go above the root directory");
    } else {
        await changeDirectory('..');
    }
}