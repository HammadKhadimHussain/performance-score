<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PerformanceAPIController extends Controller
{
    public function performanceScore(Request $request)
    {

        $url = $request->input('url');
        $platform = $request->input('platform');
        $apiKey = env('GOOGLE_API_KEY');
        $apiUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={$url}&strategy={$platform}&key={$apiKey}";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $response = curl_exec($ch);
        if(curl_errno($ch)) {
            curl_close($ch);
            return response()->json(['error' => 'cURL error: ' . curl_error($ch)], 500);
        }
        curl_close($ch);
        $data = json_decode($response, true);

        if (isset($data['lighthouseResult']['categories']['performance']['score'])) {
            $performanceScore = $data['lighthouseResult']['categories']['performance']['score'] * 100;
            return response()->json([
                'performance_score' => $performanceScore,
            ]);
        }

        return response()->json(['error' => 'Failed to fetch performance Score Url Not Correct'], 500);
    }
}
