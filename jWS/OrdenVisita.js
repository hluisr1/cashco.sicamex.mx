$(document).ready(function () {

    //var domin = "http://localhost:15451";

    //window.company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Orden Visita';
	var MsjValida = ['Escoja una Visita para la ' + tabla+'.',
						'Escoja el Dia en el que se ' + tabla+'.',
						'Escoja el Tipo de Frecuencia de la ' + tabla+'.'];
						
	var dias = ['No Aplica', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
	


	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var _DIREC = new Array();
	
	var _CEDIS = new Array();
	
	
	
	var _INI;
	var _FIN;
	
	
	var MTDS = new METODOS();

	//nice select boxes
	$('#idRuta').select2();	
	$('#edtidRuta').select2();
	
	//nice select boxes
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});

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

	
	
	function getRowFragment(idVisita, Dia, Frecuencia, Ruta, Usuario, Direccion, idFrec)
	{
		var frag = '<tr>'+
						'<td>'+idVisita+'</td>'+
						'<td>'+dias[Dia]+'</td>'+
						'<td>'+Frecuencia+'</td>'+
						'<td>'+Ruta+'</td>'+
						'<td>'+Usuario+'</td>'+
						'<td>'+Direccion.toUpperCase()+'</td>'+
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
    	$('#idRuta').val(0);
    	$('#Fecha').val('');	
    	
    	$('#idRuta').select2();		
    }
	
	
	
	
	
	var updateOutput = function(e){
		var list   = e.length ? e : $(e.target),
			output = list.data('output');
		if (window.JSON) {
			//output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
			//console.log(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
		} 
		else {
			output.val('JSON browser support required for this demo.');
		}
	};
	
	
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
	
	
	
	
	
	
	
	$('#SAVE').on('click', function(){
		s_Reg($('#idRuta').val(), $('#Fecha').val());
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
	
	$('#SAVE_ORDEN').on('click', function(){
		//updateOutput($('#nestable'));
		//console.log($('#nestable').nestable('serialize'));
		var cambios = '';
		$.each($('#nestable').nestable('serialize'), function(indx, obj){
			//console.log(indx + 1);
			//console.log(obj.id);
			
			cambios += obj.id + '-' + (indx+1) + '\n';
		});
		
		//console.log(cambios);
		$.ajax({
			type: "POST",
            url: domin + "/fWS.asmx/u_DiaVisita_OrdenAllDay",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"Cambios: '"+cambios+"'," +
				"idUsuario: '"+getUserSession().Nickname+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', 'Cambios realizados Exitosamente!');
            	$('#SAVE').click();
            },
            error: function (e) {
                ANIM.Error('Error al realizar los cambios.');
            }
        });
		
		
	});
	
	$('#nestable').nestable({
		maxDepth : 1,
		
			group: 0
	}).on('change', updateOutput);
    
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
    
    window.s_Reg = function (idRuta, Dia) {
						
		console.log('Select '+tabla);
		console.log(idRuta + ' | ' + Dia);
		MAPA.initialize();
        $.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_RutaDiaVisitas",
            data: "{'CompanyCode':'"+company+"', " +
            			"idRuta: '"+idRuta.trim()+"', " +
						"Fecha: '"+Dia.trim()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {            	
            	
            	MAPA.ClientesLocations = new Array();
            	$('#Orden li').remove();
            	
            	/*1496*/
            		        	
	        	var dta = JSON.parse(data.d);
	        	//console.log(dta.d);
	        	/*$.each(dta, function (index, value) {
	        		
	        		if(index == 0){
	        			_INI = new google.maps.LatLng(value.DiaVisita.Latitud, value.DiaVisita.Longitud);
	        		}
	        		_FIN = new google.maps.LatLng(value.DiaVisita.Latitud, value.DiaVisita.Longitud);
	        		
	        		_DIREC.push(value);
	        		
	        		if(index > -1){
	        			MAPA.ClientesLocations.push({location: new google.maps.LatLng(value.DiaVisita.Latitud, value.DiaVisita.Longitud)});
	        		}
	        			        		
	        		
	        		console.log(value.DiaVisita.Direccion);
	        		$('#Orden').append('<li class="dd-item" data-id="'+value.DiaVisita.idVisitaCliente + '-' + value.DiaVisita.Dia + '-' + value.DiaVisita.idFrecuencia +'">'+
	    								'<div class="dd-handle">'+
											value.DiaVisita.Direccion+
										'</div>'+
									'</li>');
	        		
	    		});	    		
	    		MAPA.loadMarkers();		*/
	    		
	    		$.each(dta, function (index, value) {
	        		
	        		//console.log(value);

        			MAPA.ClientesLocations.push({location: new google.maps.LatLng(value.DiaVisita.Latitud, value.DiaVisita.Longitud), DV:value.DiaVisita});
	        		
	        		
	        		/*
	        		 <img src="http://www.mid-interactive.com/markers/23G.png" alt="Smiley face" height="24" width="24">
	    														
																<div style="display: inline; margin-left: 10px;">
																	ABARROTES DOÑA ESME
																</div>*/
	        			        		
	        		
	        		//console.log(value.DiaVisita.Direccion);
	        		////idVisitaCliente_ int, Dia_ int, idFrecuencia_ int, idUsuario_Op_ VARCHAR(12), idUsuario_ VARCHAR(12)
	        		var ss = value.DiaVisita.Secuencia > 50 ? 51 : value.DiaVisita.Secuencia;
	        		$('#Orden').append('<li class="dd-item" data-id="'+ value.DiaVisita.idVisitaCliente + '-' + value.DiaVisita.Dia + '-' + value.DiaVisita.idFrecuencia + '-' + value.DiaVisita.Secuencia + '-' + value.DiaVisita.Usuario + '-' + getUserSession().Nickname +'">'+
	        							'<div class="dd-handle">'+
	        								'<img src="http://www.mid-interactive.com/markers/'+ss+'G.png" height="24" width="24">'+
	    									'<div style="display: inline; margin-left: 10px;">'+
												//value.DiaVisita.Direccion+
												value.DiaVisita.NombreTienda.toUpperCase()+
											'</div>'+
										'</div>'+
									'</li>');
	        		
	    		});
	    		MAPA.loadRMTMarkers();	    		
	    		
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
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_DiaVisita",
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
				$('#edtidRuta').append(elmnt);   	
                

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
    
    
    
    window.s_Cedis = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cedis",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	var elmnt = '';
	        	var SP = ' | ';
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	    			_CEDIS.push({Nombre: value.Nombre, Latitud: value.Latitud, Longitud: value.Longitud});   			
	    			
				});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Cedis');
            }
        });
        
    };
    
    
    //s_Reg();
    
    
    s_Ruta();
    s_Dia();
    s_Frecuencia();
    s_Cedis();
        
    
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
		
		this.Displays = new Array();
		
	

		this.initialize= function (nRest, xx, yy) {
			//this.ClientesLocations.push({optimize:true});
			
			for(var i=0; i<3; i++)
				this.Displays.push(new google.maps.DirectionsRenderer());
			
			this.tempMarker={XX:0, YY:0};

			var THIS = this;
			//this.get_MapHeight();
			THIS.directionsDisplay = new google.maps.DirectionsRenderer();
			var ownPos = null;			

			if(navigator.geolocation) {

	    		navigator.geolocation.getCurrentPosition(function(position) {

	      			ownPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	                

	                var map_canvas = document.getElementById(THIS.Id_Element);

			        var map_options = {
			          center: ownPos,
			          zoom: THIS.defZoom,
			          /*disableDefaultUI: true,*/
			          //streetViewControl: true,
			          /*mapTypeId: google.maps.MapTypeId.ROADMAP*/
			        };		

			        THIS.map = new google.maps.Map(map_canvas, map_options);	
			        
			        
			        THIS.directionsDisplay.setMap(THIS.map);				  		

	    	}, function() {

	      		handleNoGeolocation(true);
	    	});

  			} else {

	    		handleNoGeolocation(false);
	  		}
	  		
	  		//THIS.loadMarkers();
	  		
	  		//THIS.Get_Ruta();
	  		
	  		
	  		
	  		
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
     		
     		
	       //THIS.calcRoute(new google.maps.LatLng(25.6680772,-100.3436021), new google.maps.LatLng(25.6680772,-100.3436021), THIS.ClientesLocations, 0);     
	       
	       
	       
	       
	       
	       //THIS.calcRoute(new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), THIS.ClientesLocations, 0);    
	       
	       THIS.calcRoute(new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), new google.maps.LatLng(_CEDIS[0].Latitud, _CEDIS[0].Longitud), THIS.ClientesLocations, 0);
	       
     		
		};
		
		this.loadRMTMarkers = function(){
			
			var THIS = this;		

			console.log('Loadding Stores..');			

        		var cont = 0;
/*THIS.addMarker(new google.maps.LatLng('25.659718', '-100.15667000000002'), 'Tienda', null, false, 0, 'ggfjf');
THIS.addMarker(new google.maps.LatLng(25.659718, -100.28931), 'Tienda', null, false, 0, 'ggfjf');*/
        		$.each(THIS.ClientesLocations, function (index, value) {
        			//console.log('Loadding Stores..');
        			
        			//console.log(value);
        			
        			//console.log('00Agregando... ' + index + ' | ' + value.location.A + ' | ' + value.location.F + ' | ' + value.idVisitaCliente + ' | ' + value.Direccion);        			


					if(true)
					{	
						console.log(value);
						//THIS.addMarker(new google.maps.LatLng(value.location.A, location.F), 'Tienda', 1, false, value.idVisitaCliente, value.Direccion);
						cont = value.DV.Secuencia <= 51 ? value.DV.Secuencia : 51;
						THIS.addMarker(new google.maps.LatLng(parseFloat(value.DV.Latitud), parseFloat(value.DV.Longitud)), value.DV.NombreTienda + ' - ' + value.DV.Secuencia, cont, false, index, 'value.Direccion', value.DV);
						
						
						//console.log('Agregando... ' + index + ' | ' + value.location.A + ' | ' + value.location.F );
						cont++;
						if(cont > 50)cont = 51;	
					}
        				
        			                	

        		});	
        		
        		
        		THIS.deleteMarkers();	

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

		this.addMarker = function (Position, Title, Type, Save, _ID, _Name, _DV) {
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
		  	
		  	
			/*
			google.maps.event.addListener(marker, 'click', function() {

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
			//-----------------------------------------------------------------------------

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
		
	};
    //|||||||||||||||||||||||||||||||||||
    
    
    var MAPA = new ggMapsM('map-apple');
	MAPA.initialize();
    

});