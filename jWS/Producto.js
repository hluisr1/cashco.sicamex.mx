$(document).ready(function () {


    //var domin = "http://localhost:15451";

    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	
	
	var tabla = 'Producto';
	var MsjValida = ['Escoja el CEDIS en el que se mueve el ' + tabla+'.',
						'Escoja la Marca del ' + tabla+'.',
						'Escoja el Grupo al que pertenece el ' + tabla+'.',
						'Escriba el Nombre del ' + tabla+'.',
						'Escriba el Precio del ' + tabla+'.',
						'Escriba el Codigo del '+tabla+'.',
						'Escriba el Precio del '+tabla+' correctamente.'];
	
	//nice select boxes
	$('#idCedis').select2();	
	$('#idMarca').select2();
	$('#idGrupo').select2();
	
	$('#edtidCedis').select2();	
	$('#edtidMarca').select2();
	$('#edtidGrupo').select2();
	
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS = new Array();
	var CEDIS_op;
	var contCedis=0;
	var contedtCedis=0;
	
	var dataProd;
	
	var FRM = new CRUD('6-PRODUCTO', {C: '#CRUD_C', R: '#CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);	
	var MTDS = new METODOS();
	
							
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
	

	
	function ClearFields()
    {
    	$('#Nombre').val('');
    	$('#Precio').val('');
    	$('#Codigo').val('');
    	
    	$('#idCedis').val(0);
    	$('#idMarca').val(0);
    	$('#idGrupo').val(0);
    	
    	$('.cedisField:not(#gpoCedis)').remove();	
    	
    	$('#idCedis').select2();
		$('#idMarca').select2();
		$('#idGrupo').select2();
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
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idMarca').val(), $('#idGrupo').val(), $('#Nombre').val(), $('#Precio').val(), $('#Codigo').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidMarca').val(), $('#edtidGrupo').val(), $('#edtNombre').val(), $('#edtPrecio').val(), $('#edtCodigo').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EXPORTA').on('click', function(){
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
		MTDS.EXPORT(objH, dataProd, 'Productos');
	});
    
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
                    
                    console.log(e);
                    console.log(e.responseJSON.Message);

                    if (e.responseJSON.Message == 'Ya existe un Producto con ese Codigo !!') ANIM.Error('Error, ' + e.responseJSON.Message);
                    else ANIM.Error('Error al insertar el nuevo ' + tabla);

                }
           });		
						
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
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
            		        	
	        	var dta = JSON.parse(data.d);
	        	dataProd = dta;
	        	
                //-------------------------------------------------------------------------
                
                var arr = new Array();
                
                $.each(dta, function (index, value) {
	        		//OBJETO DE DESPLIEGE DE LA TABLA.
	    			var OBJ = [value.id, value.Nombre, value.Grupo, value.Marca, value.Precio, value.Codigo, value.Cedis ];
	    			arr.push(OBJ);    			      			
	    		});    	
	    		
                
                
                var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'ID': 'id'}, {'Nombre': 'Nombre'}, {'Marca': 'Marca'}, {'Precio': 'Precio'}, {'Codigo': 'Codigo'}, {'Cedis': 'Cedis'},{'Nuevo': 'Nuevo'},   
	    				{
            				"mData": null,
            				"bSortable": false,
            				"mRender": function (o) {
            				    return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+' CRUD_E" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' +						
							'</div>' ;
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
                ANIM.Error('Error al consultar los '+tabla);
            }
        });        

    };
    function bindBTNROW(){//ELIMINA Y VUELVE A GENERAR LOS EVENTOS DE CADA ROW.
    	$.each(dataProd, function (index, value) {
    		//console.log(value);
    		if(getUserSession().idCedis == value.idCedis)// || getUserSession().idTipo == 5)
    		{
    			$('#edt-'+value.idDetalleVisita).unbind();
				$('#del-'+value.idDetalleVisita).unbind();
			
    			
    				    			
    			$('#edt-'+value.id).on('click', function(){
    				
    				/*RESET CEDIS*/
    				$('.edtcedisField:not(#edtgpoCedis)').remove();   	
					
								
    				    				
    				$('#EDITA').attr('idRegistro',value.id);
    				$('#ELIMINA').attr('idRegistro',value.id);
    				
    				
    				$('#edtNombre').val(value.Nombre);    				
			    	$('#edtPrecio').val(value.Precio);
			    	$('#edtCodigo').val(value.Codigo);
			    	
			    	
			    	
			    	contedtCedis = 0;
			    	var bndFrst = false;
			    	$.each(value.idCedis.split('|'), function(index, elmnt){
			    		
			    		if(!bndFrst)
			    		{			    			
			    			$('#edtidCedis').val(elmnt);
			    			$('#edtidCedis').select2();
			    			bndFrst = true;
			    		}
			    		
			    		else
			    		{
			    			$("#edtaddCedis").click();
				    		$('#edtidCedis-'+contedtCedis).val(elmnt);
				    		$('#edtidCedis-'+contedtCedis).select2();				    				    			
			    		}			    		
			    		
			    		
			    	});
			    	$('#edtidMarca').val(value.idMarca);
			    	$('#edtidGrupo').val(value.idGrupo);
    				
					
					
					$('#edtidMarca').select2();
					$('#edtidGrupo').select2();
					
    				
    				$("#btnEDT").click();
    				
    				
    			});
    			 
    			
    		}
    		 
		});
    			
    	
    	
    
    }
    
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
    
    function s_Grupo() {
    	
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
    
    function s_Marca() {
    	
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
    
    
    
    
    function INI_PAGE(){
    	
    	s_Reg();
    
    	s_Cedis();
    	s_Grupo();
    	s_Marca();
    	
    }
    
    
   


});