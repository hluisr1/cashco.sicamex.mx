$(document).ready(function () {	
	
	$('#Rutas').select2();
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
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
						
	var TBL_B = new Array();
	
	
							
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
    	today.setDate(today.getDate()-8);
    	var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		var mMes =  yyyy + '-' + (mm) + '-' + (dd);
		
		console.log('EXP_INDI');
		
		if(dataR_ListadoDeClientesPorRuta.length > 0){MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'Indicadores ' + mMes);}
		else{
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
		}

		
				
	});
	
	$('#Rutas').on('change', function(){
		changeRoute($('#Rutas').val());
	});
	
	function LOAD(){
		console.log('EXP_INDI');
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
    	today.setDate(today.getDate()-8);
    	var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		var mMes =  yyyy + '-' + (mm) + '-' + (dd);
		
		

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
	        		console.log(MTDS.CAST_DATE(value.Fecha) + ' - ' + (value.Fecha));
	        		value.Fecha = MTDS.CAST_DATE(value.Fecha);
	        		dataR_ListadoDeClientesPorRuta.push(value);	        		
	    		});

	    		//MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'Indicadores ' + mMes);
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		TBL_B = new Array();			    
			    var tmpDiaRuta = '';
			    var Rutas = new Array();
			    $.each(dataR_ListadoDeClientesPorRuta, function(indx, val){
			    	
			    	if(Rutas.indexOf(val.Ruta) === -1) {
					    // does not exist
					    Rutas.push(val.Ruta);
					    $('#Rutas').append('<option value="'+val.Ruta+'">'+ val.Supervisor + ' | ' + val.Ruta + '</option>');
					}
			    	
			    	var nntmpDiaRuta = (val.Ruta + '|' + val.Fecha);    	
			    	if(tmpDiaRuta != nntmpDiaRuta){
			    		
			    		TBL_B.push(nntmpDiaRuta);
			    		TBL_B[nntmpDiaRuta] = new Array();
			    		
			    		TBL_B[nntmpDiaRuta].Programados = 0;
			    		TBL_B[nntmpDiaRuta].CltsVisProg = 0;
			    		TBL_B[nntmpDiaRuta].CltsCNCompr = 0;
			    		TBL_B[nntmpDiaRuta].CltsSNCompr = 0;
			    		TBL_B[nntmpDiaRuta].CltsCerrado = 0;
			    		TBL_B[nntmpDiaRuta].CltsFueraZn = 0;
			    		TBL_B[nntmpDiaRuta].CltsFueraFF = 0;
			    		TBL_B[nntmpDiaRuta].CltsTTLVisi = 0;
			    		TBL_B[nntmpDiaRuta].VentaTTLDia = 0;
			    		TBL_B[nntmpDiaRuta].VentaPromCl = 0;
			    		
			    		TBL_B[nntmpDiaRuta].Salida = '';
			    		TBL_B[nntmpDiaRuta].Llegada = '';
			    		TBL_B[nntmpDiaRuta].Primer = '';
			    		TBL_B[nntmpDiaRuta].Ultimo = '';
			    					    		
			    		
			    		tmpDiaRuta = nntmpDiaRuta;
		    		}
			    	
			    	TBL_B[nntmpDiaRuta].Programados = val.Programados;
			    	TBL_B[nntmpDiaRuta].CltsVisProg += val.idDia == parseInt(val.DiaVisitado) ? 1 : 0;
			    	TBL_B[nntmpDiaRuta].CltsCNCompr += val.idDia == parseInt(val.DiaVisitado) ? val.CltsCompra : 0;
			    	TBL_B[nntmpDiaRuta].CltsSNCompr += val.idDia == parseInt(val.DiaVisitado) ? val.CltsNoCompra : 0;
			    	TBL_B[nntmpDiaRuta].CltsCerrado += val.idDia == parseInt(val.DiaVisitado) ? val.CltsCerrados : 0;
			    	TBL_B[nntmpDiaRuta].CltsFueraZn += val.idDia == parseInt(val.DiaVisitado) ? val.CltsFueraZona : 0;
			    	TBL_B[nntmpDiaRuta].CltsFueraFF += val.CltsCompraFF;
			    	TBL_B[nntmpDiaRuta].CltsTTLVisi += parseInt(val.DiaVisitado) != 0 ? 1 : 0;
			    	TBL_B[nntmpDiaRuta].VentaTTLDia += parseFloat(val.Total);
			    	TBL_B[nntmpDiaRuta].VentaPromCl = TBL_B[nntmpDiaRuta].CltsTTLVisi != 0 ? (TBL_B[nntmpDiaRuta].VentaTTLDia / TBL_B[nntmpDiaRuta].CltsTTLVisi) : 0;
			    	
			    	TBL_B[nntmpDiaRuta].Salida = val.HICedis;
		    		TBL_B[nntmpDiaRuta].Llegada = val.HCierreHH;
		    		TBL_B[nntmpDiaRuta].Primer = val.HPrimerClte;
		    		TBL_B[nntmpDiaRuta].Ultimo = val.HUltimoClt;
			    	
			    });
			    
			    console.log(TBL_B);
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		changeRoute(Rutas[0]);
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
	    		
            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los Indicadores '+ e);                
            }
        });
				
	};
	
	$('#BUSCAR').on('click', function(){
		changeRoute($('#Rutas').val());
	});
	
	function changeRoute(Route){
		var RutaSel = Route;
		
		$('#sRoute').text(RutaSel); 
		
		var FechasArray = new Array();
		
		for(var i=0; i<= 8; i++)
		{
			FechasArray.push(addDate(hoy, i*(-1)));
		}
		
		console.log(FechasArray);
		var contDay = 7;
		var SUM = { CP: 0,  CVP: 0, CCC: 0, CSC: 0, CCE: 0, CFZ: 0,
					CFF: 0, CTV: 0, VTD: 0, VPC: 0}; 
		$.each(FechasArray, function(indx, val){
			var SELECT = RutaSel + '|' + val;
			//console.log(getFormatDate(val));
			
			try{
				$('#D'+contDay).text( getFormatDate(val)); 
				$('#D'+contDay+'_CP').text( TBL_B[SELECT].Programados);
				$('#D'+contDay+'_CVP').html( (((TBL_B[SELECT].CltsVisProg > TBL_B[SELECT].Programados ? TBL_B[SELECT].Programados : TBL_B[SELECT].CltsVisProg)/TBL_B[SELECT].Programados)*100).toFixed(1) + '%');
				$('#D'+contDay+'_CCC').text( ((TBL_B[SELECT].CltsCNCompr/TBL_B[SELECT].Programados)*100).toFixed(1) + '%');
				$('#D'+contDay+'_CSC').text( ((TBL_B[SELECT].CltsSNCompr/TBL_B[SELECT].Programados)*100).toFixed(1) + '%');
				$('#D'+contDay+'_CCE').text( ((TBL_B[SELECT].CltsCerrado/TBL_B[SELECT].Programados)*100).toFixed(1) + '%');
				$('#D'+contDay+'_CFZ').text( TBL_B[SELECT].CltsFueraZn );
				
				$('#D'+contDay+'_CFF').text( TBL_B[SELECT].CltsFueraFF);
				$('#D'+contDay+'_CTV').text( TBL_B[SELECT].CltsTTLVisi);
				
				$('#D'+contDay+'_VTD').text( MTDS.COMMA(parseFloat(TBL_B[SELECT].VentaTTLDia).toFixed(2)));
				$('#D'+contDay+'_VPC').text( MTDS.COMMA(parseFloat(TBL_B[SELECT].VentaPromCl).toFixed(2)));
				
				$('#D'+contDay+'_HS').text( TBL_B[SELECT].Salida);
				$('#D'+contDay+'_HL').text( TBL_B[SELECT].Llegada);
				$('#D'+contDay+'_HP').text( TBL_B[SELECT].Primer);
				$('#D'+contDay+'_HU').text( TBL_B[SELECT].Ultimo);
				
				if(contDay > 0){
					SUM.CP += TBL_B[SELECT].Programados;
					SUM.CVP += TBL_B[SELECT].CltsVisProg;
					SUM.CCC += TBL_B[SELECT].CltsCNCompr;
					SUM.CSC += TBL_B[SELECT].CltsSNCompr;
					SUM.CCE += TBL_B[SELECT].CltsCerrado;
					SUM.CFZ += TBL_B[SELECT].CltsFueraZn;
					
					SUM.CFF += TBL_B[SELECT].CltsFueraFF;
					SUM.CTV += TBL_B[SELECT].CltsTTLVisi;							
					SUM.VTD += TBL_B[SELECT].VentaTTLDia;
					SUM.VPC += TBL_B[SELECT].VentaPromCl;
				}
				 
			}
			catch(ex){}
			
			contDay--;
		});
		
		console.log(SUM);
		
		contDay = 8;
		$('#D'+contDay+'_CP').text((SUM.CP/6).toFixed(1));
		$('#D'+contDay+'_CVP').text(((SUM.CVP>SUM.CP ? SUM.CP : SUM.CVP)/6).toFixed(1));
		$('#D'+contDay+'_CCC').text((SUM.CCC/6).toFixed(1));
		$('#D'+contDay+'_CSC').text((SUM.CSC/6).toFixed(1));
		$('#D'+contDay+'_CCE').text((SUM.CCE/6).toFixed(1));
		$('#D'+contDay+'_CFZ').text((SUM.CFZ/6).toFixed(1));				
		$('#D'+contDay+'_CFF').text((SUM.CFF/6).toFixed(1));
		$('#D'+contDay+'_CTV').text((SUM.CTV/6).toFixed(1));
		$('#D'+contDay+'_VTD').text(MTDS.COMMA(parseFloat(SUM.VTD/6).toFixed(2)));
		$('#D'+contDay+'_VPC').text(MTDS.COMMA(parseFloat(SUM.VPC/6).toFixed(2)));
		
		contDay = 9;
		$('#D'+contDay+'_CP').text( SUM.CP);
		$('#D'+contDay+'_CVP').text(SUM.CVP);
		$('#D'+contDay+'_CCC').text(SUM.CCC);
		$('#D'+contDay+'_CSC').text(SUM.CSC);
		$('#D'+contDay+'_CCE').text(SUM.CCE);
		$('#D'+contDay+'_CFZ').text(SUM.CFZ);				
		$('#D'+contDay+'_CFF').text(SUM.CFF);
		$('#D'+contDay+'_CTV').text(SUM.CTV);
		$('#D'+contDay+'_VTD').text(MTDS.COMMA(parseFloat(SUM.VTD).toFixed(2)));
		$('#D'+contDay+'_VPC').text(MTDS.COMMA(parseFloat(SUM.VPC).toFixed(2)));
	    		
	    		
	    		
	    		
	    		
	};
	
	
	function addDate(fecha, days){
		var today = new Date(parseInt(fecha.split('-')[0]), parseInt(fecha.split('-')[1])-1, parseInt(fecha.split('-')[2]));	
    	console.log(today);
    	today.setDate(today.getDate() + days);
    	console.log(today);
    	var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		//mm = (mm+'').length > 1 ? mm : '0'+mm;
		//dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		return (dd) + '/' + mm + '/' + yyyy;
	};
	
	function getFormatDate(Fecha){
		
		var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
					'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		var dias = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
		
		//Fecha = Fecha.split(' ', 1);
		//console.log(Fecha);
		Fecha = Fecha.split('/');		
		
		if(true){
			//----------------LOCAL--------------- 
			var fFecha = new Date(Fecha[2], Fecha[1]-1, Fecha[0]);// LOCAL		YYYY-MM-DD		
			var frag = dias[fFecha.getDay()] + ' ' + Fecha[0];// + ' de ' + meses[parseInt(Fecha[1])-1];// LOCAL
		}
		else{
			//----------------SERVER--------------
			var fFecha = new Date(Fecha[2], Fecha[0]-1, Fecha[1]);// SERVER		YYYY-MM-DD		
			var frag = dias[fFecha.getDay()] + ' ' + Fecha[1];// + ' de ' + meses[parseInt(Fecha[0])-1];// SERVER
		}			
			
		return frag;
	};
	
	
	
	
	
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
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		CEDIS.push('{id:'+value.id+', Nombre:'+value.Nombre+'}');    			
    				CEDIS_op += '<option value="'+value.id+'">'+value.Nombre+'</option>';
				});
			
				$('#idCedis').append(CEDIS_op);
				$('#edtidCedis').append(CEDIS_op);	    		
	    			    		
	    		
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
    
    
    
    //s_Reg();
    var today = new Date();
	//console.log(today);
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	mm = (mm+'').length > 1 ? mm : '0'+mm;
	dd = (dd+'').length > 1 ? dd : '0'+dd;	
	hoy = yyyy + '-' + mm + '-' + (dd);
	
	//ANIM.Error('Espera 1 min aprox.');
    LOAD();
    
    console.log(addDate('2015-11-02', 2));
    console.log(addDate('2015-11-02', -1));
    console.log(addDate('2015-11-02', -2));
    
    
   	
    
    
    
    
    
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