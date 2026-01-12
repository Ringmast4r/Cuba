(function ($) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function (partial) {

		var $t = $(this),
			$w = $(window),
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height(),
			_top = $t.offset().top,
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

})(jQuery);

// IIFE - Immediately Invoked Function Expression

var ssbPlugin = ssbPlugin || {};

(function ($, window, document) {
	'use strict';

	function absint($int) {
		return parseInt($int, 10);
	}

	var ssbPostData = {};

	ssbPlugin.fetchFacebookShares = function () {
		/**
		 * Run all the API calls
		 */
		$.when(
			$.get('https://graph.facebook.com/?fields=og_object{likes.summary(true).limit(0)},share&id=' + ssb_post_url),
			$.get('https://graph.facebook.com/?fields=og_object{likes.summary(true).limit(0)},share&id=' + ssb_alternate_post_url)
		).then(function (a, b) {
			if (typeof a[0].share !== 'undefined') {
				var f1 = absint(a[0].share.share_count);
				var f2 = absint(a[0].share.comment_count);
				var f3 = typeof a[0].og_object !== 'undefined' ? absint(a[0].og_object.likes.summary.total_count) : 0;
				var fShares = f1 + f2 + f3;
				if (ssb_alternate_post_url && typeof b[0].share !== 'undefined') {
					var f4 = absint(b[0].share.share_count);
					var f5 = absint(b[0].share.comment_count);
					var f6 = typeof b[0].og_object !== 'undefined' ? absint(b[0].og_object.likes.summary.total_count) : 0;
					var fShares2 = f4 + f5 + f6;
					if (fShares !== fShares2) {
						fShares += fShares2;
					}
				}
				ssbPostData = {
					action: 'ssb_facebook_shares_update',
					security: SSB.fb_share_nonce,
					post_id: ssb_post_id,
					share_counts: fShares
				};
				$.post(SSB.ajax_url, ssbPostData);
			}
		});
	};

	// Listen for the jQuery ready event on the document
	$(function () {
		// The DOM is ready!
		if ($('div[class*="simplesocialbuttons-float"]').length > 0) {
			$('body').addClass('body_has_simplesocialbuttons');
		}
	});

	$(window).on('load', function () {
		$('.ssb_custom-button').on('click', function () {
			$('.ssb_wrapper_mobile').addClass('ssb_wrapper_mobile_open');
		});
		$('.ssb_wrapper-closed').on('click', function () {
			$('.ssb_wrapper_mobile').removeClass('ssb_wrapper_mobile_open');
		});
		var allMods = $(".simplesocialbuttons_inline");
		// Already visible modules
		allMods.each(function (i, el) {
			var $el = $(el);
			if ($el.visible(true)) {
				$el.addClass('simplesocialbuttons-inline-in');
			}
		});

		$(window).on('scroll', function () {
			allMods.each(function (i, el) {
				var $el = $(el);
				if ($el.visible(true)) {
					$el.addClass('simplesocialbuttons-inline-in');
				}
			});
		});

		var sidebarwidth = $('div[class*="simplesocialbuttons-float"]>a:first-child').outerWidth(true);
		$('div[class*="simplesocialbuttons-float"]').css('width', sidebarwidth + 'px');
		$('.simplesocialbuttons.ssb_counter-activate:not(.simplesocial-round-txt):not(.simplesocial-round-icon):not(.simplesocial-simple-icons) button:not(.simplesocial-viber-share):not(.simplesocial-whatsapp-share):not(.simplesocial-msng-share):not(.simplesocial-email-share):not(.simplesocial-print-share):not(.simplesocial-copy-link):not(.simplesocial-linkedin-share)').each(function () {
			var $el = $(this);
			setTimeout(function () {
				var $elWidth = $el.children('.ssb_counter').innerWidth();
				$el.css('padding-right', $elWidth + 10);
			}, 100);
		});
	});

	function docLoadedFun() {
		var hideSidebarButton = '<span class="ssb-hide-floating-bar"> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 370.814 370.814"><path d="M292.92 24.848L268.781 0 77.895 185.401l190.886 185.413 24.139-24.853-165.282-160.56"></path></svg> </span>';
		if (document.querySelector('div[class*="simplesocialbuttons-float"]')) {
			document.querySelector('div[class*="simplesocialbuttons-float"]').insertAdjacentHTML('beforeend', hideSidebarButton);
			document.querySelector('.ssb-hide-floating-bar').addEventListener('click', toggleSidebarButtons);
		}
	}

	function toggleSidebarButtons() {
		var leftSidebar = document.querySelector('div[class*="simplesocialbuttons-float"]');
		leftSidebar.classList.toggle('ssb-hide-float-buttons');
	}

	document.addEventListener('DOMContentLoaded', docLoadedFun);

})(window.jQuery, window, document);

// function to copy the current link to clipboard
function ssb_copy_share_link(clickedButton) {
    const textArea = document.createElement('textarea');
    const url = clickedButton.dataset.href;
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        const copied = document.execCommand('copy');
        if (copied) {
			if(jQuery(clickedButton).closest('.simplesocial-simple-round').length === 0){
				jQuery(clickedButton).attr('data-tooltip', 'Copied');
			}else{
				jQuery(clickedButton).find('.ssb_tooltip').show();
			}
			clickedButton.classList.add('ssb_copy_btn');
			setTimeout(() => {
				jQuery(clickedButton).removeAttr('data-tooltip');
				clickedButton.classList.remove('ssb_copy_btn');
				jQuery(clickedButton).find('.ssb_tooltip').hide();
			}, 1500);
            
        } else {
            console.warn('Failed to copy URL using text area selection.');
        }
    } catch (err) {
        console.error('Failed to copy URL:', err);
    } finally {
        document.body.removeChild(textArea); 
    }
}
