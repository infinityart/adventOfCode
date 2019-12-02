<?php
/**
 * @author: Jonty Sponselee <jsponselee@student.scalda.nl>
 * @since: 2-12-2019
 */

// Part 1
$contents = file('input.txt');
$answer = 0;

foreach($contents as $content){
    $answer += floor(((int)$content) / 3) - 2;
}

echo $answer."\n";

// Part 2
function calcFuel($input) {
    return floor(((int)trim($input)) / 3) - 2;
}

$contents = file('input.txt');
$answer = 0;

foreach ($contents as $content) {
    $result = calcFuel($content);
    $answer += $result;

    while(($result = calcFuel($result)) > 0 ) {
        $answer += $result;
    }
}

echo $answer."\n";