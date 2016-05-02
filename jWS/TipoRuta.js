$(document).ready(function () {


    //var domin = "http://localhost:15451";

    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Tipo de Ruta';
	var MsjValida = ['Ingrese el Tipo de Ruta ' + tabla];
	
	
	var FRM = new CRUD('10-TIPO.RUTA', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	
	
	
							
	function getRegFragment(id, Nombre)
	{						
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+ Nombre +'</h2>'+
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
    	$('#Nombre').val('');	
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#Nombre').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtNombre').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (nombre) {
		
		var fErr = -1;		
		
		if(nombre == '')fErr = 0;
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_TipoRuta",
                data: "{'CompanyCode':'"+company+"',"+
					"Nombre: '"+nombre.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' creado Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();

                },
                error: function (e) {
                    ANIM.Error('Error al insertar el nuevo '+ tabla);
                }
           });		
	        		
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

   };
    
    window.s_Reg = function () {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_TipoRuta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#REG div').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		//console.log(index + ' | ' + value);
	    			$('#REG').append($(getRegFragment(value.id, value.Tipo)).fadeIn(0));	    			
	    			
	    			$('#edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
						
						$('#edtNombre').val(value.Tipo);		
	    				
	    				$("#btnEDT").click();    				
	    				
	    			});
	    			
	    		});

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
              

    };
    
    window.u_Reg = function (id_, nombre) {
		
		var fErr = -1;
		
		if(nombre == '')fErr = 0;
		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_TipoRuta",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"Nombre: '"+nombre.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla +' actualizado Exitosamente!');		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al actualizar el '+tabla);
                }
           });
           		
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

    };
    
    window.d_Reg = function (id_) {
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_TipoRuta",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"id: '"+id_+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla +' eliminado Exitosamente!');	  		
  				s_Reg();
            },
            error: function (e) {
                ANIM.Error('Error al eliminar el ' + tabla);
            }
      	});			
		
    };
    
    
        
    function INI_PAGE(){
    	
    	s_Reg();   	
    }

});