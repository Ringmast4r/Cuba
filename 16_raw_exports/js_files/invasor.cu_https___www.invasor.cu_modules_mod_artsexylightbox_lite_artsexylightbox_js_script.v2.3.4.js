/**
 * Sexy LightBox - for asljQuery 1.3.2
 * @name      sexylightbox.v2.3.js
 * @author    Eduardo D. Sada - http://www.coders.me/web-html-js-css/javascript/sexy-lightbox-2
 * @version   2.3.4
 * @date      10-Nov-2009
 * @copyright (c) 2009 Eduardo D. Sada (www.coders.me)
 * @license   MIT - http://es.wikipedia.org/wiki/Licencia_MIT
 * @example   http://www.coders.me/ejemplos/sexy-lightbox-2/
*/
if (typeof (asljQuery) == 'undefined') {
	asljQuery = jQuery;
}

asljQuery.bind = function(object, method){
  var args = Array.prototype.slice.call(arguments, 2);  
  return function() {
    var args2 = [this].concat(args, asljQuery.makeArray( arguments ));  
    return method.apply(object, args2);  
  };  
};  

(function(asljQuery) {

  SexyLightbox = {
    getOptions: function() {
      return {
        name          : 'SLB',
        zIndex        : 32000,
        color         : 'new_black',
        find          : 'sexylightbox',
        dir           : 'sexyimages',
        emergefrom    : 'top',
        background    : 'bgSexy.png',
        backgroundIE  : 'bgSexy.gif',
        buttons       : 'buttons.png',
        displayed     : 0,
        showDuration  : 200,
        closeDuration : 400,
        moveDuration  : 1000,
        moveEffect    : 'easeInOutBack',
        resizeDuration: 1000,
        resizeEffect  : 'easeInOutBack',
        shake         : {
                          distance   : 10,
                          duration   : 100,
                          transition : 'easeInOutBack',
                          loops      : 2
                        },
        BoxStyles     : { 'width' : 900, 'height': 310 },
        Skin          : {
                          'new_white' : { 'hexcolor': '#FFFFFF', 'captionColor': '#000000', 'background-color': '#000000', 'opacity': 0.6 },
                          'new_black' : { 'hexcolor': '#000000', 'captionColor': '#FFFFFF', 'background-color': '#000000', 'opacity': 0.6 },
                          'blanco': { 'hexcolor': '#FFFFFF', 'captionColor': '#000000', 'background-color': '#000000', 'opacity': 0.6 },
                          'negro' : { 'hexcolor': '#000000', 'captionColor': '#FFFFFF', 'background-color': '#000000', 'opacity': 0.6 }
                        }
      };
    },

    overlay: {
      create: function(options) {
        this.options = options;
        this.element = asljQuery('<div id="'+new Date().getTime()+'"></div>');
        this.element.css(asljQuery.extend({}, {
          'position'  : 'absolute',
          'top'       : 0,
          'left'      : 0,
          'opacity'   : 0,
          'display'   : 'none',
          'z-index'   : this.options.zIndex
        }, this.options.style));
        
        this.element.bind('click', asljQuery.bind(this, function(obj, event) {
      		if (window.slideshowElm) {
            stopSlideshow();
      		  clearInterval(window.slideshowElm);
      		  window.slideshowElm = null;
      		}
          if (this.options.hideOnClick) {
              if (this.options.callback) {
                this.options.callback();
              } else {
                this.hide();
              }
          }
          event.preventDefault();
        }));
        
        this.hidden = true;
        this.inject();
      },

      inject: function() {
        this.target = asljQuery(document.body);
        this.target.append(this.element);

        //if((Browser.Engine.trident4 || (Browser.Engine.gecko && !Browser.Engine.gecko19 && Browser.Platform.mac)))
        if(asljQuery.browser && asljQuery.browser.msie && asljQuery.browser.version=="6.0")
        // No tengo tiempo para agregar la detección del OS que debería
        // haber estado integrada en asljQuery, pero que el estúpido de su creador no puso
        // Me cago en John Resig
        {
          var zIndex = parseInt(this.element.css('zIndex'));
          if (!zIndex)
          {
            zIndex = 1;
            var pos = this.element.css('position');
            if (pos == 'static' || !pos)
            {
              this.element.css({'position': 'relative'});
            }
            this.element.css({'zIndex': zIndex});
          }
          // Diossss por diosss, pongan funciones útiles en asljQuery,
          // no todo es Selectores! la puta madre, lo que hay que hacer
          // para detectar si una variable está definida:
          zIndex = (!!(this.options.zIndex || this.options.zIndex === 0) && zIndex > this.options.zIndex) ? this.options.zIndex : zIndex - 1;
          if (zIndex < 0)
          {
            zIndex = 1;
          }
          this.shim = asljQuery('<iframe id="IF_'+new Date().getTime()+'" scrolling="no" frameborder=0 src=""></div>');
          this.shim.css({
            zIndex    : zIndex,
            position  : 'absolute',
            top       : 0,
            left      : 0,
            border    : 'none',
            opacity   : 0
          });
          this.shim.insertAfter(this.element);
        }

      },

      resize: function(x, y) {
        this.element.css({ 'height': 0, 'width': 0 });
        if (this.shim) this.shim.css({ 'height': 0, 'width': 0 });

        var win = { x: asljQuery(document).width(), y: asljQuery(document).height() };
        var chromebugfix = (asljQuery.browser && asljQuery.browser.safari) ? (win.x - 25 < document.body.clientWidth ? document.body.clientWidth : win.x) : win.x;

        this.element.css({
          width  : x ? x : chromebugfix, //* chrome fix
          height : y ? y : win.y
        });

        if (this.shim)
        {
          this.shim.css({ 'height': 0, 'width': 0 });
          this.shim.css({
            width  : x ? x : chromebugfix, //* chrome fix
            height : y ? y : win.y
          });
        }
        return this;
      },

      show: function() {
        if (!this.hidden) return this;
        if (this.transition) this.transition.stop();
        this.target.bind('resize', asljQuery.bind(this, this.resize));
        this.resize();
        if (this.shim) this.shim.css({'display': 'block'});
        this.hidden = false;


        this.transition = this.element.fadeIn(this.options.showDuration, asljQuery.bind(this, function(){
          this.element.trigger('show');
        }));
        
        return this;
      },

      hide: function() {
        if (this.hidden) return this;
        if (this.transition) this.transition.stop();
        this.target.unbind('resize');
        if (this.shim) this.shim.css({'display': 'none'});
        this.hidden = true;

        this.transition = this.element.fadeOut(this.options.closeDuration, asljQuery.bind(this, function(){
          this.element.trigger('hide');
          this.element.css({ 'height': 0, 'width': 0 });
        }));

        return this;
      }

    },

    backwardcompatibility: function(option) {
      this.options.dir = option.imagesdir || option.path || option.folder || option.dir;
      this.options.OverlayStyles = asljQuery.extend(this.options.Skin[this.options.color], this.options.OverlayStyles || {});
    },

    preloadimage: function(url) {
      img     = new Image();
      img.src = url;
    },

    initialize: function(options) {
      this.options = asljQuery.extend(this.getOptions(), options);
      this.backwardcompatibility(this.options);

      var strBG = this.options.dir+'/'+this.options.color+'/'+((((window.XMLHttpRequest == undefined) && (ActiveXObject != undefined)))?this.options.backgroundIE:this.options.background);
      var name  = this.options.name;
      
      this.preloadimage(strBG);
      this.preloadimage(this.options.dir+'/'+this.options.color+'/'+this.options.buttons);

      this.overlay.create({
        style       : this.options.Skin[this.options.color],
        hideOnClick : true,
        zIndex      : this.options.zIndex-1,
        callback    : asljQuery.bind(this, this.close),
        showDuration  : this.options.showDuration,
        showEffect    : this.options.showEffect,
        closeDuration : this.options.closeDuration,
        closeEffect   : this.options.closeEffect
      });

      this.lightbox = {};

	  if (this.options.slideshow) {
		asljQuery('body').append('<div id="'+name+'-Wrapper"><div id="'+name+'-Background"></div><div id="'+name+'-Contenedor"><span style=\"float: right; display: block; position: absolute;top: 7px; right: 90px;\"><a style=\"cursor:pointer;display:none\" onclick="\startSlideshow(' + this.options.slideshow + ')\" id="\playbutton\"><img src=\"' + this.options.imagesdir + '/play.png\" alt=\"play\" /></a><a style=\"cursor:pointer;\" onclick=\"stopSlideshow(true)\" id="\pausebutton\"><img src=\"' + this.options.imagesdir + '/pause.png\" alt=\"play\" /></a></span><div id="'+name+'-Top" style="background-image: url('+strBG+')"><a id="'+name+'-CloseButton" href="#">&nbsp;</a><div id="'+name+'-TopLeft" style="background-image: url('+strBG+')"></div></div><div id="'+name+'-Contenido"></div><div id="'+name+'-Bottom" style="background-image: url('+strBG+')"><div id="'+name+'-BottomRight" style="background-image: url('+strBG+')"><div id="'+name+'-Navegador"><strong id="'+name+'-Caption"></strong></div></div></div></div></div>');
      } else {
		asljQuery('body').append('<div id="'+name+'-Wrapper"><div id="'+name+'-Background"></div><div id="'+name+'-Contenedor"><div id="'+name+'-Top" style="background-image: url('+strBG+')"><a id="'+name+'-CloseButton" href="#">&nbsp;</a><div id="'+name+'-TopLeft" style="background-image: url('+strBG+')"></div></div><div id="'+name+'-Contenido"></div><div id="'+name+'-Bottom" style="background-image: url('+strBG+')"><div id="'+name+'-BottomRight" style="background-image: url('+strBG+')"><div id="'+name+'-Navegador"><strong id="'+name+'-Caption"></strong></div></div></div></div></div>');
	  }
      this.Wrapper      = asljQuery('#'+name+'-Wrapper');
      this.Background   = asljQuery('#'+name+'-Background');
      this.Contenedor   = asljQuery('#'+name+'-Contenedor');
      this.Top          = asljQuery('#'+name+'-Top');
      this.CloseButton  = asljQuery('#'+name+'-CloseButton');
      this.Contenido    = asljQuery('#'+name+'-Contenido');
      this.bb           = asljQuery('#'+name+'-Bottom');
      this.innerbb      = asljQuery('#'+name+'-BottomRight');
      this.Nav          = asljQuery('#'+name+'-Navegador');
      this.Descripcion  = asljQuery('#'+name+'-Caption');

      this.Wrapper.css({
        'z-index'   : this.options.zIndex,
        'display'   : 'none'
      }).hide();
      
      this.Background.css({
        'z-index'   : this.options.zIndex + 1
      });
      
      this.Contenedor.css({
        'position'  : 'absolute',
        'width'     : this.options.BoxStyles['width'],
        'z-index'   : this.options.zIndex + 2
      });
      
      this.Contenido.css({
        'height'            : this.options.BoxStyles['height'],
        'border-left-color' : this.options.Skin[this.options.color].hexcolor,
        'border-right-color': this.options.Skin[this.options.color].hexcolor
      });
      
      this.CloseButton.css({
        'background-image'  : 'url('+this.options.dir+'/'+this.options.color+'/'+this.options.buttons+')'
      });
      
      this.Nav.css({
        'color'     : this.options.Skin[this.options.color].captionColor
      });

      this.Descripcion.css({
        'color'     : this.options.Skin[this.options.color].captionColor
      });


          
      /**
       * AGREGAMOS LOS EVENTOS
       ************************/

      this.CloseButton.bind('click', asljQuery.bind(this, function(){
        this.close();
		if (window.slideshowElm) {
      stopSlideshow();
		  clearInterval(window.slideshowElm);
		  window.slideshowElm = null;
		}
        return false;
      }));
      
      asljQuery(document).bind('keydown', asljQuery.bind(this, function(obj, event){
        if (this.options.displayed == 1) {
          if (event.keyCode == 27){
            this.close();
          }

          if (event.keyCode == 37){
            if (this.prev) {
              this.prev.trigger('click', event);
            }
          }

          if (event.keyCode == 39){
            if (this.next) {
              this.next.trigger('click', event);
            }
          }
        }
      }));

      asljQuery(window).bind('resize', asljQuery.bind(this, function() {
        if(this.options.displayed == 1) {
          this.replaceBox();
          this.overlay.resize();
        }
      }));

      asljQuery(window).bind('scroll', asljQuery.bind(this, function() {
        if(this.options.displayed == 1) {
          this.replaceBox();
        }          
      }));

      this.refresh();

    },
    
    hook: function(enlace) {
      enlace = asljQuery(enlace);
      enlace.blur();
      this.show((enlace.attr("title") || enlace.attr("name") || ""), enlace.attr("href"), (enlace.attr('rel') || false));
	  if (this.options.slideshow && this.next && !window.slideshowElm) {
			window.slideshowElm = setInterval('goNext()', this.options.slideshow);
		} else {
		}
    if (document.getElementById('playbutton')) {
      document.getElementById('playbutton').style.display = 'none';
    }
    if (document.getElementById('pausebutton')) {
      document.getElementById('pausebutton').style.display = '';
    }
    },
    
    close: function() {
      this.animate(0);
    },
    
    refresh: function() {
      var self = this;
      this.anchors = [];

      asljQuery("a, area").each(function() {
        if (asljQuery(this).attr('rel') && new RegExp("^"+self.options.find).test(asljQuery(this).attr('rel'))){
          asljQuery(this).click(function(event) {
            event.preventDefault();
            self.hook(this);
          });

          if (!(asljQuery(this).attr('id')==self.options.name+"-Left" || asljQuery(this).attr('id')==self.options.name+"-Right")) {
            self.anchors.push(this);
          }
        }
      });
    },
    
    animate: function(option) {
      if(this.options.displayed == 0 && option != 0 || option == 1)
      {
        this.overlay.show();
        this.options.displayed = 1;
        this.Wrapper.css({'display': 'block'});
      }
      else //Cerrar el Lightbox
      {
        this.Wrapper.css({
          'display' : 'none',
          'top'     : -(this.options.BoxStyles['height']+280)
        }).hide();

        this.overlay.hide();
        this.overlay.element.bind('hide', asljQuery.bind(this, function(){
          if (this.options.displayed) {
            if (this.Image) this.Image.remove();
            this.options.displayed = 0;
          }
        }));
      }
    },
    
    /*
    Function: replaceBox
    @description  Cambiar de tamaño y posicionar el lightbox en el centro de la pantalla
    */
    replaceBox: function(data) {
      var size   = { x: asljQuery(window).width(), y: asljQuery(window).height() };
      var scroll = { x: asljQuery(window).scrollLeft(), y: asljQuery(window).scrollTop() };
      var width  = this.options.BoxStyles['width'];
      var height = this.options.BoxStyles['height'];
      
      if (this.options.displayed == 0)
      {
        var x = 0;
        var y = 0;
        
        // vertically center
        y = scroll.x + ((size.x - width) / 2);

        if (this.options.emergefrom == "bottom")
        {
          x = (scroll.y + size.y + 80);
        }
        else // top
        {
          x = (scroll.y - height) - 80;
        }
      
        this.Wrapper.css({
          'display' : 'none',
          'top'     : x,
          'left'    : y,
          'width'   : width
        });
        this.Contenedor.css({
          'width'   : width
        });
        this.Contenido.css({
          'height'  : height - 80
        });
      }

      data = asljQuery.extend({}, {
        'width'  : this.lightbox.width,
        'height' : this.lightbox.height,
        'resize' : 0
      }, data);

      if (this.MoveBox) this.MoveBox.stop();

      if (this.options.moveEffect == 'fade') {
        this.MoveBox = this.Wrapper.animate({
          'left': (scroll.x + ((size.x - data.width) / 2)),
          'top' : (scroll.y + (size.y - (data.height + (this.navigator ? 80 : 48))) / 2)
        }, {
          duration  : this.options.moveDuration,
          easing    : 'linear'
        });
        asljQuery('#SLB-Background').fadeOut("slow", function () {
          jQuery(this).css({left:(asljQuery(window).scrollLeft()+((asljQuery(window).width()-data.width)/2)),top:(asljQuery(window).scrollTop()+(asljQuery(window).height()-(data.height+((this.MostrarNav)?80:48)))/2)});
          asljQuery('#SLB-Background').fadeIn("slow");
        });
      } else {
        this.MoveBox = this.Wrapper.animate({
          'left': (scroll.x + ((size.x - data.width) / 2)),
          'top' : (scroll.y + (size.y - (data.height + (this.navigator ? 80 : 48))) / 2)
        }, {
          duration  : this.options.moveDuration,
          easing    : this.options.moveEffect
        });
      }

      if (data.resize) {
        if (this.ResizeBox2) this.ResizeBox2.stop();
        this.ResizeBox2 = this.Contenido.animate({
          height    : data.height
        }, {
          duration  : this.options.resizeDuration,
          easing    : this.options.resizeEffect
        });

        if (this.ResizeBox) this.ResizeBox.stop();

        this.ResizeBox = this.Contenedor.animate({
          width     : data.width
        }, {
          duration  : this.options.resizeDuration,
          easing    : this.options.resizeEffect,
          complete  : function(){
            asljQuery(this).trigger('complete');
          }
        });
      }

    },
    
    getInfo: function (image, id) {
      image=asljQuery(image);
      IEuta = asljQuery('<a id="'+this.options.name+'-'+id+'" title="'+image.attr('title')+'" rel="'+image.attr('rel')+'">&nbsp;</a>');
      IEuta.css({ 'background-image' : 'url('+this.options.dir+'/'+this.options.color+'/'+this.options.buttons+')' });
      IEuta.attr('href', image.attr('href')); //IE fix
      return IEuta;
    },
    
    display: function(url, title, force) {
      return this.show(title, url, '', force);
    },
    
    show: function(caption, url, rel, force) {
      this.showLoading();

      var baseURL     = url.match(/(.+)?/)[1] || url;
      var imageURL    = /\.(jpe?g|png|gif|bmp)/gi;
      var queryString = url.match(/\?(.+)/);
      if (queryString) queryString = queryString[1];
      var params      = this.parseQuery( queryString );

      if (this.ResizeBox) this.ResizeBox.unbind('complete'); //fix for asljQuery

      params = asljQuery.extend({}, {
        'width'     : 0,
        'height'    : 0,
        'modal'     : 0,
        'background': '',
        'title'     : caption
      }, params || {});

      if(this.options.width != "0"){
        params['width'] = this.options.width;
      }

      if(this.options.height != "0"){
        params['height'] = this.options.height;
      }


      if (params['width'].toString().indexOf('%')!=-1) {
  			params['width'] = parseInt(parseInt(params['width'])*asljQuery(window).width()/100);
  			this.ajustarWidth=(params['width']+14);
  		} else {
        params['width']   = parseInt(params['width']);
  		}
  		if (params['height'].toString().indexOf('%')!=-1) {
  			params['height'] = parseInt(parseInt(params['height'])*asljQuery(window).height()/100);
  			this.ajustarHeight=parseInt(params['height'])+(window.opera?2:0);
  		} else {
        params['height']  = parseInt(params['height']);
  		}
        params['modal']   = parseInt(params['modal']);
      

      this.overlay.options.hideOnClick = !params['modal'];
      this.lightbox  = asljQuery.extend({}, params, { 'width' : params['width'] + 14 });
      this.navigator = this.lightbox.title ? true : false;

      if ( force=='image' || baseURL.match(imageURL) )
      {
          this.img = new Image();
          this.img.onload = asljQuery.bind(this, function(){
              this.img.onload=function(){};
              
              var objsize = this.calculate(this.img.width, this.img.height);
              
              if(params['width'] && !params['height']){
                  var multiplier = params["width"]/objsize.x;
                  params['height'] = objsize.y*multiplier;
              }
              else if(!params['width'] && params['height']){
                  var multiplier = params["height"]/objsize.y;
                  params['width'] = objsize.x*multiplier;
              }
              else if(!params['width'] && !params['height']){
                  params['width']   = objsize.x;
                  params['height']  = objsize.y;
              }

              this.lightbox.width = params['width'] + 14;
              this.lightbox.height = params['height'] - (this.navigator ? 21 : 35);
              
              this.replaceBox({ 'resize' : 1 });
              
              // Mostrar la imagen, solo cuando la animacion de resizado se ha completado
              this.ResizeBox.bind('complete', asljQuery.bind(this, function(){
                this.showImage(this.img.src, params);
              }));
          });

          this.img.onerror = asljQuery.bind(this, function() {
            this.show('', this.options.imagesdir+'/'+this.options.color+'/404.png', this.options.find);
          });

          this.img.src = url;
          
      } else { //code to show html pages

          this.lightbox.height = params['height']+((asljQuery.browser && asljQuery.browser.opera)?2:0);
          this.replaceBox({'resize' : 1});
        
          if (url.indexOf('TB_inline') != -1) //INLINE ID
          {
            this.ResizeBox.bind('complete', asljQuery.bind(this, function(){
              this.showContent(asljQuery('#'+params['inlineId']).html(), this.lightbox);
            }));
          }
          else if(url.indexOf('TB_iframe') != -1) //IFRAME
          {
            var urlNoQuery = url.split('TB_');
            this.ResizeBox.bind('complete', asljQuery.bind(this, function(){
              this.showIframe(urlNoQuery[0], this.lightbox);
            }));
          }
          else //AJAX
          {
            this.ResizeBox.bind('complete', asljQuery.bind(this, function(){
              asljQuery.ajax({
                url: url,
                type: "GET",
                cache: false,
                error: asljQuery.bind(this, function(){this.show('', this.options.imagesdir+'/'+this.options.color+'/404html.png', this.options.find)}),
                success: asljQuery.bind(this, this.handlerFunc)
              });
            }));
          }

      }
      

      this.next = false;
      this.prev = false;
       //Si la imagen pertenece a un grupo
      if (rel.length > this.options.find.length)
      {
          this.navigator = true;
          var foundSelf  = false;
          var exit       = false;
          var self       = this;
          var currentIndex = 0;
          var cIndex = 0;

          asljQuery.each(this.anchors, function(index) {
            if (asljQuery(this).attr('rel') == rel) {
			  if(asljQuery(this).attr('href')==url){currentIndex = cIndex;}
              cIndex++;
            }
          });
          
          index = 0;
          
          asljQuery.each(this.anchors, function(index){
            if (asljQuery(this).attr('rel') == rel && !exit) {
              if (asljQuery(this).attr('href') == url) {
                  foundSelf = true;
              } else {
                  if (foundSelf) {
                      self.next = self.getInfo(this, "Right");
                       //stop searching
                      exit = true;
                  } else {
                      self.prev = self.getInfo(this, "Left");
                  }
              }
            }
          });
      }

      this.addButtons();
      this.showNavBar(caption, url, currentIndex, cIndex);
      this.animate(1);
    },// end function

    calculate: function(x, y) {
      // Resizing large images
      var maxx = asljQuery(window).width() - 100;
      var maxy = asljQuery(window).height() - 100;

      if (x > maxx)
      {
        y = y * (maxx / x);
        x = maxx;
        if (y > maxy)
        {
          x = x * (maxy / y);
          y = maxy;
        }
      }
      else if (y > maxy)
      {
        x = x * (maxy / y);
        y = maxy;
        if (x > maxx)
        {
          y = y * (maxx / x);
          x = maxx;
        }
      }
      // End Resizing
      return {x: parseInt(x), y: parseInt(y)};
    },

    handlerFunc: function(obj, html) {
      this.showContent(html, this.lightbox);
    },

    addButtons: function(){
      if(this.prev) this.prev.bind('click', asljQuery.bind(this, function(obj, event) {event.preventDefault();this.hook(this.prev);}));
      if(this.next) this.next.bind('click', asljQuery.bind(this, function(obj, event) {event.preventDefault();this.hook(this.next);}));
    },

    showNavBar: function(caption, url, currentIndex, all) {
      if (this.navigator)
      {
        this.bb.addClass("SLB-bbnav");
        this.Nav.empty();
        this.innerbb.empty();
        this.innerbb.append(this.Nav);
        if (this.options.downloadLink) {
			var finalUrl = url;
			if(this.options.largeImagePath) {
				finalUrl = url.replace(this.options.path, this.options.largeImagePath);
			}
            this.Descripcion.html('<a class="sexylightbox_download" href="' + finalUrl + '">download</a>&nbsp;' + this.lightbox.title);
        } else if (this.options.print) {
            this.Nav.append('<span class="sexylightbox_print"><img src="plugins/content/artsexylightbox/artsexylightbox/images/print.png" onclick="printimage(event,\'' + url + '\')" /></span>' + caption);
        } else {
            this.Descripcion.html(this.lightbox.title);
        }
        this.Nav.append(this.prev);
        this.Nav.append(this.next);
        this.Nav.append(this.Descripcion);
      }
      else
      {
        this.bb.removeClass("SLB-bbnav");
        this.innerbb.empty();
      }
    },

    showImage: function(image, size) {
      this.Background.empty().removeAttr('style').css({'width':'auto', 'height':'auto'}).append('<img id="'+this.options.name+'-Image"/>');
      this.Image = asljQuery('#'+this.options.name+'-Image');
      this.Image.attr('src', image).css({
        'width'  : size['width'],
        'height' : size['height']
      });
    
      this.Contenedor.css({
        'background' : 'none'
      });

      this.Contenido.empty().css({
          'background-color': 'transparent',
          'padding'         : '0px',
          'width'           : 'auto'
      });
    },

    showContent: function(html, size) {
      this.Background.empty().css({
        'width'            : size['width']-14,
        'height'           : size['height']+35,
        'background-color' : size['background'] || '#ffffff'
      });
      
      this.Contenido.empty().css({
        'width'             : size['width']-14,
        'background-color'  : size['background'] || '#ffffff'
      }).append('<div id="'+this.options.name+'-Image"/>');

      this.Image = asljQuery('#'+this.options.name+'-Image');
      this.Image.css({
        'width'       : size['width']-14,
        'height'      : size['height'],
        'overflow'    : 'auto',
        'background'  : size['height'] || '#ffffff'
      }).append(html);

      this.Contenedor.css({
        'background': 'none'
      });
    },

    showIframe: function(src, size, bg) {
      this.Background.empty().css({
        'width'           : size['width']-14,
        'height'          : size['height']+35,
        'background-color': size['background'] || '#ffffff'
      });

      var id = "if_"+new Date().getTime()+"-Image";

      this.Contenido.empty().css({
        'width'             : size['width']-14,
        'background-color'  : size['background'] || '#ffffff',
        'padding'           : '0px'
      }).append('<iframe id="'+id+'" frameborder="0"></iframe>');
      
      this.Image = asljQuery('#'+id);
      this.Image.css({
          'width'       : size['width']-14,
          'height'      : size['height'],
          'background'  : size['background'] || '#ffffff'
      }).attr('src', src);

      this.Contenedor.css({
        'background' : 'none'
      });
      this.Descripcion.html(this.lightbox.title);
    },

    showLoading: function() {
      this.Background.empty().removeAttr('style').css({'width':'auto', 'height':'auto'});
      this.Contenido.empty().css({
        'background-color'  : 'transparent',
        'padding'           : '0px',
        'width'             : 'auto'
      });

      this.Contenedor.css({
        'background' : 'url('+this.options.imagesdir+'/'+this.options.color+'/loading.gif) no-repeat 50% 50%'
      });

      this.Contenido.empty().css({
          'background-color': 'transparent',
          'padding'         : '0px',
          'width'           : 'auto'
      });

      this.replaceBox(asljQuery.extend(this.options.BoxStyles, {'resize' : 1}));
    },
  
    parseQuery: function (query) {
      if( !query )
        return {};
      var params = {};

      var pairs = query.split(/[;&]/);
      for ( var i = 0; i < pairs.length; i++ ) {
        var pair = pairs[i].split('=');
        if ( !pair || pair.length != 2 )
          continue;
        params[unescape(pair[0])] = unescape(pair[1]).replace(/\+/g, ' ');
       }
       return params;
    },

    shake: function() {
      var d=this.options.shake.distance;
      var l=this.Wrapper.position();
      l=l.left;
      for(x=0;x<this.options.shake.loops;x++) {
       this.Wrapper.animate({left: l+d}, this.options.shake.duration, this.options.shake.transition)
       .animate({left: l-d}, this.options.shake.duration, this.options.shake.transition);
      }
       this.Wrapper.animate({"left": l+d}, this.options.shake.duration, this.options.shake.transition)
       .animate({"left": l}, this.options.shake.duration, this.options.shake.transition);
    }
    
  }
})(asljQuery);

function goNext(elm) {
	if (SexyLightbox.next) {
		SexyLightbox.next.trigger('click');
	} else {
		clearInterval(window.slideshowElm);
		window.slideshowElm = null;
	}
}
function stopSlideshow(arg1) {
	if (window.slideshowElm) {
    if (arg1) {
      if (document.getElementById('playbutton')) {
        document.getElementById('playbutton').style.display = '';
      }
      if (document.getElementById('pausebutton')) {
        document.getElementById('pausebutton').style.display = 'none';
      }
    }
		clearInterval(window.slideshowElm);
		window.slideshowElm = null;
	}
}

function startSlideshow(intVal) {
	window.slideshowElm = setInterval('goNext()', intVal);
  if (document.getElementById('playbutton')) {
    document.getElementById('playbutton').style.display = 'none';
  }
  if (document.getElementById('pausebutton')) {
    document.getElementById('pausebutton').style.display = '';
  }
}

function printimage(evt, src)
{
  if (!evt) {
    // Old IE
    evt = window.event;
  }    
  var image = evt.target;
  if (!image) {
    // Old IE
    image = window.event.srcElement;
  }
  link = "about:blank";
  var pw = window.open(link, "_new");
  pw.document.open();
  pw.document.write(makepage(src));
  pw.document.close();
}


function makepage(src)
{
  // We break the closing script tag in half to prevent
  // the HTML parser from seeing it as a part of
  // the *main* page.

  return "<html>\n" +
    "<head>\n" +
    "<title>Temporary Printing Window</title>\n" +
    "<script>\n" +
    "function step1() {\n" +
    "  setTimeout('step2()', 10);\n" +
    "}\n" +
    "function step2() {\n" +
    "  window.print();\n" +
    "  window.close();\n" +
    "}\n" +
    "</scr" + "ipt>\n" +
    "</head>\n" +
    "<body onLoad='step1()'>\n" +
    "<img src='" + src + "'/>\n" +
    "</body>\n" +
    "</html>\n";
}