$(document).ready(function () {

    //var domin = "http://localhost:15451";
    //var company = "SCMEX765FG2R";
    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
   
	
	var tabla = 'Lista';
	var MsjValida = ['Escoja el CEDIS en el que se mueve el ' + tabla+'.',
						'Escoja la Marca del ' + tabla+'.',
						'Escoja el Grupo al que pertenece el ' + tabla+'.',
						'Escriba el Nombre del ' + tabla+'.',
						'Escriba el Precio del ' + tabla+'.',
						'Escriba el Codigo del '+tabla+'.',
						'Escriba el Precio del '+tabla+' correctamente.'];
						
	var MsjValida_L = ['Escriba el Nombre de la ' + tabla+'.'];
	
	var MsjValida_LP = ['Selecciona la ' + tabla+'.', 
						'Tiene que haber por lo menos 1 Producto en la ' + tabla+'.'];
	
	var MsjValida_LR = ['Selecciona la ' + tabla+'.', 
						'Selecciona la Ruta.'];
	
	
	var alertCambioLP = true;
	
	//nice select boxes	
	$('#idLista').select2();
	
	$('#idListaR').select2();
	$('#edtidListaR').select2();
	
	$('#idRuta').select2();
	$('#edtidRuta').select2();
	
	
	//run noUiSlider with basic slider
	var SliderDesc = $('.slider-basic').noUiSlider({
		range: [0,100],
		start: [0],
		handles: 1,
		connect: 'lower',
		step:5,
		direction: 'rtl',		
	});
	
	$('.slider-basic').on('change', function(){
		//$('.slider-basic').val(parseFloat($('.slider-basic').val())+ 10);	
		var descuento = parseFloat($('.slider-basic').val()).toFixed(0);	
		$('#field').text(descuento);
		
		$.each($('.aPL'), function(indx, val){

			var PrecioB = parseFloat( $(this).attr('PrecioBase') );
			var nDESC =  (PrecioB * (descuento/100)).toFixed(2);
			
			/*console.log('DE: '+descuento);
			console.log('NP: '+nDESC);
			console.log('PB: '+PrecioB);*/
			
			$(val).text('$ ' + (PrecioB - nDESC).toFixed(2));
			$(val).attr('PL', (PrecioB - nDESC).toFixed(2));
									
		});
		
		$.each($('.aPLD'), function(indx, val){
			$(val).text(descuento + '%');
		});
		
	});
	
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var dataProd;
	var ImportedDataProd;
	
	var FRM = new CRUD('6-PRODUCTO', {C: '#CRUD_C', R: '#CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);	
	var MTDS = new METODOS();
	
	
	
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
	                console.log(csvData);
	                data = $.csv.toArrays(csvData);
	                if (data && data.length > 0) {
	                	//console.log(data[0]);
	                	
	                	//REINICIA EL DESC
	                	$('.slider-basic').val(0);
	                	$('#field').text(0);
	                	
	                	ANIM.Success('fa-building', 'Se encontraron ' + data.length + ' registros.');
	                  	var arrImported = new Array();
	                  	//console.log(data);
	                	
			        	$.each(data, function (i, value) {
			    			data[i] = data[i] + '\n';
			    			//console.log(value);
			    			
			    			if(i > 0) arrImported.push({id: value[0], Nombre: value[1], Grupo:value[2], Marca: value[3], Precio: value[4], PrecioLista:value[5], Codigo:value[6], Cedis:value[7]});	    			
			    				
			    		});
			    		//console.log(arrImported);
			    		ImportedDataProd = arrImported;			    		
		    		
		    			$.each($('#TuLista li'), function(indx, val){
			    			$('#elmntright-'+ $(val).attr('idProducto')).show();
							$(val).remove();
							
							refreshProductListCount();
						});
						$.each(ImportedDataProd, function (indx, value) {
			        		//console.log(value);		        			
			    			$('#TuLista').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio, value.Codigo, true, value.PrecioLista)).fadeIn(0));	    			
			    			$('#elmntright-'+ value.id).hide();
			    			
			    			
			    			$('#rettach-'+value.id).on('click', function(){
		    					$('#elmntright-'+ value.id).show();
		    					$('#elmntleft-'+ value.id).remove();
		    					
		    					refreshProductListCount();		    				
		    				});			        					        		 
			    		});
			    		
			    		refreshProductListCount();	    		   	
	    		   	}		    			                                 
                 	else {
                    	alert('No se encontro ningun registro!');
                	}
             	}
             	catch(ex){
             		ANIM.Error('Error Cargar los Recoridos.' + ex);
             	}
            };
            reader.onerror = function() {
            	console.log(':/ .CSV');
                alert('Unable to read ' + file.fileName);
            };
        }
    }
    
	
	
	
	
							
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
	
	function getRowFragment(idRuta, idLista, Ruta, Lista, Supervisor, Fecha)
	{
		
		var frag = '<tr>'+
						'<td>'+idRuta+'</td>'+
						'<td>'+idLista+'</td>'+
						'<td>'+Ruta+'</td>'+
						'<td>'+Lista+'</td>'+
						'<td>'+Supervisor+'</td>'+
						'<td>'+MTDS.CAST_DATE(Fecha)+'</td>'+
						'<td >'+							
							'<a id="edt-'+idRuta+'" class="table-link edt-'+idRuta+'">'+
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
	
	
	function getRowFragment_ListaItem(id, Nombre, Marca, Cedis, Grupo, Precio, Code, left, PrecioLista)
	{
		var arrow = left == false ? 'right' : 'left';
		var keyword = left == false ? 'send' : 'rettach';
		
		var actionBTN = left == false ?
					'<div class="actions">'+	
							'<span class="label label-success">$ '+Precio+'</span> '+																
							'<a id="'+keyword+'-'+id+'" class="table-link danger send-'+id+'">'+
								'<i class="fa fa-arrow-'+arrow+'"></i>'+
							'</a>'+
						'</div>'		
					 :  '<div class="actions">'+	
							'<span class="label label-success">$ '+parseFloat(Precio).toFixed(2)+'</span> '+
							'<span class="label label-default aPL" id="PL'+id+'" PrecioBase="'+Precio+'" PL="'+PrecioLista+'">$ '+parseFloat(PrecioLista).toFixed(2)+'</span> '+
							'<span class="label label-primary aPLD" id="PLD'+id+'">'+( 100 - ((parseFloat(PrecioLista).toFixed(2)/parseFloat(Precio).toFixed(2))*100) ).toFixed(0)+'%</span> '+																	
							'<a id="'+keyword+'-'+id+'" class="table-link danger send-'+id+'">'+
								'<i class="fa fa-arrow-'+arrow+'"></i>'+
							'</a>'+
						'</div>';
		
		var frag = '<li id="elmnt'+arrow + '-' + id +'" class="clearfix" idProducto="'+id+'">'+
						'<div class="name">'+
							'<div>'+
								'<label>'+
									'<span class="label label-default">'+id+'</span> '+ Nombre +
								'</label>'+
							'</div>'+
						'</div>'+
						actionBTN +
					'</li>';
		
			
		//$(frag).css('display', 'none');
			
		return frag;
	}
	

	function ClearField()
    {
    	$('#Nombre').val('');
    }
	
	
	function ClearFields()
    {
    	$('#idListaR').val(0);
    	$('#idRuta').val(0);    
    	
    	$('#idListaR').select2();
		$('#idRuta').select2();
    }
	
	
	function refreshProductListCount(){
		
		//alert('aaa');
		
		$('#TTL_P').text('('+ $('#Productos li:visible').length +')');
    	$('#TTL_LP').text('('+ $('#TuLista li').length +')');
	}
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#addCedis').on('click', function(){
		
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
		contCedis++;
		$('#gpoCedis').after('<div class="form-group form-group-select2 cedisField" id="cedisField-'+contCedis+'"><select style="width:300px" id="idCedis-'+contCedis+'"><option value="0">Escoje un CEDIS</option>'+
		
		CEDIS_op
		
		+'</select><button type="button" style="margin-left: 10px;" class="btn btn-danger fa fa-minus" id="delCedis" onclick="$(\'#cedisField-'+contCedis+'\').remove();"></button></div>');
		
		$('#idCedis-'+contCedis).select2();
	});
	
	$('#edtaddCedis').on('click', function(){
		
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
		contedtCedis++;
		$('#edtgpoCedis').after('<div class="form-group form-group-select2 edtcedisField" id="edtcedisField-'+contedtCedis+'"><select style="width:300px" id="edtidCedis-'+contedtCedis+'"><option value="0">Escoje un CEDIS</option>'+
		
		CEDIS_op
		
		+'</select><button type="button" style="margin-left: 10px;" class="btn btn-danger fa fa-minus" id="delCedis" onclick="$(\'#edtcedisField-'+contedtCedis+'\').remove();"></button></div>');
		
		$('#edtidCedis-'+contedtCedis).select2();
	});
	
	
		
	$('#SAVE_L').on('click', function(){
		i_Reg_L($('#Nombre').val());
	});
	
	$('#SAVE_LP').on('click', function(){
				
		var idProductosCSV = '';		
		$.each($('#TuLista li'), function(indx, val){
			var SP = indx > 0 ? ',' : '';
			idProductosCSV += SP + $(val).attr('idProducto') + '|' + $('#PL' + $(val).attr('idProducto')).attr('pl');
		});
		
		//console.log(idProductosCSV);
		
		i_Reg_LP($('#idLista').val(), idProductosCSV);
		
	});
	
	$('#SAVE_LR').on('click', function(){
		i_Reg_LR($('#idListaR').val(), $('#idRuta').val());
	});
	
	
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidMarca').val(), $('#edtidGrupo').val(), $('#edtNombre').val(), $('#edtPrecio').val(), $('#edtCodigo').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EXPORTA_LP').on('click', function(){
		var ListaP = new Array();
		$.each($('#TuLista li'), function(indx, val){
			
			//console.log($(val).attr('idproducto'));
			var idP = $(val).attr('idproducto');
			//console.log(dataProd);
			var result = $.grep(dataProd, function(e){ return e.id == idP; });
			if (result.length == 0) {
			  console.log('pff no se encontro :(');
			} else if (result.length == 1) {
			  //console.log('Encontrado');
			  /* COMO SE LOS PRODUCTOS SE TOMAN DE S_PRODUCTOS Y ESTOS NO TIENEN EL CAMPO DE PRECIO.LISTA PARA PODER MODIFICAR ESO,
			  	POR ESO SE TOMA EL CAMPO MENOS INDISPENSABLE (CEDIS) */
			  /*console.log( result[0] );
			  console.log( result[0].id );
			  console.log($('#PL'+result[0].id).attr('pl'));*/
			  result[0].PrecioLista = $('#PL'+result[0].id).attr('pl');
			  
			  ListaP.push(result[0]);
			} else {
			  console.log('Mas de 1 Registro :/');
			}
		});
		
		
		
		
		var objH = [{F:'id',H:'id', str:false}, 
    			{F:'Nombre', H:'Nombre', str:true}, 
    			{F:'Grupo', H:'Grupo', str:true}, 
    			{F:'Marca', H:'Marca', str:true}, 
    			{F:'Precio', H:'Precio', str:false},
    			{F:'PrecioLista', H:'PrecioDeLista', str:false}, 
    			{F:'Codigo', H:'Codigo', str:true}];
		MTDS.EXPORT(objH, ListaP, 'ListaProductos');
	});
    
    
    $('#CONSULTA_LP').on('click', function(){
    	//console.log($('#TuLista li').length);
    	//console.log('ID.LISTA: ' + $('#idLista').val());
    	
    	if($('#idLista').val() == 0){//VALIDA QUE ESCOJA UNA LISTA ANTES DE CONSULTAR.
    		ANIM.Error('Seleccione una Lista.');
    		return;    		
    	}
    	
    	if($('#TuLista li').length > 0 && alertCambioLP == true){//VALIDA QUE EL USUARIO SE ENTERE DE QUE SE PERDERAN LOS CAMBIO DE LA LISTA QUE HA HECHO.
    		ANIM.Error('Sí continua con esta Acción se perderá los cambios hechos en la Lista, Presione Nuevamente el Boton [CONSULTAR] para Continuar');
    		alertCambioLP = false;
    	}
    	else{
    		ANIM.Success('fa-building', 'Se ha Consultado correctamente la Lista.');
    		alertCambioLP = true;    		
    		
    		$.each($('#TuLista li'), function(indx, val){
    			$('#elmntright-'+ $(val).attr('idProducto')).show();
				$(val).remove();
				
				refreshProductListCount();
			});
			
			s_ProductosLista($('#idLista').val());
    	}
    	
    	
    	refreshProductListCount();
    	
    	
    });
    
    
	window.i_Reg_L = function (nombre) {
		
		var fErr = -1;		
		
		if(nombre.trim() == '')fErr = 0;
				
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Lista",
                data: "{'CompanyCode':'"+company+"',"+
					"Nombre: '"+nombre.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + nombre +' creada Exitosamente!');
		  			ClearField();	
		  			
		  			s_Lista();  			

                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nueva '+ tabla);
                }
           });		
						
		}
		else{
			ANIM.Alert( MsjValida_L[fErr] );
		}        

   };
    
    window.i_Reg_LP = function (idLista, idProductosCSV) {
		
		var fErr = -1;
		
		if(idProductosCSV == '')fErr = 1;
		if(idLista == 0)fErr = 0;
		
				
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_ListaProductos",
                data: "{'CompanyCode':'"+company+"',"+
					"idLista: '"+idLista+"'," + 
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"idProductos: '"+idProductosCSV.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' Guardada Exitosamente!');
		  			//ClearFields();	  			

                },
                error: function (e) {
                    ANIM.Error('Error al Guardar la '+ tabla);
                }
           });		
						
		}
		else{
			ANIM.Alert( MsjValida_LP[fErr] );
		}        

   };
    
  	window.i_Reg_LR = function (idLista, idRuta) {
		
		var fErr = -1;
		
		if(idRuta == '')fErr = 1;
		if(idLista == 0)fErr = 0;
		
				
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_ListaRuta",
                data: "{'CompanyCode':'"+company+"',"+
					"'idLista': "+idLista+"," + 
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"'idRuta': "+idRuta +"}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Asignación Guardada Exitosamente!');
		  			ClearFields();
		  			
		  			s_Reg_LR();
		  			//------------------------------------------------------------------

                },
                error: function (e) {
                    ANIM.Error('Error al Guardar la Asignación');
                }
           });		
						
		}
		else{
			ANIM.Alert( MsjValida_LR[fErr] );
		}        

   };
      
    
    function  s_Reg() {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Producto",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	//$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	dataProd = dta;
	        	$.each(dta, function (index, value) {
	        		//console.log(value);
	        		if(getUserSession().idCedis == value.idCedis)// || getUserSession().idTipo == 5)
	        		{
	        			//$('#REG').append($(getRegFragment(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo)).fadeIn(0));
		    			$('#Productos').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo, false, value.Precio.toFixed(2))).fadeIn(0));
		    				    			
		    			$('#send-'+value.id).on('click', function(){
		    				
		    				$('#TuLista').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo, true, (value.Precio - (value.Precio*($('.slider-basic').val()/100))).toFixed(2))).fadeIn(0));
		    				
		    				$('#rettach-'+value.id).on('click', function(){
		    					//$('#Productos').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo, false)).fadeIn(0));
		    					$('#elmntright-'+ value.id).show();
		    					$('#elmntleft-'+ value.id).remove();
		    					
		    					refreshProductListCount();		    				
		    				});
		    				
		    				$('#elmntright-'+ value.id).hide();
		    				
		    				refreshProductListCount();
		    						    				
		    			});
		    			 
	        		}
	        		 
	    		});
	    			    		
	    		var tableFixed = $('#tablaDatos').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( tableFixed );
                
                refreshProductListCount();

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    function  s_ProductosLista(idLista) {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_ProductosLista",
            data: "{'CompanyCode':'"+company+"','idLista': "+idLista+"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	//$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	//REINICIA EL DESC
            	$('.slider-basic').val(0);
            	$('#field').text(0);
	        	
	        	
	        	var dta = JSON.parse(data.d);
	        	//dataProd = dta;
	        	$.each(dta, function (index, value) {
	        	    //console.log(value);
	        	    
	        		
        			//$('#REG').append($(getRegFragment(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo)).fadeIn(0));
	    			$('#TuLista').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo, true, value.PrecioModif.toFixed(2))).fadeIn(0));	    			
	    			$('#elmntright-'+ value.id).hide();
	    			
	    			
	    			
	    			$('#rettach-' + value.id).on('click', function () {
	    			    //console.log('aaa');
    					//$('#Productos').append($(getRowFragment_ListaItem(value.id, value.Nombre, value.Marca, value.Cedis, value.Grupo, value.Precio.toFixed(2), value.Codigo, false)).fadeIn(0));
    					$('#elmntright-'+ value.id).show();
    					$('#elmntleft-'+ value.id).remove();
    					
    					refreshProductListCount();
    				});
	        		
	        		 
	    		});
	    		
	    			    		
	    		var tableFixed = $('#tablaDatos').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( tableFixed );
                
                refreshProductListCount();

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    
    function  s_Reg_LR() {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_ListaRuta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	            	
                //-------------------------------------------------------------------------
                
                
                var arr = new Array();	        	
	        	
	        	//dta_LDR = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	        		//console.log(value);
	        		
	        		//value.idRuta, value.idLista, 
	    			var OBJ = [value.idRuta, value.Ruta, value.idLista, value.Lista, value.idSupervisor, MTDS.CAST_DATE(value.fAlta)];
	    			arr.push(OBJ);	    			      			
	    		});	    			
	    		
	    		
	    		var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,//{'idRuta': 'idRuta'},{'idLista': 'idLista'}, 
	    				columns:[{'idRuta': 'idRuta'}, {'Ruta': 'Ruta'}, {'idLista': 'idLista'}, {'Lista': 'Lista'}, {'Supervisor': 'idSupervisor'}, {'Fecha': 'fAlta'} ],
					info: true,
					pageLength: 25,
					//paging: false
				});
				new $.fn.dataTable.FixedHeader( table );
				
				
				
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

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
    
    
    
    function s_Cedis() {
    	
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
    
    function s_Lista() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Lista",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#idLista option').remove();
            	$('#idListaR option').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		
	        		$('#idLista').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				
    				
    				$('#idListaR').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				//$('#edtidListaR').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
				});	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar los Grupos.');
            }
        });
		
    };
    
    function s_Ruta() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Ruta",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {
	        		$('#idRuta').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidRuta').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
				});	    		
	    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar las Marcas.');
            }
        });
        
    };
    
    
    function INI_PAGE(){
    	
    	s_Reg();
    	s_Reg_LR();
    	
    
    	//s_Cedis();
    	s_Lista();
    	s_Ruta();
    	
    	
    }
    
});