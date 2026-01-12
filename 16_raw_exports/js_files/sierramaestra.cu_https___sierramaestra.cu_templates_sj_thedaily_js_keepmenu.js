jQuery(window).on("load", function() {
	if(jQuery("#yt_menuwrap")){
		responsiveLayout();
		jQuery(window).resize(responsiveLayout);
	}
});

// responsiveLayout Menu
var responsiveflagMenu = false;
function responsiveLayout(element,eclass){
	offset_top = jQuery("#yt_menuwrap").offset().top;
	
   if (jQuery(document).width() >= 1200 && responsiveflagMenu == false){
		processScroll("#yt_menuwrap", "menu-fixed", offset_top);
		jQuery(window).scroll(function(){
			processScroll("#yt_menuwrap", "menu-fixed", offset_top);
		});
		responsiveflagMenu = true;
	}
	
}

// processScroll Menu

function processScroll(element, eclass, offset_top) {
	var scrollTop = jQuery(window).scrollTop();
	if(jQuery(element).height()< jQuery(window).height()){
		if (scrollTop > offset_top) {
			//fix secondary navigation
			jQuery(element).addClass(eclass);
			
			//push the .cd-main-content giving it a top-margin
			jQuery('.header-bottom').addClass('has-top-margin');	
			
			//on Firefox CSS transition/animation fails when parent element changes position attribute
			//so we to change secondary navigation childrens attributes after having changed its position value
			setTimeout(function() {
	            jQuery(element).addClass('animate-children');
	        }, 150);
		} else if (scrollTop <= offset_top) {
			jQuery(element).removeClass(eclass);
			//push the .cd-main-content giving it a top-margin
			jQuery('.header-bottom').removeClass('has-top-margin');	

			setTimeout(function() {
	            jQuery(element).removeClass('animate-children');
	        }, 150);
		}

	}
}


