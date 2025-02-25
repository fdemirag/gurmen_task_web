Sipariş Takip Sistemi - Frontend

Bu proje, Vue.js kullanılarak geliştirilmiş bir sipariş takip sistemi frontend uygulamasıdır.
Uygulama, kullanıcıların siparişleri yönetmesine, yeni siparişler oluşturmasına ve mevcut siparişleri görüntülemesine olanak tanır.

Kurulum

git clone https://github.com/fdemirag/gurmen_task_web.git   

cd gurmen_task_web

npm install  //bağımlılıkları yükler

npm run serve //projeyi çalıştırır

Bu frontend, .NET Core 6 ile geliştirilmiş bir backend API ile iletişim kurar. API bağlantı noktalarını environment.js dosyasında yapılandırabilirsiniz.

API_BASE_URL: "http://localhost:5092/api"  örnek olarak bu şekilde

API Kullanımı

Siparişleri Listeleme: GET /orders

Sipariş Detayı Görüntüleme: GET /orders/{id}

Yeni Sipariş Ekleme: POST /orders

Sipariş Güncelleme: PUT /orders/{id}

Sipariş Silme: DELETE /orders/{id}

Kullanılan Teknolojiler

-Vue 3

-Vue Router

-Axios (API istekleri için)
