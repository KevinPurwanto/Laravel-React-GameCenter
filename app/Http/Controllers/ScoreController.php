<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    // Simpan skor
    public function store(Request $request)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:50',
            'game' => 'required|string|max:50',
            'score' => 'required|numeric'
        ]);

        $score = Score::create($validated);

        return response()->json([
            'message' => 'Score saved successfully',
            'data' => $score
        ], 201);
    }

    // Ambil leaderboard (top N)
    public function leaderboard(Request $request, $game)
    {
        // Default 10 besar
        $limit = $request->query('limit', 10);

        // Untuk reaction_time, nilai lebih kecil lebih baik
        // Untuk flappy_bird, nilai lebih besar lebih baik
        $order = ($game === 'reaction_time') ? 'asc' : 'desc';

        $scores = Score::where('game', $game)
            ->orderBy('score', $order)
            ->limit($limit)
            ->get();

        return response()->json($scores);
    }
}
