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
	
	var MsjValida = ['Escoja a el Cliente a quien corresponde la Dirección',
						'Escriba el nombre de la Calle',
						'Escriba el Numero Exterior',
						'',
						'Escriba el nombre de la Colonia',
						'Escoja el Municipio',
						'Escriba el Nombre del Direccion.',
						'Ubique y de clic a la Ubicacion del Direccion en el mapa',
						'aaa'];
	
	var MapaEdita;
	
	var tabla = 'Direccion';
	
	var FRM = new CRUD('9-DIRECCION', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	
	
	var dta_CLTS; 
	
	
	$('#idCliente').select2();
	$('#idMunicipio').select2();
	
	//$('#edtidCliente').select2();
	$('#edtidMunicipio').select2();
	
						
	function getDireccionFragment(id, Nombre, Apellidos, Calle, No, NoInt, Col, Mun, Edo, Pais, idMap)
	{
		if(NoInt != '')NoInt = ' / ' + NoInt; 
		
		
		var fragDireccion = '<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" all="'+Apellidos+'">'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix edt-'+id+'">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								Apellidos+
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-map-marker"></i> '+ Calle + ' #' + No + NoInt +', COL. '+ Col +
									'<br/>'+
									'<i class="fa fa-map-marker1"></i> '+ Mun.toUpperCase() + ', ' + Edo.toUpperCase() +', '+ Pais.toUpperCase() +
								'</li>'+
							'</ul>'+
							
						'</div>'+
															
						'<div class="main-box-body clearfix">'+
							'<div id="'+idMap+'" class="map-content-reg"></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
			
		$(fragDireccion).css('display', 'none');
			
		return fragDireccion;
	}

	function getRowFragment(id, Nombre, Apellidos, Calle, No, NoInt, Col, Mun, Edo, Pais, idMap)
	{
		if(NoInt == '')NoInt = '-';
		
		var frag = '<tr>'+
						'<td>'+Apellidos + ' ' + Nombre +'</td>'+
						'<td>'+Calle+'</td>'+
						'<td>'+No+'</td>'+
						'<td>'+NoInt+'</td>'+
						'<td>'+Col+'</td>'+
						'<td>'+Mun+'</td>'+
						'<td>'+Edo+'</td>'+
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
    	$('#idCliente').val(0);
		$('#idMunicipio').val(0);
		$('#Calle').val('');		
		$('#NumExt').val('');
		$('#NumInt').val('');
		$('#Colonia').val('');
	
    	$('#idCliente').select2();
		$('#idMunicipio').select2();
    	MAPA.initialize();    	
    }
	
	$("#FILTRO" ).keyup(function() {
  		//$('#REG div').filter('[all="'+$(this).val()+'"]').hide();
  		//$( "#REG div:eq( '"+$(this).val()+"' )" ).hide();
  		
  		$('#REG > div:not(:contains(' + $(this).val() + '))').css('color', '#FF0000'); 
		$('#REG > div:contains(' + $(this).val() + ')').css('color', '#00FF00');
  		
	});
	
	
	
	$("input" ).keyup(function() {
  		//$(this).val($(this).val().toUpperCase());
	});
	
	$("#BUSCA" ).keyup(function(e) {
		if (e.keyCode === 13) {
		    e.preventDefault();
		    // do something
		    //alert('BUSCAND0');
		    sb_Direccion($('#BUSCA').val());
		  }
  		//$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Direccion($('#idCliente').val(), $('#Calle').val(), $('#NumExt').val(), $('#NumInt').val(), $('#NumExt').val(), $('#Colonia').val(), $('#idMunicipio').val(), MAPA.tempMarker.XX, MAPA.tempMarker.YY);
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Direccion($('#EDITA').attr('idRegistro'), $('#edtidCliente').val(), $('#edtCalle').val(), $('#edtNumExt').val(), $('#edtNumInt').val(), $('#edtColonia').val(), $('#edtidMunicipio').val(), MapaEdita.tempMarker.XX, MapaEdita.tempMarker.YY);
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Direccion($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	
	
	$('#edtLatitud').on('change', function(){
		MapaEdita.tempMarker.XX = $('#edtLatitud').val();
	});
	$('#edtLongitud').on('change', function(){
		MapaEdita.tempMarker.YY = $('#edtLongitud').val();
	});
	
	$('#SET_COOR').on('click', function(){
		console.log(MapaEdita.tempMarker.XX + '   -   '  + MapaEdita.tempMarker.YY );
		MapaEdita.deleteMarkers();
		MapaEdita.addMarker(new google.maps.LatLng(MapaEdita.tempMarker.XX, MapaEdita.tempMarker.YY), 'Direccion', null, true);	
		MapaEdita.map.setCenter(new google.maps.LatLng(MapaEdita.tempMarker.XX, MapaEdita.tempMarker.YY));
	});
    
	window.i_Direccion = function (idcliente, calle, numExt, numInt, codPostal, colonia, idmunicipio, lat, lon) {
		
		var fErr = -1;
		
		if(lon == 0)fErr = 7;
		if(lat == 0)fErr = 6;
		if(idMunicipio == 0)fErr = 5;
		if(colonia == '')fErr = 4;
		if(numInt == '')numInt = null;
		if(numExt == '')fErr = 2;
		if(calle == '')fErr = 1;
		if(idCliente == 0)fErr = 0;		
		
		console.log(idcliente+ ' | '+ calle+ ' | '+ numExt+ ' | '+ numInt+ ' | '+ colonia+ ' | '+ idmunicipio+ ' | '+ lat+ ' | '+ lon);
		
		if(fErr == -1){
			console.log('Adding Direccion');
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Direccion",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idCliente: '"+idcliente+"'," +
					"Calle: '"+calle+"',"+
					"NumeroExt: '"+numExt+"',"+					
					"NumeroInt: '"+numInt+"',"+
					"CodigoPostal: '"+000+"',"+
					"Colonia: '"+colonia+"',"+					
					"idMunicipio: '"+idmunicipio+"',"+
					"Latitud: '"+lat+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+					
					"Longitud: '"+lon+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Direccion creada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Direccion();

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
    
    function s_Direccion() {
						
		console.log('Consultando Direccion');
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Direccion",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	/*
            	$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		//console.log(index + ' | ' + value);
	    			if(index+1 > dta.length - 3)
	    			{
	    				$('#REG').append($(getDireccionFragment(value.id, value.Nombre, value.ApePat + ' ' + value.ApeMat,
	    				value.Calle, value.NumeroExt, value.NumeroInt, value.Colonia, value.Municipio, value.Estado, value.Pais, 'map-'+value.id)).fadeIn(0));
	    				
	    				var a = new ggMaps('map-'+value.id);
	    				a.initialize(value.Latitud, value.Longitud);				
	    			}	    				
    				
    					
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Nombre, value.ApePat + ' ' + value.ApeMat,
	    			value.Calle, value.NumeroExt, value.NumeroInt, value.Colonia, value.Municipio, value.Estado, value.Pais, 'map-'+value.id)));
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				
	    				//$('#edtNombre').val(value.Nombre);
	    				$('#edtidCliente').val(value.idCliente);
						$('#edtCalle').val(value.Calle);
						$('#edtNumExt').val(value.NumeroExt);
						$('#edtNumInt').val(value.NumeroInt);
						$('#edtColonia').val(value.Colonia);
						$('#edtidMunicipio').val(value.idMunicipio);
						
						$('#edtidCliente').select2();
						$('#edtidMunicipio').select2();
		
	    				
	    				$("#btnEDT").click();
	    				
	    				setTimeout(function(){
	    					MapaEdita = new ggMaps('map-edita');
	    					MapaEdita.initializeEDT(value.Latitud, value.Longitud); 
						 }, 1000);
	    				
	    				
	    				
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
                */
                              
               var arr = new Array();	        	
	        	
	        	dta_CLTS = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			//OBJETO DE DESPLIEGE DE LA TABLA.
		        		//console.log(value);
		    			var OBJ = [value.id, value.idCliente, value.Nombre, value.Calle, value.NumeroExt, value.NumeroInt, value.Colonia, value.Municipio, value.Estado];
		    			arr.push(OBJ);
	        		}
	        			    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'id': 'id'},{'idCliente': 'idCliente'}, {'Nombre': 'Nombre'}, {'Calle': 'Calle'}, {'NumeroExt': 'NumeroExt'}, {'NumeroInt': 'NumeroInt'}, {'Colonia': 'Colonia'}, {'Municipio': 'Municipio'}, {'Estado': 'Estado'} 
	    				,{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' 
							+
							'</div>' ;
							 }
        				}
        				],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				bindBTNROW();
				
				table.on('draw.dt', function () {
    				bindBTNROW();
	    		} );	    		

                
                
                console.log('EACH _ DONE 2');

            },
            error: function (e) {
            	console.log(e);
                ANIM.Error('Error al consultar las '+tabla);
            }
        });

    };
    
    function sb_Direccion(Text) {
						
		console.log('Consultando Direccion');
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sb_Direccion",
            data: "{'CompanyCode':'"+company+"', 'Texto': '"+Text+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {           	
               
               var arr = new Array();	        	
	        	
	        	dta_CLTS = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			//OBJETO DE DESPLIEGE DE LA TABLA.
		    			var OBJ = [value.id, value.idCliente, value.Nombre, value.Calle, value.NumeroExt, value.NumeroInt, value.Colonia, value.Municipio, value.Estado];
		    			arr.push(OBJ);
	        		}
	        			    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'id': 'id'},{'idCliente': 'idCliente'}, {'Nombre': 'Nombre'}, {'Calle': 'Calle'}, {'NumeroExt': 'NumeroExt'}, {'NumeroInt': 'NumeroInt'}, {'Colonia': 'Colonia'}, {'Municipio': 'Municipio'}, {'Estado': 'Estado'} 
	    				,{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' 
							+
							'</div>' ;
							 }
        				}
        				],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				bindBTNROW();
				
				table.on('draw.dt', function () {
    				bindBTNROW();
	    		} );	    		

                
                
                console.log('EACH _ DONE 2');

            },
            error: function (e) {
            	console.log(e);
                ANIM.Error('Error al consultar las '+tabla);
            }
        });

    };
    
    
    function bindBTNROW(){//ELIMINA Y VUELVE A GENERAR LOS EVENTOS DE CADA ROW.
    	$.each(dta_CLTS, function (index, value) {    		
					
			$('#edt-'+value.id).unbind(); 			
			
			
			
			$('#edt-'+value.id).on('click', function(){
				console.log(value);				    				
				    				
				/*$('#edtCANCELA').attr('idRegistro',value.idDetalleVisita);
				$('#edtGUARDA_EP').attr('idRegistro',value.idDetalleVisita);			
				
				$('#HeadEDT').html('<h4>'+MTDS.CAST_LTR_DATE(value.Fecha) + ' | <strong> '+ value.Ruta +' </strong> </h4>' + value.idDetalleVisita + ' | <strong>' + value.NombreTienda + '</strong>');
				
				s_EP(value.idDetalleVisita);*/
						
				
				
				$('#EDITA').attr('idRegistro',value.id);
				$('#ELIMINA').attr('idRegistro',value.id);
				
				
				//$('#edtNombre').val(value.Nombre);
				$('#edtidCliente').val(value.idCliente);	$('#NT').text(value.Nombre);
				$('#edtCalle').val(value.Calle);
				$('#edtNumExt').val(value.NumeroExt);
				$('#edtNumInt').val(value.NumeroInt);
				$('#edtColonia').val(value.Colonia);
				$('#edtidMunicipio').val(value.idMunicipio);
				
				//$('#edtidCliente').select2();
				$('#edtidMunicipio').select2();
				
				
				$('#edtLatitud').val(value.Latitud);
				$('#edtLongitud').val(value.Longitud);
		
				
				$("#btnEDT").click();
				
				setTimeout(function(){
					MapaEdita = new ggMaps('map-edita');
					MapaEdita.initializeEDT(value.Latitud, value.Longitud); 
				 }, 1000);
				
							
				
								
			});
		});
    }
    
    
    window.u_Direccion = function (id_, idcliente, calle, numExt, numInt, colonia, idmunicipio, lat, lon) {
		
		var fErr = -1;
		
		if(lon == 0)fErr = 7;
		if(lat == 0)fErr = 6;
		if(idMunicipio == 0)fErr = 5;
		if(colonia == '')fErr = 4;
		if(numInt == '')numInt = null;
		if(numExt == '')fErr = 2;
		if(calle == '')fErr = 1;
		if(idCliente == 0)fErr = 0;	
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		console.log(getUserSession().Nickname);
		if(fErr == -1){
			console.log('Editando Direccion');
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Direccion",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idCliente: '"+idcliente+"',"+
					"Calle: '"+calle+"',"+
					
					"NumeroExt: '"+numExt+"',"+
					"CodigoPostal: '"+000+"',"+
					"NumeroInt: '"+numInt+"',"+
					
					"Colonia: '"+colonia+"',"+
					"idMunicipio: '"+idmunicipio+"',"+
					"Latitud: '"+lat+"',"+
					
					"Longitud: '"+lon+"',"+
					"idUsuario: '"+getUserSession().Nickname+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Direccion creada Exitosamente!');		  		
		  			
		  			if($('#BUSCA').val() != ''){ sb_Direccion($('#BUSCA').val()); }
		  			else{ s_Direccion(); }
		  			
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
    
    window.d_Direccion = function (id_) {
		
		console.log('Deleting Direccion');
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_Direccion",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+getUserSession().Nickname+"',"+
            	"id: '"+id_+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla +' eliminada Exitosamente!');	  		
  				
  				if($('#BUSCA').val() != ''){ sb_Direccion($('#BUSCA').val()); }
	  			else{ s_Direccion(); }
            },
            error: function (e) {
                ANIM.Error('Error al eliminar la ' + tabla);
            }
      	});	
		
        	
		
    };
    
    
    function s_Clt() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cliente",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		var text = value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre;
        		
        			$('#idCliente').append('<option value="'+value.id+'">'+ text +'</option>');
    				$('#edtidCliente').append('<option value="'+value.id+'">'+ text +'</option>');
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Clientes.');
            }
        });

    };
    
    function s_Municipio() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Municipio",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		var text = value.Nombre + ', ' + value.Estado + ', ' + value.Pais;
        		
        			$('#idMunicipio').append('<option value="'+value.id+'">'+ text +'</option>');
    				$('#edtidMunicipio').append('<option value="'+value.id+'">'+ text +'</option>');
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Municipios.');
            }
        });

    };
    
    
    
    
    
    function INI_PAGE(){
    	
    	s_Direccion();
    	
    	s_Clt();
    	s_Municipio();
    }
        
    
    var ggMaps = function(idElement){
			
	  		this.Id_Element = idElement;
			this.directionsDisplay = null;
			this.directionsService = new google.maps.DirectionsService();
			this.map = null;
			this.defZoom = 16;
			this.markers = [];
			this.RestCoors = null;
			this.MiUbica = false;
			this.iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
			this.icons= [
	
		      'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	
		      
	
		      ref.F_img + '7-marker.png',  
	
		      
	
		      
	
		      ref.F_img + 'blue-marker.png',
	
		      
	
		      ref.F_img + '7-marker-D.png',
	
		      
	
		      'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
	
		      
	
		      'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
	
		      'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
	
		      'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
	
		      'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',      
	
		      'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
	
		    ],
		    this.styles = [
	
			  {
	
			    stylers: [
	
			      { hue: "#00ffe6" },
	
			      { saturation: -20 }
	
			    ]
	
			  },{
	
			    featureType: "road",
	
			    elementType: "geometry",
	
			    stylers: [
	
			      { lightness: 100 },
	
			      { visibility: "simplified" }
	
			    ]
	
			  },{
	
			    featureType: "road",
	
			    elementType: "labels",
	
			    stylers: [
	
			      { visibility: "off" }
	
			    ]
	
			  }
	
			];
			this.tempMarker={XX:0, YY:0};
		
	
		this.initializeEDT= function (xx, yy) {
				
				var THIS = this;
				
				THIS.tempMarker.XX = xx;
				THIS.tempMarker.YY = yy;				
				
				
				var latlng = new google.maps.LatLng(xx, yy);
	    	
		        // Basic options for a simple Google Map
		        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		        var mapOptions = {
		            // How zoomed in you want the map to start at (always required)
		            zoom: 16,
		            scrollwheel: false,
		            
		            // The latitude and longitude to center the map (always required)
		            center: latlng,
		        };
		
		        // Get the HTML DOM element that will contain your map 
		        // We are using a div with id="map" seen below in the <body>
		        
		        var mapElement = document.getElementById(THIS.Id_Element);
		        
		
		        // Create the Google Map using out element and options defined above
		        THIS.map = new google.maps.Map(mapElement, mapOptions);
		        
		        THIS.addMarker(latlng, 'Direccion', null, true); 
		    	
		    	
		    	
		    	google.maps.event.addListener(THIS.map, 'click', function(event) {
	
					//app.btn_switch('#i_Store', true);

		        	THIS.deleteMarkers();		

		  			THIS.addMarker(event.latLng, 'Direccion', null, true);		

		      		THIS.DataLocation(event.latLng.lat(), event.latLng.lng());			      		

		      		THIS.tempMarker.XX=event.latLng.lat();

		      		THIS.tempMarker.YY=event.latLng.lng();	
		      		
		      		
		      		$('#edtLatitud').val(THIS.tempMarker.XX);
					$('#edtLongitud').val(THIS.tempMarker.YY);		      		

		      		//console.log(THIS.tempMarker.XX + ' | ' + THIS.tempMarker.YY);

		  		});  
		  		
	
	  		};
	
			this.initialize= function (xx, yy) {
				
				var THIS = this;
				
				var latlng = new google.maps.LatLng(xx, yy);
	    	
		        // Basic options for a simple Google Map
		        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		        var mapOptions = {
		            // How zoomed in you want the map to start at (always required)
		            zoom: 16,
		            scrollwheel: false,
		            
		            // The latitude and longitude to center the map (always required)
		            center: latlng,
		        };
		
		        // Get the HTML DOM element that will contain your map 
		        // We are using a div with id="map" seen below in the <body>
		        var mapElement = document.getElementById(THIS.Id_Element);
		
		        // Create the Google Map using out element and options defined above
		        THIS.map = new google.maps.Map(mapElement, mapOptions);
		        
		        var marker = new google.maps.Marker({
		    		position: latlng,
		    		map: THIS.map
		    	});
		    	
		    	/*var THIS = this;
				//this.get_MapHeight();
				directionsDisplay = new google.maps.DirectionsRenderer();
				var ownPos = null;			
	
				if(navigator.geolocation) {
	
		      			ownPos = new google.maps.LatLng(xx, yy);	                
	
		                var map_canvas = document.getElementById(THIS.Id_Element);
	
				        var map_options = {
				          center: ownPos,
				          zoom: THIS.defZoom,
				          streetViewControl: true
				        };		
	
				        THIS.map = new google.maps.Map(map_canvas, map_options);		
	
	    		}*/
		    	
		    	
	    	
				/*
				this.tempMarker={XX:0, YY:0};
	
				var THIS = this;
				//this.get_MapHeight();
				directionsDisplay = new google.maps.DirectionsRenderer();
				var ownPos = null;			
	
				if(navigator.geolocation) {
	
		    		navigator.geolocation.getCurrentPosition(function(position) {
	
		      			ownPos = new google.maps.LatLng(xx, yy);	                
	
		                var map_canvas = document.getElementById(THIS.Id_Element);
	
				        var map_options = {
				          center: ownPos,
				          zoom: THIS.defZoom,
				          streetViewControl: true
				        };		
	
				        THIS.map = new google.maps.Map(map_canvas, map_options);
		  		
	
	
		    	}, function() {
	
		      		handleNoGeolocation(true);
		    	});
	
	  			} else {
	
		    		handleNoGeolocation(false);
		  		}*/
	
	  		};
	
			this.get_MapHeight = function(){
	
	
	
				$('#' + this.Id_Element).css('height', ($.mobile.getScreenHeight() - $('#FFTR').height() ) - 80);
	
				
	
				console.log('5AANNNN === '+$.mobile.getScreenHeight() + ' - ' + $('#FFTR').height());
	
				
	
			};
	
			this.HomeControl= function(controlDiv, map, _THIS) {
	
				
	
				var THIS = _THIS;
	
	
	
		  		controlDiv.style.padding = '5px';
	
	
	
			  	// Set CSS for the control border
	
			  	var controlUI = document.createElement('div');
	
			  	controlUI.style.backgroundColor = 'white';
	
			  	controlUI.style.borderStyle = 'solid';
	
			  	controlUI.style.borderWidth = '2px';
	
			  	controlUI.style.cursor = 'pointer';
	
			  	controlUI.style.textAlign = 'center';
	
			  	controlUI.title = 'Click to set the map to Home';
	
			  	controlDiv.appendChild(controlUI);
	
	
	
			  	// Set CSS for the control interior
	
			  	var controlText = document.createElement('div');
	
			  	controlText.style.fontFamily = 'Arial,sans-serif';
	
			  	controlText.style.fontSize = '12px';
	
			  	controlText.style.paddingLeft = '4px';
	
			  	controlText.style.paddingRight = '4px';
	
			  	controlText.innerHTML = '<span class="fa fa-bullseye fa-2x"></span>';
	
			  	controlUI.appendChild(controlText);
	
	
	
			  	// Setup the click event listeners: simply set the map to
	
			  	// Chicago
	
			  	google.maps.event.addDomListener(controlUI, 'click', function() {
	
				    //map.setCenter(chicago);
	
				    //alert('Home');
	
				    THIS.Get_Ubicacion();
	
				    map.setZoom(THIS.defZoom + 1); 
	
			  	});
	
			};
	
			this.RestControl= function(controlDiv, map) {
	
	
	
				// Set CSS styles for the DIV containing the control
	
			  	// Setting padding to 5 px will offset the control
	
			  	// from the edge of the map
	
			  	controlDiv.style.padding = '5px';
	
	
	
			  	// Set CSS for the control border
	
			  	var controlUI = document.createElement('div');
	
			  	controlUI.style.backgroundColor = 'white';
	
			  	controlUI.style.borderStyle = 'solid';
	
			  	controlUI.style.borderWidth = '2px';
	
			  	controlUI.style.cursor = 'pointer';
	
			  	controlUI.style.textAlign = 'center';
	
			  	controlUI.title = 'Click to set the map to Home';
	
			  	controlDiv.appendChild(controlUI);
	
	
	
			  	// Set CSS for the control interior
	
			  	var controlText = document.createElement('div');
	
			  	controlText.style.fontFamily = 'Arial,sans-serif';
	
			  	controlText.style.fontSize = '12px';
	
			  	controlText.style.paddingLeft = '4px';
	
			  	controlText.style.paddingRight = '4px';
	
			  	controlText.innerHTML = '<b>Restaurant</b>';
	
			  	controlUI.appendChild(controlText);
	
	
	
			  	// Setup the click event listeners: simply set the map to
	
			  	// Chicago
	
			  	google.maps.event.addDomListener(controlUI, 'click', function() {
	
				    map.setCenter(RestCoors);
	
				    map.setZoom(this.defZoom);
	
			  	});
	
			};
	
			this.RutaControl= function(controlDiv, map) {
	
	
	
				// Set CSS styles for the DIV containing the control
	
			  	// Setting padding to 5 px will offset the control
	
			  	// from the edge of the map
	
			  	controlDiv.style.padding = '5px';
	
	
	
			  	// Set CSS for the control border
	
			  	var controlUI = document.createElement('div');
	
			  	controlUI.style.backgroundColor = 'white';
	
			  	controlUI.style.borderStyle = 'solid';
	
			  	controlUI.style.borderWidth = '2px';
	
			  	controlUI.style.cursor = 'pointer';
	
			  	controlUI.style.textAlign = 'center';
	
			  	controlUI.title = 'Click to set the map to Home';
	
			  	controlDiv.appendChild(controlUI);
	
	
	
			  	// Set CSS for the control interior
	
			  	var controlText = document.createElement('div');
	
			  	controlText.style.fontFamily = 'Arial,sans-serif';
	
			  	controlText.style.fontSize = '12px';
	
			  	controlText.style.paddingLeft = '4px';
	
			  	controlText.style.paddingRight = '4px';
	
			  	controlText.innerHTML = '<b>Ruta</b>';
	
			  	controlUI.appendChild(controlText);
	
	
	
			  	// Setup the click event listeners: simply set the map to
	
			  	// Chicago
	
			  	google.maps.event.addDomListener(controlUI, 'click', function() {
	
	
	
				    this.Get_Ruta();
	
				    this.deleteMarkers();
	
				    //AAA();
	
			  	});
	
			};
	
			this.loadMarkers= function(){
	
				
	
				var THIS = this;
	
				
	
				$.getJSON('js/dTiendas.js', function (data) {
	
	 
	
	        		//alert(data);
	
	 
	
	        		$.each(data, function (index, value) {
	
	        			//<li><img src="img/1.png" alt="Landscape 5" class="enfocada"></li>
	
	        			
	
	        			THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), '7-Eleven', 1, false);
	
	        			console.log('Agregando... ' + index);
	
	                	
	
	        		});
	
	     		});
	
				
	
			};
	
			this.loadRemoteMarkers = function(){
	
				
	
				var THIS = this;
	
				
	
				console.log('Loadding Stores..');
	
				
	
				$.post(ref.F_serv, {
	
				    request_type:"s_store"
	
				  },
	
				  function(data,status){
	
				  	console.log('Loadding Stores..');
	
	        		
	
	        		$.each(data.stores, function (index, value) {
	
	        			console.log('Loadding Stores..');
	
	        			//<li><img src="img/1.png" alt="Landscape 5" class="enfocada"></li>
	
	        			
	
	        			THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), '7-Eleven', 1, false, value.idTienda, value.name);
	
	        			console.log('Agregando... ' + index);
	
	                	
	
	        		});
	
				    
	
				    
	
				  }, 'json');		
	
			};
	
		  	this.handleNoGeolocation = function(errorFlag) {
	
		  		if (errorFlag) {
	
			    	var content = 'Error: The Geolocation service failed.';
	
			  	} else {
	
				    var content = 'Error: Your browser doesn\'t support geolocation.';
	
			  	}
	
	
	
			  	var options = {
	
				    map: map,
	
				    position: new google.maps.LatLng(60, 105),
	
				    content: content
	
			  	};
	
	
	
			  	var infowindow = new google.maps.InfoWindow(options);			  
	
				  
	
			  	//map.setCenter(options.position);
	
			};  		
	
			this.deleteMarkers= function () {
	
	  		if(this.markers.length > 0)
	
				{
	
	  			this.setAllMap(null);  			
	
					this.markers = [];
	
				}
	
			};
	
			this.addMarker = function (Position, Title, Type, Save, _ID, _Name) {
	
				//alert(Position);
	
				var THIS = this;
	
				
	
				var marker;
	
				
	
				if(Type != null){				
	
					marker = new google.maps.Marker({
	
						position: Position, 
	
						map: this.map,
	
						title: Title,
	
						animation: google.maps.Animation.DROP,
	
						icon : this.icons[Type],
	
											
	
						id: _ID,
	
						name: _Name,
	
						iconFlag: 0
	
					});
	
				}
	
				else{
	
					marker = new google.maps.Marker({
	
						position: Position, 
	
						map: this.map,
	
						title: Title,
	
						animation: google.maps.Animation.DROP,
	
						
	
						id: _ID,
	
						name: _Name
	
					});
	
				}			
	
				
	
				/*google.maps.event.addListener(marker, 'click', function() {
	
					console.log('Click on It ' + marker.position.lat() + ' | ' + marker.position.lng() + ' | ID: ' + marker.id);
		
					if(this.iconFlag == 0){
	
						marker.iconFlag = 1;
	
						console.log(marker.iconFlag + ' - - - ICON FLAG');
	
						marker.setIcon(THIS.icons[3]);
	
						
	
						if(DB.deleteMarkers.indexOf(marker) == -1){
	
							//Si no Existe en la Lista ....
	
							DB.deleteMarkers.push(marker);
	
							//
	
					 		
	
					 		app.btn_switch('#d_Store', true);
	
					 		
	
					 		console.log(DB.deleteMarkers.length);
	
					 		
					 		app.btn_switch('#s_ProductsInStore', true);
	
					 		
	
						}
	
						if(L_prdct.ID_PRODUCT != -1 ){
	
							app.btn_switch('#i_ProductToStore', true);
	
						}
	
					}
	
					else{
	
						marker.iconFlag = 0;
	
						console.log(marker.iconFlag + ' - - - ICON FLAG');
	
						marker.setIcon(THIS.icons[1]);					
	
						
	
						if(DB.deleteMarkers.indexOf(marker) != -1){
	
							//Si no Existe en la Lista ....
	
							//DB.deleteMarkers.push(marker);
	
							//
	
							console.log(DB.deleteMarkers.indexOf(marker) + ' - - - ');
	
							DB.deleteMarkers.splice(DB.deleteMarkers.indexOf(marker), 1);			 		
	
					 		
	
					 			app.btn_switch('#d_Store', false);
	
					 			console.log(DB.deleteMarkers.length);
	
					 		
	
						 		app.btn_switch('#s_ProductsInStore', false);				 						 		
	
						}
	
					}
	
					
	
					if(DB.deleteMarkers.length > 1){
	
						app.btn_switch('#s_ProductsInStore', false);
	
						app.btn_switch('#d_Store', true);						
	
					}
	
					else if(DB.deleteMarkers.length == 1){
	
						app.btn_switch('#d_Store', true);
	
						app.btn_switch('#s_ProductsInStore', true);					
	
					}
	
					else{
	
						app.btn_switch('#d_Store', false);
	
					}
	
				});*/
	
	
				if(Save){
	
					this.markers.push(marker);
	
				}
	
			};
	
			this.setAllMap = function(map) {
	
		  		for (var i = 0; i < this.markers.length; i++) {
	
	    		this.markers[i].setMap(map);
	
	  			}
	
			};
	
			this.Get_Ubicacion= function() {
	
				
	
				var THIS = this;
	
	
	
				var pos = null;
	
	
	
			  	if(navigator.geolocation) {
	
		    		navigator.geolocation.getCurrentPosition(function(position) {
	
	
	
		      		pos = new google.maps.LatLng(position.coords.latitude,
	
		                                       position.coords.longitude);
	
		                                       
	
		      		THIS.map.setCenter(pos);
	
		      		
	
		    	}, function() {
	
		      		handleNoGeolocation(true);      		
	
	
	
		    	});
	
	  			} else {
	
		    			// Browser doesn't support Geolocation
	
		    		handleNoGeolocation(false);
	
		  		}
	
	
	
		  		//return pos;
	
			};
	
			this.i_PuntoA = function() {
	
	
	
				var pos = null;
	
	
	
			  	if(navigator.geolocation) {
	
		    		navigator.geolocation.getCurrentPosition(function(position) {
	
	
	
		      		pos = new google.maps.LatLng(position.coords.latitude,
	
		                                       position.coords.longitude);
	
	
	
		      		this.DataLocation(pos.lat(), pos.lng(), '.direccion_D');
	
	
	
	
	
		      		var start = pos;
	
				  	var end = RestCoors;
	
				  	var request = {
	
				      	origin:start,
	
				      	destination:end,
	
				      	travelMode: google.maps.TravelMode.DRIVING
	
				  	};
	
				  	this.directionsService.route(request, function(response, status) {
	
					    if (status == google.maps.DirectionsStatus.OK) {
	
				      	directionsDisplay.setDirections(response);
	
				    	}
	
				  	});
	
		      		
	
		    	}, function() {
	
		      		handleNoGeolocation(true);      		
	
	
	
		    	});
	
	  			} else {
	
		    			// Browser doesn't support Geolocation
	
		    		handleNoGeolocation(false);
	
		  		}
	
			};
	
			this.Get_Ruta = function(){
	
	
	
				if(this.markers.length <= 0 && this.MiUbica == false)
	
				{
	
					//alert('INI');
	
					this.MiUbica = true;
	
					this.i_PuntoA();
	
	
	
				}
	
				else{
	
	
	
				  	var start = this.markers[0].position;
	
				  	var end = RestCoors;
	
				  	var request = {
	
				      	origin:start,
	
				      	destination:end,
	
				      	travelMode: google.maps.TravelMode.DRIVING
	
				  	};
	
				  	this.directionsService.route(request, function(response, status) {
	
					    if (status == google.maps.DirectionsStatus.OK) {
	
				      	directionsDisplay.setDirections(response);
	
				    	}
	
				  	});
	
			  	}
	
			};
	
			this.setIconToList = function(Lista, Icon){
	
				
	
				$.each(Lista, function (index, value) {
	
	        			//<li><img src="img/1.png" alt="Landscape 5" class="enfocada"></li>
	
	        			
	
	        			console.log('REmoving... ' + index + ' ');// + value.getPosition().lat());
	
	        			
	
	        			//value.setVisible(false);
	
	        			var marker = new google.maps.Marker(value);
	
	        			
	
	        			marker.iconFlag = 1;
	
	        			//marker.onclick();
	
	        			google.maps.event.trigger(marker, 'click');
	
	        			//GEvent.trigger(marker, 'click');
	
	        			console.log(marker.iconFlag + ' - - - ICON FLAG');
	
	        			marker.setIcon(Icon);
	
	                	
	
	        		});
	
				
	
			};
	
			this.DataLocation = function (xx, yy) {
				
				//console.log('INI');
	
				var DIR = {Numero: 0,	
					Calle: 'NO',	
					Colonia: 'NO',	
					Municipio: 'NO',	
					Estado: 'NO',	
					Pais: 'NO',	
					CP: 0};
	
				$.post('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + xx + ', ' + yy + '&sensor=true',
				{
				}, function(datos){
						
					for(var i=0; i<datos.results[0].address_components.length; i++)	
					{	
						if(datos.results[0].address_components[i].types[0] == 'street_number')	
							DIR.Numero = datos.results[0].address_components[i].long_name;	
	
						if(datos.results[0].address_components[i].types[0] == "route")	
							DIR.Calle = datos.results[0].address_components[i].long_name;
	
						if(datos.results[0].address_components[i].types[0] == "neighborhood")	
							DIR.Colonia = datos.results[0].address_components[i].long_name;
	
						if(datos.results[0].address_components[i].types[0] == "administrative_area_level_2" ||	
							datos.results[0].address_components[i].types[0] == "locality")	
						{	
							DIR.Municipio = datos.results[0].address_components[i].long_name;	
						}	
	
						if(datos.results[0].address_components[i].types[0] == "administrative_area_level_1")	
						{	
							DIR.Estado = datos.results[0].address_components[i].long_name;	
							DIR.Estado_2 = datos.results[0].address_components[i].short_name;	
						}
	
						if(datos.results[0].address_components[i].types[0] == "country")	
						{	
							DIR.Pais= datos.results[0].address_components[i].long_name;	
							DIR.Pais_2= datos.results[0].address_components[i].short_name;	
						}	
	
						if(datos.results[0].address_components[i].types[0] == "postal_code")	
							DIR.CP= datos.results[0].address_components[i].long_name;
	
					}	
	
					$('#edtCalle').val(DIR.Calle);
					$('#edtNumExt').val(DIR.Numero);		
					$('#edtColonia').val(DIR.Colonia);
					//$(UpdateIn + ' .L3').text(DIR.Municipio + ', ' + DIR.Estado_2 + ', ' + DIR.Pais_2);	
						
	
					/*alert(DIR.Calle + ' #' + DIR.Numero + ', ' + DIR.Colonia + ', ' + DIR.Municipio + ', ' + 
	
						DIR.Estado + ', ' + DIR.Pais + ', ' + DIR.CP);*/			
	
				}).error(function(){	
					alert('error... ohh no!');	
				});

				return DIR;	
			};

	};
	    
    
    


});