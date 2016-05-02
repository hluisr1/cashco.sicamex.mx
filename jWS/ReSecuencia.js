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
	var icons = [dom+ 'black.png',
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
	
	
	var dta;
	
	
	var dta_CV = new Array();
	var objH_CV = [{F:'Dia',H:'Dia', str:false},
				{F:'Secuencia',H:'Secuencia', str:false},
				{F:'idCliente', H:'idCliente', str:false},  
    			{F:'idRuta', H:'idRuta', str:false}, 
    			{F:'idUsuario', H:'idUsuario', str:true}, 
    			{F:'idVC', H:'idVC', str:false}, 
    			{F:'NombreTienda', H:'NombreTienda', str:true}, 
    			{F:'Latitud', H:'Latitud', str:false}, 
    			{F:'Longitud', H:'Es Longitud', str:false}];
   	
	
	
	var msv_Alta_data;
	var msv_Alta = [{field:'Dia', mandatory: true, def:''},
					{field:'Secuencia', mandatory: true, def:''},
					{field:'idCliente', mandatory: true, def:'-'},
					{field:'idRuta', mandatory: true, def:'-'},
					{field:'idUsuario', mandatory: true, def:'-'},
					{field:'idVisitaCliente', mandatory: true, def:'-'},
					{field:'index', mandatory: true, def:'-'}
					];
					
	var ClientesSUB = new Array();
	
	
	
	
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
	                ClientesSUB = new Array();
	                //console.log(csvData);
	                data = $.csv.toArrays(csvData);
	                if (data && data.length > 0) {
	                	console.log(data[0]);
	                	console.log(data[1]);
	                  
	                  ANIM.Success('fa-building', 'Se encontraron ' + data.length + ' registros.');
	                  //ANIM.Error('Error al consultar los ');
	                  
	                  
	                //$('#tablaDatosMSV tbody tr').remove();
		        	$.each(data, function (i, value) {
		    			//data[i] = data[i] + '\n';
		    			
		    			//console.log(value);
		    			ClientesSUB.push({Dia: parseInt(value[0]), Secuencia: parseInt(value[1]), idCliente: parseInt(value[2]),
		    								idRuta: parseInt(value[3]), idUsuario: (value[4]), idVC: parseInt(value[5]),
		    								NombreTienda: value[6], Latitud: parseFloat(value[7]), Longitud: parseFloat(value[8])});
		    			/*$.each(value, function(j, val){
		    				//console.log(val);
		    				if(val.trim() == ''){
		    					data[i][j] = msv_Alta[j].def;
		    					console.log(value[j] + '...');
		    					value[j] = msv_Alta[j].def;
		    					//value[j] = 'msv_Alta[j].def';
		    					console.log(value[j] + '...2');	
		    				}
		    				
		    			});*/
		    			
		    			/*if(i > 0)
		    			$('#tablaDatosMSV tbody').append($(getRowFragmentMSV(value)).fadeIn(0));*/
		    				
		    		});
		    		
		    		msv_Alta_data = data;
	    		   		
		    			    		
		    		console.log(ClientesSUB);
		    		s_Clientes_Ruta_FROM_CSV(ClientesSUB);
				
					//$("#btnMASIVO").click();
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
    
	
	
	$('#EXP_CLTS').on('click', function(){
		var objH = [{F:'Dia', H:'null', str:false},
    			{F:'Secuencia', H:'null', str:false}, 
    			{F:'idCliente', H:'null', str:false}, 
    			{F:'idRuta', H:'null', str:false}, 
    			{F:'idUsuario', H:'null', str:true},    			
    			{F:'idVC', H:'null', str:false}, 
    			{F:'NombreTienda',H:'null', str:true},
    			{F:'Latitud', H:'null', str:false}, 
    			{F:'Longitud', H:'null', str:false} ];
				
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_ListadoDeClientesPorRuta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');
	        	var dta = JSON.parse(data.d);
	        	
	        	dataR_ListadoDeClientesPorRuta = new Array();
	        	$.each(dta, function (index, value) {
	        		value.fCreacion = MTDS.CAST_DATE(value.fCreacion);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});
	    		
	    			
	    		
	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'ListadoDeClientesPorRuta');	
	        	

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
		
	});
	
	
	

	
	$('#BUSCA_REC').on('click', function(){
		
		MAPA.initialize();
		
		s_Clientes_Ruta($('#idRuta').val());
		
		
		//setTimeout(s_RecorridoRuta($('#idRuta').val(), $('#Fecha_Rec').val()), 3000);
		
		s_RecorridoRuta($('#idRuta').val(), $('#Fecha_Rec').val());
		
		
	});
	
	$('#SAVE').on('click', function(){
		dta_CV = new Array();
		$.each(MAPA.DTA_ruta_Lu, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Ma, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Mi, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Ju, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Vi, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Sa, function(indx, obj){ dta_CV.push(obj); });
		$.each(MAPA.DTA_ruta_Do, function(indx, obj){ dta_CV.push(obj); });
		
		console.log(dta_CV);
    	MTDS.EXPORT(objH_CV, dta_CV, 'NuevaRuta');
	});
	
	
	
	
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
	    			//<option value="1">United Kingdom</option>
	    			
	    			elmnt += '<option value="'+value.id+'">'+value.Nombre +'</option>';   			
	    			
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
	        	var dta = JSON.parse(data.d);
	    		
	    		var arr = new Array();
	    		$.each(dta, function (index, value) {
	        		
	        		var OBJ = [index+1, MTDS.CAST_HOUR(value.FechaHH), value.Descripcion, value.Extra, value.Bateria, value.Evento];
	    			arr.push(OBJ);
	        		
	        		var M = new METODOS();        			        		
        			MAPA.RecorridosLocations.push({location: new google.maps.LatLng(value.Latitud, value.Longitud), Name:M.CAST_HOUR(value.FechaHH), Desc:value.Descripcion, Type:value.Evento});	        		
	        		
	    		});//console.log(MAPA.ClientesLocations);
	    		
	    			    		
	    		var table = $('#tablaDatos_RECORRIDO').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_RECORRIDO').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'INDEX': 'index'}, {'HORA': 'Hora'}, {'EVENTO': 'Evento'}, {'EXTRA': 'Extra'}, {'BATERIA': 'Bateria'},    
	    				{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<img src="'+icons[o[5]]+'" height="24" width="24">'+
									//'<i class="fa fa-square fa-stack-2x"></i>'+
									//'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a> </div>' ;
							 }
        				}
        				],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
					    		
	    		MAPA.loadRMTMarkers_R();
	    			    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });  				
    };
    
    window.s_Clientes_Ruta_FROM_CSV = function (DTA) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		
		MAPA.initialize();
            	
    	MAPA.ClientesLocations = new Array();	
    	var dta = DTA;//JSON.parse(data.d);
		
		var arr = new Array();
		$.each(dta, function (index, value) {
    		//console.log(value);
    		//console.log(value.OBJ);
    		if(index > 0)      			        		
			MAPA.ClientesLocations.push({location: new google.maps.LatLng(value.Latitud, value.Longitud), Name:value.NombreTienda, Desc:' .. ', Type:value.Dia, OBJ:value});	        		
    		
		});//console.log(MAPA.ClientesLocations);
		
			    		
		MAPA.loadRMTMarkers_C();
	    		
	    		
              
    };
    
        
    window.s_Clientes_Ruta = function (idRuta) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	MAPA.ClientesLocations = new Array();	
	        	var dta = JSON.parse(data.d);
	    		
	    		var arr = new Array();
	    		$.each(dta, function (index, value) {
	        		//console.log(value);
	        		var M = new METODOS();        			        		
        			MAPA.ClientesLocations.push({location: new google.maps.LatLng(value.Latitud, value.Longitud), Name:value.NombreTienda, Desc:'Hola..', Type:value.Dia});	        		
	        		
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
	        	
	        	var dta = JSON.parse(data.d);	        	
	        	$.each(dta, function (index, value) {
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
    
    
    
    $('#map-apple').keyup(
    	function(event){ 
		    console.log("Key: " + event.which);
		}
    );
    
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
		this.icons = [dom+ '1G.png',
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
		this.icons_= [
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
		
		this.DTA_ruta_Lu = new Array();
		this.DTA_ruta_Ma = new Array();
		this.DTA_ruta_Mi = new Array();
		this.DTA_ruta_Ju = new Array();
		this.DTA_ruta_Vi = new Array();
		this.DTA_ruta_Sa = new Array();
		this.DTA_ruta_Do = new Array();
		
		
		
		this.rutaCustomPoints = new Array();
		this.rutaCustom = null;
		
		this.DiasDisplaying = 6;
		
		this.markers_TMP = new Array();

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
		  	controlText.innerHTML = '<img src="'+icons[Dia]+'" height="24" width="24" style="margin-top:7px;margin-bottom:3px;">';//'Lu';//'<span class="fa fa-bullseye fa-2x"></span>';
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
			    THIS.setAllMapDia_Ruta(map, Dia);
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
					RecorridoPath.push({lat: parseFloat(value.OBJ.Latitud), lng: parseFloat(value.OBJ.Longitud)});
					
					//console.log(value);
					//cont = value.DV.Secuencia <= 51 ? value.DV.Secuencia : 51;
					//THIS.addMarker(new google.maps.LatLng(parseFloat(value.location.G), parseFloat(value.location.K)), value.DV.NombreTienda + ' - ' + value.DV.Secuencia, cont, false, index, 'value.Direccion', value.DV);
					THIS.addMarker_R(new google.maps.LatLng(parseFloat(value.OBJ.Latitud), parseFloat(value.OBJ.Longitud)), value.Name + ' - ' + value.Desc, value.Type, false, index, value.Type + ' - ' + value.Desc, value.Name);
					cont++;
					if(cont > 50)cont = 51;
				}
			});
			THIS.deleteMarkers();
			
			var flightPath = new google.maps.Polyline({
			    path: RecorridoPath,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    //strokeColor: 'rgb('+50+cont+',0,0)',
			    strokeOpacity: 1.0,
			    strokeWeight: 5,
			    zIndex:5
			  });
			
			  flightPath.setMap(THIS.map);
		};
		
		this.loadRMTMarkers_C = function(){
			var THIS = this;
			console.log('Loadding Clientes..');			
			var cont = 0;
			
			for(var it=0; it<300; it++){
				this.ruta_Lu.push(new Array(10000));
			}
			
		  	
		
		  	//flightPath.setMap(map);
		  
		  	var RecorridoPath = new Array();

			
			$.each(THIS.ClientesLocations, function (index, value) {
				
				if(true)
				{
					//console.log(value);//1496
					
					RecorridoPath.push({lat: parseFloat(value.OBJ.Latitud), lng: parseFloat(value.OBJ.Longitud)});
					
					//console.log(value);
					//cont = value.DV.Secuencia <= 51 ? value.DV.Secuencia : 51;
					//THIS.addMarker(new google.maps.LatLng(parseFloat(value.location.G), parseFloat(value.location.K)), value.DV.NombreTienda + ' - ' + value.DV.Secuencia, cont, false, index, 'value.Direccion', value.DV);
					THIS.addMarker_C(new google.maps.LatLng(parseFloat(value.OBJ.Latitud), parseFloat(value.OBJ.Longitud)), value.Name + ' - ' + value.Desc, value.Type, true, index, value.Type + ' - ' + value.Desc, value.Name, value.OBJ);
					cont++;
					if(cont > 50)cont = 51;
				}
			});
			
			console.log(THIS.markers_Ma);
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
						
						THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), 'Tienda', 1, false, value.idTienda, value.name, '', value.OBJ);
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

		this.addMarker = function (Position, Title, Type, Save, _ID, _Name, _DV, OBJ) {
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
	  		google.maps.event.addListener(marker, 'click', function() {
	  			var infowindow = new google.maps.InfoWindow({
				    content: '<h5>'+ _Name +'</h5>'+
				    '<h6>'+  Desc +'</h6>'
			  	});
			    infowindow.open(THIS.map, marker);
		  	});		  	
		  	
			//-----------------------------------------------------------------------------
			if(Save){
				this.markers.push(marker);	
			}

		};
	
		this.addMarker_C = function (Position, Title, Type, Save, _ID, _Name, Desc, OBJ) {
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
						icon : this.icons[Type],
						//icon : 'http://www.mid-interactive.com/markers/'+Type+'_D.png',
						//icon : icons[Type],
						//http://www.mid-interactive.com/Markers_23C.png	
						id: _ID,	
						name: _Name,	
						iconFlag: 0, 
						OBJ: OBJ
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
		  		google.maps.event.addListener(marker, 'click', function() {
		  			
		  			if(THIS.DiasDisplaying == 1){
				    	marker.setVisible(false);
				    	THIS.DrawingCustomPath(marker, Type);
				    }
		  			
		  			var infowindow = new google.maps.InfoWindow({
					    content: '<h5>'+ _Name +'</h5>'+
					    '<h6>'+  Desc +'</h6>'
				  	});
				    //infowindow.open(THIS.map, marker);
				    
				    
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
		      radius: 25
		    });
					
			
		  	

		};
		
		this.addMarkerExtraToList = function (Position, Title, Type, Save, _ID, _Name, Desc, List) {
							
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
						icon : this.icons[Type],
						//icon : 'http://www.mid-interactive.com/markers/'+Type+'_D.png',
						//icon : icons[Type],
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
				
				if(Save){
					List.push(marker);
				}
				
				// Opens the InfoWindow when marker is clicked.
			  	//marker.addListener('click', function() {
		  		google.maps.event.addListener(marker, 'click', function() {
		  			//marker.setVisible(false);
		  			var infowindow = new google.maps.InfoWindow({
					    content: '<h5>'+ _Name +'</h5>'+
					    '<h6>'+  Desc +'</h6>'
				  	});
				    infowindow.open(THIS.map, marker);
			  	});		  	
			  	
				//-----------------------------------------------------------------------------
				
			}	  	

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
		
		this.setAllMapDia_Ruta = function(map, Dia) {
			var Markers = new Array();
			console.log(Dia);
			switch(Dia){
				case 0:
					map = null;
					
					Markers = this.rutas_Disp;
					console.log(Markers);
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
	  			//Markers[i].setMap(map);			 			
  				
  			}
  			
  				
  				//this.markers_TMP = Markers;
  				console.log(Markers);
  				this.AlgoritmoRecorrido(Markers, Dia);
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
	
		
		this.rad = function(x) {
		  	return x * Math.PI / 180;
		};
		
		this.getDistance = function(p1, p2) {
			//console.log(p2);
			//console.log(p2.position);
			var R = 6378137; // el radio de la tierra
		  	var dLat = this.rad(p2.xx - p1.xx);
		  	var dLong = this.rad(p2.yy - p1.yy);
		  	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			    Math.cos(this.rad(p1.xx)) * Math.cos(this.rad(p2.xx)) *
		    	Math.sin(dLong / 2) * Math.sin(dLong / 2);
		  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		  	var d = R * c;
		  	return d; // distancia en metros
		};
		
		this.getNearSuc = function(Point, SucPoscns, CloseFar){
			
			var Distancias = [];
			var THIS = this;
			
			var CloserSuc = {obj: null, dist: 100000000, itemsLeft: 100000000};
			
			$.each(SucPoscns, function (index, value) {
				//console.log(MiPos.lat() + ' ?? ' + value.xx);
				Distancias.push(THIS.getDistance(Point, {xx:value.OBJ.Latitud, yy:value.OBJ.Longitud}));
								
				
				if(false){//if(ItemsList){//SÍ, Importa la prioriadad de la lista.
					var indx = THIS.arrayObjectIndexOf(app.idTienda_ItemsLeft, value.idTienda, 'idTienda');
					//console.log('value.itemsLeft: IF ' + app.idTienda_ItemsLeft[indx].itemsLeft + ' < ' + CloserSuc.itemsLeft);
					if(app.idTienda_ItemsLeft[indx].itemsLeft < CloserSuc.itemsLeft){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
							CloserSuc.itemsLeft = app.idTienda_ItemsLeft[indx].itemsLeft;											
					}
					else if(app.idTienda_ItemsLeft[indx].itemsLeft == CloserSuc.itemsLeft){
						if(Distancias[index] < CloserSuc.dist){
							console.log('IF ' + Distancias[index]  + ' < ' + CloserSuc.dist);
							console.log('IF ' + app.idTienda_ItemsLeft[indx].itemsLeft + ' <= ' + CloserSuc.itemsLeft);
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
							CloserSuc.itemsLeft = app.idTienda_ItemsLeft[indx].itemsLeft;
						}					
					}					
				}
				else{//Solo importa la distancia.
					if(CloseFar){
						if(index == 0){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
						else if(Distancias[index] < CloserSuc.dist){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
					}
					else{
						if(index == 0){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
						else if(Distancias[index] > CloserSuc.dist){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
					}
					
				}
				
				
			});
			
			//this.getPathTo(CloserSuc.obj);
			//this.BestSuc = CloserSuc.obj;
			return CloserSuc.obj;
			
		};
		
		this.getNearSucNotIn = function(Point, SucPoscns, SucSelected, CloseFar){
			
			var THIS = this;
			
			var Distancias = [];
			var THIS = this;
			
			var CloserSuc = {obj: null, dist: 100000000, itemsLeft: 100000000};
			
			$.each(SucPoscns, function (index, value) {
				//console.log(MiPos.lat() + ' ?? ' + value.xx);
				//console.log(value);
				Distancias.push(THIS.getDistance(Point, {xx:value.OBJ.Latitud, yy:value.OBJ.Longitud}));
				if(THIS.getNearSucNotIn_Helper(value, SucSelected) == false){				
				
					//Solo importa la distancia.
					if(CloseFar){
						if(index == 0){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
						else if(Distancias[index] < CloserSuc.dist){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
					}
					else{
						if(index == 0){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
						else if(Distancias[index] > CloserSuc.dist){
							CloserSuc.obj = value;
							CloserSuc.dist = Distancias[index];
						}
					}					
				}
				
			});
			
			//this.getPathTo(CloserSuc.obj);
			//this.BestSuc = CloserSuc.obj;
			
			//console.log(CloserSuc);//1496
			return CloserSuc.obj;
			
		};
		
		this.getNearSucNotIn_Helper = function(Point, SucSelected){
			
			var bnd = false;
			$.each(SucSelected, function (index, value) {
				//console.log(Point);
				//console.log(value);
				if(value.OBJ.Latitud == Point.OBJ.Latitud && value.OBJ.Longitud == Point.OBJ.Longitud){
					bnd = true;				
				} 								
			});
			
			return bnd;
			
		};
		
		
		this.getCenterBase = function(lowerX, lowerY, highX, highY, radio){
			var center = {x:0, y:0};
			center.x = lowerX + ((highX - lowerX) / 2);
			center.y = lowerY + ((highY - lowerY) / 2);
			
			var DRAW_REF = false;
			
			if(DRAW_REF)
			var cityCircle = new google.maps.Circle({
		      strokeColor: '#fff',
		      strokeOpacity: 0.7,
		      strokeWeight: 2,
		      fillColor: '#000',
		      fillOpacity: 0.1,
		      map: this.map,
		      center: new google.maps.LatLng(center.x, center.y),
		      radius: radio
		    });
		    
		    //this.addMarker_C(new google.maps.LatLng(lowerX, lowerY), 'LOWER', 7, false, 1, 'LOWER', 'LOWER.');
		    //this.addMarker_C(new google.maps.LatLng(highX, highY), 'HIGHER', 7, false, 1, 'HIGHER', 'HIGHER.');
		    
		    RecorridoPath= new Array();
		    RecorridoPath.push({lat:lowerX, lng:lowerY});
		    RecorridoPath.push({lat:highX, lng:highY});
		    
		    var flightPath = new google.maps.Polyline({
			    path: RecorridoPath,
			    geodesic: true,
			    strokeColor: '#fff',
		      	strokeOpacity: 0.7,
			    strokeWeight: 2
			  });
			
			
			if(DRAW_REF)
				flightPath.setMap(this.map);
		    
		    
		    
			
			//console.log(center);//1496
			
			return center;
		};
		
		this.getLowersAndHighersCoords = function(COORDS){
			
			var MaxMin = {lX:0, lY:0, hX:0, hY:0};
			
			$.each(COORDS, function(indx, val){
				if(indx == 0){
					MaxMin.lX = val.OBJ.Latitud;
					MaxMin.lY = val.OBJ.Longitud;
					MaxMin.hX = val.OBJ.Latitud;
					MaxMin.hY = val.OBJ.Longitud;
				}
				else{
					MaxMin.lX = MaxMin.lX < val.OBJ.Latitud ? MaxMin.lX : val.OBJ.Latitud;
					MaxMin.lY = MaxMin.lY < val.OBJ.Longitud ? MaxMin.lY : val.OBJ.Longitud;
					
					MaxMin.hX = MaxMin.hX > val.OBJ.Latitud ? MaxMin.hX : val.OBJ.Latitud;
					MaxMin.hY = MaxMin.hY > val.OBJ.Longitud ? MaxMin.hY : val.OBJ.Longitud;
				}				
			});
			
			console.log(MaxMin);
			return MaxMin;
		};
		
		this.getColorDay = function(Dia){
			var COLOR_CERK;
			switch(Dia)
			{
				case 1:
					COLOR_CERK = '#5187C6';
					COLOR_CERK = '#FF0000';//?
        			break;
        		case 2:
					COLOR_CERK = '#FEBC2A';
					COLOR_CERK = '#36489E';
        			break;
        		case 3:
					COLOR_CERK = '#00A595';
					COLOR_CERK = '#FEBC2A';
        			break;
        		case 4:
					COLOR_CERK = '#9E54A1';
					COLOR_CERK = '#00A105';
        			break;
        		case 5:
					COLOR_CERK = '#36489E';
					COLOR_CERK = '#F58023';
        			break;
        		case 6:
					COLOR_CERK = '#F58023';
					COLOR_CERK = '#9E54A1';
        			break;
        		case 7:
					COLOR_CERK = '#000000';
					COLOR_CERK = '#000000';
        			break;
				
				default: 
        			COLOR_CERK = "#3AE8B4"; 			
        			
        			
			}
			
			return COLOR_CERK;
		};
	
		
		this.AlgoritmoRecorrido = function(Markers, Dia){
			
			var THIS = this;
			
			var RutaSugerida = new Array();
			var Barrido = new Array();
			
			var MaxMin;
			var Distance;
			var CenterB;
			
			//CHI 28.68507230924612	-106.08320116996765
			//MTY 25.709032, yy:-100.330703}
			var ini = this.getNearSuc({xx:28.68507230924612, yy:-106.08320116996765}, Markers, false);
			ini.OBJ.Secuencia = 1;
			Barrido.push(ini);
			console.log(ini);
			
			//this.addMarkerExtraToList(new google.maps.LatLng(ini.position.G, ini.position.K), 'Inicio', Dia, true, 1, 'Inicio', 'Inicio.', this.rutas_Disp);
			//this.addMarker_C(new google.maps.LatLng(25.709032, -100.330703), 'LOWER', 7, false, 1, 'LOWER', 'LOWER.');
			
			//return;
			
			var indexOBJ = null;
			$.each(Markers, function(indx, obj){
					//console.log(ini);//1496
				if(indx == 0){
					indexOBJ = THIS.getNearSucNotIn({xx:ini.OBJ.Latitud, yy:ini.OBJ.Longitud}, Markers, Barrido, true);	
					indexOBJ.OBJ.Secuencia = indx+2;
					console.log(indexOBJ.OBJ.Secuencia);					
					Barrido.push(indexOBJ);
					console.log(Barrido);
				}
				else{
					var Algoritmo = 'REGIONAL';
					switch(Algoritmo){
						
						case 'GLOBAL':
							try{
								MaxMin = THIS.getLowersAndHighersCoords(Barrido);
								Distance = THIS.getDistance({xx:MaxMin.lX, yy:MaxMin.lY}, {xx:MaxMin.hX, yy:MaxMin.hY});
								CenterB = THIS.getCenterBase(MaxMin.lX, MaxMin.lY, MaxMin.hX, MaxMin.hY, Distance/2);
								
								indexOBJ = THIS.getNearSucNotIn({xx:CenterB.x, yy:CenterB.y}, Markers, Barrido, true);
								indexOBJ.OBJ.Secuencia = indx+2;
								console.log(indexOBJ.OBJ.Secuencia);
													
								Barrido.push(indexOBJ);
							}
							catch(ex){console.log('EXEDE');}
						break;
						
						case 'REGIONAL':
						
							//console.log(Barrido.length);//1496
							//console.log(Barrido[Barrido.length-1].position);
							try{
								Distance = THIS.getDistance({xx:Barrido[Barrido.length-1].OBJ.Latitud, yy:Barrido[Barrido.length-1].OBJ.Longitud}, {xx:Barrido[Barrido.length-2].OBJ.Latitud, yy:Barrido[Barrido.length-2].OBJ.Longitud});
								CenterB = THIS.getCenterBase(Barrido[Barrido.length-1].OBJ.Latitud, Barrido[Barrido.length-1].OBJ.Longitud, Barrido[Barrido.length-2].OBJ.Latitud, Barrido[Barrido.length-2].OBJ.Longitud, Distance/2);
								
								indexOBJ = THIS.getNearSucNotIn({xx:CenterB.x, yy:CenterB.y}, Markers, Barrido, true);
								indexOBJ.OBJ.Secuencia = indx+2;
								console.log(indexOBJ.OBJ.Secuencia);
					
								Barrido.push(indexOBJ);
							}
							catch(ex){
								console.log('EXCEDE.');
							}
							
						break;
						
					}
					
					
					
				}
				
				console.log(Barrido.length);
						  							
			});
			
			
			console.log(Barrido);
			
			RecorridoPath= new Array();
			
			
			switch(Dia)
			{
				case 1:
					THIS.DTA_ruta_Lu = new Array();
        			break;
        		case 2:
					THIS.DTA_ruta_Ma = new Array();
        			break;
        		case 3:
					THIS.DTA_ruta_Mi = new Array();
        			break;
        		case 4:
					THIS.DTA_ruta_Ju = new Array();
        			break;
        		case 5:
					THIS.DTA_ruta_Vi = new Array();
        			break;
        		case 6:
					THIS.DTA_ruta_Sa = new Array();
        			break;
        		case 7:
					THIS.DTA_ruta_Do = new Array();
        			break;
				
				default: 
        			console.log('ERROR AGIGANSION DTA.');
				
			}
		    		    
			$.each(Barrido, function(indx, obj){
				//console.log(indx);//1496
				try{
					
					
					switch(Dia)
					{
						case 1:
							THIS.DTA_ruta_Lu.push(obj.OBJ);
		        			break;
		        		case 2:
							THIS.DTA_ruta_Ma.push(obj.OBJ);
		        			break;
		        		case 3:
							THIS.DTA_ruta_Mi.push(obj.OBJ);
		        			break;
		        		case 4:
							THIS.DTA_ruta_Ju.push(obj.OBJ);
		        			break;
		        		case 5:
							THIS.DTA_ruta_Vi.push(obj.OBJ);
		        			break;
		        		case 6:
							THIS.DTA_ruta_Sa.push(obj.OBJ);
		        			break;
		        		case 7:
							THIS.DTA_ruta_Do.push(obj.OBJ);
		        			break;
						
						default: 
		        			console.log('ERROR AGIGANSION DTA.');
						
					}
					
					RecorridoPath.push({lat:obj.OBJ.Latitud, lng:obj.OBJ.Longitud});
				}
				catch(ex){
					console.log('ERROR.');
				}
				
			});
			
			
			
			var COLOR_CERK = this.getColorDay(Dia);
			
		    
		    var flightPath = new google.maps.Polyline({
			    path: RecorridoPath,
			    geodesic: true,
			    strokeColor: COLOR_CERK,
		      	strokeOpacity: 0.7,
			    strokeWeight: 4
			  });
			
			
			flightPath.setMap(this.map);
			
			this.rutas_Disp.push(flightPath);
		    
			
			/*var MaxMin = this.getLowersAndHighersCoords(Markers);
  			//var Distance = this.getDistance({xx:25.709032, yy:-100.330703}, {xx:Markers[2].position.G, yy:Markers[2].position.K});
  			var Distance = this.getDistance({xx:MaxMin.lX, yy:MaxMin.lY}, {xx:MaxMin.hX, yy:MaxMin.hY});
  			
  			console.log(Distance);
  			
  			this.getCenterBase(MaxMin.lX, MaxMin.lY, MaxMin.hX, MaxMin.hY, Distance/2);*/
			
		};
	
		this.DrawingCustomPath = function(Point, Dia){
			var Path = null;
			switch(Dia){
				case 0:
					map = null;
					this.DTA_ruta_Lu = new Array();
					this.DTA_ruta_Ma = new Array();
					this.DTA_ruta_Mi = new Array();
					this.DTA_ruta_Ju = new Array();
					this.DTA_ruta_Vi = new Array();
					this.DTA_ruta_Sa = new Array();
					this.DTA_ruta_Do = new Array();
					
					Path = this.rutas_Disp;
					for (var i = 0; i < Path.length; i++) {Path[i].setMap(map);}					
					
					break;
				case 1:
					Path = this.ruta_Lu;
					break;
				case 2:
					Path = this.ruta_Ma;
					break;
				case 3:
					Path = this.ruta_Mi;
					break;
				case 4:
					Path = this.ruta_Ju;
					break;
				case 5:
					Path = this.ruta_Vi;
					break;
				case 6:
					Path = this.ruta_Sa;
					break;
				case 7:
					Path = this.ruta_Do;
					break;
			}

			
			/*this.rutaCustomPoints.push({lat:Point.position.G, lng:Point.position.K});
			
			var COLOR_CERK = this.getColorDay(Dia);
			
			if(this.rutaCustom != null)
		    this.rutaCustom.setMap(null);
		    this.rutaCustom = new google.maps.Polyline({
			    path: this.rutaCustomPoints,
			    geodesic: true,
			    strokeColor: COLOR_CERK,
		      	strokeOpacity: 0.7,
			    strokeWeight: 4
			  });
			
			
			this.rutaCustom.setMap(this.map);			
			this.rutas_Disp.push(this.rutaCustom);*/
			console.log(Point);
			this.rutaCustomPoints.push({lat:Point.OBJ.Latitud, lng:Point.OBJ.Longitud});
			
			var COLOR_CERK = '#00FF40';//this.getColorDay(Dia);
			
			if(this.rutaCustom != null)
		    	Path.setMap(null);
		    Path = new google.maps.Polyline({
			    path: this.rutaCustomPoints,
			    geodesic: true,
			    strokeColor: COLOR_CERK,
		      	strokeOpacity: 1.0,
			    strokeWeight: 8,
			    zIndex:-5
			  });
			  
			  
			switch(Dia){
				case 0:
					alert('Error ---->');					
					
					break;
				case 1:
					this.ruta_Lu = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Lu = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Lu.push(Point.OBJ);
					
					break;
				case 2:
					this.ruta_Ma = Path;
					console.log(this.rutaCustomPoints);
					console.log(this.rutaCustomPoints.length);
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Ma = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Ma.push(Point.OBJ);
					break;
				case 3:
					this.ruta_Mi = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Mi = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Mi.push(Point.OBJ);
					break;
				case 4:
					this.ruta_Ju = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Ju = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Ju.push(Point.OBJ);
					break;
				case 5:
					this.ruta_Vi = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Vi = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Vi.push(Point.OBJ);
					break;
				case 6:
					this.ruta_Sa = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Sa = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Sa.push(Point.OBJ);
					break;
				case 7:
					this.ruta_Do = Path;
					
					if(this.rutaCustomPoints.length == 1){this.DTA_ruta_Do = new Array();}
					Point.OBJ.Secuencia = this.rutaCustomPoints.length;
					this.DTA_ruta_Do.push(Point.OBJ);
					break;
			}
			
			
			Path.setMap(this.map);			
			this.rutas_Disp.push(Path);
			
			console.log(Path);
			console.log(Dia);
			console.log(Point);
		};
	
	};
    //|||||||||||||||||||||||||||||||||||
    
    
    var MAPA = new ggMapsM('map-apple');
	MAPA.initialize();
    
    
    
    
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