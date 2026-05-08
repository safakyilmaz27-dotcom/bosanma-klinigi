// Boşanma Kliniği — Etkileşim katmanı

// 1) Güvenli çıkış: tarayıcıyı hızlıca tarafsız bir siteye yönlendirir + geçmişi temizlemeye çalışır
function safeExit(){
  try{
    // Mevcut sayfa geçmişini değiştirip geri tuşunu etkisizleştir
    window.location.replace('https://www.google.com/search?q=hava+durumu');
  }catch(e){
    window.location.href = 'https://www.google.com';
  }
}

// 2) Mobil menü
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // 3) Çerez banner'ı (KVKK uyumlu — sadece onay sonrası analitik yüklenir)
  const cookie = document.getElementById('cookieBanner');
  const consent = localStorage.getItem('bk_consent');
  if (cookie && !consent) cookie.classList.remove('hidden');
  document.querySelectorAll('[data-consent]').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('bk_consent', btn.dataset.consent);
      if (cookie) cookie.classList.add('hidden');
      if (btn.dataset.consent === 'all') loadAnalytics();
    });
  });
  if (consent === 'all') loadAnalytics();

  // 4) Exit-intent popup (yalnızca masaüstü, oturumda 1 kez)
  if (!sessionStorage.getItem('bk_exit_shown') && window.innerWidth > 900){
    document.addEventListener('mouseout', (e) => {
      if (e.clientY < 0 && !sessionStorage.getItem('bk_exit_shown')){
        showModal();
        sessionStorage.setItem('bk_exit_shown', '1');
      }
    });
  }

  // 5) Form gönderim simülasyonu (gerçek backend bağlanana kadar)
  const form = document.getElementById('contactForm');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const consentBox = form.querySelector('[name="kvkk"]');
      if (!consentBox.checked){
        alert('Lütfen aydınlatma metnini onaylayın.');
        return;
      }
      form.querySelector('.form-status').textContent =
        'Teşekkürler, başvurunuz alındı. Ekibimiz 24 saat içinde sizinle gizlilik içinde iletişime geçecek.';
      form.reset();
    });
  }

  // 6) Mikro değerlendirme anketi (basit eşleştirme)
  const quiz = document.getElementById('quiz');
  if (quiz){
    quiz.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = quiz.querySelector('select').value;
      const r = quiz.querySelector('.quiz-result');
      const map = {
        'karar':'Önerimiz: Karar Aşaması Paketi — 2 hukuk + 2 psikolojik destek seansı.',
        'sürec':'Önerimiz: Süreç Yönetimi Paketi — paralel hukuk takibi + bireysel terapi.',
        'sonra':'Önerimiz: Yeniden İnşa Paketi — boşanma sonrası iyileşme programı.',
        'kriz':'Önerimiz: Acil/Kriz hattımıza hemen ulaşın — kriz.html'
      };
      r.textContent = map[v] || 'Lütfen bir seçim yapın.';
      r.style.display = 'block';
    });
  }
});

function showModal(){
  const m = document.getElementById('exitModal');
  if (m) m.classList.add('show');
}
function closeModal(){
  const m = document.getElementById('exitModal');
  if (m) m.classList.remove('show');
}

// Onay sonrası yüklenecek analitik (placeholder)
function loadAnalytics(){
  // Gerçek üretimde GA4 / Plausible burada başlatılır.
  // Dönüşüm hedefleri: form_submit, whatsapp_click, pdf_download
  window._bk_track = (event, params) => console.log('[track]', event, params || {});
}

// ESC ile modal kapanır
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
