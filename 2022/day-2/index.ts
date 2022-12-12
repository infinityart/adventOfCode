import {newLine, space} from "../../util/regexes.ts";

enum Shapes {
    "ROCK" = 1,
    "PAPER",
    "SCISSOR",
}

type KeyofEncryptedShapes = keyof EncryptedShapes;

enum EncryptedShapes {
    "A" = Shapes.ROCK,
    "B" = Shapes.PAPER,
    "C" = Shapes.SCISSOR,
    "X" = Shapes.ROCK,
    "Y" = Shapes.PAPER,
    "Z" = Shapes.SCISSOR,
}

enum RoundOutcomes {
    "WIN" = 6,
    "LOSE" = 0,
    "DRAW" = 3
}

enum RoundOutcomesEncrypted {
    "X" = RoundOutcomes.LOSE,
    "Y" = RoundOutcomes.DRAW,
    "Z" = RoundOutcomes.WIN,
}

const sumPoints = (a: number, b: number) => a + b;
const getRounds = (input: string) => input.split(newLine);

function decideRoundOutcome(opponent: EncryptedShapes, player: EncryptedShapes) {
    const isScissorAndRock = [Shapes.SCISSOR, Shapes.ROCK].every(usedShape => [opponent, player].includes(usedShape));

    if (isScissorAndRock) {
        if (player === Shapes.ROCK) return RoundOutcomes.WIN;

        return RoundOutcomes.LOSE;
    }

    const outcome = player - opponent;

    if (outcome === 0) return RoundOutcomes.DRAW;
    if (outcome > 0) return RoundOutcomes.WIN;
    if (outcome < 0) return RoundOutcomes.LOSE;
}

function decidePointsPart1(opponentShape: KeyofEncryptedShapes, playerShape: KeyofEncryptedShapes) {
    const opponent = EncryptedShapes[opponentShape];
    const player = EncryptedShapes[playerShape];

    return decideRoundOutcome(opponent, player) + player
}

function decidePlayerShape(outcome: RoundOutcomes, opponentShape: Shapes) {
    if (outcome === RoundOutcomes.DRAW) return opponentShape;

    if (opponentShape === Shapes.SCISSOR && outcome === RoundOutcomes.WIN) {
        return Shapes.ROCK;
    }

    if (opponentShape === Shapes.ROCK && outcome === RoundOutcomes.LOSE) {
        return Shapes.SCISSOR
    }

    if (outcome === RoundOutcomes.WIN) return opponentShape + 1;
    if (outcome === RoundOutcomes.LOSE) return opponentShape - 1;
}

function decidePointsPart2(opponentShape: KeyofEncryptedShapes, playerShape: KeyofEncryptedShapes) {
    const opponent = EncryptedShapes[opponentShape];
    const outcome = RoundOutcomesEncrypted[playerShape];

    return decidePlayerShape(outcome, opponent) + outcome;
}

export function part1(input: string) {
    return getRounds(input)
        .map(round => decidePointsPart1(...round.split(space)))
        .reduce(sumPoints, 0);
}

export function part2(input: string) {
    return getRounds(input)
        .map(round => decidePointsPart2(...round.split(space)))
        .reduce(sumPoints, 0);
}