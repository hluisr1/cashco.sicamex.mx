$(document).ready(function () {

    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Pago';
	var MsjValida = ['Escoja un Visita.',
						'Escoja un medio de pago.',
						'Escriba el Monto.'];
	
	//nice select boxes
	$('#idDetalleVisita').select2();	
	$('#idTipoPago').select2();
	
	$('#edtidDetalleVisita').select2();	
	$('#edtidTipoPago').select2();
	
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var ProductOBJs = '';
	
	var _IDDETALLEVISITA = '';
	
	
	$('.SelectProduct').change(function(aaa){
		console.log(09876543);
		var Precio = $(this).attr('nItem');
		console.log(Precio);
		
		
	});
	
	$('#totalContainer').hide();
	
	$('#ADDP').on('click', function(){
		
		//	idVisitaCliente 	idCliente 	idEstatus 	Latitud 	Longitud 	Dentro
		
		var fErr = -1;
		
		var DetV = {idVisitaCliente: 0, idCliente: $('#idCliente').val(), idEstatus: $('#idEstatus').val(), 
						Latitud:MAPA.tempMarker.XX, Longitud: MAPA.tempMarker.YY, Dentro:false};
		
		if(DetV.idEstatus == 0)fErr = 1;
		if(DetV.idCliente == 0)fErr = 0;				
		
		
		if(fErr == -1){
			
			if(contCedis == 0){
				/*1496*/
				$.ajax({
				    type: "POST",
				    url: domin + "/fWS.asmx/i_DetalleVisita",
				    data: "{'CompanyCode':'"+company+"',"+ 
				    	"idVisitaCliente: '"+DetV.idVisitaCliente+"'," +
						"idCliente: '"+DetV.idCliente+"',"+
						"idEstatus: '"+DetV.idEstatus+"',"+
						"Latitud: '"+DetV.Latitud+"',"+
						"Longitud: '"+DetV.Longitud+"',"+
						"Dentro: '"+DetV.Dentro+"'}",
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
				    success: function (msg) {
				    	//ANIM.Success('fa-building', tabla + ' creado Exitosamente!');
				    },
				    error: function (e) {
				    	console.log(e);
				        ANIM.Error('Error al insertar el nuevo '+ e);
			        }
			   	});
	           
				$.ajax({
				    type: "POST",
				    url: domin + "/fWS.asmx/lst_DetalleVisita",
				    data: "{'CompanyCode':'"+company+"'}",
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
				    success: function (data) {
				    	
				    	var dta = JSON.parse(data.d);
				    	$.each(dta, function (index, value) {
							_IDDETALLEVISITA = value.id; 
						});	
				    },
				    error: function (e) {
				        ANIM.Error('Error al consultar los '+tabla);
				    }
				});
				
				console.log(DetV);
			}
				
			
			
			$('#totalContainer').show();
		
			contCedis++;
			$('#DIV_Productos').append('<div class="pruductoField col-xs-12" id="GPO_P-'+contCedis+'" nItem="'+contCedis+'" prodPrice="">'+
											'<div class="form-group col-xs-3">'+
												'<label>Producto</label>'+
												'<select style="width:200px" nItem="'+contCedis+'" class="SelectProduct" id="idProducto-'+contCedis+'">'+
													'<option value="0">Escoje un Producto</option>'+
													ProductOBJs +
												'</select>'+
											'</div>'+
											
											'<div class="form-group col-xs-2">'+
												'<label>Cantidad</label>'+
												'<input type="number" nItem="'+contCedis+'" class="form-control" id="Cantidad-'+contCedis+'" placeholder="Cantidad" value="1">'+
											'</div>'+
											
											'<div class="form-group col-xs-2">'+
												'<label>Total</label>'+
												'<input class="form-control total" id="Total-'+contCedis+'" type="text" placeholder="Disabled input here..." disabled="" value="$0.00">'+
											'</div>'+
											'<div class="form-group col-xs-1">'+
												'<label> &nbsp; </label>'+
												'<button type="button" style="margin-left: 10px;" class="form-control btn btn-danger fa fa-minus" id="delProduct" onclick="$(\'#GPO_P-'+contCedis+'\').remove();updateTOTAL();"></button>'+
											'</div>'+
										'</div>');
						
										
			$('#idProducto-'+contCedis+'').change(function(){
				
				var nItem = $(this).attr('nItem');
				var Precio = $( "#idProducto-"+nItem+" option:selected" ).attr('precio');
				
				$($(this).parent()).parent().attr('prodPrice', Precio);//SET THE PRICE OF THE SELECTED PRODUCT TO PARENT DIV 
				
				$('#Total-'+nItem).val( '$' + (Precio * $('#Cantidad-'+nItem).val()).toFixed(2));
				
				updateTOTAL();
			});
			
			$('#Cantidad-'+contCedis).change(function(){
				
				var nItem = $(this).attr('nItem');
				
				//console.log( $($(this).parent()).parent().attr('prodPrice') );
				
				var Precio = $($(this).parent()).parent().attr('prodPrice');
				var total = Precio * $('#Cantidad-'+nItem).val();
				
				if(total < 0){
					total = 0;
					$('#Cantidad-'+nItem).val(0);
				}
				$('#Total-'+nItem).val('$'+total.toFixed(2));
				
				updateTOTAL();
			});
					
			
			$('#idProducto-'+contCedis).select2();
			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		} 
				
	});
	
	
	window.updateTOTAL = function(){
		var sum = 0;
		$.each($('.total'), function(indx, obj){
			var text = $(obj).val();
			sum += parseFloat(text.substring(1, text.lenght));				
		});			
		$('#TTL').val( '$' + sum.toFixed(2));
	};
							
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

	function getRowFragment(id, ApellidoP, ApellidoM, Nombre, TipoPago, Monto, fPago)
	{
		var Cliente = ApellidoP + ' ' + ApellidoM + ' ' + Nombre;
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Cliente+'</td>'+
						'<td>'+TipoPago+'</td>'+
						'<td>'+Monto+'</td>'+
						'<td>'+fPago+'</td>'+
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
    	$('#idDetalleVisita').val(0);
    	$('#idTipoPago').val(0);
    	$('#Monto').val('');	
    	
    	$('#idDetalleVisita').select2();
    	$('#idTipoPago').select2();
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
		i_Reg($('#idDetalleVisita').val(), $('#idTipoPago').val(), $('#Monto').val());	
		
		
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidMarca').val(), $('#edtidGrupo').val(), $('#edtNombre').val(), $('#edtPrecio').val(), $('#edtCodigo').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idDetalleVisita, idTipoPago, Monto){
		
		var fErr = -1;	
		
		if(Monto == '')fErr = 2;
		if(idTipoPago == '')fErr = 1;
		if(idDetalleVisita == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);			
			$.ajax({
			    type: "POST",
			    url: domin + "/fWS.asmx/i_Pago",
			    data: "{'CompanyCode':'"+company+"',"+
			    	"idDetalleVisita: '"+ idDetalleVisita.trim() +"', " +
			    	"idTipoPago: '"+ idTipoPago.trim() +"', " +
			    	"idFactura: '"+ -1 +"', " +
					"Monto: '"+ Monto.trim() +"'}",
			    contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function (msg) {
			    	ANIM.Success('fa-building', tabla + ' creado Exitosamente!');
					ClearFields();
					
					s_Reg();
			    },
			    error: function (e) {
			    	console.log(e);
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
            url: domin + "/fWS.asmx/s_Pago",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.ApellidoP, value.ApellidoM, value.Nombre, value.TipoPago, value.Monto, value.fPago)).fadeIn(0));	    			
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				$('#edtidTipo').val(value.idTipo);
	    				$('#edtidTipo').select2();
	    				$('#edtNoSerie').val(value.NoSerie);
	    				$('#edtModelo').val(value.Modelo);
	    				$('#edtDesc').val(value.Descripcion);
	    				
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
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
		
    };
    
    window.u_Reg = function (id_, idMarca, idGrupo, nombre, precio, codigo) {
		
		var fErr = -1;
		
		if(codigo == '')fErr = 5;
		if(precio == '')fErr = 4;
		if(nombre == '')fErr = 3;
		if(idGrupo == 0)fErr = 2;
		if(idMarca == 0)fErr = 1;
		

		if(!$.isNumeric(precio)) fErr = 6;
		
		var contC = 0;
		var allCedis =''; 
		$.each($('.edtcedisField select'), function(index, value)
		{
			var valSelected = $(value).val();
			if(valSelected > 0)
			{
				allCedis += valSelected + '|';	
			}
			
			
			contC+=valSelected;
			
		});
		allCedis = allCedis.substring(0, allCedis.length -1);
		
		
		if(contC == 0)fErr = 0;

		
		if(fErr == -1){
			console.log('Editando '+tabla);
	        $.post(domin + "/fWS.asmx/u_Producto", {
	            CompanyCode: company,
	            id:id_,
	            idMarca: idMarca.trim(),
	            idGrupo: idGrupo.trim(),
				Nombre: nombre.trim(), 
				Precio: precio.trim(),
				Codigo: codigo.trim(),
				Cedis_GPO: allCedis
	        })
	        .fail(function () { 
	        	ANIM.Error('Error al actualizar el '+tabla);
        	})
		  	.done(function () {
		  		ANIM.Success('fa-building', tabla + ' ' + nombre +' actualizado Exitosamente!');		  		
		  		s_Reg();
	  		});			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

    };
    
    window.d_Reg = function (id_) {
		
		console.log('Deleting '+tabla);
        $.post(domin + "/fWS.asmx/d_Producto", {
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
    
    
    
    window.s_DetalleVisita = function () {
  		
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_DetalleVisita",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		var text = value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre + ' - ' + value.Fecha;	        		
	        		$('#idDetalleVisita').append('<option value="'+value.id+'">'+ text +'</option>');
	    			$('#edtidDetalleVisita').append('<option value="'+value.id+'">'+ text +'</option>');   				
				});
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    window.s_TipoPago = function () {
  		
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_TipoPago",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idTipoPago').append('<option value="'+value.id+'">'+ value.Descripcion +'</option>');
	    			$('#edtidTipoPago').append('<option value="'+value.id+'">'+ value.Descripcion +'</option>');   				
				});
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    window.s_Producto = function () {
  		
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		var text = value.Nombre;
	        		
	        		var itemOBJ = '<option precio="'+value.Precio+'" value="'+value.id+'">'+ text +'</option>';
	        		ProductOBJs += itemOBJ;
	        		
	        		/*$('[data=idProducto]').append(itemOBJ);
	    			$('[data=edtidProducto]').append(itemOBJ);*/
				});
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
   
     
    s_Reg();
    
    s_DetalleVisita();
    s_TipoPago();
    s_Producto();
    
    
    
    
    
    
    
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