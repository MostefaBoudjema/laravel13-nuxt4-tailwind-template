<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    /**
     * Get reports summary (admin + manager only).
     */
    public function index(\Illuminate\Http\Request $request, \App\Services\ReportService $reportService): JsonResponse
    {
        $data = $reportService->getSummary($request->only('search'));

        return response()->json([
            'data' => $data,
        ]);
    }
}
