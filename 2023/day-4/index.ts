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

export function part2(input: string) {
    const cardInstances = new Map<number, number>();

    input.split(newLine).forEach((scratchCard) => {
        const [left, right] = scratchCard.split("|");
        const [cardLeft, cardRight] = left.split(":");
        const cardNumber = parseInt(cardLeft.match(/\d+/)?.[0]);
        const winningNumberOptions = cardRight.trim().split(/\s+/g);
        const ownedNumbers = right.trim().split(/\s+/g);

        const winningNumbers = ownedNumbers.filter(ownedNumber => winningNumberOptions.includes(ownedNumber));

        if (!cardInstances.has(cardNumber)) {
            cardInstances.set(cardNumber, 0)
        }

        const playCount = cardInstances.get(cardNumber) + 1;

        cardInstances.set(cardNumber, playCount);

        for (const index in winningNumbers) {
            const key = cardNumber + parseInt(index) + 1;

            if (!cardInstances.has(key)) {
                cardInstances.set(key, 0)
            }

            cardInstances.set(key, cardInstances.get(key) + playCount)
        }
    });

    return [...cardInstances.values()].reduce((a, b) => a + b);
}
