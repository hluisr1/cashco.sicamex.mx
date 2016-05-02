$(document).ready(function () {
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Entrega';
	var MsjValida = ['Escoja a el Vendedor.',
						'Escriba el Monto.',
						'Escoja un Supervisor.'];
	
	//nice select boxes
	$('#idUsuario_VEN').select2();
	$('#Clientes').select2();	
	$('#Fecha').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});
	
	var FRM = new CRUD('16-ENTREGAS', {C: '.CRUD_C', R: '.CRUD_R', U: '.CRUD_E', D: '.CRUD_D'}, INI_PAGE);
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

	var WinPrint;
	
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
		
		idRuta = idRuta > 0 ? idRuta : IDRUTA;
		Fecha = Fecha.length > 2 ? Fecha : FECHA;
		
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
           					"mRender": function (o) {return '<div style="display: inline-block; width:120px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' 
							+
							'<a id="prnt-'+o[0]+'" class="table-link primary edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-print fa-stack-1x fa-inverse"></i>'+
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
			$('#prnt-'+value.idDetalleVisita).unbind();
			
			console.log(value.Nuevo);
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
		
			$('#prnt-'+value.idDetalleVisita).on('click', function(){
				console.log(value);				    				
				    				
				/*$('#edtCANCELA').attr('idRegistro',value.idDetalleVisita);
				$('#edtGUARDA_EP').attr('idRegistro',value.idDetalleVisita);
				$('#HeadEDT').html('<h4>'+MTDS.CAST_LTR_DATE(value.Fecha) + ' | <strong> '+ value.Ruta +' </strong> </h4>' + value.idDetalleVisita + ' | <strong>' + value.NombreTienda + '</strong>');*/
				
				s_ToPrint(value.idDetalleVisita);
								
			});
		
		
		});
		
		
    }
    
    function printContent(el){
		var restorepage = document.body.innerHTML;
		//$("#divPrint").show();
		var printcontent = document.getElementById(el).innerHTML;
		document.body.innerHTML = printcontent;
		window.print();
		document.body.innerHTML = restorepage;
		//$('#BUSCAR').click();
		$('#Fecha').datepicker({
		  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
		});
		$('#Clientes').unbind();
		$('#s2id_Clientes').remove();
		$('#Clientes').select2();
		$('#idUsuario_VEN').unbind();
		$('#s2id_idUsuario_VEN').remove();
		$('#idUsuario_VEN').select2();
		
		$('#idUsuario_VEN').val(IDRUTA);
		
		
		$('tablaDatos_Ruta_wrapper .row').remove();
		
		bindBTNROW();
		
		
		$('. FixedHeader_Cloned fixedHeader FixedHeader_Header').remove();
		
	
		$("#divPrint").hide();
		
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
    
    window.s_ToPrint = function (idDetalleVisita) {//CONSULTA Y ASIGNA LOS CLIENTES DE LA RUTA SELECCIONADA.
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_EntregaProducto_ADMN",
            data: "{'CompanyCode':'"+company+"', 'idDetalleVisita': "+ idDetalleVisita +"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	var arr = new Array();
	        	
	        	var NT, SUM = 0;
				
				$("#divPrint table tr, #divPrint h2").remove();	

				$("#divPrint table").append('<tr> <th>Producto</th> <th>Cantidad</th> <th>Total</th> </tr>');	        		        	

	        	var dta = JSON.parse(data.d);	        	
	        	$.each(dta, function (index, value) {
					//addEDT_PROD(value);
					NT = value.NombreTienda;
					$("#divPrint table").append('<tr> <th>'+value.Producto+'</th> <th>'+value.Cantidad+'</th> <th>'+ MTDS.COMMA(value.Total.toFixed(2)) +'</th> </tr>');
					SUM += value.Total;
	    		});
	    		
	    		$("#divPrint table").append('<tr> <th></th> <th>Total</th> <th>'+ MTDS.COMMA(SUM.toFixed(2)) +'</th> </tr>');
	    		
	    		$("#divPrint").prepend('<h2>'+NT.toUpperCase()+' - ' + MTDS.TODAY() +' </h2>');
	    		//printContent('divPrint');
	    		var prtContent = document.getElementById("divPrint");
				WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
				//WinPrint.document.write('<style> #divPrint table th, #divPrint table  td { padding-left: 5px; padding-right: 5px; border:1px solid black;border-collapse:collapse;} </style>');
				WinPrint.document.write(prtContent.innerHTML);
				//WinPrint.document.close();
				WinPrint.focus();
				WinPrint.print();
				//WinPrint.close();	    		
	    		console.log(dta);	        		        	

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
    
    Morris.Donut.prototype.resizeHandler = function() {
        if(document.getElementById(this.el[0].id)){
            this.timeoutId = null;
            this.raphael.setSize(this.el.width(), this.el.height());
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
	    		//DONUT.setData(dta, true);
    
	    		
	    		
	    		

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
    
    
    /*DONUT = Morris.Donut({
					element: 'hero-donut',
					data: [
						{label: 'CON VENTA', value: 0 },
						{label: 'SIN VENTA', value: 0 },
						{label: 'NO VISIT.', value: 0 }
					],
					colors: ['#8bc34a', '#ffc107', '#e84e40', '#03a9f4', '#9c27b0', '#90a4ae'],
					formatter: function (y) { return y; },
					resize: false
				});*/
    
    $("#divPrint").hide();
    $('#Fecha').val(MTDS.TODAY());
    
    
    function INI_PAGE(){
    	s_Ruta();
    	s_Producto();
    	s_Credito();   
    }



});