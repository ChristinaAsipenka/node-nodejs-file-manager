import readline from 'readline';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import { colorForText } from "./messageColors.js";
import { catFile } from './catFile.js'

import { changeDirectory } from './cd.js';
import { goUp } from './goUp.js';
import { listDirectoryContents } from './listDirectory.js';
import { addFile } from './addFile.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { deleteFile } from './deleteFile.js';

const args = process.argv.slice(2);
let username = 'Anonymous';

args.forEach(arg => {
    if (arg.startsWith('--username=')) {
        username = arg.split('=')[1];
    }
});

async function greetUser() {
    console.log(`Welcome to the File Manager, ${username}!`);
}
// END script
async function exitProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}

async function printWorkingDirectory() {
    console.log(`You are currently in ${process.cwd()}`);
}

async function setHomeDirectory() {
    const homeDir = os.homedir();
    process.chdir(homeDir);
}

// MAIN
async function main() {
    await setHomeDirectory();
    await greetUser();
    await printWorkingDirectory();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    rl.prompt();

    rl.on('line', async (input) => {
        const [command, ...args] = input.trim().split(' ');

        switch (command) {
            case '.exit':
                await exitProgram();
                break;

            case 'cd':
                if (args.length === 1) {
                    await changeDirectory(args[0]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: cd requires a path argument');
                }
                break;

            case 'up':
                await goUp();
                break;

            case 'ls':
                await listDirectoryContents();
                break;

            case 'cat':
                if (args.length === 1) {
                    await catFile(args[0]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: cat requires a file path argument');
                }
                break;

            case 'add':
                if (args.length === 1) {
                    await addFile(args[0]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: add requires a file name argument');
                }
                break;

            case 'rn':
                if (args.length === 2) {
                    await renameFile(args[0], args[1]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: rn requires a source file path and a new file name');
                }
                break;
            case 'cp':
                if (args.length === 2) {
                    await copyFile(args[0], args[1]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: cp requires a source file path and a destination directory');
                }
                break;
            case 'mv':
                if (args.length === 2) {
                    await moveFile(args[0], args[1]);
                } else {
                    console.log(colorForText.Red, 'Invalid input: mv requires a source file path and a destination directory');
                }
                break;
            case 'rm':
                if (args.length === 1) {
                    await deleteFile(args[0]); // Deleting the file
                } else {
                    console.log(colorForText.Red, 'Invalid input: rm requires a file path');
                }
                break;

            default:
                console.log(colorForText.Red, 'Invalid input: Unknown command');
        }
        await printWorkingDirectory();
        rl.prompt(); // Ожидание следующей команды
    });

    // Finish Ctrl + C
    process.on('SIGINT', async () => {
        await exitProgram();
    });
}

// Запуск программы
main().catch(err => console.error('Operation failed:', err));
