import {emptyLine, newLine} from "../../util/regexes.ts";

function getCaloriesPerElf(input: string) {
    const countTotalCalories = (a, b) => parseInt(a) + parseInt(b);

    const caloriePerElfList = input.split(emptyLine);

    return caloriePerElfList.map(caloriePerElf => {
        return caloriePerElf
            .split(newLine)
            .reduce(countTotalCalories, 0)
    });
}

export function part1(input: string) {
    return Math.max(...getCaloriesPerElf(input))
}

export function part2(input: string) {
    const sortDescending = (a: number, b: number) => b - a;

    const [highest, secondHighest, thirdHighest] = getCaloriesPerElf(input).sort(sortDescending);

    return highest + secondHighest + thirdHighest;
}