import {newLine} from "../../util/regexes.ts";

console.log(part1(await Bun.file("./input.txt").text()))
console.log(part2(await Bun.file("./input.txt").text()))


type Match = {
    text: string;
    index: number;
}

export function part1(input: string) {
    const calibrationValues = input.split(newLine).map(findOuterDigits);

    return calibrationValues.reduce((a, b) => a + b);
}


export function part2(input: string) {
    const calibrationValues = input.split(newLine).map((line => parseDigitWords(line)));

    return calibrationValues.reduce((a, b) => a + b);
}

function findOuterDigits(line: string) {
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
}

function parseDigitWords(line: string) {
    const mapping = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    };

    const words = Object.keys(mapping);
    const digits = Object.values(mapping);

    let lowestMatch: Match;
    let highestMatch: Match;

    [...words, ...digits].forEach(input => {
        const wordMatches = line.matchAll(new RegExp(input, "g"));

        for (const match of wordMatches) {
            if (!lowestMatch || lowestMatch.index > match.index) {
                lowestMatch = {
                    text: input,
                    index: match.index
                }
            }

            if (!highestMatch || highestMatch.index < match.index) {
                highestMatch = {
                    text: input,
                    index: match.index
                }
            }
        }
    });

    const toDigit = (text: string) => text.match(/\d/) ? text : mapping[text];

    return parseInt(toDigit(lowestMatch.text) + toDigit(highestMatch.text));
}