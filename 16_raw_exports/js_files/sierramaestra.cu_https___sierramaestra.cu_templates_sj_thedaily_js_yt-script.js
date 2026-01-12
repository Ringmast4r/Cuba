// JavaScript Document
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie(c_name, defaultvalue){	//alert(document.cookie);
	var i,x,y,arrcookies=document.cookie.split(";");
	for (i=0;i<arrcookies.length;i++){
	  x=arrcookies[i].substr(0,arrcookies[i].indexOf("="));
	  y=arrcookies[i].substr(arrcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name){
		  return unescape(y);
	  }
	}
	return defaultvalue;
}

jQuery(document).ready(function($){
	
	
	var YTScript = window.YTScript = window.YTScript || { 	
		slidePositions:function(wrap, txt, events){
			$i = 0;
			$(wrap).find('div.module').each(function(){ 
				var $this = $(this);
				w_btn = $this.find('.btn-special').width();
				$this.css('top', $i*(w_btn+5)); $i++;
				$(wrap).find('div.module').removeClass('active');
				$this.css('width', $this.width());
				$this.css(txt, - $this.width());
				$this.find('.btn-special').bind(events, function(){
					//if($this.attr('class').contains('active')){
					if ( $this.attr('class').indexOf("active") !== -1 ){
						// btn
						if(txt == 'left')
							$this.animate({'left': w_btn }, 200, function(){
								$this.show().animate({'left':- $this.width()});
							});
						else
							$this.animate({'right': w_btn }, 200, function(){
								$this.show().animate({'right':- $this.width()});
							});
							
						// Module content
						if(txt == 'left')
							$(this).animate({'left': - w_btn}, 200, function(){
								$(this).show().animate({'left': $this.width()});
							});
						else
							$(this).animate({'right': - w_btn}, 200, function(){
								$(this).show().animate({'right': $this.width()});
							});
						// Class active
						$this.removeClass('active');
					}else{
						// Other modules
						$(wrap).find('div.module').each(function(){ //alert(txt);
							o_mod = $(this);
							(txt == 'left')?o_mod.animate({'left': - o_mod.width()}, 200):o_mod.animate({'right': - o_mod.width()}, 200);
							o_mod.removeClass('active');
							(txt == 'left')?o_mod.find('.btn-special').animate({'left': o_mod.width()}, 200):o_mod.find('.btn-special').animate({'right': o_mod.width()}, 200);
						});
						
						// btn
						if(txt == 'left')
							$(this).animate({'left': $this.width()}, 200, function(){
								$(this).show().animate({'left': - w_btn});
							});
						else 
							$(this).animate({'right': $this.width()}, 200, function(){
								$(this).show().animate({'right': - w_btn});
							});
						// Module content
						if(txt == 'left')
							$this.animate({'left':- $this.width()}, 200, function(){
								$this.show().animate({'left': w_btn});
							});
						else $this.animate({'right':- $this.width()}, 200, function(){
								$this.show().animate({'right': w_btn});
							});
						// Class active
						$this.addClass('active');
					}
				})
			});
		},
		checkActiveNotice:function(wrap, cookiename, status){
			$(wrap).find('div.module').each(function(){
				var $this = $(this);
				h_btn = $this.find('.btn-special').height();
				h_modcontent = $this.height();
				if(status==1 && getCookie(TMPL_NAME+'_'+cookiename)==undefined){
					createCookie(TMPL_NAME+'_'+cookiename, 1, 7);
				}
				if(getCookie(TMPL_NAME+'_'+cookiename)==1){
					$('body').animate({
						'padding-top': '0px'
					}, 200, function(){
						$('body').show().animate({
							'padding-top': $this.height()+'px'
						});
					});
					$this.animate({
						'top':- $this.height()+'px'
					}, 200, function(){
						$this.show().animate({
							'top': 0
						});
					});
					$this.find('.btn-special').animate({
						'top': h_modcontent+'px'
					}, 500, 'easeInCubic',function(){
						$(this).show().animate({
							'top': 0
						});
					});
					$this.animate({}, 200, function(){
						$(this).addClass('active');
					});
				}
			});
		},
		slidePositionNotice:function(wrap, cookiename){
			$(wrap).find('div.module').each(function(){
				var $this = $(this);
				h_btn = $this.find('.btn-special').height();
				h_modcontent = $this.height();
				$this.css('height', h_modcontent);
				$this.css('top', - h_modcontent);

				$this.find('.btn-special').css('top', h_btn);
				$this.find('.btn-special').bind('click', function(){
					if ( $this.attr('class').indexOf("active") !== -1 ){
						$('body').animate({
							'padding-top': $this.height()+'px'
						}, 200, function(){
							$('body').show().animate({
								'padding-top': '0px'
							});
						});
						$this.animate({
							'top': 0
						}, 200, function(){
							$this.show().animate({
								'top':- $this.height()+'px'
							});
						});
						//$this.find('.btn-special').css('top', h_modcontent);
						$this.find('.btn-special').animate({
							'top': 0
						}, 500, 'easeInCubic',function(){
							$(this).show().animate({
								'top': h_modcontent+'px'
							});
						});
						$this.animate({}, 200, function(){
							$this.removeClass('active');
						});
						createCookie(TMPL_NAME+'_'+cookiename, 0, 7);
					}else{
						$('body').animate({
							'padding-top': '0px'
						}, 200, function(){
							$('body').show().animate({
								'padding-top': $this.height()+'px'
							});
						});

						$this.animate({
							'top':- $this.height()+'px'
						}, 200, function(){
							$this.show().animate({
								'top': 0
							});
						});
						//$this.find('.btn-special').css('top', 0);
						$this.find('.btn-special').animate({
							'top': h_modcontent+'px'
						}, 500, 'easeInCubic', function(){
							$(this).show().animate({
								'top': 0
							});
						});
						$this.animate({}, 200, function(){
							$(this).addClass('active');
						});
						createCookie(TMPL_NAME+'_'+cookiename, 1, 7);
					}
				})
			});
		},
		slidePositionBottom:function(wrap, events){
			$i = 0;
			$(wrap).find('div.module').each(function(){
				var $this = $(this);
				h_btn = $this.find('.btn-special').height();
				h_modcontent = $this.height(); //alert(h_modcontent);
				$this.find('.btn-special').css('bottom', h_btn); 
				$(wrap).find('div.module').removeClass('active');
				$this.css('height', h_modcontent);
				$this.css('bottom', - h_modcontent);
				$this.find('.btn-special').bind(events, function(){
					if ( $this.attr('class').indexOf("active") !== -1 ){
						$this.animate({
							'bottom': 0  
						}, 200, function(){
							$this.show().animate({
								'bottom':- $this.height()
							});
						});
						$this.animate({}, 200, function(){
							$this.removeClass('active');
						});
					}else{
						$(wrap).find('div.module').each(function(){
							$(this).animate({
								'bottom': - $(this).height()
							}, 200);
						});
		
						$this.animate({
							'bottom':- h_modcontent
						}, 200, function(){
							$this.show().animate({
								'bottom': 0
							});
						});
						$(wrap).find('div.module').animate({}, 200, function(){
							$(this).removeClass('active');
						});
						$this.animate({}, 200, function(){
							$(this).addClass('active');
						});
						
					}
					
				})
			});
		}
	
	}
	
	
	
});


