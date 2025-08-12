<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Score;

class ScoreSeeder extends Seeder
{
    public function run(): void
    {
        $games = ['reaction_time', 'flappy_bird'];

        foreach ($games as $game) {
            for ($i = 1; $i <= 10; $i++) {
                Score::create([
                    'player_name' => 'Player ' . $i,
                    'game' => $game,
                    'score' => $game === 'reaction_time'
                        ? rand(150, 400) + (rand(0, 999) / 1000) // waktu reaksi dalam ms
                        : rand(5, 50), // score flappy bird
                ]);
            }
        }
    }
}
