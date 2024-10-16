import os from 'node:os';
import { colorForText } from "./messageColors.js";

export function printEOL() {
    console.log(colorForText.Cyan, `System End-Of-Line (EOL) marker: ${JSON.stringify(os.EOL)}`);
}

export function printCPUs() {
    const cpus = os.cpus();
    console.log(colorForText.Cyan, `Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(colorForText.Cyan, `CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
    });
}

export function printHomeDirectory() {
    console.log(colorForText.Cyan, `Home directory: ${os.homedir()}`);
}

export function printSystemUsername() {
    console.log(colorForText.Cyan, `System username: ${os.userInfo().username}`);
}

export function printCPUArchitecture() {
    console.log(colorForText.Cyan, `CPU Architecture: ${os.arch()}`);
}
