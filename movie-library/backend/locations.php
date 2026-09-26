<?php

header('Content-Type: application/json');

$locations = [
    [
        'id'      => 'head-office',
        'name'    => 'eBEYONDS Head Office',
        'address' => '3, Serpentine Road, Colombo 3, Sri Lanka',
        'phone'   => '+94 11 234 5678',
        'email'   => 'info@ebeyonds.com',
        'hours'   => 'Mon - Fri, 9:00 AM - 6:00 PM',
        'lat'     => 6.8448775,
        'lng'     => 79.940426,
    ],
    [
        'id'      => 'downtown-cinema',
        'name'    => 'Movie Library - Downtown Cinema',
        'address' => 'Galle Road, Colombo 4, Sri Lanka',
        'phone'   => '+94 11 987 6543',
        'email'   => 'downtown@ebeyonds.com',
        'hours'   => 'Daily, 10:00 AM - 11:00 PM',
        'lat'     => 6.8845,
        'lng'     => 79.8567,
    ],
    [
        'id'      => 'mall-cinema',
        'name'    => 'Movie Library - Mall Cinema',
        'address' => 'One Galle Face Mall, Colombo 2, Sri Lanka',
        'phone'   => '+94 11 555 1122',
        'email'   => 'mall@ebeyonds.com',
        'hours'   => 'Daily, 10:00 AM - 12:00 AM',
        'lat'     => 6.9280,
        'lng'     => 79.8438,
    ],
];

echo json_encode($locations);