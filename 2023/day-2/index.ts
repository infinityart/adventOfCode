import {newLine, space} from "../../util/regexes.ts";

export function part1(input: string) {
    const maxCubes = {
        red: 12,
        green: 13,
        blue: 14
    };

    return input.split(newLine).reduce((gameIdSum, line) => {
        const [game, combinedSets] = line.split(":");
        const [, gameId] = game.split(space);
        const sets = combinedSets.split(";");

        const isPossible = sets.every(set => {
            const cubes = set.trim().split(",");

            return cubes.every(cube => {
                const [cubeCount, cubeColour] = cube.trim().split(space);

                return parseInt(cubeCount) <= maxCubes[cubeColour]
            })
        });

        if (!isPossible) return gameIdSum;

        return gameIdSum + parseInt(gameId)
    }, 0);
}

export function part2(input: string) {
    return input.split(newLine).reduce((setsSum, line) => {
        const [, combinedSets] = line.split(":");
        const sets = combinedSets.split(";");

        const highestCubes = {
            green: null,
            red: null,
            blue: null
        };

        sets.forEach(set => {
            const cubes = set.trim().split(",");

            return cubes.forEach(cube => {
                const [cubeCount, cubeColour] = cube.trim().split(space);

                if (highestCubes[cubeColour] === null || highestCubes[cubeColour] < cubeCount) {
                    highestCubes[cubeColour] = parseInt(cubeCount)
                }
            })
        });

        const {green, red, blue} = highestCubes;

        return setsSum + (green * red * blue)
    }, 0);
}