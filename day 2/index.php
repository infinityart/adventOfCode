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

echo $instructions[0];