(function($){
	$.fn.megamenu = function(options) {
		options = jQuery.extend({
								  wrap:'#meganavigator',
								  easing: "easeInOutCirc",
								  speed: 300,
	                              justify: "left",
	                              mm_timeout: 150
	                          }, options);
		var menuwrap = $(this);
		//$('li.level1').css({ 'float': options.justify });
		buildmenu(menuwrap);
		// Build menu
		function buildmenu(mwrap){
			mwrap.find('li').each(function(){
				var menucontent 		= $(this).find(".mega-content:first");
				var menuitemlink 		= $(this).find(".item-link:first");
		    	var menucontentinner 	= $(this).find(".mega-content-inner");
		    	var mshow_timer = 0;
		    	var mhide_timer = 0;
		     	var li = $(this);
		     	var islevel1 = (li.hasClass('level1'))?true:false;
				var havechild = (li.hasClass('havechild'))?true:false;
				if(menucontent){
		     		menucontent.hide();
		     	}
				li.mouseenter(function(el){
					el.stopPropagation();
					clearTimeout(mhide_timer);
					clearTimeout(mshow_timer);
					addHover(li);
					if(havechild){
						positionSubMenu(li, islevel1);
						mshow_timer = setTimeout(function(){ //Emulate HoverIntent					
							showSubMenu(li, menucontent, menucontentinner);
						}, options.mm_timeout);	
					}
				}).mouseleave(function(el){ //return;
					clearTimeout(mshow_timer);
					clearTimeout(mhide_timer);
					if(havechild){
						mhide_timer = setTimeout(function(){ //Emulate HoverIntent					
							hideSubMenu(li, menucontent, menucontentinner);
						}, options.mm_timeout);	

						//hideSubMenu(li, menucontent, menucontentinner);
					}
					removeHover(li);
			    });
			});
		}
		// Show Submenu
		function showSubMenu(li, mcontent, mcontentinner){		
			mcontentinner.animate({
				  opacity: 1
				}, 100, function() {
			});
			mcontent.stop(true, true).slideDown({ duration: options.speed, easing: options.easing});
		}
		// Hide Submenu
		function hideSubMenu(li, mcontent, mcontentinner){
			mcontentinner.animate({
				  opacity: 0
				}, 2*options.mm_timeout, function() {
			});
			mcontent.slideUp({ duration: options.mm_timeout, easing: 'linear'});
		}
		// Add class hover to li
		function addHover(el){
			$(el).addClass('hover');
			
		}
		// Remove class hover to li
		function removeHover(el){
			$(el).removeClass('hover');
		}
		// Position Submenu
		function positionSubMenu(el, islevel1){
			menucontent 		= $(el).find(".mega-content:first");
			menuitemlink 		= $(el).find(".item-link:first");
	    	menucontentinner 	= $(el).find(".mega-content-inner");
	    	wrap_O				= menuwrap.offset().left;
	    	wrap_W				= menuwrap.outerWidth();
	    	menuitemli_O		= menuitemlink.parent('li').offset().left;
	    	menuitemli_W		= menuitemlink.parent('li').outerWidth();
	    	menuitemlink_H		= menuitemlink.outerHeight();
	    	menuitemlink_W		= menuitemlink.outerWidth();
	    	menuitemlink_O		= menuitemlink.offset().left;
	    	menucontent_W		= menucontent.outerWidth();

			if (islevel1) { 
				menucontent.css({
					'top': menuitemlink_H + "px",
					'left': menuitemlink_O - menuitemli_O + 'px'
				})
				
				if(options.justify == "left"){
					var wrap_RE = wrap_O + wrap_W;
											// Coordinates of the right end of the megamenu object
					var menucontent_RE = menuitemlink_O + menucontent_W;
											// Coordinates of the right end of the megamenu content
					if( menucontent_RE >= wrap_RE ) { // Menu content exceeding the outer box
						menucontent.css({
							'left':wrap_RE - menucontent_RE + menuitemlink_O - menuitemli_O + 'px'
						}); // Limit megamenu inside the outer box
					}
				} else if( options.justify == "right" ) {
					var wrap_LE = wrap_O;
											// Coordinates of the left end of the megamenu object
					var menucontent_LE = menuitemlink_O - menucontent_W + menuitemlink_W;
											// Coordinates of the left end of the megamenu content
					if( menucontent_LE <= wrap_LE ) { // Menu content exceeding the outer box
						menucontent.css({
							'left': wrap_O
							- (menuitemli_O - menuitemlink_O) 
							- menuitemlink_O + 'px'
						}); // Limit megamenu inside the outer box
					} else {
						menucontent.css({
							'left':  menuitemlink_W
							+ (menuitemlink_O - menuitemli_O) 
							- menucontent_W + 'px'
						}); // Limit megamenu inside the outer box
					}
				}
			}else{
				_leftsub = 0;
				menucontent.css({
					'top': menuitemlink_H*0 +"px",
					'left': menuitemlink_W + _leftsub + 'px'
				})
				
				if(options.justify == "left"){
					var wrap_RE = wrap_O + wrap_W;
											// Coordinates of the right end of the megamenu object
					var menucontent_RE = menuitemli_O + menuitemli_W + _leftsub + menucontent_W;
											// Coordinates of the right end of the megamenu content
					//console.log(menucontent_RE+' vs '+wrap_RE);
					if( menucontent_RE >= wrap_RE ) { // Menu content exceeding the outer box
						menucontent.css({
							'left': _leftsub - menucontent_W + 'px'
						}); // Limit megamenu inside the outer box
					}
				} else if( options.justify == "right" ) {
					var wrap_LE = wrap_O;
											// Coordinates of the left end of the megamenu object
					var menucontent_LE = menuitemli_O - menucontent_W + _leftsub;
											// Coordinates of the left end of the megamenu content
					//console.log(menucontent_LE+' vs '+wrap_LE);
					if( menucontent_LE <= wrap_LE ) { // Menu content exceeding the outer box
						menucontent.css({
							'left': menuitemli_W - _leftsub + 'px'
						}); // Limit megamenu inside the outer box
					} else {
						menucontent.css({
							'left':  - _leftsub - menucontent_W + 'px'
						}); // Limit megamenu inside the outer box
					}
				}
			}
		}
	};
})(jQuery);
