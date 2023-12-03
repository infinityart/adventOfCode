import {newLine} from "../../util/regexes.ts";

type NumberPosition = {
    number: number,
    startIndex: number,
    endIndex: number,
    isIncluded: boolean,
}

type NumberPositionCollection = Map<number, NumberPosition[]>;

type SymbolPosition = {
    symbol: string,
    xIndex: number,
    yIndex: number
}

export function part1(input: string) {
    const [numberPositions, symbolPositions] = parsePositions(input);

    return symbolPositions.reduce((numberSum, symbolPosition) => {
        const numbers = findNumbers(numberPositions, symbolPosition);

        return numbers.reduce((a, b) => a + b, numberSum)
    }, 0)
}

export function part2(input: string) {
    const [numberPositions, symbolPositions] = parsePositions(input);

    return symbolPositions.reduce((numberSum, symbolPosition) => {
        if (symbolPosition.symbol !== "*") return numberSum;

        const numbers = findNumbers(numberPositions, symbolPosition);

        if (numbers.length !== 2) return numberSum;

        return numberSum + numbers[0] * numbers[1];
    }, 0)
}

function findNumbers(
    numberPositions: NumberPositionCollection,
    {
        xIndex,
        yIndex
    }: SymbolPosition
) {
    const findByPosition = (x, y) => {
        const yNumberPositions = numberPositions.get(y);

        const numberPosition = yNumberPositions.find(({startIndex, endIndex}) => {
            return startIndex <= x && endIndex >= x
        });

        if (!numberPosition || numberPosition.isIncluded) return;

        numberPosition.isIncluded = true;

        return numberPosition.number
    };

    const numbers = [
        findByPosition(xIndex, yIndex - 1),
        findByPosition(xIndex + 1, yIndex - 1),
        findByPosition(xIndex + 1, yIndex),
        findByPosition(xIndex + 1, yIndex + 1),
        findByPosition(xIndex, yIndex + 1),
        findByPosition(xIndex - 1, yIndex + 1),
        findByPosition(xIndex - 1, yIndex),
        findByPosition(xIndex - 1, yIndex - 1),
    ];

    return numbers.filter(Number);
}

function parsePositions(input: string): [Map<number, NumberPosition[]>, SymbolPosition[]] {
    const numberPositions: NumberPositionCollection = new Map();
    const symbolPositions: SymbolPosition[] = [];

    input.split(newLine).forEach((line, index) => {
        if (!numberPositions.has(index)) {
            numberPositions.set(index, [])
        }

        const numberPosition = numberPositions.get(index);

        // Matches groups of digits or non-space, non-digit, non-dot characters globally
        const matches = line.matchAll(/\d+|[^.\d\s]/g);

        for (const matchList of matches) {
            const match = matchList[0];
            const isNumeric = !isNaN(Number(match));

            if (isNumeric) {
                numberPosition.push({
                    number: Number(match),
                    startIndex: matchList.index,
                    endIndex: matchList.index + match.length - 1,
                    isIncluded: false
                });

                continue;
            }

            symbolPositions.push({
                xIndex: matchList.index,
                yIndex: index,
                symbol: match
            })
        }
    });

    return [numberPositions, symbolPositions]
}
