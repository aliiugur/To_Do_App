# To_Do_App

# 📝 To-Do App

Bu proje, Laravel tabanlı bir API (`todo-api`) ve React.js ile hazırlanmış bir frontend (`todo-frontend`) içeren tam işlevsel bir To-Do uygulamasıdır.

## 🚀 Proje Yapısı
To_Do_App/
├── todo-api/ # Laravel API (backend)
└── todo-frontend/ # React frontend

---

## ⚙️ Backend (Laravel API)

### Kurulum

1. `.env` dosyasını oluşturun:
   ```bash
   cp .env.example .env
   
2. `.env` dosyasında veritabanı bilgilerinizi ayarlayın.
3. Gerekli paketleri yükleyin:
   ```bash
   composer install
4. Uygulama anahtarını oluşturun:
   ```bash
   php artisan key:generate
5. Veritabanı migrasyonlarını çalıştırın:
   ```bash
   php artisan migrate
6. Laravel sunucusunu başlatın:
   ```bash
   php artisan serve


🖥️ Frontend (React)

### Başlangıç


1. React dizinine gidin:
   ```bash
   cd todo-frontend
2. Paketleri yükleyin:
   ```bash
   cd todo-frontend
3. React uygulamasını başlatın:
   ```bash
   npm run dev -- --force  


## 🔗 API Uç Noktaları

- `GET /api/todos` – Tüm todo'ları listele
- `GET /api/todos/{id}` – Belirli bir todo'yu getir
- `POST /api/todos` – Yeni todo oluştur
- `PUT /api/todos/{id}` – Todo güncelle
- `PATCH /api/todos/{id}/status` – Sadece durum güncelle
- `DELETE /api/todos/{id}` – Soft delete
- `GET /api/todos/search?q=terim` – Arama yap

## 🛠️ Kullanılan Teknolojiler

- Laravel 10+
- React 18+
- Axios
- Eloquent ORM
- Vite
- Tailwind CSS

## 👨‍💻 Geliştirici

- [aliiugur](https://github.com/aliiugur)

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.


