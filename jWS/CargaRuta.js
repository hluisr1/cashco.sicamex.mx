$(document).ready(function () {
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Cargas';
	var MsjValida = ['Escoja a el Vendedor.',
						'Escriba el Monto.',
						'Escoja un Supervisor.'];
	
	//nice select boxes
	
	
	var FRM = new CRUD('21-LIQUIDACION', {C: '.CRUD_C', R: '.CRUD_R', U: '.CRUD_E', D: '.CRUD_D'}, INI_PAGE);
	var MTDS = new METODOS();
	var CON = 0, CRED = 0, CONS = 0;
	
	$('#idUsuario_VEN').select2();
	$('#idRuta_HIS').select2();
	$('#idRuta_INV').select2();
	$('#Fecha_HIS').datepicker({
	  format: 'yyyy-mm-dd'//'mm-dd-yyyy'
	});


	$('#idTipoCarga').select2();
	$('#idCargoA').select2();
	



	var objH = [{ F: 'id', H: 'null', str: false },
    			{ F: 'Codigo', H: 'null', str: true },
    			{ F: 'Nombre', H: 'Producto', str: true },
    			{ F: 'Precio', H: 'null', str: false },
    			{ F: 'Inventario', H: 'null', str: false },
    			{ F: 'Cargas_Dim', H: 'ACargar', str: false }];
	
	
	var dta_CR = new Array();
	
	
	var IDRUTA = 0, FECHA = '1999-01-01', idCLT = 0, ICR = 0;
	var SPR = '|', SPF = ',';

	
		
	
	
	$('#BUSCAR').on('click', function(){//CONSULTA MOVIMIENTOS DE LA RUTA.
		//RESET ---------------------
		$('.inptAdd').remove();
		LiqInpt = false;
		DepInpt = false;
		
		$('.inptRef').val('');
		//---------------------------
		
		IDRUTA = $('#idUsuario_VEN').val();
		FECHA = $('#Fecha').text();

		console.log('IDRUTA:' + IDRUTA);
		
		//vLiq(IDRUTA, FECHA);
		//s_Venta_Ruta(IDRUTA, FECHA);
		//s_SumVisitasDiaRuta(IDRUTA, FECHA);
		//
		//s_Clientes_NoVenta(IDRUTA, FECHA);
		//s_LiqVenProducto(IDRUTA, FECHA, FECHA);

		s_ListaProductos_Ruta(IDRUTA);
		console.log('IDRUTA2:' + IDRUTA);
		//s_LiquidacionDiaRuta(FECHA, FECHA);
		//s_DevProducto(IDRUTA, FECHA);
		
	});
	
	$('#SAVE').on('click', function(){
		//
		
		
	});
		
	$('#EXPORTA_P_VENTA').on('click', function () {
	    MTDS.EXPORT(objH, dta_CR, 'Carga' + $('#idUsuario_VEN option:selected').text()  );
	});
	
	$('#CARGAR_P_RUTA').on('click', function () {

	    i_CargaRuta();
	});

	$('#Autho').on('click', function () {

		/*console.log('Cargado Exitosamente!');
        ANIM.Success('fa-building', 'Cargado Exitosamente!');*/        

        var lista = '';
        $.each($('.PCR_CANT'), function (indx, value) {
            
            var cant = parseInt($(value).val());

            if (indx >= 1 && cant > 0) lista += SPR;

            if (cant > 0) { lista += IDRUTA + SPF + $(value).attr('idP') + SPF + parseInt($(value).val()); }
        });

        console.log(lista);
        if (lista.length > 5) { 
        	u_CargaDetalle_3_Group(lista, SPR, SPF);
        	console.log("HIiiiii.."); 
        	}
        
	    
	});

	
	$('#BUSCAR_HIS').on('click', function(){//CONSULTA MOVIMIENTOS DE LA RUTA.
		s_CargaRuta_HIS($('#idRuta_HIS').val(), $('#Fecha_HIS').val());		
	});
	
	
	$('#BUSCAR_INV').on('click', function(){//CONSULTA MOVIMIENTOS DE LA RUTA.
		sR_InventarioPorRuta($('#idRuta_INV').val());		
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
            			$('#idRuta_HIS').append('<option value="'+value.id+'">'+ Cliente + '</option>');
            			$('#idRuta_INV').append('<option value="'+value.id+'">'+ Cliente + '</option>');
            		}
            			
	    		});
            },
            error: function (e) {
                ANIM.Error('Error al consultar las Rutas');
            }
        });
    };
    	
	
	function s_CargaRutaEstatus() {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS PRODUCTOS A UNA VARIABLE PARA SU USO DINAMICO.
	    
	    $.ajax({
	        type: "POST",
	        url: domin + "/fWS.asmx/s_CargaRutaEstatus",
	        data: "{'CompanyCode':'" + company + "'}",
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (data) {

	            var table = $('#tablaDatos_Estatus').DataTable();
	            table.destroy();
	            
	            //console.log(data);


	            var arr = new Array();
	            $.each(JSON.parse(data.d), function (index, value) {
	                //OBJETO DE DESPLIEGE DE LA TABLA.
	                //console.log(value);

	                var OBJ = [value.id, value.Ruta, value.Estatus_Str, MTDS.CAST_DATE(value.fAlta), value.Usuario];

	                arr.push(OBJ);
	            });


	            var table = $('#tablaDatos_Estatus').DataTable({
	                retrieve: true,
	                searching: true,
	                destroy: true,
	                data: arr,
	                columns: [ { 'ID': 'id' }, { 'Ruta': 'Ruta' }, { 'Estatus': 'Estatus' }, { 'fAlta': 'fAlta' }, { 'Usuario': 'Usuario' } ],
	                info: true,
	                pageLength: 250,
	                //paging: false
	            });

	            new $.fn.dataTable.FixedHeader(table);

	            //bindBTNROW();

	            table.on('draw.dt', function () {
	                //bindBTNROW();
	            });

	        },
	        error: function (e) {
	            ANIM.Error('Error al consultar los Produtos001.');
	        }
	    });
	};

	

    window.i_CargaRuta = function () {
		
		/*String CompanyCode, String idUsuario, int idCuenta, String _idSucursal, float Monto, double Latitud, 
                                    double Longitud, bool Dentro, String nRef, String idUsuario_Resp, String Descripcion*/
	    console.log(IDRUTA + ' - ' + MTDS.TODAY() + ' - ' + getUserSession().Nickname);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_CargaRuta",
            data: "{'CompanyCode':'" + company + "'," +
                "idRuta: '" + IDRUTA + "'," +
                "fAlta: '" + MTDS.TODAY() + "'," +
            	"idUsuario: '" + getUserSession().Nickname + "'," +
				"Estatus: '0'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	//ANIM.Success('fa-building', 'Deposito creado Exitosamente!');
                console.log('Carga creada Exitosamente!');
                ANIM.Success('fa-building', 'Carga creada Exitosamente!');
                
                ICR = msg.d;

                var lista = '';
                $.each($('.PCR_CANT'), function (indx, value) {
                    
                    var cant = parseInt($(value).val());

                    if (indx >= 1 && cant > 0) lista += SPR;

                    if (cant > 0) { lista += ICR + SPF + $(value).attr('idP') + SPF + parseInt($(value).val()); }
                });

                console.log(lista);
                if (lista.length > 5) { i_CargaDetalle_1_Group(lista, SPR, SPF); }
                

            },
            error: function (e) {
                ANIM.Error('Error al insertar el nuevo Deposito.' + e);
            }
       });        	
		      

   };
    
    window.i_CargaDetalle_1_Group = function (L_OBJ, SPR, SPF) {

        $.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_CargaDetalle_1_Group",
            data: "{'CompanyCode':'" + company + "'," +
                "CR_P_CP: '" + L_OBJ + "'," +
                "SP_Row: '" + SPR + "'," +
            	"SP_Field: '" + SPF + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                //ANIM.Success('fa-building', 'Deposito creado Exitosamente!');
                console.log('Carga creada Exitosamente!');

                console.log(msg);
            },
            error: function (e) {
                ANIM.Error('Error al insertar el nuevo Deposito.' + e);
            }
        });


    };

    window.u_CargaDetalle_3_Group = function (L_OBJ, SPR, SPF) {

        $.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/u_CargaDetalle_3_Group",
            data: "{'CompanyCode':'" + company + "'," +
                "CR_P_CP: '" + L_OBJ + "'," +
                "SP_Row: '" + SPR + "'," +
            	"SP_Field: '" + SPF + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                ANIM.Success('fa-building', 'Cargado Exitosamente!');
                console.log('Cargado Exitosamente!');

                console.log(msg);
            },
            error: function (e) {
                ANIM.Error('Error al insertar el nuevo Deposito.' + e);
            }
        });


    };

	
      	
   	   	
   	function s_ListaProductos_Ruta(idRuta) {//CONSULTA Y ASIGNA EN FORMA DE ITM LOS PRODUCTOS A UNA VARIABLE PARA SU USO DINAMICO.
   	    console.log('IDRUTA:---');
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/R_InventarioPorRuta",
            data: "{'CompanyCode':'" + company + "', 'idRuta': " + idRuta + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                /*var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		var text = value.Nombre;
	        		
	        		var itemOBJ = '<option precio="'+value.Precio+'" value="'+value.id+'">'+ text +'</option>';
	        		ProductOBJs += itemOBJ;
				});*/

                var bndNotifdone = false;
                var bndNotif = false;

                var table = $('#tablaDatos_LiqVenProd').DataTable();
                table.destroy();
                $('#tHeader tr').remove();


                $('#tblCarga th').remove();
                $('#tblCarga').append('<th>id</th>' + '<th>Codigo</th>' + '<th>Producto</th>' + '<th>Precio</th>' + '<th>Piezas</th>' + '<th>Prop.</th>');

                var arr = new Array();
                dta_CR = new Array();
                $.each(data.d, function (index, value) {
                    //OBJETO DE DESPLIEGE DE LA TABLA.
                    //console.log(value);
                    var cargas_dim = value.Ventas == -11 ? value.Cargas : 0
                    value.Cargas_Dim = cargas_dim
                    dta_CR.push(value);

                    var OBJ = [value.id, value.Codigo, value.Nombre, value.Precio, value.Inventario, value.Cargas_Dim, value.CargasReq == -1 ? '-' : value.CargasReq/*, 0*/];

                    if (value.Ventas == -11) { bndNotif = true; }
                    else {
                        $('#CARGAR_P_RUTA').show();
                        $('#Autho').hide();
                    }

                    if (bndNotif && !bndNotifdone) {
                        ANIM.Alert('Esta Ruta tiene una Carga Pendiente por Autorizar, Espere a que se Autorize.');
                        bndNotifdone = true;

                        $('#tblCarga th').remove();
                        $('#tblCarga').append('<th>id</th>' +  '<th>Codigo</th>' + '<th>Producto</th>' + '<th>Precio</th>' + '<th>Piezas</th>' + '<th>Prop.</th>'+ '<th class="fRem">Req.</th>'+ '<th>Final</th>');
                        $('#CARGAR_P_RUTA').hide();
                        $('#Autho').show();
                    }
                    arr.push(OBJ);
                });

                

                


                var COL_PROP = [{ 'ID': 'id' }, { 'Codigo': 'Codigo' }, { 'Producto': 'Nombre' }, { 'Precio': 'Precio' }, { 'Piezas': 'Piezas' }//, { 'Total': 'Total' }                    
                    , {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<div>' +
                                '<input maxlength="8" type="number" class="form-control PCR_CANT" style="width:85px;" idP="' + o[0] + '" id="carga-inpt-' + o[0] + '" value="' + o[5] + '">' +
                                '</div>';
                        }
                    }];

                var COL_REQ = [{ 'ID': 'id' }, { 'Codigo': 'Codigo' }, { 'Producto': 'Nombre' }, { 'Precio': 'Precio' }, { 'Piezas': 'Piezas' }//, { 'Total': 'Total' }
                    , { 'PROP.': 'PROP.' }
                    , { 'Req.': 0 }
                    , {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<div>' +
                                '<input maxlength="8" type="number" class="form-control PCR_CANT" style="width:85px;" idP="' + o[0] + '" id="carga-inpt-' + o[0] + '" value="' + o[5] + '">' +
                                '</div>';
                        }
                    }];

                console.log(bndNotifdone == true ? COL_REQ : COL_PROP);

                var table = $('#tablaDatos_LiqVenProd').DataTable({
                    retrieve: true,
                    searching: true,
                    destroy: true,
                    data: arr,
                    columns: bndNotifdone == true ? COL_REQ : COL_PROP,
                    info: true,
                    pageLength: 250,
                    //paging: false
                });

                new $.fn.dataTable.FixedHeader(table);

                //bindBTNROW();

                table.on('draw.dt', function () {
                    //bindBTNROW();
                });

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Produtos1.');
            }
        });
    };
  
    function s_CargaRuta_HIS(idRuta, Fecha) {//
   	    
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_CargaRuta_HIS",
            data: "{'CompanyCode':'" + company + "', 'idRuta': " + idRuta + ", 'Fecha': '" + Fecha + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var table = $('#tablaDatos_HIS').DataTable();
                table.destroy();
                /*$('#tHeader tr').remove();


                $('#tblCarga th').remove();
                $('#tblCarga').append('<th>id</th>' + '<th>Codigo</th>' + '<th>Producto</th>' + '<th>Precio</th>' + '<th>Piezas</th>' + '<th>Prop.</th>');
*/
                var arr = new Array();
                dta_CR = new Array();
                $.each(JSON.parse(data.d), function (index, value) {
                    //OBJETO DE DESPLIEGE DE LA TABLA.
                   

                    var OBJ = [value.id, value.Estatus_Str, value.Nombre, value.Cantidad_Requerida, value.Cantidad_Final, 
                    value.Cantidad_Final - value.Cantidad_Requerida];
                    
                    arr.push(OBJ);
                });

                          


                var COL_PROP = [{ 'ID': 'id' }, { 'Estatus': 'Estatus' }, { 'Producto': 'Nombre' }, { 'Pedido': 'Pedido' }, { 'Cargado': 'Cargado' }, { 'Diff': 'Diff' }//, { 'Total': 'Total' }                    
                    /*, {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<div>' +
                                '<input maxlength="8" type="number" class="form-control PCR_CANT" style="width:85px;" idP="' + o[0] + '" id="carga-inpt-' + o[0] + '" value="' + o[5] + '">' +
                                '</div>';
                        }
                    }*/];



                var table = $('#tablaDatos_HIS').DataTable({
                    retrieve: true,
                    searching: true,
                    destroy: true,
                    data: arr,
                    columns: COL_PROP,
                    info: true,
                    pageLength: 250,
                    //paging: false
                });

                new $.fn.dataTable.FixedHeader(table);

                //bindBTNROW();

                table.on('draw.dt', function () {
                    //bindBTNROW();
                });

            },
            error: function (e) {
            	console.log(e);
                ANIM.Error('Error al consultar los Produtos1.');
            }
        });
    };
  
  
  	function sR_InventarioPorRuta(idRuta) {//
   	    
  		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sR_InventarioPorRuta",
            data: "{'CompanyCode':'" + company + "', 'idRuta': " + idRuta + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var table = $('#tablaDatos_INV').DataTable();
                table.destroy();
                

                var arr = new Array();
                dta_CR = new Array();
                $.each(JSON.parse(data.d), function (index, value) {
                    //OBJETO DE DESPLIEGE DE LA TABLA.                   

                    var OBJ = [value.id, value.Codigo, value.Nombre, value.Precio, value.Inventario];
                    
                    arr.push(OBJ);
                });

                          


                var COL_PROP = [{ 'ID': 'id' }, { 'Codigo': 'Codigo' }, { 'Producto': 'Nombre' }, { 'Precio': 'Precio' }, { 'Piezas': 'Inventario' } //, { 'Total': 'Total' }                    
                    /*, {
                        "mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<div>' +
                                '<input maxlength="8" type="number" class="form-control PCR_CANT" style="width:85px;" idP="' + o[0] + '" id="carga-inpt-' + o[0] + '" value="' + o[5] + '">' +
                                '</div>';
                        }
                    }*/];



                var table = $('#tablaDatos_INV').DataTable({
                    retrieve: true,
                    searching: true,
                    destroy: true,
                    data: arr,
                    columns: COL_PROP,
                    info: true,
                    pageLength: 250,
                    //paging: false
                });

                new $.fn.dataTable.FixedHeader(table);

                //bindBTNROW();

                table.on('draw.dt', function () {
                    //bindBTNROW();
                });

            },
            error: function (e) {
            	console.log(e);
                ANIM.Error('Error al consultar los Produtos2.');
            }
        });
    };
  
    

    
    
    $('#Fecha').text(MTDS.TODAY());
    
    
    function INI_PAGE(){
        s_Ruta();

        s_CargaRutaEstatus();
	    //s_Producto();
    }
    
    


});