;
(function($){
	$.fn.extend({
		jsmart_moduletabs: function(options){
			var defaults = {};
			var options =  $.extend(defaults, options);
			
			return this.each(function(){
				var tabs = $('.tabs-container ul.tabs li', this);
				var contents = $('.tabs-content div.tab-content', this);
				
				// preset fx height
//				contents.each(function(){
//					if( $('.ajax_loading', this) ){
//						$(this).data('fx2height', $(this).height());
//					}
//				});
			
				tabs.click(function(i){
					if ( $('.tab', this).hasClass('selected') ){
						return;
					}
					var index = tabs.index(this);
					// tab change
					$('.tab', tabs).removeClass('selected');
					$('.tab', this).addClass('selected');
					
					// content change
					var content2s = contents.get(index);
					
//					if ($(content2s).data('fx2height')){
//						var fx2height = $(content2s).data('fx2height');
//						$(content2s).parent().animate({height: fx2height}, 200);
//					}
					
					contents
						.filter('.selected')
						.removeClass('selected')
						.css({display: 'none'})
						;
					contents
						.filter(content2s)
						.addClass('selected')
						.fadeIn(400)
						;
					
//					if (options.ajaxUpdate){
//						options.ajaxUpdate.apply(contents.filter(content2s), [contents.filter(content2s), options]);
//					}
				});
			});
		}
	});
})(jQuery);
