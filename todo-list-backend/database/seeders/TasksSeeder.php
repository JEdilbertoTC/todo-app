<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            DB::table('tasks')->insert([
                'owner_id' => User::all()->random()->id,
                'title' => $faker->realText(20),
                'description' => $faker->realText(250),
                'is_completed' => $faker->boolean,
                'created_at' => Carbon::now(),
            ]);
        }
    }
}
