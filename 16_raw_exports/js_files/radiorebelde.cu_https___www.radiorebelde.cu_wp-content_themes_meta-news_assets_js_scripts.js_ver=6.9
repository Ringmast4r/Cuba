jQuery( function() {

	// toggle to display top right menu
	var info_links_nav = jQuery('.info-bar .infobar-links'),
		social_profiles_nav = jQuery('.info-bar .social-profiles'),
		button_info_links = info_links_nav.find('.info-bar-links-menu-toggle'),
		button_social_profiles = social_profiles_nav.find('.info-bar-social-profiles-toggle');

	jQuery('.infobar-links-menu-toggle').on( 'click', function() {
		info_links_nav.toggleClass('toggled-link-on');
		var social_profile_toggle_on = jQuery('.info-bar .social-profiles.toggled-social-profiles-on');
		if (social_profile_toggle_on) {
			social_profile_toggle_on.removeClass('toggled-social-profiles-on');
		}
	} );
	jQuery('.infobar-social-profiles-toggle').on( 'click', function() {
		social_profiles_nav.toggleClass('toggled-social-profiles-on');
		var info_link_toggle_on = jQuery('.info-bar .infobar-links.toggled-link-on');
		if (info_link_toggle_on) {
			info_link_toggle_on.removeClass('toggled-link-on');
		}
	} );

	// hide #back-top first
	jQuery(".back-to-top").hide();

	// fade in #back-top
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 1000) {
				jQuery('.back-to-top').fadeIn();
			} else {
				jQuery('.back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		jQuery('.back-to-top a').on( "click", function () {
			jQuery('body,html,header').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

	// toggle to hide and show the dropdown Submenu in smaller screen
	jQuery('.main-navigation').find( '.sub-menu, .children' ).before( '<span class="dropdown-toggle"><span class="dropdown-icon"></span></span>' );
	jQuery('.main-navigation').find( '.sub-menu, .children' ).parent().addClass('dropdown-parent');
	jQuery('.main-navigation').find( '.dropdown-toggle').on('click',function(e){
		e.preventDefault();
		jQuery(this).next('.sub-menu, .children').toggleClass('dropdown-active');
		jQuery(this).toggleClass( 'toggle-on' );
	});

	jQuery(window).on("load resize",function(e){
		var screenwidth = jQuery(window).outerWidth();
		if ( screenwidth >= 992 ) {
			jQuery('.main-navigation').find( '.sub-menu.dropdown-active, .children.dropdown-active' ).removeClass('dropdown-active');
			jQuery('.main-navigation').find( '.dropdown-toggle.toggle-on').removeClass('toggle-on');
		}
	});

	/* make sticky top when sticky content height is less than window height */
	jQuery(window).on("load resize scroll",function(e){
		var doc_height = jQuery(window).outerHeight(),
			wp_admin_bar = jQuery('#wpadminbar').outerHeight(),
			col_cnt = jQuery('.site-content-row .sticky-column-bottom').find('.column-inner'),
			col_cnt_count = col_cnt.length;

		for (i = 0; i < col_cnt_count; i++) {

			if (jQuery(col_cnt[i]).outerHeight() < doc_height ) {
				jQuery(col_cnt[i]).parent('.sticky-column-bottom').addClass('sticky-column-top');
				jQuery(col_cnt[i]).parent('.sticky-column-bottom').removeClass('sticky-column-bottom');

				if (wp_admin_bar) {
					var top_value = 20,
						top_value = top_value + wp_admin_bar;

					jQuery(col_cnt[i]).parent('.sticky-column-top').css({"top":top_value});
				}
			}
		}

	});

	/* focus on form input when modal is shown */
	jQuery('#search-modal').on('shown.bs.modal', function () {
		jQuery('#search-modal .form-control').trigger('focus')
	})

});