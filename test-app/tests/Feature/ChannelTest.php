<?php

use App\Models\Channel;

it('creates and saves a channel to the database', function () {
    $channelData = [
        'name' => 'Testowy kanal',
        'amount' => '1000',
    ];

    $channel = Channel::create($channelData);

    $this->assertDatabaseHas('channels', [
        'name' => 'Testowy kanal',
        'amount' => '1000',
    ]);
});