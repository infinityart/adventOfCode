import {newLine} from "../../util/regexes.ts";

console.log(part1(await Bun.file("./input.txt").text()))

export function part1(input: string) {
    const calibrationValues = input.split(newLine).map(line => {
        let firstDigit: string;
        let lastDigit: string;

        for (let i = 0; i <= line.length - 1; i++) {
            if (line[i].match(/\d/)) {
                firstDigit = line[i];
                break;
            }
        }

        for (let i = line.length - 1; i >= 0; i--) {
            if (line[i].match(/\d/)) {
                lastDigit = line[i];
                break;
            }
        }

        return parseInt(firstDigit + lastDigit)
    });

    return calibrationValues.reduce((a, b) => a + b);
}


