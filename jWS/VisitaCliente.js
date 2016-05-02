$(document).ready(function () {

    //var domin = "http://localhost:15451";    

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Visita Cliente';
	var MsjValida = ['Escoja la Ruta de la ' + tabla+'.',
						'Escoja el Usuario de la ' + tabla+'.',
						'Escoja la Dirección de la ' + tabla+'.',
						'Escriba el Orden de la ' + tabla+'.',
						'Escriba la Fecha de Inicio de la ' + tabla+'.'];
	
	var MsjValida_CH = ['Escoja la Ruta.',
						'Escoja el Usuario.',
						'Escriba un ID.CLIENTE.',
						'Escoja un Dia.',
						'Escoja una Frecuencia.',
						'Ingrese el Número de Secuencia.'];
	
	
	var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
						
	
	
	//nice select boxes
	$('#idRuta').select2();
	console.log('www---');
	$('#idRuta').change(function(aaa){
		
		var idCedis = $( "#idRuta option:selected" ).attr('idCedis');		
		var value = $( "#idRuta option:selected" ).val();
		ClearFields();
		$("#idRuta" ).val(value);
		$('#idRuta').select2();
				
		fullerFilterUser(_USERS, idCedis);
		fullerFilterDireccion(_DIREC, idCedis);
	});
	
	$('#idUsuario').select2();
	$('#idDireccion').select2();
	
	$('#edtidRuta').select2();	
	$('#edtidUsuario').select2();
	$('#edtidDireccion').select2();

	$('#fApartir').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	
	$('#chidRuta').select2();
	$('#chidUsuario').select2();
	$('#idDia').select2();
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var _USERS = new Array();
	var User_op;
	var _DIREC = new Array();
	var Direc_op;
	
	
	var dta;
	
	
	
	var msv_Alta_data;
	var msv_Alta = [{field:'Dia', mandatory: true, def:''},
					{field:'Secuencia', mandatory: true, def:''},
					{field:'idCliente', mandatory: true, def:'-'},
					{field:'idRuta', mandatory: true, def:'-'},
					{field:'idUsuario', mandatory: true, def:'-'},
					{field:'idVisitaCliente', mandatory: true, def:'-'},
					{field:'index', mandatory: true, def:'-'}
					];
	
	
	$('#idRuta_R').select2();
	$('#idRuta_R2').select2();
	
	var UserToDelete;
	
	
	var tableFixed_R;
	
	
	
	var FRM = new CRUD('13-VISITA.CLIENTE', {C: '.CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	
	
	 // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
    	if (!browserSupportFileUpload()) {
	        alert('The File APIs are not fully supported in this browser!');
        } else {
        	console.log('.CSV');
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
            	try{
	                var csvData = event.target.result;
	                console.log(csvData);
	                data = $.csv.toArrays(csvData);
	                if (data && data.length > 0) {
	                	console.log(data[0]);
	                	console.log(data[1]);
	                  
	                  ANIM.Success('fa-building', 'Se encontraron ' + data.length + ' registros.');
	                  //alert('Imported -' + data.length + '- rows successfully!');
	                  
	                $('#tablaDatosMSV tbody tr').remove();
		        	$.each(data, function (i, value) {
		    			data[i] = data[i] + '\n';
		    			$.each(value, function(j, val){
		    				//console.log(val);
		    				if(val.trim() == ''){
		    					data[i][j] = msv_Alta[j].def;
		    					console.log(value[j] + '...');
		    					value[j] = msv_Alta[j].def;
		    					//value[j] = 'msv_Alta[j].def';
		    					console.log(value[j] + '...2');	
		    				}
		    				
		    			});
		    			
		    			if(i > 0)
		    			$('#tablaDatosMSV tbody').append($(getRowFragmentMSV(value)).fadeIn(0));	    			
		    				
		    		});
		    		
		    		msv_Alta_data = data;
	    		   		
		    			    		
		    		var tableFixed = $('#tablaDatosMSV').dataTable({
				  		retrieve: true,
				  		destroy: true,
						info: false,
						pageLength: 10,
						//paging: false
					});
				
					$("#btnMASIVO").click();
					//new $.fn.dataTable.FixedHeader( tableFixed );	                
                 	}
	                                 
                 	else {
                    	alert('No data to import!');
                	}
             	}
             	catch(ex){
             		ANIM.Error('Error Cargar los Recoridos.');
             	}
            };
            reader.onerror = function() {
            	console.log(':/ .CSV');
                alert('Unable to read ' + file.fileName);
            };
        }
    }
    
    function getRowFragmentMSV(obj)
	{
		var frag;
		
		$.each(obj, function(indx, val){
			frag += '<td>'+val+'</td>';
		});
				
		frag = '<tr>'+ frag + '</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	
		
	
	window.u_msv_Visitas = function (CSV_TEXT) {
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/u_msv_Visitas_TEST",
            data: "{'CompanyCode':'"+company+"',"+ 
				"CSV_TEXT: '"+CSV_TEXT+"',"+
				"idUsuario: '"+getUserSession().Nickname+"' "+
				"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', 'Los Recorridos han sido actualizados!');	  		
            },
            error: function (e) {
                ANIM.Error('Error al insertar al Actualizar Recoridos.');
            }
       });
   };
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
							
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
		var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
		var d = new Date(parseInt(milli));
		//
		
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return d.toLocaleDateString();//Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}
	
	function getRowFragment(id, idRuta, Ruta, Usuario, Direccion, fApartir)
	{
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+idRuta+'</td>'+
						'<td>'+Ruta+'</td>'+
						'<td>'+Usuario+'</td>'+
						'<td>'+Direccion.toUpperCase()+'</td>'+
						'<td>'+castDate(fApartir)+'</td>'+
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
	
	
	function getRowFragmentOBJ(id, OBJ)
	{
		var frag = '<tr>';
		
		$.each(OBJ, function(indx, C){
			frag += '<td>'+C+'</td>';
		});
					
					
					/*<a href="#" class="table-link danger">
																	<span class="fa-stack">
																		<i class="fa fa-square fa-stack-2x"></i>
																		<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
																	</span>
																</a>*/	
		frag = frag += '<td >'+							
							'<a id="edt-'+id+'" class="table-link danger edt-'+id+'">'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>'+							
						'</td>'+
					'</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	


	function ClearFields()
    {
    	$('#nOrden').val('');
    	$('#fApartir').val('');
    	
    	$('#idRuta').val(0);
    	$('#idUsuario').val(0);
    	$('#idDireccion').val(0);	
    	
    	$('#idRuta').select2();
		$('#idUsuario').select2();
		$('#idDireccion').select2();
    }
    
    function ClearFields_CH()
    {
    	$("#Cliente2ch").text('');
    	$('#chSecuencia').val('');
    	$('#chidCliente').val('');
    	
    	$('#chidRuta').val(0);
    	$('#chidUsuario').val(0);
    	$('#idDia').val(0);	
    	
    	$('#chidRuta').select2();
		$('#chidUsuario').select2();
		$('#idDia').select2();
    }
	
	
	$("input, textarea" ).keyup(function() {
  		//$(this).val($(this).val().toUpperCase());
	});
	
	
	$("#BUSCA" ).keyup(function(e) {
		if (e.keyCode === 13) {
		    e.preventDefault();
		    // do something
		    //alert('BUSCAND0');
		    sb_Reg_Ruta($('#BUSCA').val());
		  }
	});
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idRuta').val(), $('#idUsuario').val(), $('#idDireccion').val(), $('#fApartir').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidRuta').val(), $('#edtidUsuario').val(), $('#edtidDireccion').val(), $('#edtfApartir').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#PROCESA_ALTA').on('click', function(){
		
		u_msv_Visitas(msv_Alta_data);
	});
	
	
	$('#CONSULTA').on('click', function(){
		s_Reg_Ruta($('#idRuta_R').val());
	});
  	
  	
  	$('#ELIMINA_VC').on('click', function(){
		//alert($('#ELIMINA').attr('idRegistro'));
		d_Reg_VC($('#ELIMINA').attr('idRegistro'));
	});
  

	
	$("#chidCliente").keyup(function(e) {
		if (e.keyCode === 13) {
		    e.preventDefault();
		    // do something
		    //alert('BUSCAND0');
		    ch_sb_Reg_Ruta($("#chidCliente").val());
		  }
	});

	$('#chSAVE').on('click', function(){
		chi_Reg($('#chidRuta').val(), $('#chidUsuario').val(), $('#chidCliente').val(), $('#idDia').val(), 1, $('#chSecuencia').val());
	});
	
	
	
    
	window.i_Reg = function (idRuta, idUsuario, idDireccion, fApartir) {
		
		var fErr = -1;
		
		if(fApartir == '')fErr = 4;
		if(idDireccion == 0)fErr = 2;
		if(idUsuario == '')fErr = 1;
		if(idRuta == 0)fErr = 0;
		
		console.log(idUsuario);
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_VisitaCliente",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idRuta: '"+idRuta.trim()+"'," +
					"idUsuario_Op: '"+idUsuario.trim()+"',"+
					"idDireccion: '"+idDireccion.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"fApartir: '"+fApartir.trim()+"'}",
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
    
    window.chi_Reg = function (idRuta, idUsuario, idDireccion, Dia, idFrec, Sec) {
    	//int idRuta, String idUsuario, int idDireccion, int Dia, int idFrec, int Sec
		
		var fErr = -1;
		
		if(Sec == '')fErr = 5;
		if(idFrec == 0)fErr = 4;
		if(Dia == '')fErr = 3;
		if(idDireccion == 0)fErr = 2;
		if(idUsuario == '')fErr = 1;
		if(idRuta == 0)fErr = 0;
		
		console.log(idUsuario);
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/CH_Cliente_Ruta",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idRuta: '"+idRuta.trim()+"'," +
					"idUsuario: '"+idUsuario.trim()+"',"+
					"idDireccion: '"+idDireccion.trim()+"',"+
					"Dia: '"+Dia.trim()+"',"+
					"idFrec: '"+idFrec+"',"+
					"Sec: '"+Sec.trim()+"',"+
					"USR: '"+getUserSession().Nickname+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Cambio efectuado Exitosamente!');
		  			ClearFields_CH();
                },
                error: function (e) {
                    ANIM.Error('Error al hacer el cambio.');
                }
           });		
	        	
		}
		else{
			ANIM.Alert( MsjValida_CH[fErr] );
		}        

   };
    
    
    function s_Reg() {
    	
    	try{
    		//tableFixed_R.ajax.reload();
    		//tableFixed_R.destroy();
    		tableFixed_R.invalidate(); // invalidate the data DataTables has cached for this row
		}
    	catch(ex){console.log(ex);}
    	
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	    	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			//console.log(index + ' | ' + value.idUsuario);
		    			//$('#REG').append($(getRegFragment(value.id, value.Ruta, value.idUsuario, value.Direccion, value.fApartir)).fadeIn(0));
		    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.idRuta, value.Ruta, value.idUsuario, value.Direccion, value.fApartir)).fadeIn(0));
		    			 			
		    			
		    			
		    			//console.log(value.fApartir);
		    			
		    			//value.fApartir = value.fApartir.split('/');
		    			
		    			$('#edt-'+value.id).on('click', function(){
		    				
		    				/*RESET CEDIS*/
		    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
							
							console.log(value);
							console.log(value.idRuta + ' - ' + value.idUsuario + ' - ' + value.idDireccion + ' - ' + value.nOrden + ' - ' + value.fApartir);
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#edtidRuta').val(value.idRuta);    				
					    	$('#edtidUsuario').val(value.idUsuario);
					    	$('#edtidDireccion').val(value.idDireccion);			    	
					    	$('#edtnOrden').val(value.nOrden);
					    	$('#edtfApartir').val(castDate(value.fApartir));
		    				
							
							
							$('#edtidRuta').select2();    				
					    	$('#edtidUsuario').select2();
					    	$('#edtidDireccion').select2();
							
		    				
		    				$("#btnEDT").click();
		    				
		    				
		    			});
		    			 
	        		}
	        			        		     			
	    		});    		
	    			    		
	    		tableFixed_R = $('#tablaDatos').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					responsive:true
					//paging: false
				});
				
				
					
				new $.fn.dataTable.FixedHeader( tableFixed_R );                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
    
    window.u_Reg = function (id_, idRuta, idUsuario, idDireccion, fApartir) {
		
		var fErr = -1;
		
		if(fApartir == '')fErr = 4;
		if(idDireccion == '')fErr = 2;
		if(idUsuario == 0)fErr = 1;
		if(idRuta == 0)fErr = 0;		

		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_VisitaCliente",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idRuta: '"+idRuta.trim()+"'," +
					"idUsuario_Op: '"+idUsuario.trim()+"',"+
					"idDireccion: '"+idDireccion.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"fApartir: '"+fApartir.trim()+"'}",
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
            url: domin + "/fWS.asmx/d_VisitaCliente",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+getUserSession().Nickname+"',"+
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
    
    
    window.s_Reg_Ruta = function (idRuta) {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	    	
	        	$('#tablaDatos_Ruta tbody tr').remove();
	        	
	        	var Dias = ['0', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
	        	
	        	var arr = new Array();
	        	
	        	dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			var OBJ = [value.id, value.Ruta, value.idCliente, value.NombreTienda, value.Direccion, value.Dia + '.' + Dias[value.Dia], value.Secuencia];
		    			arr.push(OBJ);
		    			$('#tablaDatos_Ruta tbody').append($(getRowFragmentOBJ(value.id, OBJ)).fadeIn(0));    			
		    			
		    			
		    			$('#edt-'+value.id).on('click', function(){
		    				   	
							
							console.log(value);
							console.log(value.idRuta + ' - ' + value.idUsuario + ' - ' + value.idDireccion +  ' - ' + value.fApartir);
							
							UserToDelete = value.idUsuario;
		    				    				
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#DescRecord1').html( 'ID: <strong>' + value.id + '</strong>');
		    				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
		    				$('#DescRecord3').html( 'DIRECCION: <strong>' + value.Direccion + '</strong>');
							
		    				
		    				$("#btnASK").click();
		    				
		    				
		    			});
		    			
	        			
	        		}
	        		
	    			
	    		});    		
	    			    		
	    			    		
	/*    			    		
	    		var tableFixed = $('#tablaDatos_Ruta').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( tableFixed );
*/


				var table = $('#tablaDatos_Ruta').DataTable();	    		
	    		table.destroy();
	    		
	    		var table = $('#tablaDatos_Ruta').DataTable({
	    			retrieve: true,
	    				//searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'ID': 'idDetalleVisita'}, {'Ruta': 'Ruta'}, {'Ruta': 'Ruta'}, {'Nombre Tienda': 'NombreTienda'}, {'Direccion': 'Contado'}, {'Dia': 'Credito'}, {'Secuencia': 'Consignacion'},
	    				{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {/*console.log(o[0]);*/ return '<a id="edt-'+o[0]+'" class="table-link danger edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>';
							 }
        				}
        				],
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( table );  
				
				
				table.on( 'draw.dt', function () {
    				$.each(dta, function (index, value) {
					
						/*console.log(value.id);
						console.log(value);*/
						
						$('#edt-'+value.id).unbind();
		    			
		    			$('#edt-'+value.id).on('click', function(){		    				   	
							
							/*console.log(value);
							console.log(value.idRuta + ' - ' + value.idUsuario + ' - ' + value.idDireccion +  ' - ' + value.fApartir);*/
							
							UserToDelete = value.idUsuario;
		    				    				
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#DescRecord1').html( 'ID: <strong>' + value.id + '</strong>');
		    				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
		    				$('#DescRecord3').html( 'DIRECCION: <strong>' + value.Direccion + '</strong>');
							
		    				
		    				$("#btnASK").click();
		    				
		    				
		    			});
		    			      			
		    		});
				
				} );
				
				
				    		
	    		 

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
    
    window.sb_Reg_Ruta = function (Text) {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sb_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'Texto': '"+ Text +"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	    	
	        	$('#tablaDatos_Ruta tbody tr').remove();
	        	
	        	var Dias = ['0', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
	        	
	        	var arr = new Array();
	        	
	        	dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			var OBJ = [value.id, value.Ruta, value.idCliente, value.NombreTienda, value.Direccion, value.Dia + '.' + Dias[value.Dia], value.Secuencia];
		    			arr.push(OBJ);
		    			$('#tablaDatos_Ruta tbody').append($(getRowFragmentOBJ(value.id, OBJ)).fadeIn(0));    			
		    			
		    			
		    			$('#edt-'+value.id).on('click', function(){
		    				   	
							
							console.log(value);
							console.log(value.idRuta + ' - ' + value.idUsuario + ' - ' + value.idDireccion +  ' - ' + value.fApartir);
							
							UserToDelete = value.idUsuario;
		    				    				
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#DescRecord1').html( 'ID: <strong>' + value.id + '</strong>');
		    				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
		    				$('#DescRecord3').html( 'DIRECCION: <strong>' + value.Direccion + '</strong>');
							
		    				
		    				$("#btnASK").click();
		    				
		    				
		    			});
		    			
	        		}
	        		
	    			
	    		});    		
	    			    		
	    			    		
				var table = $('#tablaDatos_Ruta').DataTable();	    		
	    		table.destroy();
	    		
	    		var table = $('#tablaDatos_Ruta').DataTable({
	    			retrieve: true,
	    				//searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'ID': 'idDetalleVisita'}, {'Ruta': 'Ruta'}, {'Ruta': 'Ruta'}, {'Nombre Tienda': 'NombreTienda'}, {'Direccion': 'Contado'}, {'Dia': 'Credito'}, {'Secuencia': 'Consignacion'},
	    				{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {/*console.log(o[0]);*/ return '<a id="edt-'+o[0]+'" class="table-link danger edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>';
							 }
        				}
        				],
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( table );  
				
				
				table.on( 'draw.dt', function () {
    				$.each(dta, function (index, value) {
					
						/*console.log(value.id);
						console.log(value);*/
						
						$('#edt-'+value.id).unbind();
		    			
		    			$('#edt-'+value.id).on('click', function(){		    				   	
							
							/*console.log(value);
							console.log(value.idRuta + ' - ' + value.idUsuario + ' - ' + value.idDireccion +  ' - ' + value.fApartir);*/
							
							UserToDelete = value.idUsuario;
		    				    				
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				
		    				
		    				$('#DescRecord1').html( 'ID: <strong>' + value.id + '</strong>');
		    				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
		    				$('#DescRecord3').html( 'DIRECCION: <strong>' + value.Direccion + '</strong>');
							
		    				
		    				$("#btnASK").click();
		    				
		    				
		    			});
		    			      			
		    		});
				
				} );
				
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
    
    window.ch_sb_Reg_Ruta = function (Text) {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sb_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'Texto': '"+ Text +"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var Dias = ['0', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
	        	
	        	var arr = new Array();
	        	
	        	dta = JSON.parse(data.d);
	        	
	        	if(dta.length > 1){
	        		
	        		$("#Cliente2ch").text('Se encontraron mas de 1 Registro, especifica mas.');
	        		$("#Cliente2ch").css('color', '#F50000');
	        		return;
	        	}
	        	
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			console.log(value);
		    			var OBJ = [value.id, value.Ruta, value.idCliente, value.NombreTienda, value.Direccion, value.Dia + '.' + Dias[value.Dia], value.Secuencia];
		    			arr.push(OBJ);
		    			
		    			$("#Cliente2ch").text(value.idCliente + ' | ' + value.Ruta +  ' | ' + value.NombreTienda + ' | ' + value.Direccion + ' | ' + value.Dia + '.' + Dias[value.Dia] );
		    			$("#Cliente2ch").css('color', '#00A7B3');		    			
	        			
	        		}
	        		
	    			
	    		});
	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
    
    window.s_Dia = function () {
    	var DiasOP = '';
    	$.each(dias, function (index, value) {
    		//<option value="1">United Kingdom</option>			
			//CEDIS.push('{id:'+ (index+1) +', Nombre:'+value+'}');
			
			DiasOP += '<option value="'+ (index+1) +'">'+value+'</option>';
		
		});
			
		$('#idDia').append(DiasOP);     

    };
    
    
    window.d_Reg_VC = function (id_) {
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/u_VisitaCliente_CambiaEstado",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario_L: '"+getUserSession().Nickname+"',"+
            	"idUsuario_Op: '"+UserToDelete+"',"+
            	"Activo: "+ false +","+
            	"id: '"+id_+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', 'Visita eliminada Exitosamente!');	  		
  				s_Reg_Ruta($('#idRuta_R').val());
            },
            error: function (e) {
                ANIM.Error('Error al eliminar Visita.' );
            }
      	});
      	
    };
    
    
    
    
    
    function s_Ruta() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			CEDIS.push('{id:'+value.id+', Nombre:'+value.Nombre + ' | '+ value.Cedis +'}');
	        			CEDIS_op += '<option idCedis="'+value.idCedis+'" value="'+value.id+'">'+value.Nombre+ ' | '+ value.Cedis+'</option>';	        			
	        		}
	        			    			
	    		});                
	    		

	    		$('#idRuta_R').append(CEDIS_op);
	    		$('#idRuta').append(CEDIS_op);
				$('#edtidRuta').append(CEDIS_op);
				
				$('#chidRuta').append(CEDIS_op);

            },
            error: function (e) {
                ANIM.Error('Error al consultar las Rutas.');
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
	        	
	        	_USERS = new Array();
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			_USERS.push({value:value.Nickname, display: value.Nombre + ' ' + value.ApellidoP + ' ' + value.ApellidoM, idCedis: value.idCedis});
	        			User_op += '<option idUser="'+value.Nickname+'" value="'+value.Nickname+'">'+value.Nombre + ' ' + value.ApellidoP + ' ' + value.ApellidoM+'</option>';	        			
	        		}
	        		
	    		});
	    		
	    		/*$('#idUsuario').append(User_op);
				$('#edtidUsuario').append(User_op);*/
				
				
	        	fullerFilterUser(_USERS, getUserSession().idCedis);

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Vendedores.');
            }
        });
        
    };
    
    function fullerFilterUser(OBJS, idCedis){
    	
    	$('#idUsuario option').remove();
    	$('#edtidUsuario option').remove();
    	
    	$('#chidUsuario option').remove();
    	
    	console.log(idCedis);
    	
    	$.each(OBJS, function(indx, value){
    		if(value.idCedis == idCedis){
    			$('#idUsuario').append('<option value="'+value.value+'">'+value.display +'</option>');
				$('#edtidUsuario').append('<option value="'+value.value+'">'+value.display +'</option>');
				
				$('#chidUsuario').append('<option value="'+value.value+'">'+value.display +'</option>');    			
    		}
			
    	});
    	
    }
    
    function s_Direccion() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Direccion",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	_DIREC = new Array();
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			var text = value.Calle + ' #' + value.NumeroExt + ', ' + value.Colonia + ', ' + 
    						value.Municipio + ', ' + value.Estado + ', ' + value.Pais;
    			
	    				//console.log(value.idCedis);
	    				_DIREC.push({value:value.id, display: text, idCedis: value.idCedis});
	        		}
	        			    			
	    		});
	    		
	    		fullerFilterDireccion(_DIREC, 1);

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Vendedores.');
            }
        });        

    };
    
    function fullerFilterDireccion(OBJS, idCedis){
    	
    	$('#idDireccion option').remove();
    	$('#edtidDireccion option').remove();
    	
    	$.each(OBJS, function(indx, value){
    		if(value.idCedis == idCedis){
    			$('#idDireccion').append('<option value="'+value.value+'">'+value.display +'</option>');
				$('#edtidDireccion').append('<option value="'+value.value+'">'+value.display +'</option>');    			
    		}
			
    	});
    	
    }
    
        
    
    
    
   function INI_PAGE(){
    	
    	s_Reg();
    
		s_Ruta();
    	s_UsuarioVen();
    	s_Direccion();
    	
    	s_Dia();
    }



});