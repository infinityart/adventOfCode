import {newLine} from "../../util/regexes.ts";

export function part1(input: string) {
    return input.split(newLine).reduce((totalPoints, scratchCard) => {
        const [left, right] = scratchCard.split("|");
        const [, cardRight] = left.split(":");
        const winningNumberOptions = cardRight.trim().split(/\s+/g);
        const ownedNumbers = right.trim().split(/\s+/g);

        const winningNumbers = ownedNumbers.filter(ownedNumber => winningNumberOptions.includes(ownedNumber));

        if (winningNumbers.length === 0) return totalPoints;

        let points = 1;
        for (let i = 1; i < winningNumbers.length; i++) {
            points = points * 2
        }

        return totalPoints + points;
    }, 0)
}
