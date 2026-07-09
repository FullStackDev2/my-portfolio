// src/lib/smoothScrollTo.ts
let currentAnimationId: number | null = null;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Sayfayı belirtilen Y konumuna, kontrollü bir easing ile kaydırır.
 * @param targetY Hedef scroll pozisyonu (px)
 * @param duration Animasyon süresi (ms), varsayılan 500
 */
export function smoothScrollTo(targetY: number, duration?: number) {
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  // Süre verilmediyse mesafeye göre otomatik hesapla: min 400ms, max 1200ms
  const calculatedDuration = duration ?? Math.min(1200, Math.max(400, Math.abs(distance) * 0.6));

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / calculatedDuration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      currentAnimationId = requestAnimationFrame(step);
    } else {
      currentAnimationId = null;
    }
  }

  currentAnimationId = requestAnimationFrame(step);
}

/**
 * Yardımcı fonksiyon: bir section id'sine, navbar yüksekliği payı bırakarak kaydırır.
 * @param id Kaydırılacak elementin id'si (örn. 'projects', 'contact')
 * @param offset Üstten bırakılacak pay (navbar yüksekliği), varsayılan 80px
 */
export function scrollToSection(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollTo(y);
}
