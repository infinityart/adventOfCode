<?php
/**
 * @author: Jonty Sponselee <jsponselee@student.scalda.nl>
 * @since: 2-12-2019
 */

// Part 1
$instructions = explode(',',file('input.txt')[0]);
$instructions[1] = 12;
$instructions[2] = 2;
$pointer = 0;

while(true) {
    $opcode = (int)$instructions[$pointer];

    if($opcode === 99) break;

    $operation = [1 => '+', 2 => '*'][$opcode];
    $inputOne = (int)$instructions[$instructions[$pointer + 1]];
    $inputTwo = (int)$instructions[$instructions[$pointer + 2]];

    $intcode = eval("return {$inputOne} $operation {$inputTwo};");

    $instructions[$instructions[$pointer + 3]] = $intcode;

    $pointer += 4;
}

echo $instructions[0]."\n";

// Part 2
function runProgram($instructions, $noun, $verb) {
    $pointer = 0;
    $instructions[1] = $noun;
    $instructions[2] = $verb;

    while(true) {
        $opcode = (int)$instructions[$pointer];

        if($opcode === 99) break;

        $operation = [1 => '+', 2 => '*'][$opcode];
        $inputOne = (int)$instructions[$instructions[$pointer + 1]];
        $inputTwo = (int)$instructions[$instructions[$pointer + 2]];

        $intcode = eval("return {$inputOne} $operation {$inputTwo};");

        $instructions[$instructions[$pointer + 3]] = $intcode;

        $pointer += 4;
    }

    return $instructions[0];
}

$instructions = explode(',',file('input.txt')[0]);
$noun = 0;
$verb = 0;
$wantedResult = 19690720;

while(runProgram($instructions, $noun, $verb) !== $wantedResult) {
    $noun++;
    if($noun === 99) {
        $verb++;
        $noun = 0;
    }
}

echo 100 * $noun + $verb."\n";