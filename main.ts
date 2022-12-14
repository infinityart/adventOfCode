import {parse} from "https://deno.land/std@0.166.0/flags/mod.ts";

const {_: [year, day, part], test} = parse(Deno.args, {
    boolean: ["test"]
});

const modulePath = `./${year}/day-${day}`;
const inputType = test ? "test" : "input";
const inputPath = `${modulePath}/${inputType}.txt`;

const dayModule = await import(`${modulePath}/index.ts`);

const input = Deno.readTextFileSync(inputPath).trim();

const start = performance.now();

const output = dayModule[`part${part}`](input);

const end = performance.now();

console.log(`Year: ${year}
Day: ${day}
Part: ${part}
Time: ${end - start}ms
Output: %c${output}
`, "color: green");