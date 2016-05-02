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
	
	var tabla = 'Factura';
	var MsjValida = ['Escriba el Folio de la ' + tabla+'.',
						'Escoja el Cliente al que va dirigida la ' + tabla+'.',
						'Escriba el Monto de la ' + tabla+'.',
						'Escriba el Detalle de la ' + tabla+'.',
						'Escoja la Fecha Limite de pago de la ' + tabla+'.'];
	
	//nice select boxes
	$('#idCliente').select2();
	$('#FechaL').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	$('#edtidCliente').select2();
	
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	function castDate(Fecha)
	{
		var SP = '-';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}
							
	function getRegFragment(id, Nombre, Marca, Cedis, Grupo, Precio, Code)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								Marca +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-building"></i> '+ Cedis +
								'</li>'+
								'<li>'+
									'<i class="fa fa-paw"></i> '+ Grupo +
								'</li>'+
								'<li>'+
									'<i class="fa fa-money"></i> $ ' + Precio +
								'</li>'+
								'<li>'+
									'<i class="fa fa-qrcode"></i> ' + Code +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}

	function getRowFragment(id, Folio, Monto, Detalle, fLimite, ApellidoP, ApellidoM, Nombre)
	{
		var Cliente = ApellidoP + ' ' + ApellidoM + ' ' + Nombre;
		
		fLimite = castDate(fLimite);
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Folio+'</td>'+
						'<td>'+Cliente+'</td>'+
						'<td>'+Detalle+'</td>'+
						'<td>'+Monto+'</td>'+
						'<td>'+fLimite+'</td>'+
						'<td >'+							
							'<a id="edt-'+id+'" class="table-link edt-'+id+'">'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>'+							
						'</td>'+
					'</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	

	
	function ClearFields()
    {
    	$('#Folio').val('');
    	$('#idCliente').val(0);
    	$('#Monto').val('');    	
    	$('#Detalle').val('');
    	$('#FechaL').val('');    		
    	
    	$('#idCliente').select2();
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
		i_Reg($('#Folio').val(), $('#idCliente').val(), $('#Monto').val(), $('#Detalle').val(), $('#FechaL').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtFolio').val(), $('#edtidCliente').val(), $('#edtMonto').val(), $('#edtDetalle').val(), $('#edtFechaL').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (Folio, idCliente, Monto, Detalle, FechaL) {
		
		var fErr = -1;		
		
		if(FechaL == '')fErr = 4;
		if(Detalle == '')fErr = 3;
		if(Monto == '')fErr = 2;
		if(idCliente == 0)fErr = 1;
		if(Folio == '')fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Factura",
                data: "{'CompanyCode':'"+company+"',"+
                	"Folio: '"+Folio.trim()+"',"+
                	"idCliente: '"+idCliente.trim()+"',"+
                	"Monto: '"+Monto.trim()+"',"+
                	"Detalle: '"+Detalle.trim()+"',"+
                	"fLimite: '"+FechaL.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' creada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nueva '+ tabla);
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
            url: domin + "/fWS.asmx/s_Factura",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Folio, value.Monto, value.Detalle, value.fLimite, value.ApellidoP, value.ApellidoM, value.Nombre)).fadeIn(0));	    			
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				$('#edtFolio').val(value.Folio);
	    				$('#edtidCliente').val(value.idCliente);
	    				$('#edtidCliente').select2();
	    				$('#edtMonto').val(value.Monto);
	    				$('#edtDetalle').val(value.Detalle);
	    				$('#edtFechaL').val( castDate(value.fLimite) );
	    				
	    				$("#btnEDT").click();   				
	    				
	    			});    			         	    			          	
	
	    		});
	    		
	    		
	    			    		
	    		var tableFixed = $('#tablaDatos').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( tableFixed );
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar las '+tabla);
            }
        });
		       
    };
    
    window.u_Reg = function (id, Folio, idCliente, Monto, Detalle, FechaL) {
		
		var fErr = -1;
		
		if(FechaL == '')fErr = 4;
		if(Detalle == '')fErr = 3;
		if(Monto == '')fErr = 2;
		if(idCliente == 0)fErr = 1;
		if(Folio == '')fErr = 0;
		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Factura",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id.trim()+"',"+
                	"Folio: '"+Folio.trim()+"',"+
                	"idCliente: '"+idCliente.trim()+"',"+
                	"Monto: '"+Monto.trim()+"',"+
                	"Detalle: '"+Detalle.trim()+"',"+
                	"fLimite: '"+FechaL.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' actualizada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nueva '+ tabla);
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
            url: domin + "/fWS.asmx/d_Factura",
            data: "{'CompanyCode':'"+company+"',"+
            	"id: '"+id.trim()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla + ' ' + ' eliminada Exitosamente!');
	  		
	  			s_Reg();
            },
            error: function (e) {
                ANIM.Error('Error al eliminar la '+ tabla);
            }
        });	
        
    };
    
    
    
    window.s_Cliente = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cliente",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		var text = value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre;
            		
            		$('#idCliente').append('<option value="'+value.id+'">'+text+'</option>');
    				$('#edtidCliente').append('<option value="'+value.id+'">'+text+'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    
    s_Reg();
    
    s_Cliente();
    
    
    
    
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