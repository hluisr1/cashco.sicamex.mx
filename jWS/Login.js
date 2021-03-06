﻿$(document).ready(function () {


    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
		var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Equipo';
	var MsjValida = ['Escoja el Tipo del ' + tabla,
						'Escriba el Número de Serie del ' + tabla,
						'Escriba el Modelo del ' + tabla,
						'Escriba la Descripción del ' + tabla];
	
	//nice select boxes
	
	
	
	var CEDIS;
	var TIPOS;
	
							
	
	function castDate(Fecha)
	{
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}

	function getRowFragment(id, Tipo, NoSerie, Modelo, Desc, fAlta, fDesc)
	{
		if(fDesc == '')fDesc = '-';
		else{ fDesc = castDate(fDesc);}
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Tipo+'</td>'+
						'<td>'+NoSerie+'</td>'+
						'<td>'+Modelo+'</td>'+
						'<td>'+Desc+'</td>'+
						'<td>'+castDate(fAlta)+'</td>'+
						'<td>'+fDesc+'</td>'+
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
    	$('#NoSerie').val('');
    	$('#Modelo').val('');
    	$('#Desc').val('');
    	
    	$('#idTipo').val(0);
    	$('#idTipo').select2();	
    }
	
	
	$("#idUsuario" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idTipo').val(), $('#NoSerie').val(), $('#Modelo').val(), $('#Desc').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidTipo').val(), $('#edtNoSerie').val(), $('#edtModelo').val(), $('#edtDesc').val(), '');
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (idTipo, NoSerie, Modelo, Desc) {
		
		var fErr = -1;		
		
		if(Desc == '')fErr = 3;
		if(Modelo == '')fErr = 2;
		if(NoSerie == '')fErr = 1;
		if(idTipo == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Equipo",
                data: "{'CompanyCode':'"+company+"',"+
                	"idTipo: '"+idTipo.trim()+"',"+
                	"NoSerie: '"+NoSerie.trim()+"',"+
                	"Modelo: '"+Modelo.trim()+"',"+
                	"Descripcion: '"+Desc.trim()+"'}",
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
            url: domin + "/fWS.asmx/s_Equipo",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	$('#REG div').remove();
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Tipo, value.NoSerie, value.Modelo, value.Descripcion, value.fAlta, value.fDesc)).fadeIn(0));	    			
	    			
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
    
    window.u_Reg = function (id, idTipo, NoSerie, Modelo, Desc, fDesc) {
		
		var fErr = -1;
		
		if(Desc == '')fErr = 3;
		if(Modelo == '')fErr = 2;
		if(NoSerie == '')fErr = 1;
		if(idTipo == '')fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Equipo",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id.trim()+"',"+
                	"idTipo: '"+idTipo.trim()+"',"+
                	"NoSerie: '"+NoSerie.trim()+"',"+
                	"Modelo: '"+Modelo.trim()+"',"+
                	"Descripcion: '"+Desc.trim()+"',"+
                	"fDesc: '"+ fDesc.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' actualizado Exitosamente!');
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
    
    window.d_Reg = function (id) {
		
		console.log('Deleting '+tabla);		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_Equipo",
            data: "{'CompanyCode':'"+company+"',"+
            	"id: '"+id.trim()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla + ' ' + ' eliminado Exitosamente!');
	  		
	  			s_Reg();
            },
            error: function (e) {
                ANIM.Error('Error al eliminar el '+ tabla);
            }
        });       
		
    };
    
    
    window.s_Tipo = function () {
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_TipoEquipo",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		$('#idTipo').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidTipo').append('<option value="'+value.id+'">'+value.Nombre+'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    
    
    
    
    function ini(){
    	try{
	    	var obj = $.cookie("scmxadminss");
	    	//console.log(obj);
	    	obj = JSON.parse(obj);
    	
    		//console.log(obj[0].Email);
    	}
    	catch(Ex){
    		console.log('NO HAY SESSION.');
    	}
    }
    
    ini();
    
    //ANIM.Error('Error al consultar los....');
    
    // create the notification
    /*var Text = 'AAaaaa';
			var notification = new NotificationFx({
				message : '<span class="fa fa-exclamation-circle fa-3x pull-left"></span><p>'+Text+'</p>',
				layout : 'bar',
				effect : 'slidetop',
				type : 'warning', // notice, warning, error or success
				onClose : function() {
					//bttn.disabled = false;
				}
			});

			// show the notification
			notification.show();
			
			// disable the button (for demo purposes only)
			this.disabled = true;*/
            
    
    
    
    window.validaLogin = function (idUsuario, Contra) {
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/v_Usuario",
            data: "{'CompanyCode':'"+company+"', "+
            			"'idUsuario':'"+idUsuario+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	console.log('A');
            	var bndEXST = false;
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		//console.log(value);
            		console.log('B');
            		bndEXST = true;
            		
            		if(Contra == value.Pass){
            			$.cookie("scmxadminss", msg.d);
            			window.location.replace(domin+"/"+MainFolder+"/index.html");
            		}
            		else{
            			$('#Contra').val('');
            			Notif('Contraseña Incorrecta.', 'error', 'fa-exclamation-circle');
            			//ANIM.Error('Contraseña Incorrecta.');
            		}
            					         	    			          	
	
	    		});
	    		
	    		if(!bndEXST){
	    			Notif('Usuario no Existe.', 'warning', 'fa-exclamation-circle');
	    			$('#idUsuario').val('');
	    			$('#Contra').val(''); 
    			}

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla + ' ' + e);
            }
        });

    };
    
    
    window.s_Permiso = function (idUsuario) {
    	var PERM_OBJ = new Array();
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_PermisoUsuario",
            data: "{'CompanyCode':'"+company+"', "+
            			"'idUsuario':'"+idUsuario+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	console.log('A');
            	var bndEXST = false;
            	var dta = JSON.parse(msg.d);
            	console.log(dta);
            	var obj = [];
            	$.each(dta, function (index, P) {
            		//console.log(value);
            		console.log('B');
            		bndEXST = true;
            		
            		obj[P.idPagina+'-'+P.Pagina] = {C: P.C, R: P.R, U: P.U, D: P.D};
            		//PERM_OBJ.push(obj[P.Pagina]);
            		
            		if(Contra == P.Pass){
            			//$.cookie("scmxadminss", msg.d);
            			window.location.replace(domin+"/"+MainFolder+"/index.html");
            		}
            					         	    			          	
	
	    		});
	    		PERM_OBJ.push(obj);PERM_OBJ = PERM_OBJ[0];
	    		console.log(PERM_OBJ);
	    		
	    		
	    		
	    		$.cookie("scmxadminss_perm", PERM_OBJ);
	    		$.cookie("scmxadminss_perm", JSON.stringify({C: 1, R: 1}));
	    		$.cookie("scmxadminss_perm", JSON.stringify(PERM_OBJ));
	    		
	    		console.log('aaa');
				var aaa = $.parseJSON($.cookie("scmxadminss_perm"));
				console.log(aaa);
				//aaa = JSON.parse(aaa);
				
				 
				
				//console.log(obj[0]);
		
		
	    		
	    		if(!bndEXST){
	    			Notif('Usuario no Existe.', 'warning', 'fa-exclamation-circle');
	    			$('#idUsuario').val('');
	    			$('#Contra').val(''); 
    			}

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla + ' ' + e);
            }
        });

    };
    
    
    $("#iniciar_sesion").on('click', function () {
    	
    	validaLogin($("#idUsuario").val(), $("#Contra").val());
    	
    	//s_Permiso($("#idUsuario").val());
    	        
    });
        
    
    /*s_Reg();    
    s_Tipo()*/;
    
    
    function Notif(Text, Type, Icon){
    	var notification = new NotificationFx({
			message : '<span class="fa '+ Icon +' fa-3x pull-left"></span><p>'+Text+'</p>',
			layout : 'bar',
			effect : 'slidetop',
			type : Type, // notice, warning, error or success
			onClose : function() {
				bttn.disabled = false;
			}
		});

		// show the notification
		notification.show();
		
		// disable the button (for demo purposes only)
		this.disabled = true;
    }
    
    
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
			
			// create the notification
			var notification = new NotificationFx({
				message : '<span class="fa fa-exclamation-circle fa-3x pull-left"></span><p>'+Text+'</p>',
				layout : 'growl',
				effect : 'slideontop',
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