# To_Do_App

# 📝 To-Do App

Bu proje, Laravel tabanlı bir API (`todo-api`) ve React.js ile hazırlanmış bir frontend (`todo-frontend`) içeren tam işlevsel bir To-Do uygulamasıdır.

## 🚀 Proje Yapısı
To_Do_App/
├── todo-api/ # Laravel API (backend)
└── todo-frontend/ # React frontend

---

## ⚙️ Backend (Laravel API)

### Başlangıç

1. `.env` dosyasını oluşturun:
   ```bash
   cp .env.example .env
2. Veritabanı bilgilerini .env dosyasında yapılandırın.
3. Bağımlılıkları yükleyin:
   composer install
4. Uygulama anahtarını oluşturun:
   php artisan key:generate
5. Veritabanı migrasyonlarını çalıştırın:
   php artisan migrate
6. Geliştirme sunucusunu başlatın:
   php artisan serve


🖥️ Frontend (React)

### Başlangıç


1. Bağımlılıkları yükleyin:
   npm install
2. Uygulamayı çalıştırın:
   npm run dev -- --force  


🔗 API Uç Noktaları
GET /api/todos - Tüm todo'ları listele

GET /api/todos/{id} - Belirli bir todo

POST /api/todos - Yeni todo oluştur

PUT /api/todos/{id} - Todo güncelle

PATCH /api/todos/{id}/status - Sadece durum güncelle

DELETE /api/todos/{id} - Soft delete

GET /api/todos/search?q=terim - Arama

🛠️ Kullanılan Teknolojiler
Laravel 10+

React 18+

Axios

Eloquent ORM

Vite

Tailwind 

