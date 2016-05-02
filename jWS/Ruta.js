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
	
	var tabla = 'Ruta';
	var MsjValida = ['Escoja el Tipo de Ruta de la ' + tabla+'.',
						'Escriba el Nombre del ' + tabla+'.',
						'Escoja el CEDIS de la ' + tabla+'.'];
	
	var MsjValida_RU = ['Escoja una ' + tabla+'.',
						'Escoja un Vendedor.'];
	
	
	//nice select boxes
	$('#idCedis').select2();	
	$('#edtidCedis').select2();
	
	$('#idTipoRuta').select2();	
	$('#edtidTipoRuta').select2();
	
	$('#idRutaToReset').select2();
	
	
	$('#idRuta').select2();
	$('#idUsuario').select2();
	
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var dataRuta;
	
	
	var FRM = new CRUD('11-RUTA', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
		
	var MTDS = new METODOS();
	
							
	function getRegFragment(id, Nombre, Tipo)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix edt-'+id+'">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								tabla +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-paw"></i> '+ Tipo +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}

	function getRowFragment(id, Nombre, Tipo, Cedis)
	{
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Nombre+'</td>'+						
						'<td>'+Tipo+'</td>'+
						'<td>'+Cedis+'</td>'+
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
    	$('#Nombre').val('');    	
    	$('#idTipoRuta').val(0);
    	$('#idCedis').val(0);
    	
    	$('#idCedis').select2();    	
    	$('#idTipoRuta').select2();
    }
	
	function ClearFields_RU()
    {   	
    	$('#idRuta').val(0);
    	$('#idUsuario').val(0);
    	
    	$('#idRuta').select2();    	
    	$('#idUsuario').select2();
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
		i_Reg($('#idCedis').val(), $('#idTipoRuta').val(), $('#Nombre').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#SAVE_RU').on('click', function(){
		i_Reg_RU($('#idRuta').val(), $('#idUsuario').val());
	});
	
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidCedis').val(), $('#edtidTipoRuta').val(), $('#edtNombre').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EXPORTA').on('click', function(){
		var objH = [{F:'id',H:'id', str:false}, 
    			{F:'Nombre', H:'Nombre', str:true}, 
    			{F:'TipoRuta', H:'Tipo de Ruta', str:true}, 
    			{F:'Cedis', H:'Cedis', str:true}, 
    			{F:'idCedis', H:'idCedis', str:false}, 
    			{F:'idTipoRuta', H:'idTipoRuta', str:false}];
		Export(objH, dataRuta, 'Rutas');
	});
    
    
    $('#RESET').on('click', function(){
		
		try{
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_ResetVisitas",
                data: "{'CompanyCode':'"+company+"',"+                	
					"idUsuario: '"+$('#idRutaToReset').val()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Reset ejecutado Exitosamente!');
                },
                error: function (e) {
                    ANIM.Error('Error al ejecutado el Reset ');
                }
           });
		}
		catch(Ex){console.log(Ex);}
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
    
	window.i_Reg = function (idCedis, idTipoRuta, nombre) {
		
		var fErr = -1;

		if(nombre == '')fErr = 1;
		if(idTipoRuta == 0)fErr = 0;
		if(idCedis == 0)fErr = 2;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Ruta",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idCedis: '"+idCedis+"'," +
					"idTipoRuta: '"+idTipoRuta.trim()+"',"+					
					"Nombre: '"+nombre.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' creada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();

                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nuevo '+ tabla);
                }
           });
		
	        			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

   };
    
    window.i_Reg_RU = function (idRuta, idUsuario) {
		
		var fErr = -1;

		if(idUsuario == '')fErr = 1;
		if(idRuta == 0)fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_RutaUsuario",
                data: "{'CompanyCode':'"+company+"',"+
					"idRuta: '"+idRuta.trim()+"',"+	
					"idUsuario: '"+getUserSession().Nickname+"',"+				
					"idUsuario_Op: '"+idUsuario.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Asgnación realizada Exitosamente!');
		  			ClearFields_RU();
		  		
		  			s_Reg_RU();

                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nuevo '+ tabla);
                }
           });
		
	        			
		}
		else{
			ANIM.Alert( MsjValida_RU[fErr] );
		}        

   };
    
    
    function s_Reg() {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	dataRuta = dta;
	        	console.log(dta);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			//console.log(index + ' | ' + value);
		    			if(index+1 > dta.length - 6 )
		    				$('#REG').append($(getRegFragment(value.id, value.Nombre, value.TipoRuta)).fadeIn(0));
		    			
		    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Nombre, value.TipoRuta, value.Cedis)).fadeIn(0));
		    			
		    			
			        	$('#idRuta').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
		    				
			    			
			    		
		    			
		    			$('.edt-'+value.id).on('click', function(){
		    				
		    				/*RESET CEDIS*/
		    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
							
										
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#edtNombre').val(value.Nombre);
					    	$('#edtidTipoRuta').val(value.idTipoRuta);
					    	$('#edtidCedis').val(value.idCedis);  				
							
							
							$('#edtidTipoRuta').select2();					
							$('#edtidCedis').select2();
							
		    				
		    				$("#btnEDT").click();
		    				
		    				
		    			});
	    			  	 
	        			
	        		}	        		
	        		       		
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
    
    function  s_Reg_RU() {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_RutaUsuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	            	
                //-------------------------------------------------------------------------
                
                
                var arr = new Array();	        	
	        	
	        	//dta_LDR = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		console.log(value);
	        		        		
	        		
	        		if(true){//if(value.Activo){
	        			var OBJ = [value.id, value.Ruta, value.Nombre, value.ApeP, value.ApeM, MTDS.CAST_DATE(value.fAlta), value.Activo == true ? '<span class="label label-success"> Activo </span>' : '<span class="label label-warning"> Inactivo </span>' ];
	    				arr.push(OBJ);
	        		}
	    				    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos_RU').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_RU').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,//{'idRuta': 'idRuta'},{'idLista': 'idLista'}, 
	    				columns:[{'ID': 'ID'}, {'Ruta': 'Ruta'}, {'Nombre': 'Nombre'}, {'ApeP': 'ApeP'}, {'ApeM': 'ApeM'}, {'Fecha': 'fAlta'}, {'Activo': 'Activo'}, 
	    				/*{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+' CRUD_E" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' ;
							 }
        				}*/ ],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				//bindBTNROW();
				
				table.on('draw.dt', function () {
    				//bindBTNROW();
	    		} );
                
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    
    window.u_Reg = function (id_, idCedis, idTipoRuta, nombre) {
		
		var fErr = -1;
		
		if(nombre == 0)fErr = 1;
		if(idTipoRuta == 0)fErr = 0;
		if(idCedis == 0)fErr = 2;		

		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Ruta",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id_+"'," + 
                	"idCedis: '"+idCedis+"'," +
					"idTipoRuta: '"+idTipoRuta.trim()+"',"+					
					"Nombre: '"+nombre.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + nombre +' actualizado Exitosamente!');		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al actualizar la '+tabla);
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
            url: domin + "/fWS.asmx/d_Ruta",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+getUserSession().Nickname+"',"+
            	"id: '"+id_+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla +' eliminada Exitosamente!');	  		
  				s_Reg();
            },
            error: function (e) {
                ANIM.Error('Error al eliminar la ' + tabla);
            }
      	});     	
        
    };
    
    
    function s_RutaUsuario() {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sL_RutaUsuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	//console.log(data);
	        	$.each(data.d, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        			$('#idRutaToReset').append('<option value="'+value.idUsuario+'">'+value.Ruta + ' - ' + value.idUsuario+'</option>');	        		
	        		//console.log(value.Ruta + ' - ' + value.idUsuario);    			  	        		
	    		}); 		
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar las '+tabla);
            }
        });

    };
    
    
    
    function s_TipoRuta() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_TipoRuta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idTipoRuta').append('<option value="'+value.id+'">'+value.Tipo+'</option>');
    				$('#edtidTipoRuta').append('<option value="'+value.id+'">'+value.Tipo+'</option>');
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Tipos de Ruta.');
            }
        });						
        
    };
    
    function s_Cedis() {
    	
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
    
    function s_UsuarioVen() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_UsuarioVen",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			$('#idUsuario').append('<option value="'+value.Nickname+'">'+value.Nombre + ' ' + value.ApellidoP + ' ' + value.ApellidoM+'</option>');	        			
	        		}
	        		
	    		});
	    						
            },
            error: function (e) {
                ANIM.Error('Error al consultar los Vendedores.');
            }
        });
        
    };

    
    
    function INI_PAGE(){
    	
    	s_Reg();
    	s_Reg_RU();
    	s_UsuarioVen();    

		s_RutaUsuario();
		
    	s_TipoRuta();
		s_Cedis();
		
		
    }
    
});