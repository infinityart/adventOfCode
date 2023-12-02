import {expect, test} from "bun:test";
import {part1} from "./index.ts";

const exampleText = "1abc2\n" +
    "pqr3stu8vwx\n" +
    "a1b2c3d4e5f\n" +
    "treb7uchet";

test("day 1 part 1 example", () => {
    const calibrationSum = part1(exampleText);

    expect(calibrationSum).toBe(142)
});