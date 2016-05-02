$(document).ready(function () {
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Liquidacion';
	var MsjValida = ['Escoja a el Vendedor.',
						'Escriba el Monto.',
						'Escoja un Supervisor.'];
	
	//nice select boxes
	$('#idUsuario_VEN').select2();
	$('#Clientes').select2();	
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	var FRM = new CRUD('21-LIQUIDACION', {C: '.CRUD_C', R: '.CRUD_R', U: '.CRUD_E', D: '.CRUD_D'}, INI_PAGE);
	var MTDS = new METODOS();
	var CON = 0, CRED = 0, CONS = 0;
	
	var liqIndx = 2, liqMNTO = [{id: 0, concept:'Contado'},
								{id: 1, concept:'Credito'},
								{id: 2, concept:'Consignacion'}];
	var depIndx = 0, depMNTO = [{id: 0, concept:'Banca'}];
	var LiqInpt = false;
	var DepInpt = false;
	
	var dta;
	
	var contProd=0;
	
	var ProductOBJs = '';
	
	var CreditoOBJs = '';	
	
	
	var IDRUTA = 0, FECHA= '1999-01-01', idCLT = 0;
	
	var MsjValida = ['Ingrese lo Liquidado a Contado.',
						'Ingrese el Monto de la Ficha de Deposito.',
						'Ingrese el N° de Referencia de la Ficha de Deposito.',
						'Ingrese la Sucursal de la Ficha de Deposito.',
						'Seleccione a Quien se hará el Cargo/Abono',
						'Detalle la Causa del Cargo Abono'];
	
	var DONUT;
	
	
	var dta_CV;
	var objH_CV = [{F:'Ruta',H:'Ruta', str:true},
				{F:'idDetalleVisita',H:'id.Pedido', str:false},
				{F:'idCliente', H:'id.Cliente', str:false},  
    			{F:'NombreTienda', H:'NombreTienda', str:true}, 
    			{F:'Contado', H:'Contado', str:false}, 
    			{F:'Credito', H:'Credito', str:false}, 
    			{F:'Consignacion', H:'Consignacion', str:false}, 
    			{F:'Total', H:'Total', str:false}, 
    			{F:'Nuevo', H:'Es Nuevo', str:false}];
   	
	var dta_CNV;
	var objH_CNV = [{F:'idVisitaCliente',H:'id.Visita.Cliente', str:false}, 
    			{F:'Ruta', H:'Ruta', str:true}, 
    			{F:'NombreTienda', H:'NombreTienda', str:true}, 
    			{F:'Descripcion', H:'Motivo', str:true}];
    			
    
	var dta_PD;
	var objH_PD = [{F:'Ruta',H:'Ruta', str:true}, 
    			{F:'NombreTienda', H:'NombreTienda', str:true}, 
    			{F:'Producto', H:'Producto', str:true}, 
    			{F:'Cantidad', H:'Cantidad', str:false},  
    			{F:'Total', H:'Total', str:false}, 
    			{F:'Descripcion', H:'Motivo', str:true}];
    			
    //var OBJ = [value.Ruta, value.NombreTienda.toUpperCase(), value.Producto, value.Cantidad, value.Total, value.Descripcion, MTDS.CAST_DATE(value.Entrada)];
	
	
	var dta_PV;
	var objH_PV = [{F:'Ruta',H:'Ruta', str:true}, 
    			{F:'Nombre', H:'Producto', str:true},
    			{F:'Cantidad', H:'Cantidad', str:false}, 
    			{F:'Contado', H:'Contado', str:false}, 
    			{F:'Credito', H:'Credito', str:false}, 
    			{F:'Consignacion', H:'Consignacion', str:false}, 
    			{F:'Total', H:'Total', str:false}];
    
	
	
	var dta_LDR;
	var objH_LDR = [{F:'Ruta',H:'Ruta', str:true}, 
    			{F:'Usuario', H:'Usuario', str:true}, 
    			{F:'Contado', H:'Contado', str:false}, 
    			{F:'Credito', H:'Credito', str:false}, 
    			{F:'Consignacion', H:'Consignacion', str:false}, 
    			{F:'Total', H:'Total', str:false}, 
    			{F:'Diff', H:'Diferencia', str:false}];
	
	
	
	function getTotalFromInputs(INPUTS){//SUMA LOS MONTOS.
		var ttl = 0;
		$.each($(INPUTS), function(indx, elmnt){
			ttl +=  $(elmnt).val().length > 0 ? parseFloat($(elmnt).val()) : 0;
		});
		return ttl;		
	}
	function setMontoToFormatInputs(INPUTS){//ASIGNA FORMATO A LOS MONTOS.
		$.each($(INPUTS), function(indx, elmnt){
			$(elmnt).val(parseFloat(0.0 + parseFloat($(elmnt).val())).toFixed(2));
		});		
	}
	
	window.UpdateDiff = function(){//ACTUALIZA LOS MONTOS DESPLEGADOS.
		/* -------------------------------------- LIQUIDACION --------------------------------------------
		 	SE CAPTURARA LO QUE LIQUIDA EL VENDEDOR.
		 	
		 	CONTADO.- DEBE DE CUADRAR CON EL CONTADO DE LA VENTA DEL DIA.
		 	CREDITO.- NO NECESARIAMENTE TIENE Q CUADRAR CON LO QUE VENDIO A CREDITO ESE DIA.
		 		(SE LE ASIGNA 0.00 PARA QUE SE CAPTURE EL MONTO QUE SE DEPOSITO EN ESTE RUBRO)
		 	CONSIGNACION.- NO NECESARIAMENTE TIENE Q CUADRAR CON LO QUE VENDIO A CONSIGNACION ESE DIA.
		 		(SE LE ASIGNA 0.00 PARA QUE SE CAPTURE EL MONTO QUE SE DEPOSITO EN ESTE RUBRO)		 	 
		 */
		
		setMontoToFormatInputs('#Depositos li input, #Liquidacion li input');//ASIGNA FORMATO A LOS MONTOS.		
				
		$('#liqttl').text('$ '+MTDS.COMMA(getTotalFromInputs('#Liquidacion li input').toFixed(2)));//SUMA LOS MONTOS.
		$('#depttl').text('$ '+MTDS.COMMA(getTotalFromInputs('#Depositos li input').toFixed(2)));//SUMA LOS MONTOS.
		$('#refttl').text('$ '+MTDS.COMMA(getTotalFromInputs('#Depositos li input').toFixed(2)));//SUMA LOS MONTOS.
		
		//ASIGNA LA DIFERENCIA.
		var diffttl = parseFloat(getTotalFromInputs('#Depositos li input').toFixed(2) - getTotalFromInputs('#Liquidacion li input').toFixed(2)).toFixed(2);		
		$('#diffttl').text('$ '+MTDS.COMMA(  diffttl  ));
		
		/*if(diffttl != 0)$('#CARGO').show(1500);
		else $('#CARGO').hide(1500);*/
		$('#carttl').text('$ '+MTDS.COMMA(  diffttl  ));
		$('#carttl').attr('ttl', diffttl);
		
		//CAMBIA COLOR DEPENDIENDO DEL VALOR DEL OBJETO DEL ARREGLO DE OBJETOS.
		var diffArray = [{id:'#diffttl', valor: diffttl}];						
		$.each(diffArray, function(indx, obj){
			if(parseFloat(obj.valor) < 0)$(obj.id).css({'color': '#FF0000'});
			if(parseFloat(obj.valor) > 0)$(obj.id).css({'color': '#4EE640'});
			if(parseFloat(obj.valor) == 0)$(obj.id).css({'color': '#000000'});
		});				
		
	};

	function ClearFields_AltaEP(){//RESETEA LOS CAMPOS DEL MODAL DE CARGA.PEDIDO.
		idCLT = 0;
    	$('#Clientes').val(0);
    	$('#DIV_Productos div').remove();   	
    	
    	$('#Clientes').select2();
    	updateTOTAL();
    }
	
	
	
	$('.liqMNT, .depMNT').on('change', function(){//ACTUALIZA LAS DIFERENCIAS.
		console.log('UP--->');
		UpdateDiff();
	});
	
	$('#hLiquidacion').on('click', function(){//AGREGA UN INPUT PARA AGREGARLO COMO CONCEPTO.
		
		if(!LiqInpt){			//BANDERA DE INPUT.
			LiqInpt = true;		//CAMBIA ESTADO DE LA BANDERA.			
			
			$('#AddLiq').append('<div id="itmLiq-Add" class="inptAdd">'+
									'<input id="InptLiq" style="width: 79%; margin: 0; display: inline;" maxlength="45" type="text" class="form-control" placeholder="Concepto">'+
									'<button id="bntAdd" style="width: 19%; margin: 0; display: inline;" type="button" class="btn yellow-bg">+</button>'+
								'</div>');

			$('#InptLiq').focus();											
			$('#bntAdd').unbind();
								
			$('#bntAdd').on('click', function(){
				
				liqIndx++;			//INCREMENTA EL INDEX DE LOS CONCEPTOS.
				
				//AGREGA CONCEPTO.
				liqMNTO.push({id: liqIndx,  concept:$('#InptLiq').val() != '' ? $('#InptLiq').val() : 'No Especificado'});
				
				//ELIMINA EL INPUT.
				$('#itmLiq-Add').remove();
				
				//CAMBIA LA BANDERA DEL INPUT.
				LiqInpt = false;				
				
				console.log(liqMNTO);console.log(liqIndx);//AGREGA EL UI DEL NUEVO CONCEPTO. 
				$('#Liquidacion').append('<li id="itmLiq-'+liqIndx+'" class="inptAdd">'+
											'<div style="width: 100%; display: inline; padding: 0;">'+
												'<input onchange="UpdateDiff();" style="width: 78%; margin: 0; display: inline;" maxlength="45" type="number" class="form-control liqMNT" id="liq-'+liqIndx+'" placeholder="'+liqMNTO[liqIndx].concept+'" idCred="0">'+
												'<button style="width: 18%; margin: 0; display: inline;" type="button" class="btn btn-danger" onclick="$(\'#itmLiq-'+liqIndx+'\').remove(); UpdateDiff();">-</button>'+
											'</div>'+
										'</li>');
			});
		}
			
	});
	$('#hDepositos').on('click', function(){//AGREGA UN INPUT PARA AGREGARLO COMO CONCEPTO.
		
		var ID_INPT = 'InptDep';
		var ID_BTN = 'bntAddDep';
		var ID_ITM = 'itmDep-Add';
		
		if(!DepInpt){			//BANDERA DE INPUT.
			DepInpt = true;		//CAMBIA ESTADO DE LA BANDERA.			
			
			$('#AddDep').append('<div id="'+ID_ITM+'" class="inptAdd">'+
									'<input id="'+ID_INPT+'" style="width: 80%; margin: 0; display: inline;" maxlength="45" type="text" class="form-control" placeholder="Concepto">'+
									'<button id="bntAddDep" style="width: 19%; margin: 0; display: inline;" type="button" class="btn green-bg">+</button>'+
								'</div>');
								
			$('#' + ID_INPT).focus();								
			$('#'+ID_BTN).unbind();
								
			$('#'+ID_BTN).on('click', function(){
				console.log($('#'+ID_INPT).val());
				
				depIndx++;			//INCREMENTA EL INDEX DE LOS CONCEPTOS.
				
				//AGREGA CONCEPTO.
				depMNTO.push({id: depIndx,  concept:$('#'+ID_INPT).val() != '' ? $('#'+ID_INPT).val() : 'No Especificado'});
				
				//ELIMINA EL INPUT.
				$('#'+ID_ITM).remove();
				
				//CAMBIA LA BANDERA DEL INPUT.
				DepInpt = false;				
				
				console.log(depMNTO);console.log(depIndx);//AGREGA EL UI DEL NUEVO CONCEPTO. 
				$('#Depositos').append('<li id="itmDep-'+depIndx+'" class="inptAdd">'+
											'<div style="width: 100%; display: inline; padding: 0;">'+
												'<input onchange="UpdateDiff();" style="width: 78%; margin: 0; display: inline;" maxlength="45" type="number" class="form-control depMNT" id="dep-'+depIndx+'" placeholder="'+depMNTO[depIndx].concept+'">'+
												'<button style="width: 18%; margin: 0; display: inline;" type="button" class="btn btn-danger" onclick="$(\'#itmDep-'+depIndx+'\').remove(); UpdateDiff();">-</button>'+
											'</div>'+
										'</li>');
			});
		}
	});



	
	$('#BUSCAR').on('click', function(){//CONSULTA MOVIMIENTOS DE LA RUTA.
		//RESET ---------------------
		$('.inptAdd').remove();
		LiqInpt = false;
		DepInpt = false;
		
		$('.inptRef').val('');
		//---------------------------
		
		IDRUTA = $('#idUsuario_VEN').val();
		FECHA = $('#Fecha').val();
		
		vLiq(IDRUTA, FECHA);
		s_Venta_Ruta(IDRUTA, FECHA);
		s_SumVisitasDiaRuta(IDRUTA, FECHA);
		
		s_Clientes_NoVenta(IDRUTA, FECHA);
		s_LiqVenProducto(IDRUTA, FECHA, FECHA);		
		s_LiquidacionDiaRuta(FECHA, FECHA);
		s_DevProducto(IDRUTA, FECHA);
		
	});
	
	$('#SAVE').on('click', function(){
		//
		
		
	});
	
	$('#EDITA').on('click', function(){
		//
	});
	
	$('#GUARDA_EP').on('click', function(){//TRIGGER PARA AGREGAR UN PEDIDO. 
		console.log(1);
		
		/*var objEP = new Array();
		$.each($('.pruductoField'), function(indx, obj){
			var N = $(obj).attr('nItem');
			
			objEP.push({idDetalleVisita:0,
							idProducto:$('#idProducto-'+N).val(),
							InventarioInicial:null,
							Cantidad:$('#Cantidad-'+N).val(),
							Total:$('#Total-'+N).attr('ttl'),
							idPromocion:null,
							idCredito:$('#idTP-'+N).val(),
							Descuento:$('#Descuento-'+N).val(),
							Activo:1});
		});*/
		
		if(validateProdDup('')){
			if(idCLT != 0){
				i_DetalleVisita_LOCAL_ADMN({idVisitaCliente: $('#Clientes').val(),
					idEstatus:1,
					Fecha:null,//NOW()
					Latitud:-2,
					Longitud:-2,
					Entrada:FECHA,
					Salida:FECHA,
					Dentro:false,
					EP:null});				
			}
			else{
				ANIM.Alert('Selecciona un Cliente.');
			}
						
		}
			
	});
	
	$('CANCELA').on('click', function(){//ACTIVA EL EVENTO PARA LOS TRIGGERS PARA RESETAER EL MODAL CARGA.PEDIDO.
		ClearFields_AltaEP();
		console.log(1);
	});
	
	$('.clsEP').on('click', function(){//ACTIVA EL EVENTO PARA LOS TRIGGERS PARA RESETAER EL MODAL CARGA.PEDIDO.
		ClearFields_AltaEP();
		console.log(2);
	});
	
	$('#ELIMINA_EP').on('click', function(){//BTN DEL MODAL QUE ELIMINA LOGICAMENTE LA ENTREGA.PRODUCTO DE UN DETALLE.VISITA.
		d_EntregaProducto($('#ELIMINA_EP').attr('idRegistro'), false);		
	});
	
	$('#totalContainer').hide();
	$('#CARGAPEDIDO').on('click', function(){//ABRE EL MODAL DE CARGA.PEDIDO Y PRECARGA LOS CLIENTES DE LA RUTA SELECCIONADA.
		
		if(IDRUTA != 0 && FECHA != '199-01-01'){
			s_Clientes_Ruta($('#idUsuario_VEN').val());			
			$('#btnADD').click();//ABRE MODAL DE CARGA.PEDIDO.
		}
		else{
			ANIM.Alert('Consulta una Ruta antes de Agregar un Pedido.');
		}
		
	});
	$('#ADD_P').on('click', function(){//AGREGA UN PRODUCTO AL MODAL DE CARGA.PEDIDO
		$('#totalContainer').show();
		
		contProd++;
		$('#DIV_Productos').append('<div class="pruductoField" id="GPO_P-'+contProd+'" nItem="'+contProd+'" prodPrice="">'+
										'<div class="form-group col-xs-3">'+
											'<label style="display:block;">Producto</label>'+
											'<select style="width:250px;" nItem="'+contProd+'" class="SelectProduct" id="idProducto-'+contProd+'">'+
												'<option value="0">Escoje un Producto</option>'+
												ProductOBJs +
											'</select>'+
										'</div>'+
										
										'<div class="form-group col-xs-1">'+
											'<label>Cantidad</label>'+
											'<input type="number" nItem="'+contProd+'" class="form-control" id="Cantidad-'+contProd+'" placeholder="Cantidad" value="1">'+
										'</div>'+
										
										'<div class="form-group col-xs-3">'+
											'<label style="display:block;">Tipo de Entrega</label>'+
											'<select style="width:250px;" nItem="'+contProd+'" class="SelectProduct" id="idTP-'+contProd+'">'+
												'<option value="0">Contado</option>'+
												CreditoOBJs +
											'</select>'+
										'</div>'+
										
										'<div class="form-group col-xs-1">'+
											'<label>Descuento</label>'+
											/*'<div class="input-group">'+
												'<input style="width:50px;" type="number" nItem="'+contProd+'" class="form-control" id="Descuento-'+contProd+'" value="0">'+
												'<span class="input-group-addon">%</span>'+
											'</div>'+*/
											'<input type="number" nItem="'+contProd+'" class="form-control" id="Descuento-'+contProd+'" placeholder="Descuento" value="0">'+
										'</div>'+
										
										'<div class="form-group col-xs-2">'+
											'<label>Total</label>'+
											'<input class="form-control total" id="Total-'+contProd+'" type="text" placeholder="Disabled input here..." ttl="" disabled="" value="$0.00">'+
										'</div>'+									
										
										'<div class="form-group col-xs-1">'+
											'<label> &nbsp; </label>'+
											'<button type="button" style="margin-left: 10px;" class="form-control btn btn-danger fa fa-minus" id="delProduct" onclick="$(\'#GPO_P-'+contProd+'\').remove();updateTOTAL();"></button>'+
										'</div>'+
									'</div>');
									
		$('#idProducto-'+contProd).select2();
		$('#idTP-'+contProd).select2();					
									
		$('#idProducto-'+contProd+'').change(function(){
			
			var nItem = $(this).attr('nItem');
			var PRECIO = $( "#idProducto-"+nItem+" option:selected" ).attr('precio');
			$('#Cantidad-'+nItem).val(1);
			$('#Descuento-'+nItem).val(0);
			
			$($(this).parent()).parent().attr('prodPrice', PRECIO);//SET THE PRICE OF THE SELECTED PRODUCT TO PARENT DIV 
			
			var TTL_PRD_CNT = (PRECIO * $('#Cantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#Descuento-'+nItem).val()/100));
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			//console.log({Precio:PRECIO, Cant:$('#Cantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			$('#Total-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#Total-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			updateTOTAL();
		});
		$('#Cantidad-'+contProd).change(function(){
			
			var nItem = $(this).attr('nItem');
			
			var PRECIO = $($(this).parent()).parent().attr('prodPrice');
			var TTL_PRD_CNT = (PRECIO * $('#Cantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#Descuento-'+nItem).val()/100));			
			//console.log({Precio:PRECIO, Cant:$('#Cantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			if(TTL_PRD_CNT < 1){
				$('#Cantidad-'+nItem).val(1);
				
				PRECIO = $($(this).parent()).parent().attr('prodPrice');
				TTL_PRD_CNT = (PRECIO * $('#Cantidad-'+nItem).val()).toFixed(2);
				DESC = (TTL_PRD_CNT* ($('#Descuento-'+nItem).val()/100));
				
				TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			}
			$('#Total-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#Total-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			updateTOTAL();
		});
		$('#Descuento-'+contProd).change(function(){
			
			var nItem = $(this).attr('nItem');
			
			var PRECIO = $($(this).parent()).parent().attr('prodPrice');
			var TTL_PRD_CNT = (PRECIO * $('#Cantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#Descuento-'+nItem).val()/100));			
			console.log({Precio:PRECIO, Cant:$('#Cantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			if(DESC < 0){
				$('#Descuento-'+nItem).val(0);
				
				PRECIO = $($(this).parent()).parent().attr('prodPrice');
				TTL_PRD_CNT = (PRECIO * $('#Cantidad-'+nItem).val()).toFixed(2);
				DESC = (TTL_PRD_CNT* ($('#Descuento-'+nItem).val()/100));
				
				TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			}
			$('#Total-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#Total-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			updateTOTAL();
		});
			
	});
	window.updateTOTAL = function(){//SUMA LOS TOTALES DEL MODAL CARGA.PEDIDO Y ACTUALIZA EL TOTAL FINAL.
		var sum = 0;
		$.each($('.total'), function(indx, obj){
			var text = $(obj).attr('ttl');
			//sum += parseFloat(text.substring(1, text.lenght));				
			sum += parseFloat(text);
		});			
		$('#TTL').val( '$' + MTDS.COMMA(sum.toFixed(2)));
	};
	
	$('#edtGUARDA_EP').on('click', function(){//TRIGGER PARA AGREGAR UN PEDIDO. 
		
		if(validateProdDup('edt')){
			d_EntregaProducto($('#edtGUARDA_EP').attr('idRegistro'), true);	
		}		
	});
	
	$('#edtADD_P').on('click', function(){//AGREGA UN PRODUCTO AL MODAL DE CARGA.PEDIDO
		addEDT_PROD();
	});
	
	$('#Clientes').change(function(){
		idCLT = $('#Clientes').val();
	});
	
	
	$('#CARGO').on('click', function(){
		/*$('#dep-0').val(1);
		$('#refNoRef').val('0987645678765');
		$('#refBancoSuc').val('Famsa San Roque.');
		$('#EMP_VEN').val(2);
		$('#descCargo').val('bla bla bla....');*/
		
		i_LiquidacionALL($('#liq-0').val(), $('#dep-0').val(), $('#refNoRef').val(), $('#refBancoSuc').val(), $('#EMP_VEN').val(), $('#descCargo').val());
	});
	
	$('#EXPORTA_C_VENTA').on('click', function(){
    	MTDS.EXPORT(objH_CV, dta_CV, 'ClientesConCompra-' + $('#idUsuario_VEN option:selected').text()+ '-' + $('#Fecha').val());
	});
	$('#EXPORTA_C_NOVENTA').on('click', function(){
    	MTDS.EXPORT(objH_CNV, dta_CNV, 'ClientesSinVenta-' + $('#idUsuario_VEN option:selected').text()+ '-' + $('#Fecha').val());
	});
	$('#EXPORTA_C_DEV').on('click', function(){
    	MTDS.EXPORT(objH_PD, dta_PD, 'ClientesConDevolucion-' + $('#idUsuario_VEN option:selected').text()+ '-' + $('#Fecha').val());
	});
	$('#EXPORTA_P_VENTA').on('click', function(){
    	MTDS.EXPORT(objH_PV, dta_PV, 'VentaPorProducto-' + $('#idUsuario_VEN option:selected').text()+ '-' + $('#Fecha').val());
	});
	$('#EXPORTA').on('click', function(){
    	MTDS.EXPORT(objH_LDR, dta_LDR, 'LiquidacionDiaPorRuta');
	});
	
	
	
	function s_Ruta() {//CONSULTA LAS TODAS RUTAS Y LAS ASIGNA A EL SELECT2*.
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
            		{
            			var Cliente = value.Nombre;
            			$('#idUsuario_VEN').append('<option value="'+value.id+'">'+ Cliente + '</option>');
            		}
            			
	    		});
            },
            error: function (e) {
                ANIM.Error('Error al consultar las Rutas');
            }
        });
    };
    	
	window.s_Venta_Ruta = function (idRuta, Fecha) {//CARGA LOS MOVIMIENTOS DE LA RUTA, ACTUALIZA LOS DISPLAYS Y AGREGA LOS EVENTOS DE CADA ROW. 
		console.log(idRuta +' - '+ Fecha);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_VentaDiaRuta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'fFin':'"+Fecha+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	CON = 0, CRED = 0, CONS = 0;//INICIALIZA LOS TOTALES DE CADA RUBRO.
	        	
	        	var arr = new Array();	        	
	        	
	        	dta = JSON.parse(data.d);
	        	dta_CV = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	    			var OBJ = [value.idDetalleVisita, /*MTDS.CAST_HOUR(value.Fecha),*/ value.NombreTienda, value.Contado, value.Credito, value.Consignacion, value.Total, value.Nuevo == true ? '<span class="label label-warning">Nuevo</span>' : '' ];
	    			arr.push(OBJ);
	    			
	    			//SE VAN SUMANDO LOS MONTOS DE CADA RUBRO PARA SU DESPLIEGE.
	    			CON+=value.Contado;
	    			CRED+=value.Credito;
	    			CONS+=value.Consignacion;	    			      			
	    		});    	
	    		
	    		/* ------------DISPLAY PRINCIPAL------------*/
	    		$('#ttl').text('$ '+MTDS.COMMA((CON + CRED + CONS).toFixed(2)));
	    		$('#ttlCON').text('$ '+MTDS.COMMA(CON.toFixed(2)));
	    		$('#ttlCRED').text('$ '+MTDS.COMMA(CRED.toFixed(2)));
	    		$('#ttlCONS').text('$ '+MTDS.COMMA(CONS.toFixed(2)));
	    		
	    		/* ------------DISPLAY DEPOSITOS------------*/
	    		$('#dep-0').val('');//$('#depCON').val(((0).toFixed(2)));//$('#depCON').val((CON.toFixed(2)));
	    		//$('#depCRED').val((CRED.toFixed(2)));
	    		//$('#depCONS').val((CONS.toFixed(2)));
	    		$('#depttl').text('$ '+MTDS.COMMA((parseFloat( $('#depCON').val()) /*+ parseFloat($('#depCRED').val()) + parseFloat($('#depCONS').val())*/).toFixed(2)));
	    		
	    		/* ------------DISPLAY LIQUIDACION----------*/
	    		$('#liq-0').val((CON.toFixed(2)));
	    		$('#liq-1').val('');//$('#liqCRED').val(((0).toFixed(2)));//$('#liqCRED').val((CRED.toFixed(2)));
	    		$('#liq-2').val('');//$('#liqCONS').val(((0).toFixed(2)));//$('#liqCONS').val((CONS.toFixed(2)));
	    		$('#liqttl').text('$ '+MTDS.COMMA((parseFloat( $('#liq-0').val()) + parseFloat($('#liq-1').val()) + parseFloat($('#liq-2').val())).toFixed(2)));
	    			    		
	    		UpdateDiff();	    			
	    		
	    		
	    		var table = $('#tablaDatos_Ruta').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_Ruta').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'ID.PEDIDO': 'idDetalleVisita'}, {'Nombre Tienda': 'NombreTienda'}, {'CONTADO': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'},{'Nuevo': 'Nuevo'},   
	    				{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+' CRUD_E" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' 
							+						
							'<a id="del-'+o[0]+'" class="table-link danger del-'+o[0]+' CRUD_D" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a></div>' ;
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

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Movimientos.');
            }
        });        
    };        
    function bindBTNROW(){//ELIMINA Y VUELVE A GENERAR LOS EVENTOS DE CADA ROW.
    	$.each(dta, function (index, value) {
    		
    		
					
			$('#edt-'+value.idDetalleVisita).unbind();
			$('#del-'+value.idDetalleVisita).unbind();
			
			//console.log(value.Nuevo);
    		if(value.Nuevo){
    			console.log(value.Nuevo + '<-');
    			$('#edt-'+value.idDetalleVisita).parents('tr').css({/*'color': '#6478ED', 'font-weight': 'bold'*/});
    		}
    			
			
			$('#del-'+value.idDetalleVisita).on('click', function(){
				console.log(value);				    				
				    				
				$('#EDITA_EP').attr('idRegistro',value.idDetalleVisita);
				$('#ELIMINA_EP').attr('idRegistro',value.idDetalleVisita);				
				
				$('#DescRecord1').html( 'ID: <strong>' + value.idDetalleVisita + '</strong>');
				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
				$('#DescRecord3').html( 'MONTO: <strong>$ ' + value.Total + '</strong>');				
				
				$("#btnASK").click();//ABRE MODAL DE CONFIRMACION DE ELIMINACION.				
			});
			
			$('#edt-'+value.idDetalleVisita).on('click', function(){
				console.log(value);				    				
				    				
				$('#edtCANCELA').attr('idRegistro',value.idDetalleVisita);
				$('#edtGUARDA_EP').attr('idRegistro',value.idDetalleVisita);
				
				
				
				$('#HeadEDT').html('<h4>'+MTDS.CAST_LTR_DATE(value.Fecha) + ' | <strong> '+ value.Ruta +' </strong> </h4>' + value.idDetalleVisita + ' | <strong>' + value.NombreTienda + '</strong>');
				
				s_EP(value.idDetalleVisita);
				
				/*$('#DescRecord1').html( 'ID: <strong>' + value.idDetalleVisita + '</strong>');
				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
				$('#DescRecord3').html( 'MONTO: <strong>$ ' + value.Total + '</strong>');*/				
				
								
			});
		});
    }
    
    window.d_EntregaProducto = function (id_, EDT){//ELIMINA LOGICAMENTE LA ENTREGA.PRODUCTO DE UN DETALLE.VISITA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_EntregaProducto",
            data: "{'CompanyCode':'"+company+"',"+
            	"idUsuario: '"+getUserSession().Nickname+"', "+
            	"idDetalleVisita: "+id_.trim()+"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	if(!EDT)
            	ANIM.Success('fa-building', 'Pedido eliminado Exitosamente!');
            	
            	if(EDT)i_DetalleVisita_LOCAL_ADMN({idVisitaCliente: id_,
													idEstatus:1,
													Fecha:null,//NOW()
													Latitud:-2,
													Longitud:-2,
													Entrada:FECHA,
													Salida:FECHA,
													Dentro:false,
													EP:null}, 'edt', id_);
            	
            	s_Venta_Ruta($('#idUsuario_VEN').val(), $('#Fecha').val());
            },
            error: function (e) {
                ANIM.Error('Error al eliminar el Pedido.');
            }
        });        
    };
    
    window.i_DetalleVisita_LOCAL_ADMN = function (OBJ_DV, EDT, idDV){//INSERTA Y MANDA LLAMAR LA INSERCION DE LOS PRODUCTOS DEL PEDIDO. 
    	
    	if(EDT)i_EP_OBJ(idDV, EDT);
    	else{
    		console.log(OBJ_DV);
    		$.ajax({
	            type: "POST",
	            url: domin + "/fWS.asmx/i_DetalleVisita_LOCAL_ADMN",
	            data: "{'CompanyCode':'"+company+"',"+
	            	"idVisitaCliente: "+OBJ_DV.idVisitaCliente+", "+
	            	"idEstatus: "+OBJ_DV.idEstatus+", "+
	            	"Latitud: "+OBJ_DV.Latitud+", "+
	            	"Longitud: "+OBJ_DV.Longitud+", "+
	            	"Dentro: "+OBJ_DV.Dentro+", "+
	            	"Entrada: '"+OBJ_DV.Entrada+"', "+
	            	"Salida: '"+OBJ_DV.Salida+"', "+            	
	            	"idUsuario: '"+getUserSession().Nickname+"'} ",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (msg) {
	            	var dta = JSON.parse(msg.d);            	
	            	i_EP_OBJ(dta.id, '');
	            	//s_Venta_Ruta($('#idUsuario_VEN').val(), $('#Fecha').val());
	            },
	            error: function (e) {
	            	$('#CANCELA').click();
	                ANIM.Error('Error al Agregar el Pedido(1).');
	            }
	        });    
    		
    	}
		    
    };
    
    window.i_EP_ARRAY = function (JSON_OBJ){//INSERTA LOS PRODUCTOS DEL PEDIDO.
		$.ajax({
		    type: "POST",
		    url: domin + "/fWS.asmx/i_EntregaProductos_ADMN",
		    data: "{'CompanyCode':'"+company+"',"+
				"JSON: '"+JSON.stringify(JSON_OBJ)+"'}",
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function (msg) {
		    	$('#CANCELA').click();
		    	$('#edtCANCELA').click();
		    	ANIM.Success('fa-building', 'Pedido Agregado Exitosamente!');
		    	s_Venta_Ruta($('#idUsuario_VEN').val(), $('#Fecha').val());
		    },
		    error: function (e) {
		    	$('#CANCELA').click();
		    	console.log(e);
		        ANIM.Error('Error al insertar el nuevo Pedido(2)');
	        }
	   	});
   };
    function i_EP_OBJ(idDetalleVisita, EDT){
    	var objEP = new Array();
    	var idProds = new Array();
		$.each($('.'+EDT+'pruductoField'), function(indx, obj){
			var N = $(obj).attr('nItem');
			
			if(typeof idProds[$('#'+EDT+'idProducto-'+N).val()] === 'undefined') {
			    // does not exist
			    idProds.push($('#'+EDT+'idProducto-'+N).val());
			}
			else {
			    // does exist
			    ANIM.Alert('Producto Duplicado, Elimine Uno.');
			}
			
			
			objEP.push({idDetalleVisita:idDetalleVisita,
							idProducto:$('#'+EDT+'idProducto-'+N).val(),
							InventarioInicial: -1,
							Cantidad:$('#'+EDT+'Cantidad-'+N).val(),
							Total:$('#'+EDT+'Total-'+N).attr('ttl'),
							idPromocion: -1,
							idCredito:$('#'+EDT+'idTP-'+N).val(),
							Descuento:$('#'+EDT+'Descuento-'+N).val(),
							Activo:true});
		});
		
		i_EP_ARRAY(objEP);
    }
	
	function validateProdDup(EDT){
    	var objEP = new Array();
    	var idProds = new Array();
    	var cont = 0;
		$.each($('.'+EDT+'pruductoField'), function(indx, obj){
			var N = $(obj).attr('nItem');
			
			var bnd = false;
			$.each(idProds, function(indx2, obj2){
				if($('#'+EDT+'idProducto-'+N).val() == obj2) bnd = true;
			});
			
			if(!bnd) {
			    // does not exist
			    idProds.push($('#'+EDT+'idProducto-'+N).val());
			}
			else{
				ANIM.Alert('Tienes un Producto Duplicado, Elimina Uno.');
				console.log('NOT END');
				cont++;
				return false;
			}
			
		});
		
		console.log('END');
		return cont > 0 ? false : true;
    }
	
	
	window.i_LiquidacionALL = function (mntCont, mntDep, nRef, Suc, CargoA, mtvCar){//INSERTA Y MANDA LLAMAR LA INSERCION DE LOS PRODUCTOS DEL PEDIDO. 
    	
    	var fErr = -1;
		
		if(mtvCar == '')fErr = 5;
		if(CargoA == 0)fErr = 4;
		if(Suc == '')fErr = 3;
		if(nRef == '')fErr = 2;
		if(mntDep == '')fErr = 1;
		if(mntCont == '')fErr = 0;
		
		if(fErr == -1){
			
			var LIQ_OBJS = new Array();
			$.each($('.liqMNT'), function(indx, obj){
				
				var OBJ = {idUsuario_Resp: getUserSession().Nickname, 
						idUsuario_Op: -1, 
						Monto: $(obj).val(), 
						idRuta:IDRUTA, 
						fDestinado:FECHA, 
						idCredito:$(obj).attr('idCred'), 
						Descripcion:$(obj).attr('placeholder')};
				LIQ_OBJS.push(OBJ);
				
				i_Liquidacion(OBJ);
			});
			console.log('LIQUIDACION:');
			console.log(LIQ_OBJS);
			
			
			var DEP_OBJS = new Array();
			//idUsuario, @idCuenta, @_idSucursal, @Monto, @Latitud, @Longitud, @Dentro, @nRef, @idUsuario_Resp, @Descripcion, @fDestinado
			$.each($('.depMNT'), function(indx, obj){
				
				var nullCuenta = 0;
				var nullSucursal = '';
				var nullRef = 0;
				
				if($(obj).attr('id') == 'dep-0'){
					nullCuenta = 1;
					nullSucursal = $('#refBancoSuc').val();
				    nullRef = $('#refNoRef').val();
				}
				var OBJ = {idUsuario:-1, 
								idCuenta: nullCuenta, 
								_idSucursal: nullSucursal, 
								Monto: $(obj).val(), 
								Latitud: -2, 
								Longitud: -2, 
								Dentro: true, 
								nRef: nullRef, 
								idUsuario_Resp: getUserSession().Nickname, 
								Descripcion: $(obj).attr('placeholder'), 
								fDestinado: FECHA, 
								idRuta: IDRUTA}; 
				
				DEP_OBJS.push(OBJ);
				
				i_Deposito(OBJ);
			});
			console.log('DEPOSITOS:');
			console.log(DEP_OBJS);
			
			
			var CAR_OBJS = new Array();
			//@CargoA, @Monto, @Causa, @idUsuario_Op, @idUsuario_Resp, @fDestinado, @idRuta
			console.log('CARGO.ABONO:');
			
			var OBJ = {CargoA:$('#EMP_VEN').val(), 
							Monto:$('#carttl').attr('ttl'), 
							Causa:$('#descCargo').val(), 
							idUsuario_Op:-1, 
							idUsuario_Resp: getUserSession().Nickname, 
							fDestinado: FECHA, 
							idRuta: IDRUTA };
			CAR_OBJS.push(OBJ);
			i_CargoAbono(OBJ);
			
			console.log(CAR_OBJS);
			
			
			if(false)
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
	        	ANIM.Error('Error al Insertar LIQUIDACION.');
	        	return 1;
        	})
		  	.done(function () {
		  		ANIM.Success('fa-building', 'LIQUIDACION insertada Exitosamente!');
		  		//s_Reg();
		  		return 1;
	  		});			
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
			return 1;
		}   
		
		//console('1111');
		
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
		//------------------------------------------------------------------------------------------------------------
    	
    	
    	
		    
    };
    
    window.i_Liquidacion = function (LIQ) {
    	LIQ.Monto = LIQ.Monto == "" ? 0 : LIQ.Monto;
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_Liquidacion",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario_Resp: '"+LIQ.idUsuario_Resp+"'," +
				"idUsuario_Op: '"+LIQ.idUsuario_Op+"',"+
				"Monto: '"+LIQ.Monto+"',"+
				"idRuta: '"+LIQ.idRuta+"',"+
				"fDestinado: '"+LIQ.fDestinado+"',"+
				"idCredito: '"+LIQ.idCredito+"',"+
				"Descripcion: '"+LIQ.Descripcion+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	//ANIM.Success('fa-building', 'Liquidacion creada Exitosamente!');
            	console.log('Liquidacion creada Exitosamente!');
            },
            error: function (e) {
                ANIM.Error('Error al insertar la nueva Liquidacion.');
            }
       });        	
		      

   };
    
	window.i_Deposito = function (DEP) {
		
		/*String CompanyCode, String idUsuario, int idCuenta, String _idSucursal, float Monto, double Latitud, 
                                    double Longitud, bool Dentro, String nRef, String idUsuario_Resp, String Descripcion*/
    	
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_Deposito",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+DEP.idUsuario+"'," +
				"idCuenta: '"+DEP.idCuenta+"',"+
				"_idSucursal: '"+DEP._idSucursal+"',"+
				"Monto: '"+DEP.Monto+"',"+
				"Latitud: '"+DEP.Latitud+"',"+
				"Longitud: '"+DEP.Longitud+"',"+
				"Dentro: '"+DEP.Dentro+"',"+
				"nRef: '"+DEP.nRef+"',"+
				"idUsuario_Resp: '"+DEP.idUsuario_Resp+"',"+
				"fDestinado: '"+DEP.fDestinado+"',"+
				"idRuta: '"+DEP.idRuta+"',"+
				"Descripcion: '"+DEP.Descripcion+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	//ANIM.Success('fa-building', 'Deposito creado Exitosamente!');
            	console.log('Deposito creado Exitosamente!');
            },
            error: function (e) {
                ANIM.Error('Error al insertar el nuevo Deposito.');
            }
       });        	
		      

   };
    
    window.i_CargoAbono = function (CAR) {
    	
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_CargoAbono",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"CargoA: '"+CAR.CargoA+"'," +
				"Monto: '"+CAR.Monto+"',"+
				"Causa: '"+CAR.Causa+"',"+
				"idUsuario_Op: '"+CAR.idUsuario_Op+"',"+
				"idUsuario_Resp: '"+CAR.idUsuario_Resp+"',"+
				"fDestinado: '"+CAR.fDestinado+"',"+
				"idRuta: '"+CAR.idRuta+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	//ANIM.Success('fa-building', 'Cargo/Abono creado Exitosamente!');
            	console.log('Cargo/Abono creado Exitosamente!');
            	$('#CARGO').hide(1500);
            	ANIM.Success('fa-building', 'LIQUIDACION insertada Exitosamente!');
            	
            },
            error: function (e) {
                ANIM.Error('Error al insertar el nuevo Cargo/Abono.');
            }
       });        	
		      

   };
    
	
      	
   	window.s_Clientes_Ruta = function (idRuta) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_VisitaCliente_Ruta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var Dias = ['0', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
	        	var arr = new Array();
	        	
	        	var dta = JSON.parse(data.d);	        	
	        	$.each(dta, function (index, value) {
	    			arr.push({id: value.id, text: value.idCliente + ' | ' + value.NombreTienda + ' | ' +  value.Dia + '.' + Dias[value.Dia]});
	    		});
	    		
	    		$('#Clientes option.elmnt').remove();//ELIMINA LOS ELEMENTOS DEL SELECT2* DE LOS CLIENTES. 
	    		
	    		$('#Clientes').append(MTDS.GET_SELECT_ITEM( arr ));
	    		
	    		$('#Clientes').val(idCLT);
				//$('#Clientes').select2();		
	        	
	        	return dta;

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        
    };
       	
   	function s_Producto() {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS PRODUCTOS A UNA VARIABLE PARA SU USO DINAMICO.
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
				});
            },
            error: function (e) {
                ANIM.Error('Error al consultar los Produtos.');
            }
        });
    };
     
    function s_Credito() {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS TIPOS DE CREDITOS A UNA VARIABLE PARA SU USO DINAMICO.
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Credito",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {	        	
	        	var arr = new Array();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	    			arr.push({id: value.id, text: value.Nombre});
	    		});
	    		
	    		$('#Clientes option.elmnt').remove();
	    		CreditoOBJs = MTDS.GET_SELECT_ITEM( arr );
            },
            error: function (e) {
                ANIM.Error('Error al consultar los Creditos');
            }
        });
    };
     
    window.s_EP = function (idDetalleVisita) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_EntregaProducto_ADMN",
            data: "{'CompanyCode':'"+company+"', 'idDetalleVisita': "+ idDetalleVisita +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var arr = new Array();
	        	
	        	$('#edtDIV_Productos div').remove();
	        	edtupdateTOTAL();
	        	
	        	var dta = JSON.parse(data.d);	        	
	        	$.each(dta, function (index, value) {
	    			//arr.push({id: value.id, text: value.idCliente + ' | ' + value.NombreTienda + ' | ' +  value.Dia + '.' + Dias[value.Dia]});
	    			
	    			//$('#edttotalContainer').show();
		
					addEDT_PROD(value);
	    			
	    		});
	    		
	    		//console.log(dta);
	        	$("#btnEDT").click();//ABRE MODAL DE CONFIRMACION DE EDICION.	        	

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Productos del Pedido.');
            }
        });        
    };
    
    function addEDT_PROD(value){
    	contProd++;
		$('#edtDIV_Productos').append('<div class="edtpruductoField" id="edtGPO_P-'+contProd+'" nItem="'+contProd+'" prodPrice="">'+
										'<div class="form-group col-xs-3">'+
											'<label>Producto</label>'+
											'<select style="width:250px;" nItem="'+contProd+'" class="SelectProduct" id="edtidProducto-'+contProd+'">'+
												'<option value="0">Escoje un Producto</option>'+
												ProductOBJs +
											'</select>'+
										'</div>'+
										
										'<div class="form-group col-xs-1">'+
											'<label>Cantidad</label>'+
											'<input type="number" nItem="'+contProd+'" class="form-control" id="edtCantidad-'+contProd+'" placeholder="Cantidad" value="1">'+
										'</div>'+
										
										'<div class="form-group col-xs-3">'+
											'<label>Tipo de Entrega</label>'+
											'<select style="width:250px;" nItem="'+contProd+'" class="SelectProduct" id="edtidTP-'+contProd+'">'+
												'<option value="0">Contado</option>'+
												CreditoOBJs +
											'</select>'+
										'</div>'+
										
										'<div class="form-group col-xs-1">'+
											'<label>Descuento</label>'+
											/*'<div class="input-group">'+
												'<input style="width:50px;" type="number" nItem="'+contProd+'" class="form-control" id="Descuento-'+contProd+'" value="0">'+
												'<span class="input-group-addon">%</span>'+
											'</div>'+*/
											'<input type="number" nItem="'+contProd+'" class="form-control" id="edtDescuento-'+contProd+'" placeholder="Descuento" value="0">'+
										'</div>'+
										
										'<div class="form-group col-xs-2">'+
											'<label>Total</label>'+
											'<input class="form-control edttotal" id="edtTotal-'+contProd+'" type="text" placeholder="Disabled input here..." ttl="" disabled="" value="$0.00">'+
										'</div>'+									
										
										'<div class="form-group col-xs-1">'+
											'<label> &nbsp; </label>'+
											'<button type="button" style="margin-left: 10px;" class="form-control btn btn-danger fa fa-minus" id="edtdelProduct" onclick="$(\'#edtGPO_P-'+contProd+'\').remove();edtupdateTOTAL();"></button>'+
										'</div>'+
									'</div>');
		
									
		$('#edtidProducto-'+contProd+'').change(function(){
			console.log('PROD');
			var nItem = $(this).attr('nItem');
			var PRECIO = $( "#edtidProducto-"+nItem+" option:selected" ).attr('precio');
			//$('#edtCantidad-'+nItem).val(1);
			//$('#edtDescuento-'+nItem).val(0);
			
			$($(this).parent()).parent().attr('prodPrice', PRECIO);//SET THE PRICE OF THE SELECTED PRODUCT TO PARENT DIV 
			
			var TTL_PRD_CNT = (PRECIO * $('#edtCantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#edtDescuento-'+nItem).val()/100));
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			//console.log({Precio:PRECIO, Cant:$('#Cantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			$('#edtTotal-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#edtTotal-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			edtupdateTOTAL();
		});
		$('#edtCantidad-'+contProd).change(function(){
			console.log('CANT');
			var nItem = $(this).attr('nItem');
			
			var PRECIO = $($(this).parent()).parent().attr('prodPrice');
			var TTL_PRD_CNT = (PRECIO * $('#edtCantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#edtDescuento-'+nItem).val()/100));			
			//console.log({Precio:PRECIO, Cant:$('#Cantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			if(TTL_PRD_CNT < 1){
				$('#edtCantidad-'+nItem).val(1);
				
				PRECIO = $($(this).parent()).parent().attr('prodPrice');
				TTL_PRD_CNT = (PRECIO * $('#edtCantidad-'+nItem).val()).toFixed(2);
				DESC = (TTL_PRD_CNT* ($('#edtDescuento-'+nItem).val()/100));
				
				TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			}
			$('#edtTotal-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#edtTotal-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			edtupdateTOTAL();
		});
		$('#edtDescuento-'+contProd).change(function(){
			console.log('DESC');			
			var nItem = $(this).attr('nItem');
			
			var PRECIO = $($(this).parent()).parent().attr('prodPrice');
			var TTL_PRD_CNT = (PRECIO * $('#edtCantidad-'+nItem).val()).toFixed(2);
			var DESC = (TTL_PRD_CNT* ($('#edtDescuento-'+nItem).val()/100));			
			console.log({Precio:PRECIO, Cant:$('#edtCantidad-'+nItem).val(), ttl: TTL_PRD_CNT, desc: DESC});
			
			TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			
			if(DESC < 0){
				$('#edtDescuento-'+nItem).val(0);
				
				PRECIO = $($(this).parent()).parent().attr('prodPrice');
				TTL_PRD_CNT = (PRECIO * $('#edtCantidad-'+nItem).val()).toFixed(2);
				DESC = (TTL_PRD_CNT* ($('#edtDescuento-'+nItem).val()/100));
				
				TTL_PRD_CNT = (TTL_PRD_CNT - DESC);
			}
			$('#edtTotal-'+nItem).val('$'+MTDS.COMMA((TTL_PRD_CNT).toFixed(2)));
			$('#edtTotal-'+nItem).attr('ttl', (TTL_PRD_CNT).toFixed(2));
			
			edtupdateTOTAL();
		});
				
		if(value){
			$('#edtidProducto-'+contProd).val(value.idProducto);
			$('#edtCantidad-'+contProd).val(value.Cantidad);
			$('#edtidTP-'+contProd).val(value.idCredito);
			$('#edtDescuento-'+contProd).val(value.Descuento);
		}
		
		
														
		$('#edtidProducto-'+contProd).select2();
		$('#edtidTP-'+contProd).select2();
		
		if(value)
			$('#edtidProducto-'+contProd).change();
    }
    
    window.edtupdateTOTAL = function(){//SUMA LOS TOTALES DEL MODAL CARGA.PEDIDO Y ACTUALIZA EL TOTAL FINAL.
		var sum = 0;
		$.each($('.edttotal'), function(indx, obj){
			var text = $(obj).attr('ttl');
			//sum += parseFloat(text.substring(1, text.lenght));				
			sum += parseFloat(text);
		});			
		$('#edtTTL').val( '$' + MTDS.COMMA(sum.toFixed(2)));
	};
	
	
	
	
	window.s_Clientes_NoVenta = function (idRuta, Fecha) {//CONSULTA Y ASIGNA LOS CLIENTES NO VENTA
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_ClientesSinVentaNiVisitaDiaRuta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'Fecha': '"+Fecha+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var arr = new Array();	        	
	        	
	        	dta_CNV = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		//console.log(value);
	    			var OBJ = [value.idVisitaCliente, value.Ruta, value.NombreTienda, value.Descripcion == 'NO VISITADO' ? '<span class="label label-danger">'+value.Descripcion+'</span>' : '<span class="label label-warning">'+value.Descripcion+'</span>' ];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos_NOVENTA').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_NOVENTA').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'ID.VC': 'idVisitaCliente'}, {'Ruta': 'Ruta'},{'Nombre Tienda': 'NombreTienda'}, {'Descripcion': 'Descripcion'}   
	    				/*,{
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
							'<a id="del-'+o[0]+'" class="table-link danger del-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a></div>' ;
							 }
        				}*/
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

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    window.s_LiqVenProducto = function (idRuta, fINI, fFIN) {//CONSULTA Y ASIGNA LA LIQUDACION/VENTA DE LA RUTA POR PRODUCTO
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_LiqVenProducto",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'fINI': '"+fINI+"', 'fFIN': '"+fFIN+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        //	window.print();
	        	var arr = new Array();	        	
	        	var aa = JSON.parse(data.d);
	        	
	        	dta_PV = JSON.parse(data.d);
	        	$.each(aa, function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		//console.log(value);
	    			var OBJ = [value.Ruta, value.Nombre, value.Cantidad, value.Contado, value.Credito, value.Consignacion, value.Total];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos_LiqVenProd').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_LiqVenProd').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'Ruta': 'Ruta'},{'Nombre': 'Nombre'}, {'Cantidad': 'Cantidad'}, {'Contado': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'}   
	    				/*,{
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
							'<a id="del-'+o[0]+'" class="table-link danger del-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a></div>' ;
							 }
        				}*/
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

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    window.Morris.Donut.prototype.setData = function(data, redraw) {
	    if (redraw == null) {
	        redraw = true;
	    }
	    this.data = data;
	    this.values = (function() {
	    var _i, _len, _ref, _results;
	    _ref = this.data;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        row = _ref[_i];
	        _results.push(parseFloat(row.value));
	    }
	    return _results;
	    }).call(this);
	    this.dirty = true;
	    if (redraw) {
	        return this.redraw();
	    }
	};
    
    window.s_SumVisitasDiaRuta = function (idRuta, fINI) {//CONSULTA Y ASIGNA LA LIQUDACION/VENTA DE LA RUTA POR PRODUCTO
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_SumVisitasDiaRuta",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'Fecha': '"+fINI+"' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var arr = new Array();	        	
	        	
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		console.log(value);
	    			var OBJ = [value.ConVenta, value.SinVenta, value.NoVisitados, value.ConVenta + value.SinVenta + value.NoVisitados];
	    			arr.push(OBJ);	    			      			
	    		});
	    		
	    		console.log(arr[0][0]);
	    		$("#TTL_CLTS").html('CLientes del dia = </strong>'+arr[0][3]+'</strong>');
	    		var dta = [
						{label: 'CON VENTA', value: arr[0][0] },
						{label: 'SIN VENTA', value: arr[0][1] },
						{label: 'NO VISIT.', value: arr[0][2] }
					];
	    		DONUT.setData(dta, true);
    
	    		
	    		
	    		

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    window.s_DevProducto = function (idRuta, fINI) {//CONSULTA Y ASIGNA LA LIQUDACION/VENTA DE LA RUTA POR PRODUCTO
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Devolucion",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'fFin': '"+fINI+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        //	window.print();
	        	var arr = new Array();	        	
	        	var aa = JSON.parse(data.d);
	        	
	        	dta_PD = JSON.parse(data.d);
	        	$.each(aa, function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		console.log(value);
	    			var OBJ = [value.Ruta, value.NombreTienda.toUpperCase(), value.Producto, value.Cantidad, value.Total, value.Descripcion, MTDS.CAST_DATE(value.Entrada)];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos_DevProd').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_DevProd').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'Ruta': 'Ruta'},{'NombreTienda': 'NombreTienda'}, {'Producto': 'Producto'}, {'Cantidad': 'Cantidad'}, {'Total': 'Total'}, {'Descripcion': 'Descripcion'}, {'Entrada': 'Entrada'},   
	    				/*,{
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
							'<a id="del-'+o[0]+'" class="table-link danger del-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a></div>' ;
							 }
        				}*/
        				],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				//bindBTNROW();
				
				/*table.on('draw.dt', function () {
    				bindBTNROW();
	    		} );*/	    		

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    
    window.s_LiquidacionDiaRuta = function (fINI, fFIN) {//CONSULTA Y ASIGNA LA LIQUDACION/VENTA DE LA RUTA POR PRODUCTO
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_LiquidacionDiaRuta",
            data: "{'CompanyCode':'"+company+"', 'fINI': '"+fINI+"', 'fFIN': '"+fFIN+"' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var arr = new Array();	        	
	        	
	        	dta_LDR = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		console.log(value);
	    			var OBJ = [value.Ruta, value.Usuario, value.Contado, value.Credito, value.Consignacion, value.Total, value.Diff];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos_LiqRuta').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos_LiqRuta').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'Ruta': 'Ruta'},{'Nombre': 'Usuario'}, {'Contado': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'}, {'Diff': 'Diff'}   
	    				/*,{
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
							'<a id="del-'+o[0]+'" class="table-link danger del-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a></div>' ;
							 }
        				}*/
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

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    window.vLiq = function (idRuta, fINI) {//VALLIDA QUE NO EXISTA NINGUNA LIQUIDACION ANTERIOR.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/vLiq",
            data: "{'CompanyCode':'"+company+"', 'idRuta': "+ idRuta +", 'Fecha': '"+fINI+"' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {        	
	        	
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		console.log('value');
	        		console.log(value);
	        		
	        		if(value > 0) $('#iLIQ').hide();
	        		else {$('#iLIQ').show(); $('#CARGO').show();}
	        		
	        			    			      			
	    		});

            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });        
    };
    
    
    window.s_RegProd = function () {
		
		
						
		console.log('Consultando Productos');
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_LiquidacionDiaRuta",
            data: "{'CompanyCode':'"+company+"', 'fINI': '"+fINI+"', 'fFIN': '"+fFIN+"' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var arr = new Array();	        	
	        	
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		console.log(value);
	    			var OBJ = [value.Ruta, value.Usuario, value.Contado, value.Credito, value.Consignacion, value.Total, value.Diff];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var dta = JSON.parse(data.d);
	        	MTDS.EXPORT(objH, dta, 'Productos');
            },
            error: function (e) {
                ANIM.Error('Error al consultar los No Ventas.');
            }
        });
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	
            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    
    
    DONUT = Morris.Donut({
					element: 'hero-donut',
					/*data: [
						{label: 'Jam', value: 25, aa:12 },
						{label: 'Frosted', value: 40, aa:13 },
						{label: 'Custard', value: 25, aa:14 },
						{label: 'Sugar', value: 10, aa:15 }
					],*/
					data: [
						{label: 'CON VENTA', value: 0 },
						{label: 'SIN VENTA', value: 0 },
						{label: 'NO VISIT.', value: 0 }
					],
					colors: ['#8bc34a', '#ffc107', '#e84e40', '#03a9f4', '#9c27b0', '#90a4ae'],
					formatter: function (y) { return y; },
					resize: true
				});
    
    
    
    $('#Fecha').val(MTDS.TODAY());
    
    
    function INI_PAGE(){
	    s_Ruta();
	    s_Producto();
	    s_Credito();
    }
    
    


});