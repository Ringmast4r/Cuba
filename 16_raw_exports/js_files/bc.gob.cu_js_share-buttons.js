// Manejo de botones de compartir (Facebook, X, Telegram, Instagram, Copiar)
// Usa event delegation para manejar clicks en botones con data-share attributes
(function() {
  'use strict';
  
  document.addEventListener('click', function(event) {
    const button = event.target.closest('[data-share]');
    if (!button) return;
    
    event.preventDefault();
    
    const shareType = button.getAttribute('data-share');
    const url = button.getAttribute('data-share-url') || window.location.href;
    const text = button.getAttribute('data-share-text') || '';
    
    let shareUrl = '';
    
    switch (shareType) {
      case 'facebook':
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
        window.open(shareUrl, 'facebook-share-dialog', 'width=626,height=436');
        break;
        
      case 'x':
      case 'twitter':
        shareUrl = 'https://x.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
        window.open(shareUrl, 'x-share-dialog', 'width=626,height=436');
        break;
        
      case 'telegram':
        shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text);
        window.open(shareUrl, 'telegram-share-dialog', 'width=626,height=436');
        break;
        
      case 'instagram':
        shareUrl = 'https://www.instagram.com/create/story/?media=' + encodeURIComponent(url);
        window.open(shareUrl, 'instagram-share-dialog', 'width=626,height=436');
        break;
        
      case 'copy':
        // Copiar URL al portapapeles
        // Si data-share-url está vacío, usar window.location.href
        const urlToCopy = url || window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(urlToCopy).then(function() {
            // Mostrar mensaje de confirmación
            alert(url ? 'Enlace copiado al portapapeles' : 'Enlace copiado');
          }).catch(function(err) {
            // Fallback para navegadores antiguos
            try {
              const textArea = document.createElement('textarea');
              textArea.value = urlToCopy;
              textArea.style.position = 'fixed';
              textArea.style.opacity = '0';
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              alert(url ? 'Enlace copiado al portapapeles' : 'Enlace copiado');
            } catch (fallbackErr) {
              console.error('Error al copiar enlace:', fallbackErr);
            }
          });
        } else {
          // Fallback para navegadores antiguos
          try {
            const textArea = document.createElement('textarea');
            textArea.value = urlToCopy;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert(url ? 'Enlace copiado al portapapeles' : 'Enlace copiado');
          } catch (err) {
            console.error('Error al copiar enlace:', err);
          }
        }
        break;
    }
  });
})();










