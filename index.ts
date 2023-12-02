import parseArgs from "minimist"
import clc from "cli-color"

const {
    y: year = new Date().getFullYear(),
    d: day = 1,
    p: part = 1
} = parseArgs(Bun.argv);

const modulePath = `./${year}/day-${day}`;
const inputPath = `${modulePath}/input.txt`;

const dayModule = await import(`${modulePath}/index.ts`);
const input = await Bun.file(inputPath).text();

const start = performance.now();

const output = dayModule[`part${part}`](input);

const end = performance.now();

console.log(`Year: ${year}
Day: ${day}
Part: ${part}
Time: ${end - start}ms
Output: ${clc.green(output)}`);

