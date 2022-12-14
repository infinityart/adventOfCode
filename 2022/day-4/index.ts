import {newLine} from "../../util/regexes.ts";

export function part1(input: string) {
    const pairsList = input.split(newLine);

    let containCount = 0;
    for (const pairs of pairsList) {
        const [firstPairLeft, firstPairRight, secondPairLeft, secondPairRight] = pairs.split(/[,-]/).map(part => parseInt(part));

        const firstPairContainsSecond = firstPairLeft <= secondPairLeft && firstPairRight >= secondPairRight;
        const secondPairContainFirst = firstPairLeft >= secondPairLeft && firstPairRight <= secondPairRight;

        if (!firstPairContainsSecond && !secondPairContainFirst) continue;

        containCount++;
    }

    return containCount;
}

export function part2(input: string){
    const pairsList = input.split(newLine);

    let overlapCount = 0;
    for (const pairs of pairsList) {
        const [firstPairLeft, firstPairRight, secondPairLeft, secondPairRight] = pairs.split(/[,-]/).map(part => parseInt(part));

        const firstPairLowerThanSecondPair = firstPairRight < secondPairLeft;
        const firstPairHigherThanSecondPair = firstPairLeft > secondPairRight;

        if (firstPairLowerThanSecondPair || firstPairHigherThanSecondPair) continue;

        overlapCount++;
    }

    return overlapCount;
}