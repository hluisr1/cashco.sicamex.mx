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
	
	var MsjValida = ['Escriba el Nombre del CEDIS.',
						'Ubique y de clic a la Ubicacion del CEDIS en el mapa',
						'Escriba el Nombre de la Empresa.',
						'Escriba el RFC de la Compañia.',
						'Escriba el Telefono del CEDIS.',
						'Ingrese el Domicilio del CEDIS.'];
	
	var MapaEdita;
	
	
	
	var FRM = new CRUD('1-CEDIS', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);	
	var MTDS = new METODOS();
	
	
						
	function getCedisFragment(id, Nombre, idMap)
	{
		var fragCedis = '<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								'CEDIS'+
							'</div>'+
						'</div>'+											
						'<div class="main-box-body clearfix">'+
							'<div id="'+idMap+'" class="map-content-reg"></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
			
		$(fragCedis).css('display', 'none');
			
		return fragCedis;
	}

	function ClearFields()
    {
    	$('#Nombre').val('');
    	
    	$('#nEmpresa').val('');
    	$('#RFC').val('');
    	$('#Telefono').val('');
    	$('#Domicilio').val('');
    	
    	MAPA.initialize();    	
    }
	
	
	$("input" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Cedis($('#Nombre').val(), MAPA.tempMarker.XX, MAPA.tempMarker.YY, $('#nEmpresa').val(), $('#RFC').val(), $('#Telefono').val(), $('#Domicilio').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Cedis($('#EDITA').attr('idRegistro'), $('#edtNombre').val(), MapaEdita.tempMarker.XX, MapaEdita.tempMarker.YY, $('#edtnEmpresa').val(), $('#edtRFC').val(), $('#edtTelefono').val(), $('#edtDomicilio').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Cedis($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
    
	window.i_Cedis = function (nombre, latitud, longitud, nEmpresa, RFC, Telefono, Domicilio) {
		
		var fErr = -1;
		
		if(longitud == 0)fErr = 1;
		if(latitud == 0)fErr = 1;
		if(Domicilio.trim() == '')fErr = 5;
		if(Telefono.trim() == '')fErr = 4;
		if(RFC.trim() == '')fErr = 3;
		if(nEmpresa.trim() == '')fErr = 2;		
		if(nombre == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding CEDIS');
	      	  		
	  		$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Cedis",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"Nombre: '"+nombre+"'," +
					"Latitud: '"+latitud+"',"+
					"Longitud: '"+longitud+"',"+
					"nEmpresa: '"+nEmpresa+"',"+
					"RFC: '"+RFC+"',"+
					"Telefono: '"+Telefono+"',"+
					"Domicilio: '"+Domicilio+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'CEDIS '+ nombre +' creado Exitosamente!');
		  			ClearFields();
		  		
		  			s_Cedis();                   

                },
                error: function (e) {
                    ANIM.Error('Error al insertar el nuevo CEDIS.');
                }
            });
		
	  				
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

   };
    
    function s_Cedis() {
						
		console.log('Consultando CEDIS');
		//?op=
		var ss = '?op=', sa = '/'; 
		
		
		
		/*var url = $.jmsajaxurl({
		     url: domin + "/fWS.asmx",
		    method: "s_Cedis",
		    data: { CompanyCode: company }
		});
		
		$.ajax({
		    cache: false,
		    dataType: "jsonp",
		    success: function(d) {
		    	console.log('DONE'); 
		    	console.log(d); },
		    url: url + "&format=json"
		});*/
         
        /*$.ajax({
            crossDomain: true,
            type:"GET",
            contentType: "application/json; charset=utf-8",
            async:false,
            url: domin + "/fWS.asmx"+ sa +"ex_s_Cedis?callback=?",
            data: {CompanyCode:company},
            dataType: "jsonp",
            success: function (data) {
		        console.log('Hi');
		    },
            jsonpCallback: function(){console.log('DOOOONE !');}
        });	*/	
  		
  		$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx"+ sa +"s_Cedis",
                data: "{'CompanyCode':'"+company+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	
                	$('#REG div').remove();
                	
                	$.each(JSON.parse(msg.d), function (index, value) {

		    			//console.log(index + ' | ' + value);
		    			
		    			$('#REG').append($(getCedisFragment(value.id, value.Nombre, 'map-'+value.id)).fadeIn(0));
		    			
		    			$('#edt-'+value.id).on('click', function(){
		    				    				
		    				$('#EDITA').attr('idRegistro',value.id);
		    				$('#ELIMINA').attr('idRegistro',value.id);
		    				$('#edtNombre').val(value.Nombre);
		    				
		    				$('#edtnEmpresa').val(value.nEmpresa);
		    				$('#edtRFC').val(value.RFC);
		    				$('#edtTelefono').val(value.Telefono);
		    				$('#edtDomicilio').val(value.Domicilio);
		    				
			
		    				
		    				$("#btnEDT").click();
		    				
		    				setTimeout(function(){
		    					MapaEdita = new ggMaps('map-edita');
		    					MapaEdita.initializeEDT(value.Latitud, value.Longitud); 
							 }, 1000);	    				
		    				
		    			});
		    			
		    			var a = new ggMaps('map-'+value.id);
		    			a.initialize(value.Latitud, value.Longitud);		    			          	
		
		    		});
                    

                },
                error: function (e) {
                    ANIM.Error('Error al consultar los CEDIS.');
                }
            });
		
    };
    
    window.u_Cedis = function (id_, nombre, latitud, longitud, nEmpresa, RFC, Telefono, Domicilio) {
		
		var fErr = -1;
		
		if(longitud == 0)fErr = 1;
		if(latitud == 0)fErr = 1;
		if(Domicilio.trim() == '')fErr = 5;
		if(Telefono.trim() == '')fErr = 4;
		if(RFC.trim() == '')fErr = 3;
		if(nEmpresa.trim() == '')fErr = 2;		
		if(nombre == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Editando CEDIS');	         		
	  		
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Cedis",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
                	"Nombre: '"+nombre+"'," +
					"Latitud: '"+latitud+"',"+
					"Longitud: '"+longitud+"',"+
					"nEmpresa: '"+nEmpresa+"',"+
					"RFC: '"+RFC+"',"+
					"Telefono: '"+Telefono+"',"+
					"Domicilio: '"+Domicilio+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'CEDIS '+ nombre +' Actualizado Exitosamente!');		  		
		  			s_Cedis();                 

                },
                error: function (e) {
                    ANIM.Error('Error al actualizar el CEDIS.');
                }
            });	  		
	  		
	  				
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

    };
    
    window.d_Cedis = function (id_) {
		
		console.log('Deleting CEDIS');
        
  		$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/d_Cedis",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'CEDIS eliminado Exitosamente!');	  		
	  				s_Cedis();               

                },
                error: function (e) {
                    ANIM.Error('Error al eliminar el CEDIS.');
                }
            });
  		
  		
		
    };
    
    
    window.fuller = function(OBJ){
    	
    	console.log('Hiiii' + OBJ);
    	
    	$.each(OBJ, function (index, value) {

			//console.log(index + ' | ' + value);
			
			$('#REG').append($(getCedisFragment(value.id, value.Nombre, 'map-'+value.id)).fadeIn(0));
			
			$('#edt-'+value.id).on('click', function(){
				    				
				$('#EDITA').attr('idRegistro',value.id);
				$('#ELIMINA').attr('idRegistro',value.id);
				$('#edtNombre').val(value.Nombre);
				

				
				$("#btnEDT").click();
				
				setTimeout(function(){
					MapaEdita = new ggMaps('map-edita');
					MapaEdita.initializeEDT(value.Latitud, value.Longitud); 
				 }, 1000);	    				
				
			});
			
			var a = new ggMaps('map-'+value.id);
			a.initialize(value.Latitud, value.Longitud);		    			          	

		});
    	
    };
    
    
    
    
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
		        
		        THIS.addMarker(latlng, 'Cedis', null, true); 
		    	
		    	
		    	
		    	google.maps.event.addListener(THIS.map, 'click', function(event) {
	
					//app.btn_switch('#i_Store', true);

		        	THIS.deleteMarkers();		

		  			THIS.addMarker(event.latLng, 'Cedis', null, true);		

		      		THIS.DataLocation(event.latLng.lat(), event.latLng.lng(), '.direccion_D');			      		

		      		THIS.tempMarker.XX=event.latLng.lat();

		      		THIS.tempMarker.YY=event.latLng.lng();			      		

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
	
			this.DataLocation = function (xx, yy, UpdateIn) {
	
	
	
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
	
	
	
	
	
					if(UpdateIn != null && UpdateIn != '')
	
					{
	
						$(UpdateIn + ' .L1').text(DIR.Calle + ' #' + DIR.Numero  + ',');
	
						$(UpdateIn + ' .L2').text('Col. ' + DIR.Colonia + ',');
	
						//$(UpdateIn + ' .L3').text(DIR.Estado_2 + ', ' + DIR.Pais_2);
	
						$(UpdateIn + ' .L3').text(DIR.Municipio + ', ' + DIR.Estado_2 + ', ' + DIR.Pais_2);
	
					}
	
	
	
					/*alert(DIR.Calle + ' #' + DIR.Numero + ', ' + DIR.Colonia + ', ' + DIR.Municipio + ', ' + 
	
						DIR.Estado + ', ' + DIR.Pais + ', ' + DIR.CP);*/			
	
				
	
				}).error(function(){
	
					alert('error... ohh no!');
	
				});
	
	
	
				return DIR;
	
			};

	};
	
	function INI_PAGE(){
    	s_Cedis();    	
    }
        
    
    
   



});