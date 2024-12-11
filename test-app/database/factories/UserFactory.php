<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'channels' => 'required|array',
            'channels.*.channel' => 'required|string|max:255',
            'channels.*.amount' => 'required|string|max:255',
        ]);

        foreach ($request->channels as $channelData) {
            Channel::create([
                'channel' => $channelData['channel'],
                'amount' => $channelData['amount'],
            ]);
        }

        return response()->json(['message' => 'Channels saved successfully!'], 200);
    }

    public function index()
    {
        $channels = Channel::all();
        return response()->json($channels);
    }
}
