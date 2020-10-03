<?php declare(strict_types=1);

const MOVED_PERMANENTLY = 301;
const MOVED_TEMPORARILY = 302;

class Curl {
    public $httpCode;
    public $headers;
    public $response;

    private $sessionToken; 
    private $channel;

    public function __construct($url) {
        $this->channel = curl_init($url);
    }

    public function __destruct() {
        curl_close($this->channel);
    }

    public function send(){
        $this->setDefaultSettings();

        $response = $this->sendRequest();

        $this->setHttpCode();

    

        $this->response = $response;
    }

    private function setDefaultSettings() {
        curl_setopt_array($this->channel, [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_VERBOSE => true,
            CURLOPT_HTTPHEADER => [
                'cookies'
            ]
        ]);

        $this->setResponseHeaderFunction();
    }

    private function setResponseHeaderFunction(): void {
        curl_setopt( $this->channel, CURLOPT_HEADERFUNCTION,
            function ($ch, $header) use (&$headers) {
                $len = strlen($header);
                $header = explode(':', $header, 2);

                if (count($header) < 2) return $len;

                $this->headers[strtolower(trim($header[0]))][] = trim($header[1]);

                return $len;
            }
        );
    }

    private function setHttpCode() {
        $this->httpCode = curl_getinfo($this->channel, CURLINFO_HTTP_CODE);
    }

    private function sendRequest() {
        if(!$response = curl_exec($this->channel)){
            return false;
        }
        
        return $response;
    }
}
