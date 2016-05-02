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
	
	var tabla = 'Carga al Usuario';
	var MsjValida = ['Escoja el Producto.',
						'Escoja un Usuario.',
						'Escriba la Cantidad del ' + tabla+'.'];
	
	//nice select boxes
	$('#idProducto').select2();	
	$('#idUsuario').select2();
	
	$('#edtidProducto').select2();	
	$('#edtidUsuario').select2();

							
	function getRegFragment(id, Producto, Usuario, Cantidad, objProduct)
	{
		var elmnts = '';
		
		var nObjs = new Array();
		
		console.log(objProduct.length);
		var contAdd = 0;
		$.each(objProduct, function(indx, obj){
			
			
			
			if(indx > 0)
			{
				if(obj.P == objProduct[indx-1].P)
				{
						
					console.log(nObjs[0] + ' | ' + (indx-(1+contAdd)));
					nObjs[indx-(1+contAdd)].C = parseFloat(nObjs[indx-(1+contAdd)].C) + parseFloat(obj.C);
					nObjs[indx-(1+contAdd)].M = parseFloat(nObjs[indx-(1+contAdd)].M) + parseFloat(obj.M);
					
					contAdd++;
				}
				else
				{
					nObjs.push({P:obj.P, C:obj.C, M:obj.M});
				}
			}
			else
			{
				nObjs.push({P:obj.P, C:obj.C, M:obj.M});
			}
		});
		
		$.each(nObjs, function(indx, obj){
			elmnts += '<li>'+
							'<i class="fa fa-tags"></i> '+ obj.P +
						'</li>' + 
						'<li>'+
							'<i class="fa fa-cube"></i> '+ obj.C +
						'</li></br>';
		});
		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+id+'</h2>'+
							'<div class="job-position">'+
								Usuario +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								
								elmnts +
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
    	$('#idProducto').val(0);
    	$('#idUsuario').val(0);
    	$('#Cantidad').val('');	
    	
    	$('#idProducto').select2();
		$('#idUsuario').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idUsuario').val(), $('#idProducto').val(), $('#Cantidad').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidProducto').val(), $('#edtidUsuario').val(), $('#edtCantidad').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idUsuario, idProducto, Cantidad) {
		
		var fErr = -1;
		
		if(Cantidad == 0)fErr = 2;
		if(idUsuario == '')fErr = 1;
		if(idProducto == 0)fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_UsuarioCarga",
                data: "{'CompanyCode':'"+company+"',"+
					"idUsuario: '"+idUsuario.trim()+"',"+
					"idProducto: '"+idProducto.trim()+"',"+
					"Cantidad: '"+Cantidad.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla +' creado Exitosamente!');
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
            url: domin + "/fWS.asmx/s_UsuarioCarga",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#REG div').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		var P = value.Productos.split('|');
    				var C = value.Cantidades.split('|');
    				var M = value.Montos.split('|');
    				
    				var objs = new Array();
    				
    				$.each(P, function(indx, objP){			    		
			    		objs.push({P: objP, C: C[indx], M: M[indx]});			    		
			    	});        		

	    			$('#REG').append($(getRegFragment(value.idUsuario, value.Producto, value.Usuario, value.Cantidad, objs)).fadeIn(0));    			
	    			
	    			$('#edt-'+value.id).on('click', function(){
	    										
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				    				
	    				
	    				$('#edtidProducto').val(value.idProducto);    				
				    	$('#edtidUsuario').val(value.idUsuario);
				    	$('#edtCantidad').val(value.Cantidad);			    	    									
						
						$('#edtidProducto').select2();    				
				    	$('#edtidUsuario').select2();
						
	    				
	    				$("#btnEDT").click();	    				
	    				
	    			});
	    			
	    		});    		

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    window.u_Reg = function (id_, idProducto, idUsuario, Cantidad) {
		
		var fErr = -1;
		
		if(Cantidad == 0)fErr = 2;
		if(idUsuario == '')fErr = 1;
		if(idProducto == 0)fErr = 0;

		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_UsuarioCarga",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idUsuario: '"+idUsuario.trim()+"',"+
					"idProducto: '"+idProducto.trim()+"',"+
					"Cantidad: '"+Cantidad.trim()+"'}",
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
            url: domin + "/fWS.asmx/d_UsuarioCarga",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"id: '"+id_+"',"+
            	"Nickname: '"+Nickname+"'}",
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
                ANIM.Error('Error al consultar los Productos.');
            }
        });			
        
    };
    
    window.s_Usuario = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_UsuarioVen",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {	        		
	        		$('#idUsuario').append('<option value="'+value.Nickname+'">'+value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre + '</option>');
    				$('#edtidUsuario').append('<option value="'+value.Nickname+'">'+value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre +'</option>');
	    		});             

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Productos.');
            }
        });

    };
    
    
    
    s_Reg();
    
    s_Producto();
    s_Usuario();
    
    
    
    
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