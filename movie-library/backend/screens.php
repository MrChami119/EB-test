<?php

header('Content-Type: application/json');

$screens = [
    [
        'id'         => 'screen-1',
        'name'       => 'Screen 1 - IMAX',
        'image'      => 'assets/images/screen-imax.jpg',
        'capacity'   => 220,
        'features'   => ['IMAX Laser Projection', 'Dolby Atmos Sound', 'Reclining Seats'],
        'description'=> 'Our flagship IMAX theater delivers larger-than-life picture and immersive sound for the ultimate movie experience.',
    ],
    [
        'id'         => 'screen-2',
        'name'       => 'Screen 2 - Standard',
        'image'      => 'assets/images/screen-standard.jpg',
        'capacity'   => 150,
        'features'   => ['Digital Projection', 'Dolby 7.1 Sound', 'Standard Seating'],
        'description'=> 'A comfortable, classic cinema setup perfect for everyday movie nights.',
    ],
    [
        'id'         => 'screen-3',
        'name'       => 'Screen 3 - VIP Lounge',
        'image'      => 'assets/images/screen-vip.jpg',
        'capacity'   => 60,
        'features'   => ['4K Projection', 'Recliner Sofas', 'In-seat Service'],
        'description'=> 'An intimate, premium theater with plush seating and in-seat food & drink service.',
    ],
    [
        'id'         => 'screen-4',
        'name'       => 'Screen 4 - 3D',
        'image'      => 'assets/images/screen-3d.jpg',
        'capacity'   => 180,
        'features'   => ['RealD 3D', 'Dolby 5.1 Sound', 'Standard Seating'],
        'description'=> 'Dedicated 3D theater for the latest blockbuster releases in stunning depth.',
    ],
];

echo json_encode($screens);