import {expect, test} from "bun:test";
import {part1, part2} from "./index.ts";

const exampleText = "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598..";

test("2023 day-3 part-1 example", () => {
    expect(part1(exampleText)).toBe(4361)
});

test("2023 day-3 part-2 example", () => {
    expect(part2(exampleText)).toBe(467835)
});
