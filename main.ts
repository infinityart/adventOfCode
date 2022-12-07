const [year, day, part] = Deno.args;

const modulePath = `./${year}/day-${day}`;
const inputPath = `${modulePath}/part-1-input.txt`;

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