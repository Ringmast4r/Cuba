/*
 *  Project: Responsive Widget
 *  Description: Responsive Widget 
 *  Author: YouTech Company
 *  License: YouTech Company http://www.smartaddons.com
 */

!function ( $, window, undefined ) {
    
    // Create the defaults once
    var pluginName = 'responsiver',
        document = window.document,
        defaults = {
            interval: 800,
            speed: 800,
            fx: 'slide',
            start: 0,
            itemExpr: '.item',
            reverse: false,
            step: 1,
            pause: 'hover',
            control: {
            	next: null,
            	prev: null,
            	pager: null,
            	pause: null
            },
            selector:{
            	item: '.item',		// require
            	container: '.vpi-wrap'	// require            	
            }
        };

    // The actual plugin constructor
    var Responsiver = function (element, options) {
        this.element = $(element);
        this.options = options;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.element.removeClass('not-js').addClass('js-loaded');
        
        
        this.container = $(this.options.selector.container, this.element);
        this.viewport  = this.container.parent();
        this.items = $(this.options.selector.item, this.container);
        
//        console.log(this.container);
//        console.log(this.viewport);
//        console.log(this.items);
        
        this.sliding = false;
        this.current = this.options.start || 0;
        this.slidingTo = this.current;
        this.count = this.items.length;
        
        if (this.options.control.prev || this.options.control.next || this.options.control.pager || this.options.control.pause){
        	this.options.control.prev && $(this.options.control.prev).click($.proxy(this.prev, this));
        	this.options.control.next && $(this.options.control.next).click($.proxy(this.next, this));
        	this.options.control.pause && $(this.options.control.pause).click(function(e){
        	});
        }
        
        if (this.options.preload){
        	var imgs = $('img', this.items),
        		imgsrc = [],
        		imgload = 0,
        		that = this,
        		already = function(){
        			if (imgload == imgsrc.length) that.init();
        		};
        	if (imgs.length){
        		for(var i=0; i<imgs.length; i++){
        			var s = $(imgs[i]).attr('data-src') || $(imgs[i]).attr('src');
        			-1 < $.inArray(s, imgsrc) || imgsrc.push(s);
        		}
        		$.each(imgsrc, function(){
        			$('<img>').bind('error load', function(){
        				imgload++;
        				if (imgload == imgsrc.length) that.init();
        			}).attr('src', this+'?'+(time = (new Date()).getTime()));
        		});
        	} else {
        		this.init();
        	}
        } else {
        	this.init();
        }
		$(this.viewport).mouseenter($.proxy(function(e){
			this.options.pause == 'hover' && this.pause();
		}, this)).mouseleave($.proxy(function(e){
			this.options.pause == 'hover' && this.cycle();
		}, this));
        $(window).bind('resize.responsiver', this.resize.bind(this));
    }

    Responsiver.prototype = {
		init: function(duration){
//			console.log('Responsiver.init()');
			this._setViewport();
			this.to(this.slidingTo, 0);
		},
		next: function(){
			if (this.sliding) return;
//			console.log('Responsiver.next()');
			return this.slide( this._getNext() );
		},
		prev: function(){
			if (this.sliding) return;
//			console.log('Responsiver.prev()');
			return this.slide( this._getPrevious() );
		},
		pause: function(e){
//			console.log('Responsiver.pause()');
			if (!e) this.paused = true;
			clearInterval(this.interval);
			this.interval = null;
			return this;
		},
		pauseToggle: function(e){
			//console.log(e);
			//console.log(this);
		},
		slide: function(next, duration){
//			console.log('Responsiver.slide()');
			if (!next.length) return;
			var isCycling = this.interval,
				e = $.Event('slide'),
				that = this;
			
			this.sliding = true
			isCycling && this.pause();
			
			//this.container.trigger(e);
			if (e.isDefaultPrevented()) return;
			
			var slideSpeed = typeof duration == 'number' ? duration : this.options.speed;
			
			if (this.options.fx == 'slide'){
				this.container.animate({
					left: -next.position().left
				}, {
					duration: slideSpeed,
					complete: function(){
						if (that.slidingTo>=that.count){
							that.slidingTo %= that.count;
							that.container.css({
								left: -that.items.eq(that.slidingTo).position().left
							});
						}
						that.current = that.slidingTo;
						that.sliding = false;
						that.update();
					} 
				});	
			} else if (this.options.fx == 'fade'){
				var clone = this.container.clone().appendTo(this.viewport);
				this.container.css({
					opacity: 0,
					left: -next.position().left,
					'z-index': 2
				}).animate({
					opacity: 1
				}, {
					duration: slideSpeed,
					complete: function(){
						if (that.slidingTo >= that.count || that.slidingTo < 0){
							that.slidingTo += that.count;
							that.slidingTo %= that.count;
							that.container.css({
								left: -that.items.eq(that.slidingTo).position().left
							});
						}
						that.current = that.slidingTo;
						that.sliding = false;
						that.update();
					} 
				});
				$(clone).css({
					'z-index': 1
				}).animate({
					opacity: 0
				}, {
					duration: this.options.speed,
					complete: function(){
						$(this).remove();
					}
				});
			}
			
			isCycling && this.cycle();
			return this;
		},
		to: function(pos, duration){
//			console.log('Responsiver.to()');
			return this.slide( this._getNext(pos), duration );
		},
		cycle: function(e){
//			console.log('Responsiver.cycle()');
			if (!e) this.paused = false
      		this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
      		return this
		},
		update: function(){
			var opts = this.options, column = this._getColumns();
			if (this.current < 0){
				this.current += this.count;
			} else if (this.current >= this.count){
				this.current %= this.count;
			}
//			console.log('Current = ' + this.current);
			
			if (!this.options.circular){
				
			}
			
			if (!this.options.circular && this.current<=0){
				$(this.options.prev).addClass('disabled');
			} else {
				$(this.options.prev).removeClass('disabled');
			}
			if (!this.options.circular && (this.current+this._getColumns()>=this.count)){
				$(this.options.next).addClass('disabled');
			} else {
				$(this.options.next).removeClass('disabled');
			}
			
		},
		resize: function(e){
			if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(
				function(){
					this._setViewport(); // smooth height
					this.to(this.current, 0);
				}.bind(this),
				10
			);
    	},
    	_getColumns: function(){
    		if (typeof this.options.getColumns == 'function'){
				this.column = this.options.getColumns.apply(this.element, [this.element]);
			} else if (typeof this.options.getColumns == 'number'){
				this.column = this.options.getColumns;
			} else {
				var column = parseInt(this.options.getColumns);
				this.column = column ? column : 1;
			}
			if (this.options.circular === true){
				var num_clone = $('.clone', this.container).length, max = this.column + this.getStep() - 1;
				if (num_clone < max){
					for(var i = num_clone; i < max; i++){
						if (i > this.items.length - 1) break;
						this.items.eq(i).clone().appendTo(this.container).addClass('clone');
					}
				}
			}
			return this.column;
    	},
    	_setViewport: function(){    		
    		var toHeight = 0;
    		$.each(this.items, function(){
    			if (toHeight < $(this).height()){
    				toHeight = $(this).height();
    			}
    		});
    		this.viewport.stop(true, true).animate({height: toHeight}, {duration: 400});
    	},
    	_getNext: function(e){
    		if (typeof e == 'undefined'){
    			this.slidingTo = this.current + (this.isForward() ? this.getStep() : -this.getStep());
    		} else {
    			this.slidingTo = e;
    		}
    		if (this.slidingTo < 0){
    			if (!this.options.circular){
    				this.slidingTo += this.count;
    			} else {
    				var next = $('.clone:eq('+this.current+')', this.container);
    				if (next.length){
    					this.container.css({
    						left: -next.position().left
    					});
    				}
    			}
    		} else if (this.slidingTo>=this.count){
    			if (!this.options.circular){
    				this.slidingTo %= this.count;
    			} else if (this.isForward()){
    				return $('.clone:eq('+(this.slidingTo%this.count)+')', this.container);
    			}
    		}
    		return this.items.eq(this.slidingTo);
    	},
    	_getPrevious: function(e){
    		var _reverse = this.options.reverse || false;
    		this.options.reverse = !_reverse;
    		var prev = this._getNext(e);
    		this.options.reverse = _reverse;
    		return prev;
    	},
    	isForward: function(){
    		return this.options.reverse ? false : true; 		
    	},
    	getStep: function(){
    		return this.options.step;
    	}
   };

    $.fn[pluginName] = function ( option ) {
        return this.each(function () {
			var $this = $(this),
				data = $this.data('plugin_' + pluginName);
				//console.log(typeof option);
				//console.log(option);
			var	options = typeof option == 'object' ? $.extend({}, defaults, option) : defaults;
				//console.log(options);
			if (!data) $this.data('plugin_' + pluginName, (data = new Responsiver(this, options)));
			
			if (typeof option == 'number') data.to(option);
			else if (typeof option == 'string') data[option]();
			else if (options.interval) data.cycle();            
        });
    };
    
    $.fn[pluginName].Constructor = Responsiver;

}(jQuery, window);