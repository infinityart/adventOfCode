<?php

require_once 'curl/Curl.php';

$curl = new Curl('http://adventofcode.com/auth/github');
// $curl = new Curl('https://adventofcode.com');

$curl->send();
var_dump($curl);


var_dump($_COOKIE);
"curl 'https://github.com/login?client_id=7bb0a7ec13388aa67963&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D7bb0a7ec13388aa67963%26duration%3Dtemporary%26redirect_uri%3Dhttps%253A%252F%252Fadventofcode.com%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode%26scope%3D%26state%3Dx' -X POST -d 'login=jonty_wolf@hotmail.com&password=Wolvenkingdom123!'";
die;
$headers = [];
$ch = curl_init();
$url = 'https://adventofcode.com/auth/github';

curl_setopt(
    $ch,
    CURLOPT_HEADERFUNCTION,
    function ($ch, $header) use (&$headers) {
        $len = strlen($header);
        $header = explode(':', $header, 2);

        if (count($header) < 2) return $len;

        $headers[strtolower(trim($header[0]))][] = trim($header[1]);

        return $len;
    }
);

$response = curl_exec($ch);

$error = curl_error($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

var_dump($error);
// $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

var_dump($response);
var_dump($headers);
var_dump($httpcode);
