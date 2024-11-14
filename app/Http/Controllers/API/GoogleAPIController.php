<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAPIController extends Controller
{

     public function googleLogin(){
         $googleRedirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
         return response()->json(['url' => $googleRedirectUrl]);
     }


    public function googleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();
        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            Auth::login($existingUser);
        } else {
            $newUser = User::create([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'password' => bcrypt('12345678'),
                'google_id' => $user->getId(),
            ]);

            Auth::login($newUser);
        }

        return redirect('/performanceScore');
    }

}
