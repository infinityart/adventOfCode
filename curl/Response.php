<?php declare(strict_types=1);

class Response {

    public $httpCode;

    private $channel;

    public function __construct($channel) {
        $this->channel = $channel;
    }

   
}