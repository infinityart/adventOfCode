import {emptyLine, newLine} from "../../util/regexes.ts";

function sanitizeStartingStacks(startingStacksText: string) {
    const matchBrackets = /[\[\]]/g;
    const matchFourSpacesOrOneSpace = /\s{4}|\s{1}/;

    const startingStacksRows = startingStacksText
        .replaceAll(matchBrackets, "")
        .split(newLine)
        .map(rows => rows.split(matchFourSpacesOrOneSpace));

    startingStacksRows.pop();

    return startingStacksRows;
}

function convertToColumns(stackRows: string[]): string[] {
    const stackColumns = [];
    for (let idx = stackRows.length - 1; idx >= 0; idx--) {
        stackRows[idx].forEach((crate, crateIdx) => {
            if (crate === "") return;

            if (stackColumns[crateIdx] === undefined) {
                stackColumns[crateIdx] = "";
            }

            stackColumns[crateIdx] += crate;
        })
    }

    return stackColumns;
}

function sanitizeInstructions(instructionsText: string) {
    const matchIntegers = /\d+/g;

    return instructionsText
        .trim()
        .split(newLine)
        .map(instruction => {
            const [move, from, to] = instruction.match(matchIntegers).map(val => parseInt(val));

            return [move, from - 1, to - 1];
        });
}

function moveCrates(stacks: string[], instructions: [number, number, number][], canMoveMultiple: boolean) {
    const reverseString = (str: string) => str.split("").reverse().join("");
    const moveSingle = (crates: string) => reverseString(crates);
    const moveMultiple = (crates: string) => crates;
    const useCrane = canMoveMultiple ? moveMultiple : moveSingle;

    instructions.forEach(([move, fromIdx, toIdx]) => {
        const fromStack = stacks[fromIdx];

        stacks[fromIdx] = fromStack.slice(0, -move);
        stacks[toIdx] += useCrane(fromStack.slice(-move));
    });
}

function startCrane(input: string, canMoveMultiple = false) {
    const [startingStacksText, instructionsText] = input.split(emptyLine);
    const stacks = convertToColumns(sanitizeStartingStacks(startingStacksText));
    const instructions = sanitizeInstructions(instructionsText);

    moveCrates(stacks, instructions, canMoveMultiple);

    return stacks.reduce((sequence, stack) => sequence += stack.slice(-1), "");
}

export function part1(input: string) {
    return startCrane(input);
}

export function part2(input: string) {
    return startCrane(input, true);
}