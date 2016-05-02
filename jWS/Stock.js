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
	
	var tabla = 'Stock';
	var MsjValida = ['Escoja el Producto.',
						'Escoja el CEDIS.',
						'Escriba la Cantidad del ' + tabla+'.'];
	
	//nice select boxes
	$('#idProducto').select2();	
	$('#idCedis').select2();
	
	$('#edtidProducto').select2();	
	$('#edtidCedis').select2();

							
	function getRegFragment(id, Producto, Cedis, Cantidad)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Producto+'</h2>'+
							'<div class="job-position">'+
								Cedis +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-cube"></i> '+ Cantidad +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	
	function castDate(Fecha)
	{
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}
	
	function addCommas(nStr)
	{
	   nStr += '';
	   x = nStr.split('.');
	   x1 = x[0];
	   x2 = x.length > 1 ? '.' + x[1] : '';
	   var rgx = /(\d+)(\d{3})/;
	   while (rgx.test(x1)) {
	      x1 = x1.replace(rgx, '$1' + ',' + '$2');
	   }
	   return x1 + x2;
	}
	
	function getRowFragment(id, Producto, Cedis, Cantidad, Alta)
	{		
		var frag = '<tr>'+
						'<td>'+Producto+'</td>'+
						'<td>'+Cedis+'</td>'+
						'<td>'+addCommas(Cantidad)+'</td>'+
						'<td>'+castDate(Alta)+'</td>'+
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
    	$('#idProducto').val(0);
    	$('#idCedis').val(0);
    	$('#Cantidad').val('');	
    	
    	$('#idProducto').select2();
		$('#idCedis').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idProducto').val(), $('#idCedis').val(), $('#Cantidad').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidProducto').val(), $('#edtidCedis').val(), $('#edtCantidad').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idProducto, idCedis, Cantidad) {
		
		var fErr = -1;
		
		if(Cantidad == 0)fErr = 2;
		if(idCedis == '')fErr = 1;
		if(idProducto == 0)fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Stock",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idProducto: '"+idProducto.trim()+"'," +
					"idCedis: '"+idCedis.trim()+"',"+
					"Cantidad: '"+Cantidad.trim()+"'}",
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
            url: domin + "/fWS.asmx/s_Stock",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		//$('#REG').append($(getRegFragment(value.idProducto +'-'+ value.idCedis, value.Producto, value.Cedis, value.Cantidad)).fadeIn(0));
	    			
	    			$('#tablaDatos tbody').append($(getRowFragment(value.idProducto +'-'+ value.idCedis, value.Producto, value.Cedis, value.Cantidad, value.fAlta)).fadeIn(0)); 			
	    			
	    			$('#edt-'+value.idProducto +'-'+ value.idCedis).on('click', function(){
	    											
	    				    				
	    				$('#EDITA').attr('idRegistro',value.idProducto +'-'+ value.idCedis);
	    				$('#ELIMINA').attr('idRegistro',value.idProducto +'-'+ value.idCedis);
	    				    				
	    				
	    				$('#edtidProducto').val(value.idProducto);    				
				    	$('#edtidCedis').val(value.idCedis);
				    	$('#edtCantidad').val(value.Cantidad);			    	    									
						
						$('#edtidProducto').select2();    				
				    	$('#edtidCedis').select2();
						
	    				
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
    
    window.u_Reg = function (id_, idProducto, idCedis, Cantidad) {
		
		var fErr = -1;
		
		if(Cantidad == 0)fErr = 2;
		if(idCedis == '')fErr = 1;
		if(idProducto == 0)fErr = 0;

		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Stock",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idProducto: '"+idProducto.trim()+"'," +
					"idCedis: '"+idCedis.trim()+"',"+
					"Cantidad: '"+Cantidad.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' actualizado Exitosamente!');		  		
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
            url: domin + "/fWS.asmx/d_Stock",
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
    
    
    
    window.s_Producto = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var Prod_op;
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {	        		
	        		Prod_op += '<option value="'+value.id+'">'+value.Nombre+'</option>';	    			
	    		});
				
				$('#idProducto').append(Prod_op);
				$('#edtidProducto').append(Prod_op);

            },
            error: function (e) {
                ANIM.Error('Error al consultar los CEDIS.');
            }
        });						
        
    };
    
    window.s_Cedis = function () {
						
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cedis",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');	
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los CEDIS.');
            }
        });
        
    };
    
    
    
    s_Reg();
    
    s_Producto();
    s_Cedis();
    
    
    
    
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