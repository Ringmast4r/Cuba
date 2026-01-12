(function ($) {
	"use strict";
	var PENCI = PENCI || {};
	PENCI.penci_review = function () {
		$('.penci-review-process').each(function(){
			var $this = $(this ),
				$bar = $this.children(),
				$bar_w = $bar.data('width') * 10;
			$this.one('inview', function(event, isInView, visiblePartX, visiblePartY) {
				$bar.animate({width: $bar_w + '%'}, 1000 );
			}); // bind inview
		}); // each
	
		$('.penci-piechart').each(function(){
			var $this = $(this);
			$this.one('inview', function(event, isInView, visiblePartX, visiblePartY) {
				var chart_args = {
					barColor	:	$this.data('color'),
					trackColor	:	$this.data('trackcolor'),
					scaleColor	:	false,
					lineWidth	:	$this.data('thickness'),
					size		:	$this.data('size'),
					animate		:	1000
				};
				$this.easyPieChart(chart_args);
			}); // bind inview
		}); // each
	}

	$(document).ready(function () {
		PENCI.penci_review();
	});

	$(window).on("elementor/frontend/init", function () {
		if (window.elementorFrontend && elementorFrontend.isEditMode()) {
			elementorFrontend.hooks.addAction(
				"frontend/element_ready/penci-review.default",
				function ($scope) {
					PENCI.penci_review();
				}
			);
		}
	});

})(jQuery);