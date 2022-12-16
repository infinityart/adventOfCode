import {newLine} from "../../util/regexes.ts";

function convertToPriority(sharedItem: string) {
    const isUppercase = sharedItem === sharedItem.toUpperCase();
    const basePriority = (isUppercase ? ("A".charCodeAt(0) - 26) : "a".charCodeAt(0)) - 1;

    return sharedItem.charCodeAt(0) - basePriority;
}

function findSharedItem(needle: string, haystack: string[]) {
    for (const item of needle) {
        const matches = haystack.map(rucksack => rucksack.match(item));
        const found = matches.every(match => match !== null);

        if (found) {
            return matches[0][0]
        }
    }
}

interface IterateRucksacks {
    input: string,
    jump: number,
    separator: (rucksacks: string, idx: number) => [string, string[]]
}

function iterateRucksacks(input, jump, separator: IterateRucksacks) {
    const rucksacks = input.trim().split(newLine);

    let priorityCount = 0;
    for (let i = 0; i < rucksacks.length; i += jump) {
        priorityCount += convertToPriority(findSharedItem(...separator(rucksacks, i)))
    }

    return priorityCount;
}

export function part1(input: string) {
    function splitCompartments(rucksack: string) {
        const middleIdx = rucksack.length / 2;
        const firstCompartment = rucksack.slice(0, middleIdx);
        const secondCompartment = rucksack.slice(middleIdx);

        return [firstCompartment, [secondCompartment]]
    }

    return iterateRucksacks(input, 1, (rucksacks, idx) => {
        return splitCompartments(rucksacks[idx])
    })
}

export function part2(input: string) {
    return iterateRucksacks(input, 3, (rucksacks, idx) => {
        return [rucksacks[idx], [rucksacks[idx + 1], rucksacks[idx + 2]]]
    })
}