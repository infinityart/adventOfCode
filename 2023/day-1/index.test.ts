import {expect, test} from "bun:test";
import {part1, part2} from "./index.ts";


test("2023 day-1 part-1 example", () => {
    const exampleText = "1abc2\n" +
        "pqr3stu8vwx\n" +
        "a1b2c3d4e5f\n" +
        "treb7uchet";

    const calibrationSum = part1(exampleText);

    expect(calibrationSum).toBe(142)
});


test("2023 day-1 part-2 example", () => {
    const exampleText = "two1nine\n" +
        "eightwothree\n" +
        "abcone2threexyz\n" +
        "xtwone3four\n" +
        "4nineeightseven2\n" +
        "zoneight234\n" +
        "7pqrstsixteen";

    const calibrationSum = part2(exampleText);

    expect(calibrationSum).toBe(281)
});