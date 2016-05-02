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
	
	var tabla = 'Visita Cliente';
	var MsjValida = ['Escoja una Visita para la ' + tabla+'.',
						'Escoja el Dia en el que se ' + tabla+'.',
						'Escoja el Tipo de Frecuencia de la ' + tabla+'.'];
						
	var dias = ['No Aplica', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
	
	//nice select boxes
	$('#idVisita').select2();	
	$('#idDia').select2();
	$('#idFrecuencia').select2();
	
	$('#edtidVisita').select2();	
	$('#edtidDia').select2();
	$('#edtidFrecuencia').select2();


	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
							
	function getRegFragment(id, Ruta, idUsuario, Direccion, fApartir)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Ruta+'</h2>'+
							'<div class="job-position">'+
								idUsuario +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-map-marker"></i> '+ Direccion +
								'</li>'+
								'<li>'+
									'<i class="fa fa-calendar"></i> '+ fApartir +
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
	
	function getRowFragment(idVisita, Dia, Frecuencia, Ruta, Usuario, Direccion, idFrec)
	{
		var frag = '<tr>'+
						'<td>'+ idVisita +'</td>'+
						'<td>'+ dias[Dia] +'</td>'+
						'<td>'+ Frecuencia +'</td>'+
						'<td>'+ Ruta +'</td>'+
						'<td>'+ Usuario +'</td>'+
						'<td>'+ Direccion.toUpperCase() +'</td>'+
						'<td >'+							
							'<a id="edt-'+idVisita+'-'+Dia+'-'+idFrec+'" class="table-link edt-'+idVisita+'-'+Dia+'-'+idFrec+'">'+
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
    	$('#idVisita').val(0);
    	$('#idDia').val(0);
    	$('#idFrecuencia').val(0);	
    	
    	$('#idVisita').select2();
		$('#idDia').select2();
		$('#idFrecuencia').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idVisita').val(), $('#idDia').val(), $('#idFrecuencia').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidVisita').val(), $('#edtidDia').val(), $('#edtidFrecuencia').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idVisita, Dia, idFrecuencia) {
		
		var fErr = -1;
		
		if(idFrecuencia == 0)fErr = 2;
		if(Dia == '')fErr = 1;
		if(idVisita == 0)fErr = 0;
		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);	       
	  		$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_DiaVisita",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idVisitaCliente: '"+idVisita.trim()+"'," +
					"Dia: '"+Dia.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"idFrecuencia: '"+idFrecuencia.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' creada Exitosamente!');
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
            url: domin + "/fWS.asmx/s_DiaVisita",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	//$('#REG div').remove();
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	
	    			//console.log(index + ' | ' + value.idUsuario);
	    			//$('#REG').append($(getRegFragment(value.id, value.Ruta, value.idUsuario, value.Direccion, value.fApartir)).fadeIn(0));
	    			$('#tablaDatos tbody').append($(getRowFragment(value.idVisitaCliente, value.Dia, value.Frecuencia, value.Ruta, value.Usuario, value.Direccion, value.idFrecuencia)));
	    			    			
	    			    			
	    			$('#edt-'+value.idVisitaCliente + '-' + value.Dia + '-' + value.idFrecuencia).on('click', function(){
	    				
	    				/*RESET CEDIS*/
	    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
						
									
	    				    				
	    				$('#EDITA').attr('idRegistro',value.idVisitaCliente + '-' + value.Dia + '-' + value.idFrecuencia);
	    				$('#ELIMINA').attr('idRegistro',value.idVisitaCliente + '-' + value.Dia + '-' + value.idFrecuencia);
	    				
	    				
	    				$('#edtidVisita').val(value.idVisitaCliente);    				
				    	$('#edtidDia').val(value.Dia);
				    	$('#edtidFrecuencia').val(value.idFrecuencia);
	    				
						
						
						$('#edtidVisita').select2();    				
				    	$('#edtidDia').select2();
				    	$('#edtidFrecuencia').select2();
						
	    				
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
    
    window.u_Reg = function (id_, idVisita, Dia, idFrecuencia) {
		
		var fErr = -1;
		
		if(idFrecuencia == 0)fErr = 2;
		if(Dia == '')fErr = 1;
		if(idVisita == 0)fErr = 0;

		
		if(fErr == -1){
			console.log('Editando '+tabla);
	        $.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_DiaVisita",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idVisitaCliente: '"+idVisita.trim()+"',"+
					"Dia: '"+Dia.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"idFrecuencia: '"+idFrecuencia.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' actualizada Exitosamente!');		  		
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
    	
    	id_ = id_.split('-');
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_DiaVisita",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idVisitaCliente: '"+id_[0]+"',"+
            	"Dia: '"+id_[1]+"',"+
            	"idUsuario: '"+getUserSession().Nickname+"',"+
            	"idFrecuencia: '"+id_[2]+"'}",
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
    
    
    
    window.s_Visita = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	var elmnt = '';
	        	var SP = ' | ';
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	    			//<option value="1">United Kingdom</option>
	    			
	    			elmnt += '<option value="'+value.id+'">'+value.Ruta + SP + value.idUsuario + SP + value.Direccion +'</option>';   			
	    			
				});
				
				$('#idVisita').append(elmnt);
				$('#edtidVisita').append(elmnt);   	
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
        
    window.s_Dia = function () {
    	
    	$.each(dias, function (index, value) {
    		//<option value="1">United Kingdom</option>			
			//CEDIS.push('{id:'+ (index+1) +', Nombre:'+value+'}');
			
			CEDIS_op += '<option value="'+ (index) +'">'+value+'</option>';
		
		});
			
		$('#idDia').append(CEDIS_op);
		$('#edtidDia').append(CEDIS_op);       

    };
        
    window.s_Frecuencia = function () {
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Frecuencia",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	var SP = ' | ';
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	    			
	    			//items += '<option value="'+value.id+'">'+value.Nombre+'</option>';
	    			var text = value.Codigo + SP + value.Descripcion;
	    			
	    			$('#idFrecuencia').append('<option value="'+value.id+'">'+ text +'</option>');
	    			$('#edtidFrecuencia').append('<option value="'+value.id+'">'+ text +'</option>');
	    			
				});    

            },
            error: function (e) {
                ANIM.Error('Error al consultar Frecuencias');
            }
        });
		
		
    };
    
    
    
    s_Reg();
    
    
    s_Visita();
    s_Dia();
    s_Frecuencia();
    
    
    
    
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