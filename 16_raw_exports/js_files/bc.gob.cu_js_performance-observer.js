// Performance Observer para Core Web Vitals
// Este script es opcional y solo se ejecuta si el navegador soporta PerformanceObserver
(function() {
  'use strict';
  
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Métricas de performance (pueden enviarse a analytics si es necesario)
          // Actualmente solo observamos, no enviamos datos
        }
      });
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    } catch (error) {
      // Silenciosamente fallar si hay algún error
      // Esto es opcional y no debe romper la experiencia del usuario
      if (typeof console !== 'undefined' && console.error) {
        console.error('[Performance Observer] Error:', error);
      }
    }
  }
})();










