$(document).ready(function () {	
	
	$('#idRuta').select2();
	$('#Fecha_Rec').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});

	
	
	var bttn = document.getElementById( 'SAVE' );
	
	
	var VDD;
	var VDD_dta;
	var hoy;
	
	var MTDS = new METODOS();
	
	var dom = 'http://www.mid-interactive.com/markers/';
	var icons = [dom+ '0.png',
						dom+ 'green_s.png',
						dom+ 'orange_v.png',
						dom+ 'red_h.png',
						dom+ 'red_h.png',
						dom+ 'red_as.png',
						dom+ 'red_as.png',
						dom+ 'red_h.png',
						dom+ 'blue_as.png',
						dom+ 'black.png',
						dom+ 'black.png',];
	
	var iconsD = [dom+ 'black.png',
						dom+ '1_D_BYDSA.png',
						dom+ '2_D_BYDSA.png',
						dom+ '3_D_BYDSA.png',
						dom+ '4_D_BYDSA.png',
						dom+ '5_D_BYDSA.png',
						dom+ '6_D_BYDSA.png',
						dom+ '7_D.png',
						dom+ 'blue.png',
						dom+ 'black.png',
						dom+ 'black.png',];

	
	$('#BUSCA_REC').on('click', function(){
		
		$("#Collapse").click();
		
		MAPA.initialize();
		
		s_Clientes_Ruta($('#idRuta').val());
		
		
		//setTimeout(s_RecorridoRuta($('#idRuta').val(), $('#Fecha_Rec').val()), 3000);
		
		s_RecorridoRuta($('#idRuta').val(), $('#Fecha_Rec').val());
		
		
	});
	
	
	
	var dta;
	var arrlst;
	
	var dta_R;
	var objH_R = [{F:'Ruta',H:'Ruta', str:true},
				{F:'idSupervisor',H:'idSupervisor', str:true},
				{F:'Index',H:'Index', str:false},
				{F:'Hora',H:'Hora', str:false},
				{F:'Desc', H:'Descripcion', str:true},  
    			{F:'Extra', H:'Extra', str:true}, 
    			{F:'Bateria', H:'Bateria', str:false}, 
    			{F:'idEvento', H:'idEvento', str:false},
    			{F:'Latitud', H:'null', str:false},
    			{F:'Longitud', H:'null', str:false},
    			{F:'CLat',H:'CLat', str:false},
    			{F:'CLon',H:'CLon', str:false},
    			{F:'DiffMts',H:'Diff.Mts.', str:false}];
   	
	//OBJ_EXT.push({Index: index+1, Hora: MTDS.CAST_HOUR(value.FechaHH), Desc:value.Descripcion, Extra:value.Extra, Bateria:value.Bateria, idEvento:value.Evento});
	        		
	
	window.s_Ruta = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	var elmnt = '';
	        	var SP = ' | ';
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			elmnt += '<option value="'+value.id+'">'+value.Nombre +'</option>';  
	        		}
	    			//<option value="1">United Kingdom</option>
	    			 			
	    			
				});
				
				$('#idRuta').append(elmnt);               

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
        
    };
       
    window.s_RecorridoRuta = function (idRuta, Dia) {
		//console.log('Select '+tabla);
		console.log(idRuta + ' | ' + Dia);
		
        $.ajax({
            type: "POST",
            //url: domin + "/fWS.asmx/s_RutaDiaVisitas",
            url: domin + "/fWS.asmx/s_Recorrido",
            data: "{'CompanyCode':'"+company+"', " +
            			"idRuta: '"+idRuta.trim()+"', " +
						"Fecha: '"+Dia.trim()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	MAPA.RecorridosLocations = new Array();	
	        	dta = JSON.parse(data.d);
	    		
	    		var arr = new Array();
	    		
	    		var OBJ_EXT = new Array();
	    		$.each(dta, function (index, value) {
	    			
	    			//console.log(value);
	        		OBJ_EXT.push({Ruta: value.Ruta, idSupervisor:value.idSupervisor, 
	        						Index: index+1, Hora: MTDS.CAST_HOUR(value.FechaHH), Desc:value.Descripcion, Extra:value.Extra, Bateria:value.Bateria, idEvento:value.Evento, Latitud:value.Latitud, Longitud:value.Longitud, 
	        						CLat: value.CLat, CLon: value.CLon, DiffMts: value.DiffMts});
	        		var OBJ = [index+1, MTDS.CAST_HOUR(value.FechaHH), value.Descripcion, value.Extra, value.Bateria, value.Latitud == 0 ? '?' : '', value.Evento, MTDS.COMMA(value.DiffMts)];
	    			arr.push(OBJ);
	        		
	        		var M = new METODOS();        			        		
        			MAPA.RecorridosLocations.push({location: new google.maps.LatLng(value.Latitud, value.Longitud), Name:M.CAST_HOUR(value.FechaHH), Desc:value.Descripcion, Type:value.Evento, OBJ: value});	        		
	        		
	    		});//console.log(MAPA.ClientesLocations);
	    		
	    		dta_R = OBJ_EXT;
	    		
	    		arrlst = arr;	    		
	    		var table = $('#tablaDatos_RECORRIDO').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_RECORRIDO').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'INDEX': 'index'}, {'HORA': 'Hora'}, {'EVENTO': 'Evento'}, {'EXTRA': 'Extra'}, {'BATERIA': 'Bateria'}, {'GPS': 'Gps'},
	    				{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<img src="'+icons[o[6]]+'" height="24" width="24" style="cursor:pointer">'+
									//'<i class="fa fa-square fa-stack-2x"></i>'+
									//'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a> </div>' ;
							 }
        		}, {'DiffMts': 'DiffMts'}
        				],
					info: true,
					pageLength: 100,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				bindBTNROW();
				
				table.on('draw.dt', function () {
    				bindBTNROW();
	    		} );
				
					    		
	    		MAPA.loadRMTMarkers_R();
	    			    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });  				
    };
    
    function bindBTNROW(){//ELIMINA Y VUELVE A GENERAR LOS EVENTOS DE CADA ROW.
    	$.each(arrlst, function (index, value) {
					//console.log(value);
			$('#edt-'+value[0]).unbind();
			
			$('#edt-'+value[0]).on('click', function(){
				//console.log(dta[value[0]-1]);				    				
				    				
				MAPA.focusOn(dta[value[0]-1].Latitud, dta[value[0]-1].Longitud);
				//$('#ContainerGGM').focus();
				//$("html").scrollTop(30);
				
								
			});
		
		
		
		});
		
		
    }
    
        
    window.s_Clientes_Ruta = function (idRuta) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	MAPA.ClientesLocations = new Array();	
	        	var dta1 = JSON.parse(data.d);
	    		
	    		var arr = new Array();
	    		$('#ClientesTTL').text(dta1.length + ' Clientes Cargados.');
	    		$.each(dta1, function (index, value) {
	        		//console.log(value);
	        		var M = new METODOS();        			        		
        			MAPA.ClientesLocations.push({location: new google.maps.LatLng(value.Latitud, value.Longitud), Name:value.NombreTienda, Desc:'Hola..', Type:value.Dia, OBJ:value});	        		
	        		
	    		});//console.log(MAPA.ClientesLocations);
	    		
					    		
	    		MAPA.loadRMTMarkers_C();
	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        
    };
    
    window.s_Clientes_Ruta_2 = function (idRuta) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Recorrido",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'Fecha': "+ hoy +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var Dias = ['0', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
	        	var arr = new Array();
	        	
	        	var dta2 = JSON.parse(data.d);	        	
	        	$.each(dta2, function (index, value) {
	        		console.log(value);
	    			arr.push({id: value.id, text: value.idCliente + ' | ' + value.NombreTienda + ' | ' +  value.Dia + '.' + Dias[value.Dia]});
	    		});
	    		
	    		
	    		
	    		//$('#Clientes option.elmnt').remove();//ELIMINA LOS ELEMENTOS DEL SELECT2* DE LOS CLIENTES. 
	    		
	    		//$('#Clientes').append(MTDS.GET_SELECT_ITEM( arr ));
	    		
	    		//$('#Clientes').val(idCLT);	
	        	
	        	return dta;

            },
            error: function (e) {
                ANIM.Error('Error al consultar los ');
            }
        });        
    };
    
    
    
    var dominio = 'http://s546961254.onlinehome.mx';//'http://app27.mid-interactive.com';	
    var ref = {'F_serv':dominio+'/services/services.php',

			'F_img':dominio+'/img/',

			'F_song':dominio+'/services/resources/song/'};
	
    //||||||Click Map|||||||||||||||||||||
    var ggMapsM = function(idElement){
		
  		this.Id_Element = idElement;
		this.directionsDisplay = null;
		this.directionsService = new google.maps.DirectionsService();
		this.map = null;
		this.defZoom = 12;
		this.markers = [];
		this.RestCoors = null;
		this.MiUbica = false;
		this.iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
		this.icons= [
	      //'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	      'http://www.mid-interactive.com/Markers_23C.png',
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
		this.ClientesLocations = new Array();
		this.ClientesLocations_2 = new Array();
		
		this.RecorridosLocations = new Array();
		
		this.Displays = new Array();
		

		
		this.markers_Lu = new Array();
		this.markers_Ma = new Array();
		this.markers_Mi = new Array();
		this.markers_Ju = new Array();
		this.markers_Vi = new Array();
		this.markers_Sa = new Array();
		this.markers_Do = new Array();
		
		this.rutas_Disp = new Array();
		
		this.ruta_Lu = new Array();
		this.ruta_Ma = new Array();
		this.ruta_Mi = new Array();
		this.ruta_Ju = new Array();
		this.ruta_Vi = new Array();
		this.ruta_Sa = new Array();
		this.ruta_Do = new Array();
		
		
		this.DistanceRefPath = new google.maps.Polyline();
		
	

		this.initialize= function (nRest, xx, yy) {
			
			for(var i=0; i<3; i++)
				this.Displays.push(new google.maps.DirectionsRenderer());
			
			this.tempMarker={XX:0, YY:0};

			var THIS = this;
			THIS.directionsDisplay = new google.maps.DirectionsRenderer();
			var ownPos = null;			

			//if(navigator.geolocation) {
			if(true) {

	    		//navigator.geolocation.getCurrentPosition(function(position) {

	      			this.markers_Lu = new Array();
					this.markers_Ma = new Array();
					this.markers_Mi = new Array();
					this.markers_Ju = new Array();
					this.markers_Vi = new Array();
					this.markers_Sa = new Array();
					this.markers_Do = new Array();
					
					this.rutas_Disp = new Array();

	      			ownPos = new google.maps.LatLng(25.713499, -100.313842);//25.713499, -100.313842;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);//25.713499, -100.313842	                

	                var map_canvas = document.getElementById(THIS.Id_Element);

			        var map_options = {
			          center: ownPos,
			          zoom: THIS.defZoom,
			          
			        };		

			        THIS.map = new google.maps.Map(map_canvas, map_options);	
			        
			        
			        THIS.directionsDisplay.setMap(THIS.map);
			        
			        
			        //THIS.addAnimatedPolyline();
			        
			        
			        /*var centerControlDiv = document.createElement('div');
					var centerControl = new THIS.HomeControl(centerControlDiv, THIS.map, THIS);//CenterControl(centerControlDiv, map);
					centerControlDiv.index = 10;
			        THIS.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);*/
			        
			        for(var i=0; i<8; i++){
			        	var Div_Dia = document.createElement('div');
						var Ctrl_Dia = new THIS.DiaControl(Div_Dia, THIS.map, THIS, i);//CenterControl(centerControlDiv, map);
						Div_Dia.index = i;
				        THIS.map.controls[google.maps.ControlPosition.TOP_CENTER].push(Div_Dia);
			        }
	    	/*}, function() {
	      		//handleNoGeolocation(true);
	    	});*/

  			} else {
	    		handleNoGeolocation(false);
	  		}
	  		 		
	  		
  		};		
		
		this.DiaControl= function(controlDiv, map, _THIS, Dia) {

			var THIS = _THIS;
	  		controlDiv.style.paddingLeft = '3px';

		  	// Set CSS for the control border
		  	var controlUI = document.createElement('div');
		  	controlUI.style.backgroundColor = '#FFF';
		  	controlUI.style.borderStyle = 'solid';
		  	controlUI.style.borderWidth = '0px';
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
		  	controlText.innerHTML = '<img src="'+iconsD[Dia]+'" height="24" width="24" style="margin-top:7px;margin-bottom:3px;">';//'Lu';//'<span class="fa fa-bullseye fa-2x"></span>';
		  	controlUI.appendChild(controlText);

		  	// Setup the click event listeners: simply set the map to
		  	// Chicago
		  	google.maps.event.addDomListener(controlUI, 'click', function() {
			    
			    THIS.DiasDisplaying = Dia == 0 ? 0 : (THIS.DiasDisplaying + 1);
			    
			    if(Dia == 0) THIS.rutaCustomPoints = new Array();		    
			    //console.log('Displaying: '+ THIS.DiasDisplaying); 
			    
			    THIS.setAllMapDia(map, Dia);
			    
		  	});
		  	
		  	google.maps.event.addDomListener(controlUI, 'dblclick', function() {
			    console.log('DBL');
			    //THIS.setAllMapDia_Ruta(map, Dia);
			    //THIS.setAllMapDia(map, Dia);
		  	});
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
		  	google.maps.event.addDomListener(controlUI, 'click', function() {

			    this.Get_Ruta();
			    this.deleteMarkers();
		  	});

		};

		this.loadMarkers= function(){
			var THIS = this;			
			THIS.calcRoute(new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), THIS.ClientesLocations, 0);     		
		};
		
		this.loadRMTMarkers_R = function(){
			var THIS = this;
			console.log('Loadding Recorridos..');			
			var cont = 0;			
			
			var RecorridoPath = new Array();
			
			$.each(THIS.RecorridosLocations, function (index, value) {
				
				if(true)
				{
					
					//console.log(value);
					//cont = value.DV.Secuencia <= 51 ? value.DV.Secuencia : 51;
					//THIS.addMarker(new google.maps.LatLng(parseFloat(value.location.G), parseFloat(value.location.K)), value.DV.NombreTienda + ' - ' + value.DV.Secuencia, cont, false, index, 'value.Direccion', value.DV);
					if(parseFloat(value.OBJ.Longitud) != 0){
						RecorridoPath.push({lat: parseFloat(value.OBJ.Latitud), lng: parseFloat(value.OBJ.Longitud)});
						
						var line2 = value.Name;
						if(value.OBJ.Extra != '-'){
							line2 = '';
							//console.log(value.OBJ.Extra);
							var arr = value.OBJ.Extra.split('?');
							//console.log(arr);
							
							$.each(arr, function(indx, obj){
								line2 += obj.toUpperCase() + '<br/>';
							});
							
							line2 += value.Name;
							
							line2 += '<br/><br/> <div onclick="focusOn2('+arr[0]+', '+ parseFloat(value.OBJ.Latitud)+', '+ parseFloat(value.OBJ.Longitud) +');" style="width:10px; height:10px; cursor:pointer;" idCliente="'+arr[0]+'" class="ref fa fa-child"></div>';
							
							//console.log(line2);
						}
						
						THIS.addMarker_R(new google.maps.LatLng(parseFloat(value.OBJ.Latitud), parseFloat(value.OBJ.Longitud)), value.Name + ' - ' + value.Desc, value.Type, false, index, value.Type + ' - ' + value.Desc, line2);
						
						if(cont == 0){						
							THIS.map.setCenter(new google.maps.LatLng(parseFloat(value.OBJ.Latitud), parseFloat(value.OBJ.Longitud)));
							THIS.map.setZoom(THIS.defZoom);
						}
						
						cont++;
						if(cont > 50)cont = 51;
					}
					
				}
			});
			THIS.deleteMarkers();
			
			
			var flightPath = new google.maps.Polyline({
			    path: RecorridoPath,
			    icons: [{
                    icon: {
		                strokeColor: '#FF8000',
		                scale: 3,
		                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
		            }
                    //offset: '100%'
                }],
			    geodesic: true,
			    strokeColor: '#FF0000',
			    //strokeColor: 'rgb('+50+cont+',0,0)',
			    strokeOpacity: 1.0,
			    strokeWeight: 1.5,
			    zIndex:5
			  });
			
			flightPath.setMap(THIS.map);
			
			
			this.animateTruck(flightPath);
		};
		
		this.loadRMTMarkers_C = function(){
			var THIS = this;
			console.log('Loadding Clientes..');			
			var cont = 0;
			
			
		  	
		
		  	//flightPath.setMap(map);
		  
		  	var RecorridoPath = new Array();

			
			$.each(THIS.ClientesLocations, function (index, value) {
				
				if(true)
				{
					//console.log('.');
					RecorridoPath.push({lat: parseFloat(value.OBJ.Latitud), lng: parseFloat(value.OBJ.Longitud)});
					
					//console.log(value);
					//cont = value.DV.Secuencia <= 51 ? value.DV.Secuencia : 51;
					//THIS.addMarker(new google.maps.LatLng(parseFloat(value.location.G), parseFloat(value.location.K)), value.DV.NombreTienda + ' - ' + value.DV.Secuencia, cont, false, index, 'value.Direccion', value.DV);
					var Line1 = (value.OBJ.idCliente + ' - ' + value.OBJ.NombreTienda).toUpperCase();
					THIS.addMarker_C(new google.maps.LatLng(parseFloat(value.OBJ.Latitud), parseFloat(value.OBJ.Longitud)), Line1, value.Type, true, index, Line1, value.OBJ.Direccion.toUpperCase());
					cont++;
					if(cont > 50)cont = 51;
				}
			});
			THIS.deleteMarkers();
			
			var flightPath = new google.maps.Polyline({
			    path: RecorridoPath,
			    geodesic: true,
			    strokeColor: '#FFFF00',
			    strokeOpacity: 1.0,
			    strokeWeight: 2
			  });
			
			
			//flightPath.setMap(THIS.map);
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
						
						THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), 'Tienda', 1, false, value.idTienda, value.name);
						console.log('Agregando... ' + index);
					});
				}, 'json');
		};

	  	this.handleNoGeolocation = function(errorFlag) {
	  		console.log(errorFlag);
	  		if (errorFlag) {
	  			var content = 'Error: The Geolocation service failed.';
  			} else {
			    var content = 'Error: Your browser doesn\'t support geolocation.';
		  	}
		  	
		  	var options = {
		  		map: this.map,
			    position: new google.maps.LatLng(60, 105),
			    content: content
		  	};
		  	
		  	var infowindow = new google.maps.InfoWindow(options);
		  	//map.setCenter(options.position);
		};  		

		this.deleteMarkers= function () {
			if(this.markers.length > 0){
				this.setAllMap(null);
				this.markers = [];
			}
		};

		this.addMarker = function (Position, Title, Type, Save, _ID, _Name, _DV) {
			//alert(Position);
			//console.log(_DV.NombreCliente.toUpperCase());
			var THIS = this;
			var marker;
			if(Type != null){
				marker = new google.maps.Marker({	
					position: Position,
					map: this.map,	
					title: Title,	
					animation: google.maps.Animation.DROP,	
					//icon : this.icons[Type],
					icon : 'http://www.mid-interactive.com/markers/'+Type+'G.png',
					//http://www.mid-interactive.com/Markers_23C.png	
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
			
		  	// Opens the InfoWindow when marker is clicked.
		  	//marker.addListener('click', function() {
	  		google.maps.event.addListener(marker, 'click', function() {
	  			var infowindow = new google.maps.InfoWindow({
				    content: '<h5>'+ _DV.idCliente +' | '+ _DV.NombreTienda.toUpperCase() +'</h5>'+
				    '<h6>'+  _DV.NombreCliente.toUpperCase() +'</h6>'+
				    '<h6>ID.VISITACLIENTE : '+ _DV.idVisitaCliente +'</h6>'+
				    '<h6>SECUENCIA : '+  _DV.Secuencia +'</h6>'
				    +'<h6>APARTIR DE : '+  MTDS.CAST_DATE(_DV.fApartir+'') +'</h6>'+
				    '<h6>'+  _DV.Direccion.toUpperCase() +'</h6>'
			  	});
			    infowindow.open(THIS.map, marker);
		  	});		  	
		  	
			//-----------------------------------------------------------------------------
			if(Save){
				this.markers.push(marker);	
			}

		};
		
		this.addMarker_Clt = function (Position, Title, Type, Save, _ID, _Name, _DV) {
			//alert(Position);	
			var THIS = this;
			var marker;
			if(Type != null){
				marker = new google.maps.Marker({	
					position: Position,
					map: this.map,	
					title: Title,	
					animation: google.maps.Animation.DROP,	
					//icon : this.icons[Type],
					icon : 'http://www.mid-interactive.com/markers/'+Type+'G.png',
					//http://www.mid-interactive.com/Markers_23C.png	
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
			
		  	// Opens the InfoWindow when marker is clicked.
		  	//marker.addListener('click', function() {
	  		google.maps.event.addListener(marker, 'click', function() {
	  			var infowindow = new google.maps.InfoWindow({
				    content: '<h5>'+ _DV.idCliente +' | '+ _DV.NombreTienda.toUpperCase() +'</h5>'+
				    '<h6>'+  _DV.NombreCliente.toUpperCase() +'</h6>'+
				    '<h6>ID.VISITACLIENTE : '+ _DV.idVisitaCliente +'</h6>'+
				    '<h6>SECUENCIA : '+  _DV.Secuencia +'</h6>'
				    +'<h6>APARTIR DE : '+  MTDS.CAST_DATE(_DV.fApartir+'') +'</h6>'+
				    '<h6>'+  _DV.Direccion.toUpperCase() +'</h6>'
			  	});
			    infowindow.open(THIS.map, marker);
		  	});		  	
		  	
			//-----------------------------------------------------------------------------
			if(Save){
				this.markers.push(marker);	
			}

		};
		
		this.addMarker_R = function (Position, Title, Type, Save, _ID, _Name, Desc) {
			
			var THIS = this;
			
			var infowindow;
			
			if(Type == 0){
				
				var cityCircle = new google.maps.Circle({
			      strokeColor: '#FC0505',
			      strokeOpacity: 1,
			      strokeWeight: 5,
			      fillColor: '#FC5B5B',
			      fillOpacity: .65,
			      map: THIS.map,
			      center: Position,
			      radius: 4,
			      
			      clickable: true,
			      title: Title,
			      zIndex:6
			    });
			    
			    infowindow = new google.maps.InfoWindow({
				    content: '<h5>'+ _Name +'</h5>'+
				    '<h6>'+  Desc +'</h6>'
			  	});
			    
			    google.maps.event.addListener(cityCircle, 'click', function() {
	  			
			  	infowindow.setPosition(cityCircle.getCenter());
			    infowindow.open(THIS.map, cityCircle);
		  	});	
		    
		    return;
			}
			
			
			/*var icons = ['http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						dom+ '0G.png',
						dom+ '0G.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',];*/
			
			/*	0	Recorrido
				1	Venta
				2	Cliente Cerrado
				3	Cliente Sin Venta
				4	Cliente Sin Venta
				7	Cliente Sin Venta
				8	Cliente Nuevo
				9	Inicio Ruta
				10	Fin Ruta*/
			
			
			
			var marker;
			if(Type != null){
				marker = new google.maps.Marker({	
					position: Position,
					map: this.map,	
					title: Title,	
					animation: google.maps.Animation.DROP,	
					//icon : this.icons[Type],
					//icon : 'http://www.mid-interactive.com/markers/'+Type+'G.png',
					icon : icons[Type],
					//http://www.mid-interactive.com/Markers_23C.png	
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
			
		  	// Opens the InfoWindow when marker is clicked.
		  	//marker.addListener('click', function() {
	  		var infowindow = new google.maps.InfoWindow({
			    content: '<h5>'+ _Name +'</h5>'+
			    '<h6>'+  Desc +'</h6>'
		  	});
	  		google.maps.event.addListener(marker, 'click', function() {	  			
			    infowindow.open(THIS.map, marker);
		  	});		  	
		  	
			//-----------------------------------------------------------------------------
			if(Save){
				this.markers.push(marker);	
			}

		};
	
		this.addMarker_C = function (Position, Title, Type, Save, _ID, _Name, Desc) {
			//alert(Position);
			var dom = 'http://www.mid-interactive.com/markers/';
			var icons = [dom+ '0.png',
						dom+ 'green.png',
						dom+ 'orange.png',
						dom+ 'red.png',
						dom+ 'red.png',
						dom+ '0G.png',
						dom+ '0G.png',
						dom+ 'red.png',
						dom+ 'blue.png',
						dom+ 'black.png',
						dom+ 'black.png',];
			/*var icons = ['http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						dom+ '0G.png',
						dom+ '0G.png',
						'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
						'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',];*/
			
			/*	0	Recorrido
				1	Venta
				2	Cliente Cerrado
				3	Cliente Sin Venta
				4	Cliente Sin Venta
				7	Cliente Sin Venta
				8	Cliente Nuevo
				9	Inicio Ruta
				10	Fin Ruta*/
				
			var THIS = this;
			var marker;
			
			var WithMarker = true;
			
			if(WithMarker){
				if(Type != null){
					marker = new google.maps.Marker({	
						position: Position,
						map: this.map,	
						title: Title,	
						animation: google.maps.Animation.DROP,	
						icon : iconsD[Type],
						//icon : 'http://www.mid-interactive.com/markers/'+Type+'_D.png',
						//icon : icons[Type],
						//http://www.mid-interactive.com/Markers_23C.png	
						id: _ID,	
						name: _Name,	
						iconFlag: 0,
						zIndex:-5
					});	
				}	
				else{
					marker = new google.maps.Marker({	
						position: Position, 	
						map: this.map,	
						title: Title,	
						animation: google.maps.Animation.DROP,	
						id: _ID,	
						name: _Name,
						fillOpacity: 0.35,
						zIndex:-5
					});	
				}
				
				if(Save){
					//console.log(marker);
					//console.log(this.markers);
					//if(this.markers.length <5)
					//this.markers.push(marker);
					
					switch(Type){
						case 1:
							this.markers_Lu.push(marker);
							break;
						case 2:
							this.markers_Ma.push(marker);
							break;
						case 3:
							this.markers_Mi.push(marker);
							break;
						case 4:
							this.markers_Ju.push(marker);
							break;
						case 5:
							this.markers_Vi.push(marker);
							break;
						case 6:
							this.markers_Sa.push(marker);
							break;
						case 7:
							this.markers_Do.push(marker);
							break;
					}
					
				}
				
				// Opens the InfoWindow when marker is clicked.
			  	//marker.addListener('click', function() {
		  		var infowindow = new google.maps.InfoWindow({
				    content: '<h5>'+ _Name +'</h5>'+
				    '<h6>'+  Desc +'</h6>'
			  	});
		  		google.maps.event.addListener(marker, 'click', function() {
		  			
		  			/*if(THIS.DiasDisplaying == 1){
				    	marker.setVisible(false);
				    	THIS.DrawingCustomPath(marker, Type);
				    }*/
		  			
		  			
				    infowindow.open(THIS.map, marker);
				    
				    
			  	});		  	
			  	
				//-----------------------------------------------------------------------------
				
			}			
			
			
			var COLOR_CERK = this.getColorDay(Type);
			var cityCircle = new google.maps.Circle({
		      strokeColor: COLOR_CERK,
		      strokeOpacity: 0.1,
		      strokeWeight: 2,
		      fillColor: COLOR_CERK,
		      fillOpacity: 0.35,
		      map: THIS.map,
		      center: Position,
		      radius: 25,
		      zIndex:-5
		    });
					
			
		  	

		};
		
	
		this.setAllMap = function(map) {
	  		for (var i = 0; i < this.markers.length; i++) {
	  			this.markers[i].setMap(map);
  			}
		};

		
		this.setAllMapDia = function(map, Dia) {
			var Markers = new Array();
			console.log(Dia);
			switch(Dia){
				case 0:
					map = null;
					//this.DistanceRefPath.setMap(null);
					
					Markers = this.markers_Lu;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Ma;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Mi;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Ju;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Vi;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Sa;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					Markers = this.markers_Do;
					for (var i = 0; i < Markers.length; i++) {Markers[i].setMap(map);}
					
					break;
				case 1:
					Markers = this.markers_Lu;
					break;
				case 2:
					Markers = this.markers_Ma;
					break;
				case 3:
					Markers = this.markers_Mi;
					break;
				case 4:
					Markers = this.markers_Ju;
					break;
				case 5:
					Markers = this.markers_Vi;
					break;
				case 6:
					Markers = this.markers_Sa;
					break;
				case 7:
					Markers = this.markers_Do;
					break;
			}
			
			if(Dia > 0){
				for (var i = 0; i < Markers.length; i++) {
	  			//console.log(i + ' - ' + map);
	  			Markers[i].setVisible(true);
	  			Markers[i].setMap(map);			 			
  				
  			}
  			
  				
  				this.markers_TMP = Markers;
  				
  				//this.AlgoritmoRecorrido(Markers, Dia);
	  			/*var MaxMin = this.getLowersAndHighersCoords(Markers);
	  			//var Distance = this.getDistance({xx:25.709032, yy:-100.330703}, {xx:Markers[2].position.G, yy:Markers[2].position.K});
	  			var Distance = this.getDistance({xx:MaxMin.lX, yy:MaxMin.lY}, {xx:MaxMin.hX, yy:MaxMin.hY});
	  			
	  			console.log(Distance);
	  			
	  			this.getCenterBase(MaxMin.lX, MaxMin.lY, MaxMin.hX, MaxMin.hY, Distance/2);*/
			}
	  		
		};
		

		this.Get_Ubicacion= function() {
			var THIS = this;
			var pos = null;
			
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					THIS.map.setCenter(pos);
				}, function() {
					//THIS.handleNoGeolocation(true);
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
	      			pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
  			}
  			else {
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
	
			$.post('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + xx + ', ' + yy + '&sensor=true', { }, 
				function(datos){
					
					for(var i=0; i<datos.results[0].address_components.length; i++){
							
						if(datos.results[0].address_components[i].types[0] == 'street_number')	
							DIR.Numero = datos.results[0].address_components[i].long_name;	
	
						if(datos.results[0].address_components[i].types[0] == "route")	
							DIR.Calle = datos.results[0].address_components[i].long_name;	
	
						if(datos.results[0].address_components[i].types[0] == "neighborhood")	
							DIR.Colonia = datos.results[0].address_components[i].long_name;	
	
						if(datos.results[0].address_components[i].types[0] == "administrative_area_level_2" ||	
							datos.results[0].address_components[i].types[0] == "locality"){	
							DIR.Municipio = datos.results[0].address_components[i].long_name;	
						}
	
						if(datos.results[0].address_components[i].types[0] == "administrative_area_level_1"){	
							DIR.Estado = datos.results[0].address_components[i].long_name;	
							DIR.Estado_2 = datos.results[0].address_components[i].short_name;	
						}
	
						if(datos.results[0].address_components[i].types[0] == "country"){	
							DIR.Pais= datos.results[0].address_components[i].long_name;	
							DIR.Pais_2= datos.results[0].address_components[i].short_name;	
						}	
	
						if(datos.results[0].address_components[i].types[0] == "postal_code")	
							DIR.CP= datos.results[0].address_components[i].long_name;	
					}
						
					if(UpdateIn != null && UpdateIn != ''){						
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
		
		this.calcRoute = function(Origen, Destino, ArrayWayPoints, nRoute) {
			var THIS = this;
			var aaa = new Array();
			
			aaa.push({location: new google.maps.LatLng(25.7223527,-100.2437703)});
			aaa.push({location:new google.maps.LatLng(25.732308,-100.2779202)});
			
			var request = {
			 	origin: Origen,//'Sydney, NSW',
				destination: Destino,//'Sydney, NSW',
				optimizeWaypoints: true,
				waypoints:ArrayWayPoints,//[{location: new google.maps.LatLng(25.732308,-100.2779202)}, {location: new google.maps.LatLng(25.733951,-100.2591769)}],
			    travelMode: google.maps.TravelMode.DRIVING
			};
			
			THIS.directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					THIS.directionsDisplay.setDirections(response);
					//THIS.Displays[nRoute].setMap(THIS.map);
					//THIS.Displays[nRoute].setDirections(response);
					console.log('OK');
				}
				else{
					console.log(status);
				}
			});
		};//25.6680772,-100.3436021		
	
		
		this.getColorDay = function(Dia){
			var COLOR_CERK;
			switch(Dia)
			{
				case 1:
					COLOR_CERK = '#FF0000';//?
        			break;
        		case 2:					
					COLOR_CERK = '#36489E';
        			break;
        		case 3:
					COLOR_CERK = '#FEBC2A';
        			break;
        		case 4:
					COLOR_CERK = '#00A105';
        			break;
        		case 5:
					COLOR_CERK = '#F58023';
        			break;
        		case 6:
        			COLOR_CERK = '#9E54A1';					
        			break;
        		case 7:
					COLOR_CERK = '#000000';
        			break;
				
				default: 
        			COLOR_CERK = "#3AE8B4";
				
			}
			
			return COLOR_CERK;
		};
		
		
		this.focusOn = function(XX, YY){
			
			this.map.setCenter(new google.maps.LatLng(XX, YY));
			this.map.setZoom(20);
			window.location.href = '#'+this.Id_Element;
			
		};
		
		
		
		
		this.addAnimatedPolyline = function() {
			
			 var lineCoordinates = [
           [44.0715858,27.2454436],[43.83531,25.9752809],
		   [43.0840727,25.6331224],[42.6954322,23.3239467],
		   [52.3747157,4.8986167],[51.2384547,6.8143503]
        ];
			
            //First we iterate over the coordinates array to create a
            // new array which includes objects of LatLng class.
            var pointCount = lineCoordinates.length;
            var linePath = [];
            for (var i=0; i < pointCount; i++) {
                var tempLatLng = new google.maps.LatLng(lineCoordinates[i][0], lineCoordinates[i][1]);
                linePath.push(tempLatLng);
            }
 
            // Defining arrow symbol
            var arrowSymbol = {
                strokeColor: '#0086D9',
                scale: 3,
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
            };
 
            // Polyline properties are defined below
            var lineOptions = {
                path: linePath,
                icons: [{
                    icon: arrowSymbol
                    //offset: '100%'
                }],
                strokeWeight: 3,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8
            };
            polyline = new google.maps.Polyline(lineOptions);
 
            // Polyline is set to current map
            polyline.setMap(this.map);
 
            // Calling the arrow animation function
            this.animateArrow();
        };
 
        this.animateArrow = function() {
            var counter = 0;
            var accessVar = window.setInterval(function() {
                counter = (counter + 1) % 350;
 
                var arrows = polyline.get('icons');
                arrows[0].offset = (counter / 2) + '%';
                polyline.set('icons', arrows);
            }, 25);
        };
        
        this.animateTruck = function(Path) {
            var counter = 0;
            var accessVar = window.setInterval(function() {
                counter = (counter + 1) % 350;
 
                var arrows = Path.get('icons');
                arrows[0].offset = (counter / 2) + '%';
                Path.set('icons', arrows);
            }, 50);
        };
		
	};
    //|||||||||||||||||||||||||||||||||||
    
    window.focusOn2 = function(idCliente, OWN_X, OWN_Y){
    	
    	var result = $.grep(MAPA.ClientesLocations, function(e){ return e.OBJ.idCliente == idCliente; });
    	console.log(result);
    	
    	MAPA.map.setCenter(new google.maps.LatLng(parseFloat(result[0].OBJ.Latitud), parseFloat(result[0].OBJ.Longitud)));
		//MAPA.map.setZoom(20);
		window.location.href = '#'+MAPA.Id_Element;
		
		var RecorridoPath = new Array();
		RecorridoPath.push({lat: OWN_X, lng: OWN_Y});
		RecorridoPath.push({lat: parseFloat(result[0].OBJ.Latitud), lng: parseFloat(result[0].OBJ.Longitud)});
		
		MAPA.DistanceRefPath.setMap(null);
		MAPA.DistanceRefPath = new google.maps.Polyline({
		    path: RecorridoPath,
		    geodesic: true,
		    strokeColor: '#00FF15',
		    strokeOpacity: 0.65,
		    strokeWeight: 8,
		    zIndex:15
	  	});
	  			
		//MAPA.DistanceRefPath.setMap(null);
		MAPA.DistanceRefPath.setMap(MAPA.map);
    };
    
    var MAPA = new ggMapsM('map-rec');
	MAPA.initialize();
    
    $('#EXPORTA').on('click', function(){
    	MTDS.EXPORT(objH_R, dta_R, 'Recorrido-'+$('#idRuta option:selected').text()+ '-' + $('#Fecha_Rec').val());
	});
	
    
    $('#Fecha_Rec').val(MTDS.TODAY());
    
    s_Ruta();
    
    
    
    
    
    
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