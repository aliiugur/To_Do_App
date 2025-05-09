<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TodoService;
use Illuminate\Http\Request;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Todo Uygulaması API Dokümantasyonu",
 *     description="Todo Uygulaması için RESTful API dokümantasyonu",
 *     @OA\Contact(
 *         email="iletisim@ornek.com",
 *         name="Destek Ekibi"
 *     ),
 *     @OA\License(
 *         name="MIT Lisansı",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="API Sunucusu"
 * )
 * 
 * @OA\Tag(
 *     name="Todos",
 *     description="Todo yönetimiyle ilgili API Endpointleri"
 * )
 * 
 * @OA\Tag(
 *     name="Categories",
 *     description="Kategori yönetimiyle ilgili API Endpointleri"
 * )
 * 
 * @OA\Tag(
 *     name="Stats",
 *     description="İstatistiklerle ilgili API Endpointleri"
 * )
 * 
 * @OA\Schema(
 *     schema="Todo",
 *     required={"title"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Proje toplantısına katıl"),
 *     @OA\Property(property="description", type="string", example="Sprint planlama toplantısı için hazırlık yap"),
 *     @OA\Property(property="status", type="string", enum={"pending", "in_progress", "completed", "cancelled"}, example="pending"),
 *     @OA\Property(property="priority", type="string", enum={"low", "medium", "high"}, example="medium"),
 *     @OA\Property(property="due_date", type="string", format="date-time", example="2023-12-31T00:00:00Z"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T00:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-01T00:00:00Z"),
 *     @OA\Property(
 *         property="categories",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Category")
 *     )
 * )
 * 
 * @OA\Schema(
 *     schema="Category",
 *     required={"name"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="İş"),
 *     @OA\Property(property="color", type="string", example="#FF5733"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T00:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-01T00:00:00Z")
 * )
 * 
 * @OA\Schema(
 *     schema="TodoStats",
 *     @OA\Property(
 *         property="status",
 *         type="object",
 *         @OA\Property(property="pending", type="integer", example=5),
 *         @OA\Property(property="in_progress", type="integer", example=3),
 *         @OA\Property(property="completed", type="integer", example=10),
 *         @OA\Property(property="cancelled", type="integer", example=2)
 *     )
 * )
 * 
 * @OA\Schema(
 *     schema="PriorityStats",
 *     @OA\Property(
 *         property="priority",
 *         type="object",
 *         @OA\Property(property="low", type="integer", example=3),
 *         @OA\Property(property="medium", type="integer", example=10),
 *         @OA\Property(property="high", type="integer", example=7)
 *     )
 * )
 */
class TodoController extends Controller
{
    protected $todoService;
    
    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }
    
    /**
     * @OA\Get(
     *     path="/todos",
     *     operationId="getTodosList",
     *     tags={"Todos"},
     *     summary="Tüm todoları listele",
     *     description="Sayfalama, sıralama ve filtreleme özellikleriyle tüm todoları getirir",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Sayfa numarası",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Sayfa başına kayıt sayısı (maks. 50)",
     *         @OA\Schema(type="integer", default=10, maximum=50)
     *     ),
     *     @OA\Parameter(
     *         name="sort",
     *         in="query",
     *         description="Sıralama alanı",
     *         @OA\Schema(type="string", enum={"created_at", "due_date", "priority"}, default="created_at")
     *     ),
     *     @OA\Parameter(
     *         name="order",
     *         in="query",
     *         description="Sıralama yönü",
     *         @OA\Schema(type="string", enum={"asc", "desc"}, default="desc")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Duruma göre filtrele",
     *         @OA\Schema(type="string", enum={"pending", "in_progress", "completed", "cancelled"})
     *     ),
     *     @OA\Parameter(
     *         name="priority",
     *         in="query",
     *         description="Önceliğe göre filtrele",
     *         @OA\Schema(type="string", enum={"low", "medium", "high"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(
     *                     property="data",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/Todo")
     *                 ),
     *                 @OA\Property(property="first_page_url", type="string", example="http://localhost:8000/api/todos?page=1"),
     *                 @OA\Property(property="from", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=5),
     *                 @OA\Property(property="last_page_url", type="string", example="http://localhost:8000/api/todos?page=5"),
     *                 @OA\Property(property="next_page_url", type="string", example="http://localhost:8000/api/todos?page=2"),
     *                 @OA\Property(property="path", type="string", example="http://localhost:8000/api/todos"),
     *                 @OA\Property(property="per_page", type="integer", example=10),
     *                 @OA\Property(property="prev_page_url", type="string", example=null),
     *                 @OA\Property(property="to", type="integer", example=10),
     *                 @OA\Property(property="total", type="integer", example=50)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Sunucu hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todoları listelerken bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        try {
            $todos = $this->todoService->getAllTodos($request->all());
            return response()->json([
                'success' => true,
                'data' => $todos
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todoları listelerken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Get(
     *     path="/todos/{id}",
     *     operationId="getTodoById",
     *     tags={"Todos"},
     *     summary="Belirli bir todo'yu getir",
     *     description="ID'ye göre tek bir todo ve ilişkili kategorileri getirir",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Todo ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/Todo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Kaynak bulunamadı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todo bulunamadı"),
     *             @OA\Property(property="error", type="string", example="Resource not found")
     *         )
     *     )
     * )
     */
    public function show($id)
    {
        try {
            $todo = $this->todoService->getTodoById($id);
            return response()->json([
                'success' => true,
                'data' => $todo
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todo bulunamadı',
                'error' => $e->getMessage()
            ], 404);
        }
    }
    
    /**
     * @OA\Post(
     *     path="/todos",
     *     operationId="storeTodo",
     *     tags={"Todos"},
     *     summary="Yeni bir todo oluştur",
     *     description="Yeni bir todo ekler ve döndürür",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title"},
     *             @OA\Property(property="title", type="string", example="Toplantı notlarını hazırla", description="Todo başlığı - 3-100 karakter"),
     *             @OA\Property(property="description", type="string", example="Pazartesi toplantısı için sunum notlarını hazırla", description="Todo açıklaması - maks 500 karakter"),
     *             @OA\Property(property="status", type="string", enum={"pending", "in_progress", "completed", "cancelled"}, example="pending"),
     *             @OA\Property(property="priority", type="string", enum={"low", "medium", "high"}, example="medium"),
     *             @OA\Property(property="due_date", type="string", format="date-time", example="2023-12-31T10:00:00Z", description="Bitiş tarihi - bugünden sonraki bir tarih olmalı"),
     *             @OA\Property(
     *                 property="categories",
     *                 type="array",
     *                 @OA\Items(type="integer"),
     *                 example={1, 2},
     *                 description="Kategori ID'leri"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Başarıyla oluşturuldu",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Todo başarıyla oluşturuldu"),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/Todo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Doğrulama hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Doğrulama hatası"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(
     *                     property="title",
     *                     type="array",
     *                     @OA\Items(type="string", example="Başlık alanı zorunludur")
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
     *             @OA\Property(property="message", type="string", example="Todo oluşturulurken bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $todo = $this->todoService->createTodo($request->all());
            return response()->json([
                'success' => true,
                'message' => 'Todo başarıyla oluşturuldu',
                'data' => $todo
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doğrulama hatası',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todo oluşturulurken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Put(
     *     path="/todos/{id}",
     *     operationId="updateTodo",
     *     tags={"Todos"},
     *     summary="Mevcut bir todo'yu güncelle",
     *     description="ID'ye göre bir todo'yu günceller ve döndürür",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Todo ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Toplantı notlarını güncelle"),
     *             @OA\Property(property="description", type="string", example="Güncellenmiş açıklama"),
     *             @OA\Property(property="status", type="string", enum={"pending", "in_progress", "completed", "cancelled"}, example="in_progress"),
     *             @OA\Property(property="priority", type="string", enum={"low", "medium", "high"}, example="high"),
     *             @OA\Property(property="due_date", type="string", format="date-time", example="2023-12-31T10:00:00Z"),
     *             @OA\Property(
     *                 property="categories",
     *                 type="array",
     *                 @OA\Items(type="integer"),
     *                 example={1, 3}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Todo başarıyla güncellendi"),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/Todo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Kaynak bulunamadı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todo bulunamadı"),
     *             @OA\Property(property="error", type="string", example="Resource not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Doğrulama hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Doğrulama hatası"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(
     *                     property="title",
     *                     type="array",
     *                     @OA\Items(type="string", example="Başlık en az 3 karakter olmalıdır")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        try {
            $todo = $this->todoService->updateTodo($id, $request->all());
            return response()->json([
                'success' => true,
                'message' => 'Todo başarıyla güncellendi',
                'data' => $todo
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doğrulama hatası',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todo güncellenirken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Patch(
     *     path="/todos/{id}/status",
     *     operationId="updateTodoStatus",
     *     tags={"Todos"},
     *     summary="Todo durumunu güncelle",
     *     description="Sadece todo'nun durum bilgisini günceller",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Todo ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 enum={"pending", "in_progress", "completed", "cancelled"},
     *                 example="completed"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Todo durumu başarıyla güncellendi"),
     *             @OA\Property(
     *                 property="data",
     *                 ref="#/components/schemas/Todo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Kaynak bulunamadı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todo bulunamadı"),
     *             @OA\Property(property="error", type="string", example="Resource not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Doğrulama hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Doğrulama hatası"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(
     *                     property="status",
     *                     type="array",
     *                     @OA\Items(type="string", example="Durum alanı geçerli değil")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $todo = $this->todoService->updateTodoStatus($id, $request->all());
            return response()->json([
                'success' => true,
                'message' => 'Todo durumu başarıyla güncellendi',
                'data' => $todo
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doğrulama hatası',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todo durumu güncellenirken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Delete(
     *     path="/todos/{id}",
     *     operationId="deleteTodo",
     *     tags={"Todos"},
     *     summary="Bir todo'yu sil",
     *     description="ID'ye göre bir todo'yu soft delete ile siler",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Todo ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Başarıyla silindi"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Kaynak bulunamadı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todo bulunamadı"),
     *             @OA\Property(property="error", type="string", example="Resource not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Sunucu hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Todo silinirken bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function destroy($id)
    {
        try {
            $this->todoService->deleteTodo($id);
            return response()->json([
                'success' => true,
                'message' => 'Todo başarıyla silindi'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Todo silinirken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @OA\Get(
     *     path="/todos/search",
     *     operationId="searchTodos",
     *     tags={"Todos"},
     *     summary="Todo'ları ara",
     *     description="Başlık veya açıklamaya göre todo'ları arar",
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         description="Arama terimi",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Duruma göre filtrele",
     *         @OA\Schema(type="string", enum={"pending", "in_progress", "completed", "cancelled"})
     *     ),
     *     @OA\Parameter(
     *         name="priority",
     *         in="query",
     *         description="Önceliğe göre filtrele",
     *         @OA\Schema(type="string", enum={"low", "medium", "high"})
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Sayfa numarası",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Sayfa başına kayıt sayısı",
     *         @OA\Schema(type="integer", default=10, maximum=50)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Başarılı",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(
     *                     property="data",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/Todo")
     *                 ),
     *                 @OA\Property(property="total", type="integer", example=5)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Sunucu hatası",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Arama sırasında bir hata oluştu"),
     *             @OA\Property(property="error", type="string", example="Server error")
     *         )
     *     )
     * )
     */
    public function search(Request $request)
    {
        try {
            $term = $request->query('q', '');
            $todos = $this->todoService->searchTodos($term, $request->all());
            return response()->json([
                'success' => true,
                'data' => $todos
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Arama sırasında bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}