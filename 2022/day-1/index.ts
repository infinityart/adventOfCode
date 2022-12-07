import {emptyLine, newLine} from "../../util/regexes.ts";

export function part1(input: string) {
    const countTotalCalories = (a, b) => parseInt(a) + parseInt(b);

    const caloriePerElfList = input.split(emptyLine);

    const caloriesPerElf = caloriePerElfList.map(caloriePerElf => {
        return caloriePerElf
            .split(newLine)
            .reduce(countTotalCalories, 0)
    });

    return Math.max(...caloriesPerElf)
}