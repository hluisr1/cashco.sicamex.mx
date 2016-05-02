$(document).ready(function () {
	
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd',//'mm-dd-yyyy',
	  autoclose: true
	});
	
	$('#edtidCedis').select2();	
	
	
	var bttn = document.getElementById( 'SAVE' );	
	
	var VDD;
	var VDD_dta;
	var hoy;
	
	var VNT_TTL = 0;
	
	
	var MTDS = new METODOS();
	
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
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#EXPORTA').on('click', function(){
		
		console.log('asas');
		//Export();
		s_RegProd();
	});
	
	
	$('#EXP_PROD').on('click', function(){
		s_RegProd();		
	});
	
	$('#EXP_CLTS').on('click', function(){
		var objH = [{F:'NombreTienda',H:'null', str:true}, 
    			{F:'Calle', H:'null', str:true}, 
    			{F:'NumeroExt', H:'null', str:true}, 
    			{F:'NumeroInt', H:'null', str:true}, 
    			{F:'CodigoPostal', H:'null', str:true}, 
    			{F:'Colonia', H:'null', str:true}, 
    			{F:'Latitud', H:'null', str:false}, 
    			{F:'Longitud', H:'null', str:false}, 
    			{F:'Ruta', H:'null', str:true}, 
    			{F:'Dia', H:'null', str:false},
    			{F:'Secuencia', H:'null', str:false}, 
    			{F:'idCliente', H:'null', str:false}, 
    			{F:'idRuta', H:'null', str:false}, 
    			{F:'idUsuario', H:'null', str:true}, 
    			{F:'idFrecuencia', H:'null', str:false}, 
    			{F:'Frecuencia', H:'null', str:true}, 
    			{F:'fCreacion', H:'null', str:true}, 
    			{F:'idVC', H:'null', str:false}, 
    			{F:'idDireccion', H:'null', str:false}, 
    			{F:'Activo', H:'null', str:false} ];
				
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
	
	$('#EXP_VENT').on('click', function(){
		var objH = [{F:'id',H:'null', str:false}, 
    			{F:'NombreTienda', H:'null', str:true},
    			{F:'Calle', H:'null', str:true},  
    			{F:'NumeroExt', H:'null', str:true}, 
    			{F:'Colonia', H:'null', str:true},    			
    			{F:'VentaAcum', H:'Venta', str:false}, 
    			{F:'Ruta', H:'null', str:true},    			 
    			{F:'fCreacion', H:'null', str:true},
    			{F:'UltimaVisita', H:'null', str:false},
    			{F:'DiasSinVisita', H:'null', str:false} ];
				
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_VentaAcumulada",
            data: "{'CompanyCode':'"+company+"',"+
            		"'fINI': '2015-06-01', 'fFIN':'"+hoy+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');
	        	var dta = JSON.parse(data.d);
	        	
	        	dataR_ListadoDeClientesPorRuta = new Array();
	        	$.each(dta, function (index, value) {
	        		value.fCreacion = MTDS.CAST_DATE(value.fCreacion);
	        		value.UltimaVisita = MTDS.CAST_DATE(value.UltimaVisita);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});
	    		
	    			
	    		
	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'VentaCero');	
	        	

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
				
	});
	
	$('#EXP_COOR').on('click', function(){
		var objH = [{F:'idRuta',H:'null', str:false}, 
    			{F:'Ruta', H:'null', str:true},
    			{F:'idDireccion', H:'null', str:false},  
    			{F:'idCliente', H:'null', str:false}, 
    			{F:'NombreTienda', H:'null', str:true},    			
    			{F:'Latitud', H:'null', str:false}, 
    			{F:'Longitud', H:'null', str:false},    			 
    			{F:'Calle', H:'null', str:true},
    			{F:'NumeroExt', H:'null', str:true},
    			{F:'Colonia', H:'null', str:true},
    			{F:'idPedido', H:'null', str:false},
    			{F:'Entrada', H:'null', str:false},
    			{F:'pLatitud', H:'null', str:false},
    			{F:'pLongitud', H:'null', str:false} ];
				
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_CoorPedidos",
            data: "{'CompanyCode':'"+company+"',"+
            		"'Fecha': '"+MTDS.TODAY()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');
            	var dta = JSON.parse(data.d); console.log(dta);
	        	
	        	dataR_ListadoDeClientesPorRuta = new Array();
	        	$.each(dta, function (index, value) {
	        		value.Entrada = MTDS.CAST_DATE(value.Entrada);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});
	    		
	    			
	    		
	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'CoordenadasPedidos-2015-09-01');	
	        	

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
				
	});
	
	$('#EXP_FZ').on('click', function(){
		var objH = [{F:'Ruta',H:'Ruta', str:true},
				{F:'idSupervisor',H:'idSupervisor', str:true},
				//{F:'Index',H:'Index', str:false},
				{F:'Fecha',H:'Fecha', str:false},
				{F:'Hora',H:'Hora', str:false},
				{F:'Descripcion', H:'Descripcion', str:false},  
    			{F:'Extra', H:'Extra', str:true}, 
    			{F:'Bateria', H:'Bateria', str:false}, 
    			{F:'Evento', H:'idEvento', str:false},
    			{F:'Latitud', H:'null', str:false},
    			{F:'Longitud', H:'null', str:false},
    			{F:'CLat',H:'CLat', str:false},
    			{F:'CLon',H:'CLon', str:false},
    			{F:'DiffMts',H:'Diff.Mts.', str:false}];
    	
    	var today = new Date();	
    	today.setDate(today.getDate()-8);
    	var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		var mMes =  yyyy + '-' + (mm) + '-' + (dd);
				
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_Recorrido2",
            data: "{'CompanyCode':'"+company+"',"+
            		"'fIni': '"+mMes+"', 'fFin':'"+hoy+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');
	        	var dta = JSON.parse(data.d);
	        	
	        	dataR_ListadoDeClientesPorRuta = new Array();
	        	$.each(dta, function (index, value) {
	        		value.Fecha = MTDS.CAST_DATE(value.FechaHH);
	        		value.Hora = MTDS.CAST_HOUR(value.FechaHH);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});
	    		
	    			
	    		
	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'FuezaZona ' + mMes);	
	        	

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
				
	});
	
	$('#EXP_INDI').on('click', function(){
		
		//idCliente	Cedis	Supervisor	Mes	Nombre	Dia	Secuencia	Evento	Día Visitado	Visitado Dentro	Fecha	Ruta	 Total 	HICedis	HPrimerClt	HCierreHH	Dif. Mts	Programados	Clts Compra	Clts Cerrados	Clts No Compra	Clts Fuera Zona	Clts Conmpra FF	HUltimoClt	quitar

		var objH = [{F:'idCliente',H:'null', str:false},
				{F:'Cedis',H:'null', str:false},
				{F:'Supervisor',H:'null', str:false},
				{F:'Mes',H:'null', str:false},
				{F:'Nombre',H:'NombreTienda', str:true},
				
				{F:'idDia',H:'Dia', str:false},
				{F:'Secuencia',H:'null', str:false},
				{F:'Evento',H:'null', str:false},
				{F:'DiaVisitado',H:'DiaVisitado', str:false},
				{F:'VisitadoDentro',H:'VisitadoDentro', str:false},
				
				{F:'Fecha',H:'null', str:false},
				{F:'Ruta',H:'null', str:false},
				{F:'Total',H:'null', str:true},
				{F:'HICedis',H:'null', str:false},
				{F:'HPrimerClte',H:'null', str:false},
				
				{F:'HCierreHH',H:'null', str:false},
				{F:'Dif',H:'null', str:false},
				
				{F:'Programados',H:'null', str:false},
				{F:'CltsCompra',H:'null', str:false},
				{F:'CltsCerrados',H:'null', str:false},
				{F:'CltsNoCompra',H:'null', str:false},
				{F:'CltsFueraZona',H:'null', str:false},
				
				{F:'CltsCompraFF',H:'null', str:false},
				{F:'HUltimoClt',H:'null', str:false} ];
    	
    	var today = new Date();	
    	today.setDate(today.getDate()-1);
    	var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		var mMes =  yyyy + '-' + (mm) + '-' + (dd);
		
		console.log('EXP_INDI');

		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/Indicadores_NNEW",
            data: "{'CompanyCode':'"+company+"',"+
            		"'fIni': '"+mMes+"', 'fFin':'"+hoy+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');
	        	var dta = JSON.parse(data.d);
	        	console.log(dta);
	        	
	        	dataR_ListadoDeClientesPorRuta = new Array();
	        	$.each(dta, function (index, value) {
	        		value.Fecha = MTDS.CAST_DATE(value.Fecha);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});

	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'Indicadores ' + mMes);
	    		
            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los Indicadores '+ e);                
            }
        });
				
	});
	
	
	
	$('#BUSCA_REC').on('click', function(){
		s_RecorridoRuta($('#idRuta').val(), $('#Fecha_Rec').val());
		
		s_Clientes_Ruta($('#idRuta').val());
	});
	
	
	
	window.s_RegProd = function () {
		
		var objH = [{F:'id',H:'id', str:false}, 
    			{F:'Nombre', H:'Nombre', str:true}, 
    			{F:'Grupo', H:'Grupo', str:true}, 
    			{F:'Marca', H:'Marca', str:true}, 
    			{F:'Precio', H:'Precio', str:false}, 
    			{F:'Codigo', H:'Codigo', str:true}, 
    			{F:'Cedis', H:'Cedis', str:true}, 
    			{F:'idCedis', H:'idCedis', str:false}, 
    			{F:'idGrupo', H:'idGrupo', str:false}, 
    			{F:'idMarca', H:'idMarca', str:false}];
						
		console.log('Consultando Productos');
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	MTDS.EXPORT(objH, dta, 'Productos');
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    
    //F = [NOMBRE DEL CAMPO]	H = [HEADER]	str = [SI ES STRING O NO]
    var objH = [{F:'id',H:'id', str:false}, 
    			{F:'Nombre', H:'Nombre', str:true}, 
    			{F:'Grupo', H:'Grupo', str:true}, 
    			{F:'Marca', H:'Marca', str:true}, 
    			{F:'Precio', H:'Precio', str:false}, 
    			{F:'Codigo', H:'Codigo', str:true}, 
    			{F:'Cedis', H:'Cedis', str:true}, 
    			{F:'idCedis', H:'idCedis', str:false}, 
    			{F:'idGrupo', H:'idGrupo', str:false}, 
    			{F:'idMarca', H:'idMarca', str:false}];
		
    
    
	window.i_Reg = function (idMarca, idGrupo, nombre, precio, codigo) {
		
		var fErr = -1;
		
		if(codigo == '')fErr = 5;
		if(precio == '')fErr = 4;
		if(nombre == '')fErr = 3;
		if(idGrupo == 0)fErr = 2;
		if(idMarca == 0)fErr = 1;
		
		if(!$.isNumeric(precio)) fErr = 6;
		
		var contC = 0;
		var allCedis =''; 
		$.each($('.cedisField select'), function(index, value)
		{
			var valSelected = $(value).val();
			//console.log(valSelected);
			allCedis += valSelected + '|';
			
			contC+=valSelected;
			
		});
		allCedis = allCedis.substring(0, allCedis.length -1);
		
		
		if(contC == 0)fErr = 0;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Producto",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idMarca: '"+idMarca.trim()+"'," +
					"idGrupo: '"+idGrupo.trim()+"',"+
					"Nombre: '"+nombre.trim()+"',"+
					"Precio: '"+ precio.trim() +"',"+
					"Codigo: '"+ codigo.trim() +"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"Cedis_GPO: '"+allCedis+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + nombre +' creado Exitosamente!');
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
    	
    	 //var win_app = new ActiveXObject("WScript.shell"); win_app.run("notepad.exe", 1, True); 
						
		console.log('Consultando ');
		
		var today = new Date();
		//console.log(today);
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		hoy = yyyy + '-' + mm + '-' + (dd);
		
		$('#Fecha').val(hoy);
		
		$('#VDD').text($('#VDD').text() + ' ' + hoy );
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_VentadelDia",
            data: "{'CompanyCode':'"+company+"',"+
            		"'fIni': '"+ hoy +"',"+
            		"'fFin': '"+hoy+"'"+
            "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	//console.log(data);
            	
	        	var dta = JSON.parse(data.d);	        	
	        	VDD_dta = dta;
	        	
	        	var VDD_dta_AR = new Array();
	        	//console.log(dta);
	        	$.each(dta, function (index, value) {
	        		if(getUserSession().idCedis == value.idCedis )//|| getUserSession().idTipo == 5)
	        		{
	        			VDD_dta_AR.push(value);
	        		}
	        			    			
	    			 
	    		});
	    		
	    		VDD_dta = VDD_dta_AR;
	    		
	    		
	    		//console.log(JSON.parse(data.d));
	    		VDD = Morris.Bar({
					element: 'hero-bar',
					data: VDD_dta,//JSON.parse(data.d),
					barColors: ['#62CC64', '#e84e40', '#E85AC8', '#3fcfbb', '#626f70', '#8f44ad'],
					xkey: 'Ruta',
					ykeys: ['Total'],
					labels: ['Total'],
					barRatio: 0.9,
					xLabelAngle: 45,
					hideHover: 'auto',
					resize: true
				});
				
				
				updateVDD();  		
	    		

            },
            error: function (e) {
                ANIM.Error('Error al consultar los ...');
            }
        });        

    };
    
    window.s_Reg_VDD = function () {
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_VentadelDia",
            data: "{'CompanyCode':'"+company+"',"+
            		"'fIni': '"+ $('#Fecha').val() +"',"+
            		"'fFin': '"+$('#Fecha').val()+"'"+
            "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
	        	var dta = JSON.parse(data.d);	        	
	        	VDD_dta = dta;
	        	
	        	var VDD_dta_AR = new Array();
	        	VNT_TTL = 0;
	        	//console.log(VDD_dta);
	        	$.each(VDD_dta, function(indx, obj){
	        		
	        		if(getUserSession().idCedis == obj.idCedis )//|| getUserSession().idTipo == 5)
	        		{//console.log(obj.idCedis + ' - ' + getUserSession().idCedis);
	        			VDD_dta_AR.push(obj);
	        			VNT_TTL += obj.Total;
	        		}
	        		
	        	});
	        	
	        	VDD_dta = VDD_dta_AR;
	        	console.log(VNT_TTL);
	        	
	        	$('#TTL').text(MTDS.COMMA(VNT_TTL.toFixed(2)));
	        	
	        	VDD.setData(VDD_dta);
				VDD.draw();
				$('#VDD').text( 'VENTA DEL DIA ' + $('#Fecha').val() );
				console.log('DRAW...');
	        	
	    		return dta;

            },
            error: function (e) {
                ANIM.Error('Error al consultar los ...');
            }
        });        

    };
    
    
    function updateVDD(){
    	
    	//console.log('DRAW..');
    	s_Reg_VDD();
    	
    	setTimeout(updateVDD, 8000);
    	 			
    			
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
			console.log('Editando '+tabla + ' |');
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Producto",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id_.trim()+"'," + 
                	"idMarca: '"+idMarca.trim()+"'," +
					"idGrupo: '"+idGrupo.trim()+"',"+
					"Nombre: '"+nombre.trim()+"',"+
					"Precio: '"+ precio.trim() +"',"+
					"Codigo: '"+ codigo.trim() +"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"Cedis_GPO: '"+allCedis+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + nombre +' actualizado Exitosamente!');		  		
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
            url: domin + "/fWS.asmx/d_Producto",
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
    
     
    
    window.s_Cedis = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cedis",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var CEDIS_op = '';
	        	//var dta = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		
	        		//CEDIS.push('{id:'+value.id+', Nombre:'+value.Nombre+'}');    			
    				CEDIS_op += '<option value="'+value.id+'">'+value.Nombre+'</option>';
				});
			
				$('#edtidCedis').append(CEDIS_op);
				
				$("#btnEDT").click();	    		
	    			    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los CEDIS.');
            }
        });
    };
    
    window.s_Grupo = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Grupo",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idGrupo').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidGrupo').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
				});	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los Grupos.');
            }
        });
		
    };
    
    window.s_Marca = function () {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Marca",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {	        		
	        		$('#idMarca').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidMarca').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
				});	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar las Marcas.');
            }
        });
        
    };
    
    
    
    s_Reg();
    
    if(getUserSession().idTipo == 5){
    	s_Cedis();
    }
    
    
   $('#CAMBIA_CEDIS').on('click', function(){
   		
   		var obj = $.cookie("scmxadminss");		
		obj = JSON.parse(obj);
		obj[0].idCedis = $('#edtidCedis').val();
		
		$.cookie("scmxadminss", JSON.stringify(obj));
   });
    
    
    
    
    
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