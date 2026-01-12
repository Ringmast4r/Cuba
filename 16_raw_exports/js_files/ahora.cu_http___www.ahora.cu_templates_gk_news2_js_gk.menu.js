jQuery(window).load(function() {
    if(jQuery('#gkExtraMenu')  && jQuery('#gkMainMenu').hasClass('gkMenuClassic')) {
        // fix for the iOS devices     
        /* jshint ignore:start */
        jQuery('#gkExtraMenu ul li span').each(function(i, el) {
            el.attr('onmouseover', '');
        });
		/* jshint ignore:end */
        jQuery('#gkExtraMenu ul li a').each(function(i, el) {
            el = jQuery(el);
            el.attr('onmouseover', '');

            if(el.parent().hasClass('haschild') && jQuery('body').attr('data-tablet') !== undefined) {
                el.click(function(e) {
                    if(el.attr("dblclick") === undefined) {
                        e.preventDefault();
                        e.stopPropagation();
                        el.attr("dblclick", new Date().getTime());
                    } else {
						if(el.parent().find('div.childcontent').eq(0).css('overflow') == 'visible') {
							window.location = el.attr('href');
						}
                        var now = new Date().getTime();
                        if(now - el.attr("dblclick", 0) < 500) {
                            window.location = el.attr('href');
                        } else {
                           e.preventDefault();
                           e.stopPropagation();
                           el.attr("dblclick", new Date().getTime());
                        }
                    }
                });
            }
        });

        var base = jQuery('#gkExtraMenu');
		
		base.find('.childcontent-inner').each(function(i, submenu) {
			var cols = jQuery(submenu).children('.gkcol');
			
			if(cols.length > 1) {
				var max = jQuery(cols[0]).outerHeight();
				
				for(var i = 0; i < cols.length; i++) {
					max = jQuery(cols[i]).outerHeight() > max ? jQuery(cols[i]).outerHeight() : max;
				}
				
				cols.css('height', max + "px");
			}
		});
        if($GKMenu && ($GKMenu.height || $GKMenu.width)) {    
            base.find('li.haschild').each(function(i, el){   
				el = jQuery(el);  
                if(el.children('.childcontent').length > 0) {
                    var content = el.children('.childcontent').first();
                    var prevh = content.outerHeight();
                    var prevw = content.outerWidth();
					var duration = $GKMenu.duration;
					var heightAnim = $GKMenu.height;
					var widthAnim = $GKMenu.width;
					

                    var fxStart = { 
						'height' : heightAnim ? 0 : prevh, 
						'width' : widthAnim ? 0 : prevw, 
						'opacity' : 0 
					};
					var fxEnd = { 
						'height' : prevh, 
						'width' : prevw, 
						'opacity' : 1 
					};	
					
					
                    content.css(fxStart);
                    content.css({'left' : 'auto', 'overflow' : 'hidden' });
					//						
					el.mouseenter(function() {                    
                        var content = el.children('.childcontent').first();
                        var basicMargin = -1;
                        content.css('display', 'block');
													
						var pos = content.offset();
						var winWidth = jQuery(window).outerWidth();
						var winScroll = jQuery(window).scrollLeft();
						
						content.addClass('active');
						
						// calculations
						var posStart = pos.left;
						var posEnd = pos.left + prevw;
						
						if(el.parent().hasClass('level0')) {
							content.css('margin-left', basicMargin + "px");
							pos = content.offset();
							posStart = pos.left;
							posEnd = pos.left + prevw;
							
							if(posStart < 0) {
								content.css('margin-left', content.css('margin-left').toInt() + (-1 * posStart) + 10);
							}
							
							if(posEnd > winWidth + winScroll) {
								var diff = (winWidth + winScroll) - posEnd;
								content.css('margin-left', content.css('margin-left').toInt() + diff - 24);
							}
						} else {
							var diff = (winWidth + winScroll) - posEnd;
							
							if(posEnd > winWidth + winScroll) {
								content.css('margin-left', "-160px");
							}
						}
						//
						content.stop().animate(
		                    fxEnd, 
		                    {
			                    "duration": duration, 
			                    "queue": false,
			                    "complete": function() { 
						                        if(content.outerHeight() === 0){ 
						                            content.css('overflow', 'hidden'); 
						                        } else if(
						                            content.outerHeight(true) - prevh < 30 && 
						                            content.outerHeight(true) - prevh >= 0
						                        ) {
						                            content.css('overflow', 'visible');
						                        }
						                    }
		                    }
		                );
					});
				el.mouseleave(function(){
				
						content.css({
							'overflow': 'hidden'
						});
						//
						content.stop().animate(
		                    fxStart, 
		                    {
		                        "duration": duration, 
		                        "queue": false,
		                        "complete": function() { 
						                        if(content.outerHeight() === 0){ 
						                            content.css('overflow', 'hidden'); 
						                        } else if(
						                            content.outerHeight(true) - prevh < 30 && 
						                            content.outerHeight(true) - prevh >= 0
						                        ) {
						                            content.css('overflow', 'visible');
						                        }
						                        content.removeClass('active');
						                        content.css('display', 'none');
						                    }
						    }
		                );
					});
				}
			});
            
            base.find('li.haschild').each(function(i, el) {
				el = jQuery(el);
				content = jQuery(el.children('.childcontent').first());
				content.css({ 'display': 'none' });
			});       
        }
	} else if(jQuery('#gkExtraMenu').length > 0 && jQuery('#gkMainMenu').hasClass('gkMenuOverlay')) {
		var overlay = new jQuery('<div id="gkMenuOverlay">&nbsp;</div>');
		//
		jQuery('body').append(overlay);
		overlay.fadeOut();
		//
		var overlaywrapper = new jQuery('<div id="gkMenuOverlayWrap"><div><i id="gkMenuOverlayClose" class="fa fa-times"></i><h3 id="gkMenuOverlayHeader"></h3><div id="gkMenuOverlayContent"></div></div></div>');
		//
		jQuery('body').append(overlaywrapper);
		overlay.fadeOut();
		overlaywrapper.fadeOut();
		//
		var overlaywrap = overlaywrapper.find('div');
		overlaywrap.fadeOut();
		var header = jQuery('#gkMenuOverlayHeader');
		var content = jQuery('#gkMenuOverlayContent');
		header.css('margin-top', '-100px');
		var submenus = [];
		//
		jQuery('#gkMenuOverlayClose').click(function() {
			overlay.fadeOut();
			overlaywrapper.fadeOut();
			overlaywrap.fadeOut();
			header.animate({marginTop: '-100px'}, 500); 
    		setTimeout(function() {
    			overlay.removeClass('open');
    			overlaywrapper.removeClass('open');
    			header.html('');
    			content.html('');
    		}, 500);
    	});
    	
    	overlay.click(function(e) {
    		e.stopPropagation();
    		e.preventDefault();
    		if(jQuery(e.target).attr('id') === 'gkMenuOverlay') {
    			jQuery('#gkMenuOverlayClose').trigger('click');	
    		}
    	});
    	
    	jQuery('#gkExtraMenu').find('.haschild').each(function(i, el) {
    		el = jQuery(el);
    		if(el.parent().hasClass('level0')) {
    			var link = el.children('a');
    			submenus[link.attr('id')] = {
    				"link": link,
    				"submenu": el.children('.childcontent')
    			};
    			
    			link.click(function(e) {
    				e.preventDefault();
    				overlay.css('height', jQuery('body').height());
    				var menuID = jQuery(e.target).attr('id');
    				header.html('');
    				header.append(submenus[menuID].link.clone());
    				content.html('');
    				content.append(submenus[menuID].submenu.clone());
    				overlay.addClass('open');
    				overlaywrapper.css('margin-top', jQuery(window).scrollTop() + "px");
    				overlaywrapper.addClass('open');
    				overlay.css('opacity', '0.01');
    				overlay.css('opacity', '1').fadeIn();
    				overlaywrapper.css('opacity', '1').fadeIn();
    				
    				setTimeout(function() {
    					overlaywrap.css('opacity', '1').fadeIn();
    					header.animate({marginTop: '0px'}, 500);
    				}, 500);
    			});
    		}
    	});
    }
    
    // fixed menu
    //
    // create container for the fixed menu
    var menuWrap = new jQuery('<div id="gkFixedMenu"></div>');
    
    menuWrap.html('<div class="gkPage"></div>');
    jQuery('body').append(menuWrap);
    var menupos = jQuery('#gkTopNav').position().top + 80;
    var menucontent = jQuery('#gkTopNav');
    var logo = jQuery('#gkLogo');

    if(logo.length > 0) {
    	menuWrap.find(' > div').prepend(logo.clone(true).attr('id', 'gkLogoSmall'));
    }

    jQuery(window).scroll(function() {
        var currentPosition = jQuery(window).scrollTop();
       
        if(currentPosition > menupos && !menuWrap.hasClass('active')) {
            menuWrap.addClass('active');
            menuWrap.find('> div').append(menucontent);
        } else if(currentPosition < menupos && menuWrap.hasClass('active')) {
            menuWrap.removeClass('active');
            if(jQuery('#gkToolbar').length > 0) {
            	menucontent.insertBefore(jQuery('#gkToolbar'));
            } else {
            	menucontent.insertAfter(jQuery('#gkTopBar'));
            }
        }
    });
}); 