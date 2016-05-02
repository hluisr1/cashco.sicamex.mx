$(document).ready(function () {


    //var domin = "http://localhost:15451";

    

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Asueto';
	var MsjValida = ['Ingrese la fecha del ' + tabla];
	
	//nice select boxes
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	var CEDIS;
	var TIPOS;
	
	var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
					'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	
							
	function getRegFragment(id, Fecha)
	{
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/', 3);
		var fFecha = new Date(Fecha[2], Fecha[1], Fecha[0]);
				
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Fecha[0] + ' de ' + meses[parseInt(Fecha[1])-1]  +'</h2>'+
							'<div class="job-position">'+
								tabla +
							'</div>'+						
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}

	function ClearFields()
    {
    	$('#Fecha').val('');	
    }
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#Fecha').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtFecha').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (fecha) {
		
		var fErr = -1;		
		
		if(fecha == '')fErr = 0;
		
		if(fErr == -1){
			console.log('Adding '+tabla);
	        $.post(domin + "/fWS.asmx/i_Asueto", {
	            CompanyCode: company,
	            Fecha: fecha.trim()	            
	        })
	        .fail(function () { 
	        	ANIM.Error('Error al insertar el nuevo '+ tabla);
        	})
		  	.done(function () {
		  		ANIM.Success('fa-building', tabla + ' creado Exitosamente!');
		  		ClearFields();
		  		
		  		s_Reg();
	  		});			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

   };
    
    window.s_Reg = function () {
						
		console.log('Consultando '+tabla);
        $.post(domin + "/fWS.asmx/s_Asueto", {
            CompanyCode: company
        }, function(data){
        	
        	$('#REG div').remove();
        	
        	$.each(JSON.parse(data.firstElementChild.textContent), function (index, value) {

    			//console.log(index + ' | ' + value);
    			$('#REG').append($(getRegFragment(value.id, value.Fecha)).fadeIn(0));
    			
    			value.Fecha = value.Fecha.split(' ', 1);
				value.Fecha = value.Fecha[0].split('/');
    			
    			$('#edt-'+value.id).on('click', function(){
    				    				
    				$('#EDITA').attr('idRegistro',value.id);
    				$('#ELIMINA').attr('idRegistro',value.id);
    					
    				
    				/*$('#edtFecha').datepicker({
					  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
					});*/
					
					
					
					$('#edtFecha').val( value.Fecha[2] +'-'+ value.Fecha[1] +'-'+ value.Fecha[0] );
    				
	
    				
    				$("#btnEDT").click();
    				
    				
    			});
    			          	

    		});
    		
        })
        .fail(function () { 
        	ANIM.Error('Error al consultar los '+tabla);
    	})
	  	.done(function () {
	  		
  		});

    };
    
    window.u_Reg = function (id_, fecha) {
		
		var fErr = -1;
		
		if(fecha == '')fErr = 0;
		
		if(fErr == -1){
			console.log('Editando '+tabla);
	        $.post(domin + "/fWS.asmx/u_Asueto", {
	            CompanyCode: company, 
	            id: id_,
				fecha: fecha.trim()
	        })
	        .fail(function () { 
	        	ANIM.Error('Error al actualizar el '+tabla);
        	})
		  	.done(function () {
		  		ANIM.Success('fa-building', tabla + ' actualizado Exitosamente!');		  		
		  		s_Reg();
	  		});			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

    };
    
    window.d_Reg = function (id_) {
		
		console.log('Deleting '+tabla);
        $.post(domin + "/fWS.asmx/d_Asueto", {
            CompanyCode: company, 
            id: id_
        })
        .fail(function () { 
        	ANIM.Error('Error al eliminar el ' + tabla);
    	})
	  	.done(function () {
	  		ANIM.Success('fa-building', tabla +' eliminado Exitosamente!');	  		
	  		s_Reg();
  		});			
		
    };
    
    
    s_Reg();
    
    
    
    var ANIM = {
    	
    	/*TYPES
    	 success	GREEN
    	 warning	YELLOW
    	 notice		BLUE
    	 error		RED
    	 */
    	
    	Success: function (ClassIcon, Text) {
    		
    		classie.add( bttn, 'active' );
			classie.remove( bttn, 'active' );
			
			// create the notification
			var notification = new NotificationFx({
				message : '<span class="fa '+ClassIcon+' fa-3x pull-left"></span><p>'+Text+'</p>',
				layout : 'attached',
				effect : 'bouncyflip',
				type : 'success', // notice, warning or error
				onClose : function() {
					bttn.disabled = false;
				}
			});

			// show the notification
			notification.show();
			
			// disable the button (for demo purposes only)
			this.disabled = true;
        },
        
        Error: function (Text) {
        	
        	classie.add( bttn, 'active' );

			classie.remove( bttn, 'active' );
			
			// create the notification
			var notification = new NotificationFx({
				message : '<span class="fa fa-exclamation-circle fa-3x pull-left"></span><p>'+Text+'</p>',
				layout : 'growl',
				effect : 'jelly',
				type : 'error', // notice, warning, error or success
				onClose : function() {
					bttn.disabled = false;
				}
			});

			// show the notification
			notification.show();
			
			// disable the button (for demo purposes only)
			this.disabled = true;
            
        },
        
        Alert: function(Text){
        	
        	classie.add( bttn, 'active' );

			classie.remove( bttn, 'active' );
			
			// create the notification
			var notification = new NotificationFx({
				message : '<span class="fa fa-exclamation-triangle fa-3x pull-left"></span><p>'+Text+'</p>',
				layout : 'growl',
				effect : 'scale',
				type : 'warning', // notice, warning, error or success
				onClose : function() {
					bttn.disabled = false;
				}
			});

			// show the notification
			notification.show();
			
			// disable the button (for demo purposes only)
			this.disabled = true;
        	
        }


    	
    };




});