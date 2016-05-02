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
	
	
	var IDRUTA = 0, FECHA= '1999-01-01';
	
	
	
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
		
		//CAMBIA COLOR DEPENDIENDO DEL VALOR DEL OBJETO DEL ARREGLO DE OBJETOS.
		var diffArray = [{id:'#diffttl', valor: diffttl}];						
		$.each(diffArray, function(indx, obj){
			if(parseFloat(obj.valor) < 0)$(obj.id).css({'color': '#FF0000'});
			if(parseFloat(obj.valor) > 0)$(obj.id).css({'color': '#4EE640'});
			if(parseFloat(obj.valor) == 0)$(obj.id).css({'color': '#000000'});
		});				
		
	};

	function ClearFields_AltaEP(){//RESETEA LOS CAMPOS DEL MODAL DE CARGA.PEDIDO.
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
												'<input onchange="UpdateDiff();" style="width: 78%; margin: 0; display: inline;" maxlength="45" type="number" class="form-control liqMNT" id="liq-'+liqIndx+'" placeholder="'+liqMNTO[liqIndx].concept+'">'+
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
		
		s_Venta_Ruta(IDRUTA, FECHA);	
		
	});
	
	$('#SAVE').on('click', function(){
		//
		
		
	});
	
	$('#EDITA').on('click', function(){
		//
	});
	
	$('#GUARDA_EP').on('click', function(){//TRIGGER PARA AGREGAR UN PEDIDO. 
		console.log(1);
		
		var objEP = new Array();
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
		});
		
		console.log({idVisitaCliente: $('#Clientes').val(),
					idEstatus:1,
					Fecha:null,//NOW()
					Latitud:-2,
					Longitud:-2,
					Entrada:FECHA,
					Salida:FECHA,
					Dentro:false,
					EP:objEP});
					
		i_DetalleVisita_LOCAL_ADMN({idVisitaCliente: $('#Clientes').val(),
					idEstatus:1,
					Fecha:null,//NOW()
					Latitud:-2,
					Longitud:-2,
					Entrada:FECHA,
					Salida:FECHA,
					Dentro:false,
					EP:objEP});
	});
	
	$('CANCELA').on('click', function(){//ACTIVA EL EVENTO PARA LOS TRIGGERS PARA RESETAER EL MODAS CARGA.PEDIDO.
		ClearFields_AltaEP();
		console.log(1);
	});
	
	$('.clsEP').on('click', function(){//ACTIVA EL EVENTO PARA LOS TRIGGERS PARA RESETAER EL MODAS CARGA.PEDIDO.
		ClearFields_AltaEP();
		console.log(2);
	});
	
	$('#ELIMINA_EP').on('click', function(){//BTN DEL MODAL QUE ELIMINA LOGICAMENTE LA ENTREGA.PRODUCTO DE UN DETALLE.VISITA.
		d_EntregaProducto($('#ELIMINA_EP').attr('idRegistro'));		
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
											'<label>Producto</label>'+
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
											'<label>Tipo de Entrega</label>'+
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
	
	
	
	window.s_Ruta = function () {//CONSULTA LAS TODAS RUTAS Y LAS ASIGNA A EL SELECT2*.
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		var Cliente = value.Nombre;
            		$('#idUsuario_VEN').append('<option value="'+value.id+'">'+ Cliente + '</option>');	
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
	        	$.each(dta, function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	    			var OBJ = [value.idDetalleVisita, /*MTDS.CAST_HOUR(value.Fecha),*/ value.NombreTienda, value.Contado, value.Credito, value.Consignacion, value.Total];
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
	    				columns:[{'ID.PEDIDO': 'idDetalleVisita'}, {'Nombre Tienda': 'NombreTienda'}, {'CONTADO': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'},
	    				{
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
			
			$('#del-'+value.idDetalleVisita).on('click', function(){
				console.log(value);				    				
				    				
				$('#EDITA_EP').attr('idRegistro',value.idDetalleVisita);
				$('#ELIMINA_EP').attr('idRegistro',value.idDetalleVisita);				
				
				$('#DescRecord1').html( 'ID: <strong>' + value.idDetalleVisita + '</strong>');
				$('#DescRecord2').html( 'NOMBRE.TIENDA: <strong>' + value.NombreTienda + '</strong>');
				$('#DescRecord3').html( 'MONTO: <strong>$ ' + value.Total + '</strong>');				
				
				$("#btnASK").click();//ABRE MODAL DE CONFIRMACION DE ELIMINACION.				
			});
		});
    }
    
    window.d_EntregaProducto = function (id_){//ELIMINA LOGICAMENTE LA ENTREGA.PRODUCTO DE UN DETALLE.VISITA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_EntregaProducto",
            data: "{'CompanyCode':'"+company+"',"+
            	"idUsuario: '"+getUserSession().Nickname+"', "+
            	"idDetalleVisita: "+id_.trim()+"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', 'Pedido eliminado Exitosamente!');
            	s_Venta_Ruta($('#idUsuario_VEN').val(), $('#Fecha').val());
            },
            error: function (e) {
                ANIM.Error('Error al eliminar el Pedido.');
            }
        });        
    };
    
    window.i_DetalleVisita_LOCAL_ADMN = function (OBJ_DV){//INSERTA Y MANDA LLAMAR LA INSERCION DE LOS PRODUCTOS DEL PEDIDO. 
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
            	var objEP = new Array();
				$.each($('.pruductoField'), function(indx, obj){
					var N = $(obj).attr('nItem');					
					objEP.push({idDetalleVisita:dta.id,
									idProducto:$('#idProducto-'+N).val(),
									InventarioInicial: -1,
									Cantidad:$('#Cantidad-'+N).val(),
									Total:$('#Total-'+N).attr('ttl'),
									idPromocion: -1,
									idCredito:$('#idTP-'+N).val(),
									Descuento:$('#Descuento-'+N).val(),
									Activo:true});
				});
				
				i_EP_ARRAY(objEP);
            	//s_Venta_Ruta($('#idUsuario_VEN').val(), $('#Fecha').val());
            },
            error: function (e) {
            	$('#CANCELA').click();
                ANIM.Error('Error al Agregar el Pedido(1).');
            }
        });        
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
	        	
	        	return dta;

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        
    };
       	
   	window.s_Producto = function () {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS PRODUCTOS A UNA VARIABLE PARA SU USO DINAMICO.
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
     
    window.s_Credito = function () {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS TIPOS DE CREDITOS A UNA VARIABLE PARA SU USO DINAMICO.
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
     
    
    
    
    $('#Fecha').val(MTDS.TODAY());   
    
    s_Ruta();
    s_Producto();
    s_Credito();   



});