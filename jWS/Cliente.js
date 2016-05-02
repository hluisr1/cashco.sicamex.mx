$(document).ready(function () {


    //var domin = "http://localhost:15451";

    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */
	
	var bttn = document.getElementById( 'SAVE' );
	
	var tabla = 'Cliente';
	var MsjValida = ['Escriba el Nombre del ' + tabla,
						'Escriba el Apellido Paterno del ' + tabla,
						'Escriba el Apellido Materno del ' + tabla,
						'Escriba el Celular del ' + tabla,
						'Escoja el CEDIS al que pertenece el '+tabla+'.',
						'Escriba el Nommbre de la Tienda del '+tabla,
						'Escriba el Correo del '+tabla];
	
	
	var FRM = new CRUD('8-CLIENTE', {C: '.CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	var MTDS = new METODOS();
	
	var BLOQUES;
	var contBLOQ = 0;
	
	//nice select boxes
	$('#idCedis').select2();
	$('#idTipoUsuario').select2();
	
	
	//$('#edtidCedis').select2();
	//$('#edtidTipoUsuario').select2();
	
	var CEDIS;
	var TIPOS;
	
	
	
	var msv_Alta_data;
	var msv_Alta = [{field:'idCedis', mandatory: true, def:''},
					{field:'NombreTienda', mandatory: true, def:''},
					{field:'Nombre', mandatory: true, def:'-'},
					{field:'ApeP', mandatory: false, def:'-'},
					{field:'ApeM', mandatory: false, def:'-'},
					{field:'Cel', mandatory: false, def:'-'},
					{field:'Correo', mandatory: false, def:'-'},
					
					{field:'Calle', mandatory: true, def:''},
					{field:'NumeroExt', mandatory: true, def:''},
					{field:'NumeroInt', mandatory: false, def:'-'},
					{field:'CP', mandatory: false, def:'-'},
					{field:'Colonia', mandatory: true, def:''},
					
					{field:'idMunicipio', mandatory: true, def:''},
					{field:'Latitud', mandatory: true, def:''},
					{field:'Longitud', mandatory: true, def:''},
					{field:'idRuta', mandatory: true, def:''},					
					{field:'idUsuario', mandatory: true, def:''},
					
					{field:'fApartir', mandatory: true, def:'1999-01-01'},
					{field:'Dia', mandatory: true, def:''},
					{field:'idFrec', mandatory: true, def:''},
					{field:'Secuncia', mandatory: true, def:''}
					];
	
	
	var dataR_ListadoDeClientesPorRuta = null;
	var bndExp_L = false;
	
	
	
	var dta_CLTS;
	
	
	
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
                var csvData = event.target.result;
                console.log(csvData);
                data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {
                	console.log(data[0]);
                	console.log(data[1]);
                  alert('Imported -' + data.length + '- rows successfully!');
                  
                $('#tablaDatosMSV tbody tr').remove();
	        	$.each(data, function (i, value) {
	    			data[i] = data[i] + '\n';
	    			$.each(value, function(j, val){
	    				//console.log(val);
	    				if(val.trim() == ''){
	    					data[i][j] = msv_Alta[j].def;
	    					console.log(value[j] + '...');
	    					value[j] = msv_Alta[j].def;
	    					//value[j] = 'msv_Alta[j].def';
	    					console.log(value[j] + '...2');	
	    				}
	    				
	    			});
	    			
	    			if(i > 0)
	    			$('#tablaDatosMSV tbody').append($(getRowFragmentMSV(value)).fadeIn(0));	    			
	    				
	    		});
	    		
	    		msv_Alta_data = data;
    		   		
	    			    		
	    		var tableFixed = $('#tablaDatosMSV').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 10,
					//paging: false
				});
			
			$("#btnMASIVO").click();
				//new $.fn.dataTable.FixedHeader( tableFixed );
                
                  
                  
                } else {
                    alert('No data to import!');
                }
            };
            reader.onerror = function() {
            	console.log(':/ .CSV');
                alert('Unable to read ' + file.fileName);
            };
        }
    }
    
    function getRowFragmentMSV(obj)
	{
		var frag;
		
		$.each(obj, function(indx, val){
			frag += '<td>'+val+'</td>';
		});
				
		frag = '<tr>'+ frag + '</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	
		
	


	
							
	function getRegFragment(id, Nombre, ApePat, ApeMat, Cel, Cedis)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix edt-'+id+'">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								ApePat + ' ' + ApeMat +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-building"></i> '+ Cedis +
								'</li>'+								
								'<li>'+
									'<i class="fa fa-phone"></i> '+ Cel +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}


	

	function getRowFragment(id, Nombre, ApePat, ApeMat, Cel, Cedis, Alta)
	{
		if(Cel == '')Cel = '-';
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+ApePat+'</td>'+
						'<td>'+ApeMat+'</td>'+
						'<td>'+Nombre+'</td>'+
						'<td>'+Cel+'</td>'+
						'<td>'+Cedis+'</td>'+
						'<td>'+MTDS.CAST_DATE(Alta)+'</td>'+
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
    	$('#ApellidoP').val('');
    	$('#ApellidoM').val('');
    	$('#Celular').val('');
    	
    	$('#idCedis').val(0);
    	$('#idCedis').select2();	
    }
	
	
	$("input, textarea" ).keyup(function() {
  		//$(this).val($(this).val().toUpperCase());
	});
	
	$("#BUSCA" ).keyup(function(e) {
		if (e.keyCode === 13) {
		    e.preventDefault();
		    // do something
		    //alert('BUSCAND0');
		    sb_Reg($('#BUSCA').val());
		  }
  		//$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idCedis').val(), $('#Nombre').val(), $('#ApellidoP').val(), $('#ApellidoM').val(), $('#Celular').val(), $('#Correo').val(), $('#NombreTienda').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidCedis').val(), $('#edtNombre').val(), $('#edtApellidoP').val(), $('#edtApellidoM').val(), $('#edtCelular').val(), $('#edtCorreo').val(), $('#edtNombreTienda').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#PROCESA_ALTA').on('click', function(){
		
		//RunFile();
		var fakeRow = ["idCedis", "NombreT", "Nombre", "ApeP", "ApeM", "Cel", "Correo", "Calle", "NumExt", "NumInt", "CP", "Colonia", "idMun", "Lat ", "Lon", "idRuta", "idUsuario_Op", "fApartir", "Dia", "idFrec", "Sec"];
		BLOQUES = new Array();
		var lmt = 50;
		//console.log(msv_Alta_data);
		if(true){
			var BLOCK = new Array();
			contBLOQ++;
			$.each(msv_Alta_data, function(indx, obj){
				if(indx < lmt){
					//console.log(indx);
					BLOCK.push(obj);
					
				}
				if(indx >= lmt && indx < (lmt*2)){
					if(indx == lmt){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*2) && indx < (lmt*3)){
					if(indx == (lmt*2)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*3) && indx < (lmt*4)){
					if(indx == (lmt*3)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*4) && indx < (lmt*5)){
					if(indx == (lmt*4)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*5) && indx < (lmt*6)){
					if(indx == (lmt*5)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*6) && indx < (lmt*7)){
					if(indx == (lmt*6)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*7) && indx < (lmt*8)){
					if(indx == (lmt*7)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*8) && indx < (lmt*9)){
					if(indx == (lmt*8)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
				if(indx >= (lmt*9) && indx < (lmt*10)){
					if(indx == (lmt*9)){ BLOQUES.push(BLOCK); BLOCK = new Array(); BLOCK.push(fakeRow); contBLOQ++;}
					//console.log(indx);
					BLOCK.push(obj);
				}
			});	
			
			BLOQUES.push(BLOCK);
			
			$.each(BLOQUES, function(indx, blk){
				console.log(blk.length);
				//console.log(blk);
				i_msv_Reg(blk);
			});		
		}
		else{
			i_msv_Reg(msv_Alta_data);
		}
		//i_msv_Reg(msv_Alta_data);		
		//i_msv_Reg(msv_Alta_data);
	
	});
	
	$('#EXPORTA').on('click', function(){
		
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
				
		if(!bndExp_L)
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
	    		
	    		bndExp_L = true;   	
	    		
	    		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'ListadoDeClientesPorRuta');	
	        	

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
        
        else
		MTDS.EXPORT(objH, dataR_ListadoDeClientesPorRuta, 'ListadoDeClientesPorRuta');
		
		
	});
	
	
	function setFuncions()
  	{ 		
  		
  		$.ajax({
            crossDomain: true,
            type:"GET",
            contentType: "application/json; charset=utf-8",
            async:false,
            url: domin + "/fWS.asmx/s_ClienteWeb?callback=?",
            data: {CompanyCode: company, Func:'SetHorarios', rows:1},
            dataType: "jsonp",
            success: function (data){
		        console.log('Hi');
		    },
		    error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
           },

            jsonpCallback: function(){console.log('DOOOONE !');}
        });
  		
  		
  	}
  	
  	window.SetHorarios = function(LISTA){
  		console.log('fkhdfkvhdkj 75757675 jjhkjhjh');
  		$.each(LISTA, function(index, value){
  			//console.log(LISTA);
  			
  			//console.log(index + ' | ' + value);
			if(index+1 > dta.length - 9 )
				$('#REG').append($(getRegFragment(value.id, value.Nombre, value.ApellidoP, value.ApellidoM, value.Celular, value.Cedis)).fadeIn(0));
			
			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Nombre, value.ApellidoP, value.ApellidoM, value.Celular, value.Cedis, value.fCreacion)).fadeIn(0));
			
			$('.edt-'+value.id).on('click', function(){
				    				
				$('#EDITA').attr('idRegistro',value.id);
				$('#ELIMINA').attr('idRegistro',value.id);
				
				
				$('#edtidCedis').val(value.idCedis);
				$('#edtidCedis').select2();
				
				$('#edtNombre').val(value.Nombre);    				
		    	$('#edtApellidoP').val(value.ApellidoP);
		    	$('#edtApellidoM').val(value.ApellidoM);
		    	$('#edtCelular').val(value.Celular);
		    	$('#edtCorreo').val(value.Correo);
		    	$('#edtNombreTienda').val(value.NombreTienda);
		    	
		    				    	  	
				
	
				
				$("#btnEDT").click();
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
                
  		
  	};
  	
	
	
	window.i_msv_Reg = function (CSV_TEXT) {
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/i_msv_Usuarios",
            data: "{'CompanyCode':'"+company+"',"+ 
				"CSV_TEXT: '"+CSV_TEXT+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	contBLOQ--;
            	if(contBLOQ == 0){ ANIM.Success('fa-building', 'Altas creadas Exitosamente!');
            	console.log('Altas creadas Exitosamente!');}
	  		
            },
            error: function (e) {
                ANIM.Error('Error al insertar Altas ('+ contBLOQ +'/ '+BLOQUES.length+').');
                console.log('Error al insertar Altas ('+ contBLOQ +'/ '+BLOQUES.length+').');
            }
       });       
   };
    
	
    
	window.i_Reg = function (idCedis, nombre, apePat, apeMat, cel, correo, nombreTienda) {
		
		var fErr = -1;
		
		
		if(nombreTienda == '')fErr = 5;
		if(correo == '')fErr = 6;
		if(cel == '')fErr = 3;
		if(apeMat == '')fErr = 2;
		if(apePat == '')fErr = 1;
		if(nombre == '')fErr = 0;
		if(idCedis == 0)fErr = 4;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Cliente",
                data: "{'CompanyCode':'"+company+"',"+ 
					"idCedis: '"+idCedis.trim()+"',"+
					"Nombre: '"+nombre.trim()+"',"+
					"ApePat: '"+apePat.trim()+"',"+
					"ApeMat: '"+apeMat.trim()+"',"+					
					"Celular: '"+cel.trim()+"',"+
					"Correo: '"+correo.trim()+"',"+		
					"NombreTienda: '"+nombreTienda.trim()+"',"+				
					"idUsuario: '"+getUserSession().Nickname+"'}",
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
    
    function s_Reg() {
						
		console.log('Consultando '+tabla);
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_ClienteCoor",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');            	
				
				var arr = new Array();	        	
	        	
	        	dta_CLTS = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			//OBJETO DE DESPLIEGE DE LA TABLA.
		        		//console.log(value);
		    			var OBJ = [value.id, value.NombreTienda, value.ApellidoP, value.ApellidoM, value.Nombre, value.Celular, value.Cedis, MTDS.CAST_DATE(value.fCreacion), value.Latitud, value.Longitud, value.Activo];
		    			arr.push(OBJ);
	        		}
	        			    			      			
	    		});
	    		
	    		
	    		var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'id': 'id'},{'NombreTienda': 'NombreTienda'}, {'ApellidoP': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'}, {'Diff': 'Diff'}, {'Diff': 'Diff'}   
	    				,{
            				"mData": null,
            				"bSortable": false,
            				"mRender": function (o) {return o[10]+'' == 'true' ? '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'"  '+o+' >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>'+
							'<a id="ggmaps-'+o[0]+'" class="table-link ggmaps-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>'  
							+
							'</div>' :

                            '<div style="display: inline-block; width:80px; ">' +
           					
							'<a id="ggmaps-' + o[0] + '" class="table-link ggmaps-' + o[0] + '" >' +
								'<span class="fa-stack">' +
									'<i class="fa fa-square fa-stack-2x"></i>' +
									'<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>' +
								'</span>' +
							'</a>'
							+
							'</div>';
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

                
                
                console.log('EACH _ DONE 2');

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
       
    };
    
    function sb_Reg(Text) {
						
		console.log('Consultando '+tabla);
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/sb_Cliente",
            data: "{'CompanyCode':'"+company+"', 'Texto': '"+ Text+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log('WS _ DONE');            	
            	
				
				var arr = new Array();	        	
	        	
	        	dta_CLTS = JSON.parse(data.d);
	        	$.each(JSON.parse(data.d), function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5){
	        			//OBJETO DE DESPLIEGE DE LA TABLA.
		        		console.log(value);
		    			var OBJ = [value.id, value.NombreTienda, value.ApellidoP, value.ApellidoM, value.Nombre, value.Celular, value.Cedis, MTDS.CAST_DATE(value.fCreacion), value.Latitud, value.Longitud];
		    			arr.push(OBJ);
	        		}
	        			    			      			
	    		});
	    		
	    		var table = $('#tablaDatos').DataTable();	    		
	    		table.destroy();
	    			    		
	    		var table = $('#tablaDatos').DataTable({
	    			retrieve: true,
	    				searching: true,
	    				destroy: true,
	    				data: arr,
	    				columns:[{'id': 'id'},{'NombreTienda': 'NombreTienda'}, {'ApellidoP': 'Contado'}, {'Credito': 'Credito'}, {'Consignacion': 'Consignacion'}, {'Total': 'Total'}, {'Diff': 'Diff'}, {'Diff': 'Diff'}   
	    				,{
            				"mData": null,
            				"bSortable": false,
           					"mRender": function (o) {return '<div style="display: inline-block; width:80px; ">'+
           					'<a id="edt-'+o[0]+'" class="table-link edt-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' +
							'<a id="ggmaps-'+o[0]+'" class="table-link ggmaps-'+o[0]+'" >'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-map-marker fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>' 
							+
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

                
                
                console.log('EACH _ DONE 2');

            },
            error: function (e) {
                console.log(e);
                ANIM.Error('Error al consultar los '+tabla + e);
                
            }
        });
       
    };
    
    
    function bindBTNROW(){//ELIMINA Y VUELVE A GENERAR LOS EVENTOS DE CADA ROW.
    	$.each(dta_CLTS, function (index, value) {
					
			$('#edt-'+value.id).unbind();			
			$('#edt-'+value.id).on('click', function(){
				console.log(value);				
				
				$('#EDITA').attr('idRegistro',value.id);
				$('#ELIMINA').attr('idRegistro',value.id);	    				
				
				$('#edtidCedis').val(value.idCedis);
    			$('#edtidCedis').select2();
				
				$('#edtNombre').val(value.Nombre);    				
		    	$('#edtApellidoP').val(value.ApellidoP);
		    	$('#edtApellidoM').val(value.ApellidoM);
		    	$('#edtCelular').val(value.Celular);
		    	$('#edtCorreo').val(value.Correo);
		    	$('#edtNombreTienda').val(value.NombreTienda);
				
				$("#btnEDT").click();
								
			});
			
			
			$('#ggmaps-'+value.id).unbind();			
			$('#ggmaps-'+value.id).on('click', function(){
				console.log(value);				
				
				console.log(value.Latitud +' | '+ value.Longitud);
				
				$('#GGMAPS_C').text('ID:'+value.id + ' ' + value.NombreTienda);
				
				//MapaEdita.map.setCenter(new google.maps.LatLng(value.Latitud, value.Longitud));
				setTimeout(function(){
					MapaEdita = new ggMaps('map-edita');
					MapaEdita.initializeEDT(value.Latitud, value.Longitud); 
				 }, 1000);
				 
				$("#btnGGMAPS").click();
								
			});
		
		
		});
    }
    
    window.u_Reg = function (id_, idCedis, nombre, apePat, apeMat, cel, correo, nombreTienda) {
		
		var fErr = -1;
		
		if(nombreTienda == '')fErr = 5;
		//if(correo == '')fErr = 6;
		if(cel == '')fErr = 3;
		if(apeMat == '')fErr = 2;
		if(apePat == '')fErr = 1;
		if(nombre == '')fErr = 0;
		if(idCedis == 0)fErr = 4;
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Cliente",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
					"idCedis: '"+idCedis.trim()+"',"+					
					"Nombre: '"+nombre.trim()+"',"+
					"ApePat: '"+apePat.trim()+"',"+
					"ApeMat: '"+apeMat.trim()+"',"+
					"Celular: '"+cel.trim()+"',"+
					"Correo: '"+correo.trim()+"',"+
					"NombreTienda: '"+nombreTienda.trim()+"',"+
					"idUsuario: '"+getUserSession().Nickname+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + nombre +' actualizado Exitosamente!');		  		
		  			
		  			
		  			if($('#BUSCA').val() != ''){ s_Reg($('#BUSCA').val()); }
		  			else{ s_Reg(); }
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
            url: domin + "/fWS.asmx/d_Cliente",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+getUserSession().Nickname+"',"+
            	"id: '"+id_+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla +' eliminado Exitosamente!');	  		
  				
  				if($('#BUSCA').val() != ''){ s_Reg($('#BUSCA').val()); }
	  			else{ s_Reg(); }
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
	    			//<option value="1">United Kingdom</option>
	    			//
	    			
	    			$('#idCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
	    			$('#edtidCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
	    			
				});
    		
            },
            error: function (e) {
                ANIM.Error('Error al consultar.');
            }
        });

    };
    
        
    
    
    
    function INI_PAGE(){
    	//setFuncions();//s_Reg();
    	s_Reg();
    
    	s_Cedis();	
    }


	
	
	var ref = '';

	var ggMaps = function(idElement){
			
	  		this.Id_Element = idElement;
			this.directionsDisplay = null;
			this.directionsService = new google.maps.DirectionsService();
			this.map = null;
			this.defZoom = 16;
			this.markers = [];
			this.RestCoors = null;
			this.MiUbica = false;
			this.iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
			this.icons= [
	
		      'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	
		      
	
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
		
	
		this.initializeEDT= function (xx, yy) {
				
				var THIS = this;
				
				THIS.tempMarker.XX = xx;
				THIS.tempMarker.YY = yy;				
				
				
				var latlng = new google.maps.LatLng(xx, yy);
	    	
		        // Basic options for a simple Google Map
		        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		        var mapOptions = {
		            // How zoomed in you want the map to start at (always required)
		            zoom: 16,
		            scrollwheel: false,
		            
		            // The latitude and longitude to center the map (always required)
		            center: latlng,
		        };
		
		        // Get the HTML DOM element that will contain your map 
		        // We are using a div with id="map" seen below in the <body>
		        
		        var mapElement = document.getElementById(THIS.Id_Element);
		        
		
		        // Create the Google Map using out element and options defined above
		        THIS.map = new google.maps.Map(mapElement, mapOptions);
		        
		        THIS.addMarker(latlng, 'Direccion', null, true); 
		    	
		    	
		    	return;
		    	
		    	google.maps.event.addListener(THIS.map, 'click', function(event) {
	
					//app.btn_switch('#i_Store', true);

		        	THIS.deleteMarkers();		

		  			THIS.addMarker(event.latLng, 'Direccion', null, true);		

		      		THIS.DataLocation(event.latLng.lat(), event.latLng.lng());			      		

		      		THIS.tempMarker.XX=event.latLng.lat();

		      		THIS.tempMarker.YY=event.latLng.lng();	
		      		
		      		
		      		$('#edtLatitud').val(THIS.tempMarker.XX);
					$('#edtLongitud').val(THIS.tempMarker.YY);		      		

		      		//console.log(THIS.tempMarker.XX + ' | ' + THIS.tempMarker.YY);

		  		});  
		  		
	
	  		};
	
			this.initialize= function (xx, yy) {
				
				var THIS = this;
				
				var latlng = new google.maps.LatLng(xx, yy);
	    	
		        // Basic options for a simple Google Map
		        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		        var mapOptions = {
		            // How zoomed in you want the map to start at (always required)
		            zoom: 16,
		            scrollwheel: false,
		            
		            // The latitude and longitude to center the map (always required)
		            center: latlng,
		        };
		
		        // Get the HTML DOM element that will contain your map 
		        // We are using a div with id="map" seen below in the <body>
		        var mapElement = document.getElementById(THIS.Id_Element);
		
		        // Create the Google Map using out element and options defined above
		        THIS.map = new google.maps.Map(mapElement, mapOptions);
		        
		        var marker = new google.maps.Marker({
		    		position: latlng,
		    		map: THIS.map
		    	});
		    	
		    	/*var THIS = this;
				//this.get_MapHeight();
				directionsDisplay = new google.maps.DirectionsRenderer();
				var ownPos = null;			
	
				if(navigator.geolocation) {
	
		      			ownPos = new google.maps.LatLng(xx, yy);	                
	
		                var map_canvas = document.getElementById(THIS.Id_Element);
	
				        var map_options = {
				          center: ownPos,
				          zoom: THIS.defZoom,
				          streetViewControl: true
				        };		
	
				        THIS.map = new google.maps.Map(map_canvas, map_options);		
	
	    		}*/
		    	
		    	
	    	
				/*
				this.tempMarker={XX:0, YY:0};
	
				var THIS = this;
				//this.get_MapHeight();
				directionsDisplay = new google.maps.DirectionsRenderer();
				var ownPos = null;			
	
				if(navigator.geolocation) {
	
		    		navigator.geolocation.getCurrentPosition(function(position) {
	
		      			ownPos = new google.maps.LatLng(xx, yy);	                
	
		                var map_canvas = document.getElementById(THIS.Id_Element);
	
				        var map_options = {
				          center: ownPos,
				          zoom: THIS.defZoom,
				          streetViewControl: true
				        };		
	
				        THIS.map = new google.maps.Map(map_canvas, map_options);
		  		
	
	
		    	}, function() {
	
		      		handleNoGeolocation(true);
		    	});
	
	  			} else {
	
		    		handleNoGeolocation(false);
		  		}*/
	
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
	
				
	
				$.getJSON('js/dTiendas.js', function (data) {
	
	 
	
	        		//alert(data);
	
	 
	
	        		$.each(data, function (index, value) {
	
	        			//<li><img src="img/1.png" alt="Landscape 5" class="enfocada"></li>
	
	        			
	
	        			THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), '7-Eleven', 1, false);
	
	        			console.log('Agregando... ' + index);
	
	                	
	
	        		});
	
	     		});
	
				
	
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
	
	        			
	
	        			THIS.addMarker(new google.maps.LatLng(value.xx, value.yy), '7-Eleven', 1, false, value.idTienda, value.name);
	
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
	
			this.addMarker = function (Position, Title, Type, Save, _ID, _Name) {
	
				//alert(Position);
	
				var THIS = this;
	
				
	
				var marker;
	
				
	
				if(Type != null){				
	
					marker = new google.maps.Marker({
	
						position: Position, 
	
						map: this.map,
	
						title: Title,
	
						animation: google.maps.Animation.DROP,
	
						icon : this.icons[Type],
	
											
	
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
	
				
	
				/*google.maps.event.addListener(marker, 'click', function() {
	
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
	
	
	
		      		pos = new google.maps.LatLng(position.coords.latitude,
	
		                                       position.coords.longitude);
	
	
	
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
	
	  			} else {
	
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
	
			this.DataLocation = function (xx, yy) {
				
				//console.log('INI');
	
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
	
					$('#edtCalle').val(DIR.Calle);
					$('#edtNumExt').val(DIR.Numero);		
					$('#edtColonia').val(DIR.Colonia);
					//$(UpdateIn + ' .L3').text(DIR.Municipio + ', ' + DIR.Estado_2 + ', ' + DIR.Pais_2);	
						
	
					/*alert(DIR.Calle + ' #' + DIR.Numero + ', ' + DIR.Colonia + ', ' + DIR.Municipio + ', ' + 
	
						DIR.Estado + ', ' + DIR.Pais + ', ' + DIR.CP);*/			
	
				}).error(function(){	
					alert('error... ohh no!');	
				});

				return DIR;	
			};

	};
	
	
	MapaEdita = new ggMaps('map-edita');
	MapaEdita.initializeEDT(0, 0);

});