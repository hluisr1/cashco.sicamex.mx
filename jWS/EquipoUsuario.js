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
	
	var tabla = 'Equipo';
	var MsjValida = ['Escoja el Equipo',
						'Escoja el Usuario'];
	
	//nice select boxes
	$('#idEquipo').select2();
	$('#idUsuario').select2();	
	
	
	$('#edtidEquipo').select2();	
	$('#edtidUsuario').select2();
	
	
	var CEDIS;
	var TIPOS;
	
							
	
	function castDate(Fecha)
	{
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}

	function getRowFragment(id, idUsuario, ApellidoP, ApellidoM, Nombre, Tipo, Modelo, NoSerie, fCreacion)
	{		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+idUsuario+'</td>'+
						'<td>'+ApellidoP + ' ' + ApellidoM + ' ' + Nombre +'</td>'+
						'<td>'+Tipo+'</td>'+
						'<td>'+Modelo+'</td>'+
						'<td>'+NoSerie+'</td>'+
						'<td>'+castDate(fCreacion)+'</td>'+						
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
    	$('#idEquipo').val(0);
    	$('#idUsuario').val(0);
    	
    	$('#idEquipo').select2();	
    	$('#idUsuario').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idEquipo').val(), $('#idUsuario').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidEquipo').val(), $('#edtidUsuario').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idEquipo, idUsuario) {
		
		var fErr = -1;		
		
		if(idUsuario == '')fErr = 1;
		if(idEquipo == '')fErr = 0;
		
		//console.log(fErr + ' | '+idEquipo + ' | ' + idUsuario);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_EquipoUsuario",
                data: "{'CompanyCode':'"+company+"',"+
                	"idEquipo: '"+idEquipo.trim()+"',"+
                	"idUsuario: '"+idUsuario.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' creado Exitosamente!');
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
            url: domin + "/fWS.asmx/s_EquipoUsuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	$('#REG div').remove();
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.idUsuario, value.ApellidoP, value.ApellidoM, value.Nombre, value.Tipo, value.Modelo, value.NoSerie, value.fCreacion)).fadeIn(0));	    			
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				$('#edtidEquipo').val(value.idEquipo);
	    				$('#edtidEquipo').select2();
	    				$('#edtidUsuario').val(value.idUsuario);
	    				$('#edtidUsuario').select2();
	    				
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
    
    window.u_Reg = function (id, idEquipo, idUsuario) {
		
		var fErr = -1;
		
		if(idUsuario == '')fErr = 1;
		if(idEquipo == '')fErr = 0;
				
		
		if(fErr == -1){
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_EquipoUsuario",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id.trim()+"',"+
                	"idEquipo: '"+idEquipo.trim()+"',"+
                	"idUsuario: '"+idUsuario.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' creado Exitosamente!');
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
    
    window.d_Reg = function (id_) {
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_EquipoUsuario",
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
    
    
    window.s_Equipo = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Equipo",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		$('#idEquipo').append('<option value="'+value.id+'">'+ value.Tipo + ' - ' + value.Modelo + ' - ' + value.NoSerie+'</option>');
    				$('#edtidEquipo').append('<option value="'+value.id+'">'+ value.Tipo + ' - ' + value.Modelo + ' - ' + value.NoSerie+'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
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
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		$('#idUsuario').append('<option value="'+value.Nickname+'">'+value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre +'</option>');
    				$('#edtidUsuario').append('<option value="'+value.Nickname+'">'+value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre +'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    
    
    s_Reg();
    
    s_Equipo();
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