//
jQuery.noConflict();
// cookie function
jQuery.cookie = function (key, value, options) {
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
//
var page_loaded = false;
//
jQuery(window).load(function() {
	setTimeout(function() {
		if(jQuery('#gkTopBar').length > 0) {
			jQuery('#gkTopBar').addClass('active');
		}
	}, 500);
	//
	page_loaded = true;

	if(jQuery(document.body).attr('data-smoothscroll') == '1') {
		// smooth anchor scrolling
		    if(
        !(
            jQuery('#gkMainbody').find('.subpage').length && 
            jQuery('#gkMainbody').find('.subpage').hasClass('edit')
        ) && !(
            jQuery('#modules-form').length
        )
    ) {
        jQuery('a[href*="#"]').on('click', function (e) {
            e.preventDefault();
            if(
                this.hash !== '' && 
                this.hash.indexOf('carousel') === -1 &&
                this.hash.indexOf('advancedSearch') === -1
            ) {
                var target = jQuery(this.hash);

                if(this.hash !== '' && this.href.replace(this.hash, '') == window.location.href.replace(window.location.hash, '')) {    
                    if(target.length && this.hash !== '#') {
                        jQuery('html, body').stop().animate({
                            'scrollTop': target.offset().top
                        }, 1000, 'swing', function () {
                            if(this.hash !== '#') {
                                window.location.hash = target.selector;
                            }
                        });
                    } else if(this.hash !== '' && this.href.replace(this.hash, '') !== '') {
                        window.location.href = this.href;
                    }
                } else if(this.hash !== '' && this.href.replace(this.hash, '') !== '') {
                    window.location.href = this.href;
                }
            }
        });
    }
	}
	
	// style area
	if(jQuery('#gkStyleArea').length > 0){
		jQuery('#gkStyleArea').find('a').each(function(i, element){
			jQuery(element).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				changeStyle(i+1);
			});
		});
	}
	
	// system message container auto hide
	if(jQuery('#system-message-container').length > 0){
		jQuery('#system-message-container').each(function(i, element){
			(function() {
				jQuery(element).fadeOut('slow');
			}).delay(3500);
		});
	} 
	
	// font-size switcher
	if(jQuery('#gkTools').length > 0 && jQuery('#gkMainbody').length > 0) {
		var current_fs = 100;
		
		jQuery('#gkMainbody').css('font-size', current_fs+"%");
		
		jQuery('#gkToolsInc').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs < 150) {  
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs + 10) + "%"}, 200); 
				current_fs += 10; 
			} 
		});
		jQuery('#gkToolsReset').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			jQuery('#gkMainbody').animate({ 'font-size' : "100%"}, 200); 
			current_fs = 100; 
		});
		jQuery('#gkToolsDec').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs > 70) { 
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs - 10) + "%"}, 200); 
				current_fs -= 10; 
			} 
		});
	}
	// K2 font-size switcher fix
	if(jQuery('#fontIncrease').length > 0 && jQuery('.itemIntroText').length > 0) {
		jQuery('#fontIncrease').click(function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText largerFontSize');
		});
		
		jQuery('#fontDecrease').click( function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText smallerFontSize');
		});
	}	
	// NSP pagination in highlights suffix
	if(jQuery('.nspMain').length > 0) {
		jQuery('.nspMain').each(function(i, mod) {
			mod = jQuery(mod);
			var interface = mod.find('.nspTopInterface');
			if(mod.hasClass('highlights') && interface.length > 0) {
				var title_area = new jQuery('<div class="nspTitleArea"></div>');
				interface.append(title_area);
				var current_art = 1;
				var titles = mod.find('.nspArt .nspHeader');
				title_area.append(titles[1].clone());
				// prev button event
				interface.find('.nspPrev').click( function() {
					current_art = (current_art > 0) ? current_art - 1 : titles.length - 1;
					title_area.html('');
					title_area.append(titles[current_art].clone());
				});
				// next button event
				interface.find('.nspNext').click(function() {
					current_art = (current_art < titles.length - 1) ? current_art + 1 : 0;
					title_area.html('');
					title_area.append(titles[current_art].clone());
				});
			}
		});
	}
});

jQuery(document).ready(function() {
	if(jQuery('.gkLogoutButton').length) {
		jQuery('.gkLogoutButton').on('click', function(e) {
			e.preventDefault();
			console.log('submit');
			jQuery('#gkLogoutForm').submit();
		});
	}

	var resize_boundary = parseInt(jQuery('body').attr('data-tablet-width'), 10);
	var small_resize_boundary = parseInt(jQuery('body').attr('data-tablet-small-width'), 10);
	var mobile_resize_boundary = parseInt(jQuery('body').attr('data-mobile-width'), 10);
	
	var col_page_content = jQuery('#gkPageContent');
	var col_sidebar_left = jQuery('#gkSidebarLeft');
	var col_sidebar_right = jQuery('#gkSidebarRight');
	var col_inset = jQuery('#gkInset');
	var col_content = jQuery('#gkContentWrap').children('div');
	var col_areas = jQuery('.gkEqualColumns');

	var columnResize = function() {
		col_page_content.css('min-height', '0');
		col_content.css('min-height', '0');
		if(col_sidebar_left) col_sidebar_left.css('min-height', '0');
		if(col_sidebar_right) col_sidebar_right.css('min-height', '0');
		if(col_inset) col_inset.css('min-height', '0');
		
		// Desktop devices
		if(jQuery(window).width() > resize_boundary) {
			var col_page_content_h = col_page_content.height();
			var col_content_h = col_content.height();
			var col_sidebar_left_h = (col_sidebar_left) ? col_sidebar_left.height() : 0;
			var col_sidebar_right_h = (col_sidebar_right) ? col_sidebar_right.height() : 0;
			var col_inset_h = (col_inset) ? col_inset.height() : 0;
			
			// check main columns - left, right sidebars
			var max_sidebars = col_page_content_h;
			if(max_sidebars < col_sidebar_left_h) max_sidebars = col_sidebar_left_h;
			if(max_sidebars < col_sidebar_right_h) max_sidebars = col_sidebar_right_h;
			col_page_content.css('min-height', max_sidebars + "px");
			if(col_sidebar_left) col_sidebar_left.css('min-height', (max_sidebars + 1) + "px");
			if(col_sidebar_right) col_sidebar_right.css('min-height', max_sidebars + "px");
			// check content columns - content + inset
			var max_content = col_content_h;
			if(max_content < col_inset_h) max_content = col_inset_h;
			col_content.css('min-height', max_content + "px");
			if(col_inset) col_inset.css('min-height', max_content + "px");
			
			col_areas.each(function(i, area) {
				area = jQuery(area);
				var cols = area.children('div');
				if(cols.length > 1) {
					cols.css('min-height', '0');
					var max_h = 0;
					
					cols.each(function(i, column) {
						column = jQuery(column);
						if(column.height() > max_h) {
							max_h = column.height();
						}
					});
					
					cols.css('min-height', max_h + "px");
				}
			});
		// Tablet devices
		} else if(jQuery(window).width() <= resize_boundary && jQuery(window).width() > small_resize_boundary) {
			var col_page_content_h = col_page_content.height();
			var col_content_h = col_content.height();
			var col_sidebar_left_h = (col_sidebar_left) ? col_sidebar_left.height() : 0;
			var col_inset_h = (col_inset) ? col_inset.height() : 0;
			
			// check main columns - left, right sidebars
			var max_sidebars = col_page_content_h;
			if(max_sidebars < col_sidebar_left_h) max_sidebars = col_sidebar_left_h;
			col_page_content.css('min-height', max_sidebars + "px");
			if(col_sidebar_left) col_sidebar_left.css('min-height', (max_sidebars + 1) + "px");
			// check content columns - content + inset
			var max_content = col_content_h;
			if(max_content < col_inset_h) max_content = col_inset_h;
			col_content.css('min-height', max_content + "px");
			if(col_inset) col_inset.css('min-height', max_content + "px");
			
			col_areas.each(function(i, area) {
				area = jQuery(area);
				var cols = area.children('div');
				if(cols.length > 1) {
					cols.css('min-height', '0');
					var max_h = 0;
					
					cols.each(function(i, column) {
						column = jQuery(column);
						if(column.height() > max_h) {
							max_h = column.height();
						}
					});
					
					cols.css('min-height', max_h + "px");
				}
			});
		// Small tablet devices
		} else if(jQuery(window).width() <= small_resize_boundary && jQuery(window).width() > mobile_resize_boundary) {
			col_areas.each(function(i, area) {
				area = jQuery(area);
				var cols = area.children('div');
				if(cols.length > 1) {
					cols.css('min-height', '0');
					var max_h = 0;
					
					cols.each(function(i, column) {
						column = jQuery(column);
						if(column.height() > max_h) {
							max_h = column.height();
						}
					});
					
					cols.css('min-height', max_h + "px");
				}
			});
		}
	}
	
	columnResize();
	
	setTimeout(function() { columnResize(); }, 1000);
	setTimeout(function() { columnResize(); }, 2500);
	setTimeout(function() { columnResize(); }, 5000);
	setTimeout(function() { columnResize(); }, 10000);
	setTimeout(function() { columnResize(); }, 15000);

	jQuery(window).resize(function() {
		columnResize();
	});
});

// Function to change styles
function changeStyle(style){
	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	jQuery('head').append('<link rel="stylesheet" href="'+file1+'" type="text/css" />');
	jQuery('head').append('<link rel="stylesheet" href="'+file2+'" type="text/css" />');
	jQuery.cookie('gk_news2_j30_style', style, { expires: 365, path: '/' });

}