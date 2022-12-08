import {newLine, space} from "../../util/regexes.ts";

enum shapes {
    "rock" = 1,
    "paper",
    "scissor",
}

type EncryptedShapes = typeof encryptedShapes;
type KeyofEncryptedShapes = keyof EncryptedShapes;

enum encryptedShapes {
    "A" = shapes.rock,
    "B" = shapes.paper,
    "C" = shapes.scissor,
    "X" = shapes.rock,
    "Y" = shapes.paper,
    "Z" = shapes.scissor,
}

function decideRoundOutcome(opponent: EncryptedShapes, player: EncryptedShapes) {
    const usedScissorAndRock = [shapes.scissor, shapes.rock].every(usedShape => [opponent, player].includes(usedShape));

    if (usedScissorAndRock) {
        if (player === shapes.rock) return 6;

        return 0;
    }

    const outcome = player - opponent;

    if (outcome === 0) return 3;
    if (outcome > 0) return 6;
    if (outcome < 0) return 0;
}

function decidePoints(opponentShape: KeyofEncryptedShapes, playerShape: KeyofEncryptedShapes) {
    const opponent = encryptedShapes[opponentShape];
    const player = encryptedShapes[playerShape];

    return decideRoundOutcome(opponent, player) + player
}

export function part1(input: string) {
    const sumPoints = (a: number, b: number) => a + b;
    const rounds = input.split(newLine);
    
    return rounds
        .map(round => decidePoints(...round.split(space)))
        .reduce(sumPoints, 0);
}