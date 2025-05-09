<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StatsService;

/**
 * @OA\Tag(
 *     name="Stats",
 *     description="İstatistiklerle ilgili API Endpointleri"
 * )
 */
class StatsController extends Controller
{
    protected $statsService;
    
    public function __construct(StatsService $statsService)
    {
        $this->statsService = $statsService;
    }
    
    /**
     * @OA\Get(
     *     path="/stats/todos",
     *     operationId="getTodoStats",
     *     tags={"Stats"},
     *     summary="Todo durum istatistiklerini getir",
     *     description="Durum bazında todo sayılarını getirir",
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="status", type="string", example="pending"),
     *                     @OA\Property(property="count", type="integer", example=10)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Sunucu hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="İstatistikler alınırken bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function todoStats()
    {
        try {
            $stats = $this->statsService->getTodoStats();
            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'İstatistikler alınırken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Get(
     *     path="/stats/priorities",
     *     operationId="getPriorityStats",
     *     tags={"Stats"},
     *     summary="Todo öncelik istatistiklerini getir",
     *     description="Öncelik bazında todo sayılarını getirir",
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="priority", type="string", example="high"),
     *                     @OA\Property(property="count", type="integer", example=5)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Sunucu hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="İstatistikler alınırken bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function priorityStats()
    {
        try {
            $stats = $this->statsService->getPriorityStats();
            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'İstatistikler alınırken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}