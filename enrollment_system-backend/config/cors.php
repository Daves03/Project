<?php

return [
    'paths' => ['api/*'], // You can specify which API paths you want to apply CORS for
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => ['https://cvsu.online'], // Allow only requests from your frontend domain
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
