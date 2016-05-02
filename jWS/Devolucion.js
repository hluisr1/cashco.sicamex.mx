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
	
	var tabla = 'Entrega';
	var MsjValida = ['Escoja un Cliente.',
						'Escoja un Estatus.'];
	
	//nice select boxes
	$('#idCliente').select2();	
	$('#idEstatus').select2();
	$('[data=idProducto]').select2();
	
	$('#edtidCliente').select2();	
	$('#edtidEstatus').select2();
	$('[data=edtidProducto]').select2();
	
	
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
						"idUsuario: '"+getUserSession().Nickname+"',"+
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

	function getRowFragment(id, Nombre, Marca, Cedis, Grupo, Precio, Code)
	{
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Nombre+'</td>'+
						'<td>'+Grupo+'</td>'+
						'<td>'+Marca+'</td>'+
						'<td>'+Precio+'</td>'+
						'<td>'+Code+'</td>'+
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
    	$('#Precio').val('');
    	$('#Codigo').val('');
    	
    	$('#idCliente').val(0);
    	$('#idEstatus').val(0);
    	$('[data=idProducto]').val(0);
    	
    	$('.cedisField:not(#gpoCedis)').remove();	
    	
    	$('#idCliente').select2();
    	$('#idEstatus').select2();
		$('[data=idProducto]').select2();
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
				
				var EP = new Array();			
				$.each($('.pruductoField'), function(){
					var nID = $(this).attr('nItem');
					var price = $(this).attr('prodPrice');
					var cant = $('#Cantidad-'+$(this).attr('nItem')).val();
					var ttl = price * cant;

					EP.push({idDetalleVisita: _IDDETALLEVISITA, idProducto: nID, InventarioInicial:-1, Cantidad: cant, Total: ttl, idPromocion: -1});	
				});
				i_Reg(EP);
				
				
				
		    },
		    error: function (e) {
		        ANIM.Error('Error al consultar los '+tabla);
		    }
		});
		
		
		
		
		
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidMarca').val(), $('#edtidGrupo').val(), $('#edtNombre').val(), $('#edtPrecio').val(), $('#edtCodigo').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Reg = function (JSON_OBJ){
		
		console.log('Adding '+tabla);
		
		console.log(JSON.toString());
		
		$.ajax({
		    type: "POST",
		    url: domin + "/fWS.asmx/i_EntregaProductos",
		    data: "{'CompanyCode':'"+company+"',"+		    	
				"JSON: '"+JSON.stringify(JSON_OBJ)+"'}",
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function (msg) {
		    	ANIM.Success('fa-building', tabla + ' creada Exitosamente!');	
		    },
		    error: function (e) {
		    	console.log(e);
		        ANIM.Error('Error al insertar el nuevo '+ e);
	        }
	   	});	   	      

   };
    
    window.s_Reg = function () {
						
		console.log('Consultando '+tabla);
        $.post(domin + "/fWS.asmx/s_Producto", {
            CompanyCode: company
        }, function(data){
        	
        	//$('#REG div').remove();
        	$('#tablaDatos tbody tr').remove();
        	
        	$.each(JSON.parse(data.firstElementChild.textContent), function (index, value) {

    			
    			//$('#REG').append($(getRegFragment(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo)).fadeIn(0));
    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo)).fadeIn(0));
    			
    			
    			$('#edt-'+value.id).on('click', function(){
    				
    				/*RESET CEDIS*/
    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
					
								
    				    				
    				$('#EDITA').attr('idRegistro',value.id);
    				$('#ELIMINA').attr('idRegistro',value.id);
    				
    				
    				$('#edtNombre').val(value.Nombre);    				
			    	$('#edtPrecio').val(value.Precio);
			    	$('#edtCodigo').val(value.Codigo);
			    	
			    	
			    	
			    	contedtCedis = 0;
			    	var bndFrst = false;
			    	$.each(value.idCedis.split('|'), function(index, elmnt){
			    		
			    		if(!bndFrst)
			    		{			    			
			    			$('#edtidCedis').val(elmnt);
			    			$('#edtidCedis').select2();
			    			bndFrst = true;
			    		}
			    		
			    		else
			    		{
			    			$("#edtaddCedis").click();
				    		$('#edtidCedis-'+contedtCedis).val(elmnt);
				    		$('#edtidCedis-'+contedtCedis).select2();				    				    			
			    		}			    		
			    		
			    		
			    	});
			    	$('#edtidMarca').val(value.idMarca);
			    	$('#edtidGrupo').val(value.idGrupo);
    				
					
					
					$('#edtidMarca').select2();
					$('#edtidGrupo').select2();
					
    				
    				$("#btnEDT").click();
    				
    				
    			});
    			          	

    		});
    		
        })
        .fail(function () { 
        	ANIM.Error('Error al consultar los '+tabla);
    	})
	  	.done(function () {
	  		
	  		var tableFixed = $('#tablaDatos').dataTable({
		  		retrieve: true,
		  		destroy: true,
				info: false,
				pageLength: 10,
				//paging: false
			});
		
			new $.fn.dataTable.FixedHeader( tableFixed );
	  		
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
    
    
    
    window.s_Clt = function () {
  		
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
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    window.s_EstatusVisita = function () {
  		
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_EstatusVisita",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idEstatus').append('<option value="'+value.id+'">'+ value.Descripcion +'</option>');
	    			$('#edtidEstatus').append('<option value="'+value.id+'">'+ value.Descripcion +'</option>');   				
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
    
    s_Clt();
    s_EstatusVisita();
    s_Producto();
    
    
    
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

		      		//console.log(THIS.tempMarker.XX + ' | ' + THIS.tempMarker.YY);

		  		});  
		  		
	
	  		};
	
		this.initialize= function (xx, yy) {
			
			this.tempMarker={XX:0, YY:0};
	
			var THIS = this;
			//this.get_MapHeight();
			directionsDisplay = new google.maps.DirectionsRenderer();
			var ownPos = null;			

			if(navigator.geolocation) {

	    		navigator.geolocation.getCurrentPosition(function(position) {

	      			ownPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	      			THIS.tempMarker.XX=ownPos.lat();
		      		THIS.tempMarker.YY=ownPos.lng();                

	                var map_canvas = document.getElementById(THIS.Id_Element);

			        var map_options = {
			          center: ownPos,
			          zoom: THIS.defZoom,
			          scrollwheel: false,
			          /*disableDefaultUI: true,*/
			          streetViewControl: true/*,
			          mapTypeId: google.maps.MapTypeId.ROADMAP*/
			        };

			        THIS.map = new google.maps.Map(map_canvas, map_options);
	  		
	    		}, function() {
	      			handleNoGeolocation(true);
	    		});
  			}
  			else {
	    		handleNoGeolocation(false);
	  		}
	
			
			/*
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
	    	*/
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
	
    var MAPA = new ggMaps('map-apple');
    MAPA.initialize();
    
    
    
    
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