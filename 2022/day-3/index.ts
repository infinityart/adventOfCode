import {newLine} from "../../util/regexes.ts";

export function part1(input: string) {
    const sumPriority = (a, b) => a + b;

    function findSharedItem(rucksack: string) {
        const middleIdx = rucksack.length / 2;
        const firstCompartment = rucksack.slice(0, middleIdx);
        const secondCompartment = rucksack.slice(middleIdx, -1);

        let sharedItem: [string];
        for (const item of firstCompartment) {
            sharedItem = secondCompartment.match(new RegExp(item));

            if (sharedItem !== null) break;
        }

        return sharedItem[0]
    }

    function convertToPriority(sharedItem: string) {
        const isUppercase = sharedItem === sharedItem.toUpperCase();
        const basePriority = (isUppercase ? ("A".charCodeAt(0) - 26) : "a".charCodeAt(0)) - 1;

        return sharedItem.charCodeAt(0) - basePriority;
    }

    const rucksacks = input.split(newLine);

    return rucksacks
        .map(rucksack => convertToPriority(findSharedItem(rucksack)))
        .reduce(sumPriority, 0)
}