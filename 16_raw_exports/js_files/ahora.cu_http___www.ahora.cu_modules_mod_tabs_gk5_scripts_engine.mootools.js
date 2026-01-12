window.addEvent('load', function(){
	document.getElements('.gkTabsGK5').each(function(el,i){
		var config = JSON.decode(el.get('data-config')); 
		config['module_id'] = el.getProperty('id');
		var tabs = el.getElements('.gkTabsItem');
		var items = el.getElements('.gkTabsNav .gkTab');
		var tabs_wrapper = el.getElement('.gkTabsContainer');
		var animation = (config['animation'] == 0) ? true : false;
		var amount = tabs.length;
		var timer = false;
		config['current_tab'] = config['active_tab'] - 1;
		config['previous_tab'] = null;
		config['blank'] = false;
		config['falsy_click'] = false;
		config['hover'] = false;
		var animation_type = config['animation_type'];
		var tab_animation = [];
		
		el.addEvent('mouseenter', function() {
			config['hover'] = true;
		});
		
		el.addEvent('mouseleave', function() {
			config['hover'] = false;
		});
		
		// prepare tabs animation
		tabs.each(function(tab, i){ 
			tab_animation[i] = new Fx.Morph(tab, {duration: config['animation_speed'], wait: 'ignore'});
		});
			
		tabs_wrapper.setStyle('height', 'auto');
		// set the fixed height
		if(config['auto_height'] == '0') {
			tabs_wrapper.setStyle('height', config['module_height'] + 'px');
		}
		// add events to tabs
		items.each(function(item, i){
			item.addEvent(config['activator'], function(){
				tabsGK5Animation(i, tabs_wrapper, tab_animation, tabs, items, config);
			});
		});
		// add events to buttons
		if(el.getElement('.gkTabsButtonNext')) {
			el.getElement('.gkTabsButtonNext').addEvent('click', function() {
				if(config['current_tab'] < amount - 1) {
					tabsGK5Animation(config['current_tab'] + 1, tabs_wrapper, tab_animation, tabs, items, config);
				} else {
					tabsGK5Animation(0, tabs_wrapper, tab_animation, tabs, items, config);	
				}
			});
			
			el.getElement('.gkTabsButtonPrev').addEvent('click', function() {
				if(config['current_tab'] > 0) {
					tabsGK5Animation(config['current_tab'] - 1, tabs_wrapper, tab_animation, tabs, items, config);
				} else {
					tabsGK5Animation(amount - 1, tabs_wrapper, tab_animation, tabs, items, config);
				}
			});
		}
		//
		if(config["animation"] == 1) {
			timer = (function(){
				if(config['hover']) {
					config['blank'] = true;
				}
			
				if(!config['blank']) {
					config['falsy_click'] = true;
					if(config['current_tab'] < amount - 1) {
						tabsGK5Animation(config['current_tab'] + 1, tabs_wrapper, tab_animation, tabs, items, config);
					} else {
						tabsGK5Animation(0, tabs_wrapper, tab_animation, tabs, items, config);
					}
				} else {
					config['blank'] = false;
				}
			}).periodical(config["animation_interval"]);
		}
		// touch events
		if(el.get('data-swipe') == '1') {
			var links_pos_start_x = 0;
			var links_pos_start_y = 0;
			var links_time_start = 0;
			var links_swipe = false;
			
			el.addEvent('touchstart', function(e) {
				links_swipe = true;
				
				if(e.changedTouches.length > 0) {
					links_pos_start_x = e.changedTouches[0].pageX;
					links_pos_start_y = e.changedTouches[0].pageY;
					links_time_start = new Date().getTime();
				}
			});
			
			el.addEvent('touchmove', function(e) {
				if(e.changedTouches.length > 0 && links_swipe) {
					if(
						Math.abs(e.changedTouches[0].pageX - links_pos_start_x) > Math.abs(e.changedTouches[0].pageY - links_pos_start_y)
					) {
						e.preventDefault();
					} else {
						links_swipe = false;
					}
				}
			});
			
			el.addEvent('touchend', function(e) {
				if(e.changedTouches.length > 0 && links_swipe) {					
					if(
						Math.abs(e.changedTouches[0].pageX - links_pos_start_x) >= 30 && 
						new Date().getTime() - links_time_start <= 500
					) {
						if(e.changedTouches[0].pageX - links_pos_start_x > 0) {
							if(config['current_tab'] > 0) {
								tabsGK5Animation(config['current_tab'] - 1, tabs_wrapper, tab_animation, tabs, items, config);
							} else {
								tabsGK5Animation(amount - 1, tabs_wrapper, tab_animation, tabs, items, config);
							}
						} else {
							if(config['current_tab'] < amount - 1) {
								tabsGK5Animation(config['current_tab'] + 1, tabs_wrapper, tab_animation, tabs, items, config);
							} else {
								tabsGK5Animation(0, tabs_wrapper, tab_animation, tabs, items, config);	
							}
						}
					}
				}
			});
		}
	});
});

var tabsGK5Animation = function(i, tabs_wrapper, tab_animation, tabs, items, config) {
	var direction = (config['rtl'] == 0) ? 'left' : 'right';
	
	if(i != config['current_tab']) {
		config['previous_tab'] = config['current_tab'];
		config['current_tab'] = i;
		
		if(config['auto_height'] == '1') {
			tabs_wrapper.setStyle('min-height', tabs_wrapper.getSize().y + 'px');
		}
		
		tabs.removeClass('gk-active');
		tabs[i].addClass('gk-active');
		tabs[config['previous_tab']].removeClass('gk-active');
		tabs[config['previous_tab']].addClass('gk-hidden');
		tabs[i].removeClass('gk-hide');
		tabs[i].removeClass('gk-hidden');
		tabs[i].addClass('gk-active');
		
		items[config['previous_tab']].removeClass('active');
		items[i].addClass('active');
		
		var prev = config['previous_tab'];
		
		setTimeout(function() {
			if(tabs[prev].hasClass('gk-hidden') && !tabs[prev].hasClass('gk-active')) {
				tabs[prev].removeClass('gk-hidden');
				tabs[prev].addClass('gk-hide');
			}
		}, 350);
		
		//
		if(config['auto_height'] == '1') {
			tabs_wrapper.setStyle('min-height', tabs[i].getSize().y + "px");
			
			setTimeout(function() {
				tabs_wrapper.setStyle('height', 'auto');
			}, 350);
		}
		
		// external trigger
		if(typeof gkTabEventTrigger !== 'undefined') {
			gkTabEventTrigger(i, i, config['module_id']);
		}
		// common operations for both types of animation
		if(!config['falsy_click']) {
			config['blank'] = true;
		} else {
			config['falsy_click'] = false;
		}
		
		if(config['cookie_save'] == 1) {
			Cookie.write('gktab-' + config['module_id'], i + 1, { domain: '/', duration: 256 });
		}
	}
};