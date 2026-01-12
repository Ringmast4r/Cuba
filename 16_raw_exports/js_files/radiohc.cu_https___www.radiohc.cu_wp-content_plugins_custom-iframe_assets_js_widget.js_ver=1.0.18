(function (elementor) {
    'use strict';

    var widgetIframe = function (scope) {
        var iframe = scope[0].querySelector('.custif-iframe-wrapper > iframe'),
            autoHeight = iframe && iframe.dataset ? iframe.dataset.autoHeight : 0,
            refreshInterval = iframe && iframe.dataset ? parseInt(iframe.dataset.refreshInterval) : 0;

        if (!iframe) {
            return;
        }

        // Auto height only works when cross origin properly set
        if (autoHeight === 'yes') {
            try {
                var height = iframe.contentDocument.querySelector('html').scrollHeight;
                iframe.style.height = height + 'px';
            } catch (e) {
                console.log('Cross origin iframe detected');
            }
        }

        // Refresh interval
        if (refreshInterval > 0) {
            setInterval(() => {
                iframe.src = iframe.src;
            }, refreshInterval * 1000);
        }
    };

    // Initialize when Elementor is ready
    window.addEventListener('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/custif_iframe_widget.default', widgetIframe);
    });

}(window.elementorFrontend));