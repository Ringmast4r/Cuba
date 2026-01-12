		//ocultando los mensajes
		$('#repetido').hide();
		$('#bien').hide();
	  
$('#btn_voto').click(function(e){

    e.preventDefault();
    var _this = $(this);
    if (_this.hasClass('disabled'))
        return false;

	var id=$('#imagen').data('encuesta');

    _this.addClass('disabled');
	// if($("#ra_opcion").is(':checked')) {  
		var cookies=document.cookie;
	   var if_cookie=false;
	   var lista_cookies=cookies.split(';');
	   for (i in lista_cookies) {
		   var buscar= lista_cookies[i].search('gr'+id);
		   if (buscar>-1) {
			if_cookie=true;   
			break;
			 }
	   };

	   if (!if_cookie) {
 
		$('.ldr').show();
		var form = $(this).parents('form');  
		var path = form.attr('action');
		var data = {id: $('#ra_opcion:checked').val()};
		
		// Deferred chaining to swiftly handle ajax
		$.post('/votar/' + data.id, data)	
		.always(function(def) { 
			$('.ldr').fadeOut(); 
			_this.removeClass('disabled');
		})
		.done(function(resp){
			if (resp.status == 'ok')
			{
				 var date= new Date();
				date.setTime(date.getTime()+(90*24*60*60*1000));
				document.cookie="name"+ "=gr"+id+"; expires="+ date.toGMTString();
				
				$('#bien').fadeIn(2500);
				$('#bien').fadeOut(4000);
			
			} else
				if(resp.status == 're')
			   {
			   	
			   	 $('#repetido').fadeIn(3300);
			   	 $('#repetido').fadeOut(4000);

			   }			
						
			else {

				alert('Algo inesperado ocurrió en el servidor.', 'info');
				}
			})
		//.fail(fwOnFailAjax);
			}
		else {
					$('#repetido').fadeIn(3300);
					$('#repetido').fadeOut(4000);

			}
	 // }  
	// else{
	   // alert("Seleccione una opcion");
		// _this.removeClass('disabled');
	   
    // } 
});

