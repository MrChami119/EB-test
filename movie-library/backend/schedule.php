<?php

header('Content-Type: application/json');

$schedule = [
    [
        'movie'     => 'Batman Returns',
        'poster'    => 'assets/images/batman-returns.jpg',
        'screen'    => 'Screen 1 - IMAX',
        'duration'  => '126 min',
        'showtimes' => ['10:30 AM', '1:45 PM', '5:00 PM', '8:30 PM'],
    ],
    [
        'movie'     => 'Wild Wild West',
        'poster'    => 'assets/images/wild-wild-west.jpg',
        'screen'    => 'Screen 2 - Standard',
        'duration'  => '106 min',
        'showtimes' => ['11:00 AM', '2:15 PM', '6:00 PM'],
    ],
    [
        'movie'     => 'The Amazing Spiderman',
        'poster'    => 'assets/images/amazing-spiderman.jpg',
        'screen'    => 'Screen 4 - 3D',
        'duration'  => '136 min',
        'showtimes' => ['12:00 PM', '3:30 PM', '7:00 PM', '10:00 PM'],
    ],
    [
        'movie'     => 'Feature Film - VIP Screening',
        'poster'    => 'assets/images/screen-vip.jpg',
        'screen'    => 'Screen 3 - VIP Lounge',
        'duration'  => '118 min',
        'showtimes' => ['4:00 PM', '9:00 PM'],
    ],
];

echo json_encode([
    'date'     => date('l, F j, Y'),
    'schedule' => $schedule,
]);