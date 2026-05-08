# Boşanma Kliniği — Statik Web Sitesi

Word dosyasındaki "Değerlendirme ve Geliştirme Önerileri" listesinin tamamı bu sitede uygulandı.

## Çalıştırma
Tek tıkla: `index.html` dosyasını çift tıklayarak tarayıcıda aç.
Veya yerel sunucu (önerilir, mailto/tel için): klasörde komut satırı açıp
`python -m http.server 8000` çalıştır → http://localhost:8000

## Dosya Yapısı
```
site/
├── index.html              Ana sayfa (hero, hizmetler, süreç, fiyat, vakalar, SSS)
├── hizmetler.html          Hukuki + psikolojik hizmetler detayı
├── surec.html              5 adımlı süreç akışı
├── ekip.html               Ekip + üyelikler/sertifikalar
├── sss.html                Sıkça sorulan sorular (FAQ schema dahil)
├── kriz.html               Acil durum / kriz yönlendirme (noindex)
├── iletisim.html           Form (KVKK onayı zorunlu) + harita + saatler
├── kvkk.html               Aydınlatma metni
├── cerez.html              Çerez politikası
├── sartlar.html            Hizmet şartları
├── blog/
│   ├── index.html          Blog ana liste (8 yazı, 3'ü dolu)
│   ├── post-1.html         "10 belge" rehberi
│   ├── post-2.html         "Yas sürecinin 5 aşaması"
│   └── post-3.html         "İlk 48 saat"
├── styles.css              Tüm stiller (responsive, WCAG, prefers-reduced-motion)
├── script.js               Çerez banner, exit-intent, mobil menü, quiz, güvenli çıkış
├── sitemap.xml
├── robots.txt
└── OKU.md                  (bu dosya)
```

## Word Önerilerinin Karşılığı

| Öneri | Uygulandığı yer |
|---|---|
| SSS sayfası (5 soru min.) | `sss.html` + ana sayfa SSS bloğu + FAQ schema |
| Süreç akışı sayfası | `surec.html` + ana sayfada 5 adım |
| Acil durum / kriz sayfası | `kriz.html` (ALO 183, 112, 182, 6284, ŞÖNİM) |
| Güvenli çıkış butonu | Tüm sayfalarda üst barda + `script.js` `safeExit()` |
| Yerel SEO | Title'larda "İstanbul", LocalBusiness schema, footer'da adres |
| Schema markup | LegalService + MedicalBusiness + Service + FAQPage + Article |
| Meta etiketler | Her sayfada benzersiz title + description + canonical + OG |
| Güven sinyalleri | Baro/TPD üyeliği, deneyim yılı, KVKK rozeti (`ekip.html`) |
| Exit-intent popup | "Boşanma Süreci Kontrol Listesi PDF" — `script.js` |
| Mikro dönüşümler | Quiz ("Hangi hizmet size uygun?"), e-bülten, PDF indir |
| Ekip sayfası | `ekip.html` + insani dokunuş alıntıları + uzmanlık alanları |
| Şeffaf fiyat | Ana sayfada 3 paket, "₺..'den başlayan" ifadesi |
| Başarı hikayeleri | Ana sayfada anonimleştirilmiş 3 vaka |
| Erişilebilirlik (WCAG) | skip-link, ARIA, alt text, focus stiller, kontrast, reduce-motion |
| Mobil deneyim | Click-to-call, accordion (`<details>`), CTA alt yarıda, hamburger menü |
| Blog stratejisi | 3 dolu yazı + 5 placeholder (duygu odaklı + pratik + long-tail SEO) |
| KVKK | `kvkk.html`, çerez banner'ı, formda zorunlu rıza checkbox'ı |
| Hizmet şartları | `sartlar.html` |
| Görsel promptlar | Hero illustrasyonu CSS gradient ile prototiplendi (üretim için Midjourney prompt notları styles.css içinde) |
| Analitik | `loadAnalytics()` placeholder + dönüşüm event isimleri (form_submit, whatsapp_click, pdf_download) |

## Özelleştirme Notları
- Telefon: `+905550000000` → 11 yerde geçer; tek tek değiştirin veya bul/değiştir kullanın.
- Domain: `https://www.bosanmaklinigi.com/` canonical URL'leri ve schema'larda yer alır.
- Fotoğraflar: Ekip fotoğrafları placeholder (CSS gradient + initialler). Gerçek fotoğraflar `<img alt="...">` ile değiştirilmeli.
- Form gönderimi: Şu an client-side simülasyon. Üretim için Formspree, Netlify Forms veya kendi backend'inize bağlayın.
- Analytics: GA4 veya Plausible script'i `loadAnalytics()` içine ekleyin (yalnızca `bk_consent === 'all'` ise yüklenir — KVKK uyumlu).

## Test Edilmesi Önerilenler
1. Lighthouse (Performance / SEO / A11y / Best Practices) — hedef 90+
2. WAVE veya axe-DevTools ile erişilebilirlik
3. Google Rich Results Test ile schema doğrulama
4. Mobil görünüm: 360px, 414px, 768px breakpoint'leri
5. Klavye ile menü, modal, akordeon ve form gezinimi
