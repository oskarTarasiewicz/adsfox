<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'channels' => 'nullable|array',
            'channels.*.name' => 'nullable|string|max:255',
            'channels.*.amount' => 'nullable|string|max:255',
        ]);

        if (empty($request->channels)) {
            Channel::truncate();
            return response()->json(['message' => 'Kanaly zostaly zaktualizowane!'], 200);
        }

        Channel::truncate();

        foreach ($request->channels as $channelData) {
            Channel::create([
                'name' => $channelData['name'],
                'amount' => $channelData['amount'],
            ]);
        }

        return response()->json(['message' => 'Kanaly zostaly zapisane!'], 200);
    }

    public function index()
    {
        $channels = Channel::all();
        return response()->json($channels->toArray());
    }
}
