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
	
	var tabla = 'Promoción';
	var MsjValida = ['Escoja el Producto para la ' + tabla+'.',
						'Escriba la Descripcion de la ' + tabla+'.',
						'Escriba la fecha de inicio de la ' + tabla+'.',
						'Escriba la fecha de fin de la ' + tabla+'.',
						'Escoja el Porcentaje de la ' + tabla+'.',
						'Escriba la Cantidad Minima de compra de producto para aplicar la '+tabla+'.',
						'Escriba el Cantidad Minima de la '+tabla+' correctamente.'];
						
	var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
					'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	
	
	var FRM = new CRUD('7-PROMOCION', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	
	
	//nice select boxes
	$('#idProducto').select2();
	
	$('#fInicio').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	$('#fFin').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	//min/max slider
	$('#Porcentaje').noUiSlider({
		range: [0,100],
		start: [20],
		handles: 1,
		step: .5,
		connect: 'lower',
		slide: function(){
			var val = $(this).val();
			
			$(this).next('span').text(
				val + ' %'
			);
		},
		set: function() {
			var val = $(this).val();
			
			$(this).next('span').text(
				val + ' %'
			);
		}
	});
	$('#Porcentaje').val(20, true);
		
	
	
	$('#edtidProducto').select2();
	$('#edtPorcentaje').noUiSlider({
		range: [0,100],
		start: [20],
		handles: 1,
		step: .5,
		connect: 'lower',
		slide: function(){
			var val = $(this).val();
			
			$(this).next('span').text(
				val + ' %'
			);
		},
		set: function() {
			var val = $(this).val();
			
			$(this).next('span').text(
				val + ' %'
			);
		}
	});
	$('#edtPorcentaje').val(20, true);
	
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
							
	function getRegFragment(id, Producto, fInicio, fFin, Porcentaje, CantMin)
	{
		fInicio = fInicio.split(' ', 1);
		fInicio = fInicio[0].split('/', 3);
		var fFecha = new Date(fInicio[2], fInicio[1], fInicio[0]);
		
		fFin = fFin.split(' ', 1);
		fFin = fFin[0].split('/', 3);
		var fFecha2 = new Date(fFin[2], fFin[1], fFin[0]);
		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Producto+'</h2>'+
							'<div class="job-position">'+
								tabla +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-calendar"></i> ' + fInicio[0] + ' de ' + meses[parseInt(fInicio[1])-1]  + ' del ' + fInicio[2] +
								'</li>'+
								'<li>'+
									'<i class="fa fa-calendar"></i> '+ fFin[0] + ' de ' + meses[parseInt(fFin[1])-1]  + ' del ' + fFin[2] +
								'</li>'+
								'<li>'+
									'<i class="fa fa-money"></i> ' + Porcentaje +
								'%</li>'+
								'<li>'+
									'<i class="fa fa-qrcode"></i> ' + CantMin +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}

	function ClearFields()
    {
    	$('#Descripcion').val('');
    	$('#fInicio').val('');
    	$('#fFin').val('');
    	
    	$('#Porcentaje').val(20, true);
    	
    	$('#idProducto').val(0);    	
    	$('#idProducto').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#addCedis').on('click', function(){
		
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
		contCedis++;
		$('#gpoCedis').after('<div class="form-group form-group-select2 cedisField" id="cedisField-'+contCedis+'"><select style="width:300px" id="idCedis-'+contCedis+'"><option value="0">Escoje un CEDIS</option>'+
		
		CEDIS_op
		
		+'</select><button type="button" style="margin-left: 10px;" class="btn btn-danger fa fa-minus" id="delCedis" onclick="$(\'#cedisField-'+contCedis+'\').remove();"></button></div>');
		
		$('#idCedis-'+contCedis).select2();
	});
	
	$('#edtaddCedis').on('click', function(){
		
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
		contedtCedis++;
		$('#edtgpoCedis').after('<div class="form-group form-group-select2 edtcedisField" id="edtcedisField-'+contedtCedis+'"><select style="width:300px" id="edtidCedis-'+contedtCedis+'"><option value="0">Escoje un CEDIS</option>'+
		
		CEDIS_op
		
		+'</select><button type="button" style="margin-left: 10px;" class="btn btn-danger fa fa-minus" id="delCedis" onclick="$(\'#edtcedisField-'+contedtCedis+'\').remove();"></button></div>');
		
		$('#edtidCedis-'+contedtCedis).select2();
	});
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idProducto').val(), $('#Descripcion').val(), $('#fInicio').val(), $('#fFin').val(), $('#Porcentaje').val(), $('#CantMin').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidProducto').val(), $('#edtDescripcion').val(), $('#edtfInicio').val(), $('#edtfFin').val(), $('#edtPorcentaje').val(), $('#edtCantMin').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idProducto, descripcion, finicio, ffin, porcentaje, cantMin) {
		
		var fErr = -1;
		
		if(!$.isNumeric(cantMin)) fErr = 6;
		if(cantMin == '')fErr = 5;
		if(porcentaje == '')fErr = 4;
		if(ffin == '')fErr = 3;
		if(finicio == '')fErr = 2;
		if(descripcion == 0)fErr = 1;
		if(idProducto == 0)fErr = 0;	
		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Promocion",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idProducto: '"+idProducto.trim()+"'," +
					"Descripcion: '"+descripcion.trim()+"',"+
					"fInicio: '"+finicio.trim()+"',"+
					"fFin: '"+ffin.trim()+"',"+
					"Porcentaje: '"+porcentaje.trim()+"',"+
					"CantMin: '"+cantMin.trim()+"'}",
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
    
    function s_Reg() {
						
		console.log('Consultando '+tabla);
        $.post(domin + "/fWS.asmx/s_Promocion", {
            CompanyCode: company
        }, function(data){
        	
        	$('#REG div').remove();
        	
        	$.each(JSON.parse(data.firstElementChild.textContent), function (index, value) {

    			//console.log(index + ' | ' + value);
    			$('#REG').append($(getRegFragment(value.id, value.Producto, value.fInicio, value.fFin, value.Porcentaje, value.CantMin)).fadeIn(0));
    			
    			
    			value.fInicio = value.fInicio.split(' ', 1);
				value.fInicio = value.fInicio[0].split('/');
				
				value.fFin = value.fFin.split(' ', 1);
				value.fFin = value.fFin[0].split('/');
    			
    			$('#edt-'+value.id).on('click', function(){
    				
    				/*RESET CEDIS*/
    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
					
								
    				    				
    				$('#EDITA').attr('idRegistro',value.id);
    				$('#ELIMINA').attr('idRegistro',value.id);
    				
    				
    				$('#edtidProducto').val(value.idProducto);    				
			    	$('#edtDescripcion').val(value.Descripcion);
			    	$('#edtfInicio').val(value.fInicio[2] +'-'+ value.fInicio[1] +'-'+ value.fInicio[0]);			    	
			    	$('#edtfFin').val(value.fFin[2] +'-'+ value.fFin[1] +'-'+ value.fFin[0]);
					$('#edtPorcentaje').val(value.Porcentaje, true);					
					$('#edtCantMin').val(value.CantMin);
					
					
					
					$('#edtidProducto').select2();
					
    				
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
    
    window.u_Reg = function (id_, idProducto, descripcion, finicio, ffin, porcentaje, cantMin) {
		
		var fErr = -1;
		
		if(!$.isNumeric(cantMin)) fErr = 6;
		if(cantMin == '')fErr = 5;
		if(porcentaje == '')fErr = 4;
		if(ffin == '')fErr = 3;
		if(finicio == '')fErr = 2;
		if(descripcion == 0)fErr = 1;
		if(idProducto == 0)fErr = 0;
		
		
		
		if(fErr == -1){
			console.log('Editando '+tabla);
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Promocion",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idProducto: '"+idProducto.trim()+"'," +
					"Descripcion: '"+descripcion.trim()+"',"+
					"fInicio: '"+finicio.trim()+"',"+
					"fFin: '"+ffin.trim()+"',"+
					"Porcentaje: '"+porcentaje.trim()+"',"+
					"CantMin: '"+cantMin.trim()+"'}",
					
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
            url: domin + "/fWS.asmx/d_Promocion",
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
    
    
    
    function s_Producto() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		CEDIS.push('{id:'+value.id+', Nombre:'+value.Nombre+'}');
	        		CEDIS_op += '<option value="'+value.id+'">'+value.Nombre+'</option>';
	    			
	    		});
	    		
	    		$('#idProducto').append(CEDIS_op);
				$('#edtidProducto').append(CEDIS_op);

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Productos.');
            }
        });
    };
    
    
    
    
    
    
    
   function INI_PAGE(){    	
    	s_Reg();
    
    	s_Producto();
    	/*s_Grupo();
    	s_Marca();*/ 	
    }


});