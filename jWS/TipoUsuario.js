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
	
	$('#idTU').select2();
	
	
	var tabla = 'Tipo de Usuario';
	var MsjValida = ['Escriba el Nombre del ' + tabla,
						'Escriba una descripcion de las actividades del '+tabla+'.',
						'Escriba el Nivel de Acceso del '+tabla];

	
	var FRM = new CRUD('2-TIPO.USUARIO', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);	
	var MTDS = new METODOS();
		

							
	function getRegFragment(id, Nombre, Auth, Desc)
	{		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix edt-'+id+'">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+Nombre+'</h2>'+
							'<div class="job-position">'+
								tabla+
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								'<li>'+
									'<i class="fa fa-bolt"></i> '+ Auth +
								'</li>'+
								'<li>'+
									'<i class="fa fa-tasks"></i> '+ Desc +
								'</li>'+
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	
	
	function getRowFragment(id, Nombre, Auth, Descripcion)
	{
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Nombre+'</td>'+
						'<td>'+Auth+'</td>'+
						'<td>'+Descripcion+'</td>'+
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
	
	function getRowFragment_Pagina(id, Nombre, CC, RR, UU, DD, idTU, TipoUsuario)
	{	
		CC = CC == 0 ? 2 : CC;
		RR = RR == 0 ? 2 : RR;
		UU = UU == 0 ? 2 : UU;
		DD = DD == 0 ? 2 : DD;
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+Nombre+'</td>'+
						'<td><a href="#" id="C'+idTU+'_'+id+'" IDTU="'+idTU+'" IDP="'+id+'" class="C" data-type="select2" data-pk="1" data-value="'+CC+'" data-title="Seleciona" class="editable editable-click" style="color: gray;">   </a></td>'+
						'<td><a href="#" id="R'+idTU+'_'+id+'" IDTU="'+idTU+'" IDP="'+id+'" class="R" data-type="select2" data-pk="2" data-value="'+RR+'" data-title="Seleciona" class="editable editable-click" style="color: gray;">   </a></td>'+
						'<td><a href="#" id="U'+idTU+'_'+id+'" IDTU="'+idTU+'" IDP="'+id+'" class="U" data-type="select2" data-pk="3" data-value="'+UU+'" data-title="Seleciona" class="editable editable-click" style="color: gray;">   </a></td>'+
						'<td><a href="#" id="D'+idTU+'_'+id+'" IDTU="'+idTU+'" IDP="'+id+'" class="D" data-type="select2" data-pk="4" data-value="'+DD+'" data-title="Seleciona" class="editable editable-click" style="color: gray;">   </a></td>'+
					'</tr>';
			
		//$(frag).css('display', 'none');
			
		return frag;
	}
	
	

	function ClearFields()
    {
    	$('#Nombre').val('');
    	$('#Auth').val('');
    	$('#Descripcion').val(''); 	
    }
	
	
	$("input, textarea" ).keyup(function() {
  		$(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Reg($('#Nombre').val(), $('#Auth').val(), $('#Descripcion').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtNombre').val(), $('#edtAuth').val(), $('#edtDescripcion').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#CONSULTA_PER').on('click', function(){
		s_Reg_Pagina($('#idTU').val());
	});
	
    
	window.i_Reg = function (nombre, auth, desc) {
		
		var fErr = -1;
		
		if(auth == 0)fErr = 2;
		if(desc == 0)fErr = 1;
		if(nombre == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
	        $.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_TipoUsuario",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"Nombre: '"+nombre+"'," +
					"Auth: '"+auth+"',"+
					"Descripcion: '"+desc+"'}",
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
            url: domin + "/fWS.asmx/s_TipoUsuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	$('#REG div').remove();
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {

	    			//console.log(index + ' | ' + value);
	    			
	    			if(index+1 > dta.length - 9 )
	    				$('#REG').append($(getRegFragment(value.id, value.Nombre, value.Auth, value.Descripcion)).fadeIn(0));
	    			
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.Nombre, value.Auth, value.Descripcion)).fadeIn(0));
	    			
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				$('#edtNombre').val(value.Nombre);
	    				$('#edtAuth').val(value.Auth);
	    				$('#edtDescripcion').val(value.Descripcion);    				
		
	    				
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
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
		
    };
    
    function s_Reg_Pagina(idTipoUsuario) {
						
		console.log('Consultando '+tabla);
        $.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_PermisoTipoUsuario",
            data: "{'CompanyCode':'"+company+"',"+
            		"'idTipoUsuario':'"+ idTipoUsuario +"'"+
            		"}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	$('#tblPERMISOS tr').remove();
            	            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
	    			$('#tblPERMISOS').append($(getRowFragment_Pagina(value.idPagina, value.Pagina, value.C, value.R, value.U, value.D, value.idTipoUsuario, value.TipoUsuario)).fadeIn(0));
	    			
	    		});
	    		
	    		
	    		$('.C').editable({
					prepend: "selecciona",
					source: [
						{value: 1, text: 'SI'},
						{value: 2, text: 'NO'}
					],
					select2: {
						width: 200,
						placeholder: 'Selecciona una opcion',
						allowClear: false
					}
				});				
				$('.R').editable({
					prepend: "selecciona",
					source: [
						{value: 1, text: 'SI'},
						{value: 2, text: 'NO'}
					],
					select2: {
						width: 200,
						placeholder: 'Selecciona una opcion',
						allowClear: false
					}
				});				
				$('.U').editable({
					prepend: "selecciona",
					source: [
						{value: 1, text: 'SI'},
						{value: 2, text: 'NO'}
					],
					select2: {
						width: 200,
						placeholder: 'Selecciona una opcion',
						allowClear: false
					}
				});				
				$('.D').editable({
					prepend: "selecciona",
					source: [
						{value: 1, text: 'SI'},
						{value: 2, text: 'NO'}
					],
					select2: {
						width: 200,
						placeholder: 'Selecciona una opcion',
						allowClear: false
					}
				});
				
				
				$('.C').on('save', function(e, params){
					console.log( $(this).attr('IDTU') + ' - ' + $(this).attr('IDP') );
					var idTU = $(this).attr('IDTU');
					var idP = $(this).attr('IDP');
					//var C = $('#C' + idTU + '_' + idP);
					var C = params.newValue == 2 ? false : true;					
					var R = $('#R' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var U = $('#U' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var D = $('#D' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					//id="C'+idTU+'.'+id+'"
					/*console.log(params.newValue);
					console.log('#C' + idTU + '_' + idP);
					console.log($('#C' + idTU + '_' + idP).attr('data-value'));
					console.log($('#C' + idTU + '_' + idP).editable('getValue'));
					console.log($('#C' + idTU + '_' + idP).val());*/
					console.log(idTU +'-'+ idP +'-C:'+ C +'-R:'+ R +'-U:'+ U +'-D:'+ D);
					console.log(idTU +'-'+ idP +'-C:'+ C 
								+'-R:'+ $('#R' + idTU + '_' + idP).attr('data-value') 
								+'-U:'+ $('#U' + idTU + '_' + idP).attr('data-value') 
								+'-D:'+ $('#D' + idTU + '_' + idP).attr('data-value'));
					u_Reg_Permiso(idTU, idP, C, R, U, D);
					
				});				
				$('.R').on('save', function(e, params){
					console.log( $(this).attr('IDTU') + ' - ' + $(this).attr('IDP') );
					var idTU = $(this).attr('IDTU');
					var idP = $(this).attr('IDP');
					//var C = $('#C' + idTU + '_' + idP);
					var C = $('#C' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;					
					var R = params.newValue == 2 ? false : true;
					var U = $('#U' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var D = $('#D' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					//id="C'+idTU+'.'+id+'"
					/*console.log(params.newValue);
					console.log('#C' + idTU + '_' + idP);
					console.log($('#C' + idTU + '_' + idP).attr('data-value'));
					console.log($('#C' + idTU + '_' + idP).editable('getValue'));
					console.log($('#C' + idTU + '_' + idP).val());*/
					console.log(idTU +'-'+ idP +'-C:'+ C +'-R:'+ R +'-U:'+ U +'-D:'+ D);
					console.log(idTU +'-'+ idP +'-C:'+ C 
								+'-R:'+ $('#R' + idTU + '_' + idP).attr('data-value') 
								+'-U:'+ $('#U' + idTU + '_' + idP).attr('data-value') 
								+'-D:'+ $('#D' + idTU + '_' + idP).attr('data-value'));
					u_Reg_Permiso(idTU, idP, C, R, U, D);
				});				
				$('.U').on('save', function(e, params){
					console.log( $(this).attr('IDTU') + ' - ' + $(this).attr('IDP') );
					var idTU = $(this).attr('IDTU');
					var idP = $(this).attr('IDP');
					//var C = $('#C' + idTU + '_' + idP);
					var C = $('#C' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;					
					var R = $('#R' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var U = params.newValue == 2 ? false : true;
					var D = $('#D' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					//id="C'+idTU+'.'+id+'"
					/*console.log(params.newValue);
					console.log('#C' + idTU + '_' + idP);
					console.log($('#C' + idTU + '_' + idP).attr('data-value'));
					console.log($('#C' + idTU + '_' + idP).editable('getValue'));
					console.log($('#C' + idTU + '_' + idP).val());*/
					console.log(idTU +'-'+ idP +'-C:'+ C +'-R:'+ R +'-U:'+ U +'-D:'+ D);
					console.log(idTU +'-'+ idP +'-C:'+ C 
								+'-R:'+ $('#R' + idTU + '_' + idP).attr('data-value') 
								+'-U:'+ $('#U' + idTU + '_' + idP).attr('data-value') 
								+'-D:'+ $('#D' + idTU + '_' + idP).attr('data-value'));
					u_Reg_Permiso(idTU, idP, C, R, U, D);
				});				
				$('.D').on('save', function(e, params){
					console.log( $(this).attr('IDTU') + ' - ' + $(this).attr('IDP') );
					var idTU = $(this).attr('IDTU');
					var idP = $(this).attr('IDP');
					//var C = $('#C' + idTU + '_' + idP);
					var C = $('#C' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var R = $('#R' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var U = $('#U' + idTU + '_' + idP).attr('data-value') == 2 ? false : true;
					var D = params.newValue == 2 ? false : true;
					//id="C'+idTU+'.'+id+'"
					//console.log(params.newValue);
					console.log('#C' + idTU + '_' + idP);
					/*console.log($('#C' + idTU + '_' + idP).attr('data-value') +' - '+ $('#R' + idTU + '_' + idP).attr('data-value') + ' - ' + $('#U' + idTU + '_' + idP).attr('data-value') +' - '+$('#D' + idTU + '_' + idP).attr('data-value') );
					console.log($('#C' + idTU + '_' + idP).editable('getValue') +' - '+ $('#R' + idTU + '_' + idP).editable('getValue') +' - '+ $('#U' + idTU + '_' + idP).editable('getValue') +' - '+ $('#D' + idTU + '_' + idP).editable('getValue') );
					console.log($('#C' + idTU + '_' + idP).editable('getValue')['C' + idTU + '_' + idP] +' - '+ $('#R' + idTU + '_' + idP).editable('getValue')['R' + idTU + '_' + idP] +' - '+$('#U' + idTU + '_' + idP).editable('getValue')['U' + idTU + '_' + idP] +' - '+$('#D' + idTU + '_' + idP).editable('getValue')['D' + idTU + '_' + idP] );
					console.log($('#C' + idTU + '_' + idP).val() +' - '+ $('#R' + idTU + '_' + idP).val() +' - '+ $('#U' + idTU + '_' + idP).val() +' - '+ $('#D' + idTU + '_' + idP).val()  );
					console.log(idTU +'-'+ idP +'-C:'+ C +'-R:'+ R +'-U:'+ U +'-D:'+ D);
					console.log(idTU +'-'+ idP +'-C:'+ C 
								+'-R:'+ $('#R' + idTU + '_' + idP).attr('data-value') 
								+'-U:'+ $('#U' + idTU + '_' + idP).attr('data-value') 
								+'-D:'+ $('#D' + idTU + '_' + idP).attr('data-value'));*/
					u_Reg_Permiso(idTU, idP, C, R, U, D);
				});				
	    			    		
	    		/*var tableFixed = $('#tablaDatos').dataTable({
			  		retrieve: true,
			  		destroy: true,
					info: false,
					pageLength: 25,
					//paging: false
				});
			
				new $.fn.dataTable.FixedHeader( tableFixed );*/

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });
		
    };
    
    function s_Tipo() {
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_TipoUsuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
	        	
	        	var dta = JSON.parse(data.d);
	        	$.each(dta, function (index, value) {	        		
	        		$('#idTU').append('<option value="'+value.id+'">'+value.Nombre+'</option>');	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Tipos.');
            }
        });

    };
    
    
    
    window.u_Reg = function (id_, nombre, auth, desc) {
		
		var fErr = -1;
		
		if(auth == 0)fErr = 2;
		if(desc == 0)fErr = 1;
		if(nombre == '')fErr = 0;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Editando '+tabla);
	        $.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_TipoUsuario",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"id: '"+id_+"'," +
                	"Nombre: '"+nombre+"'," +
					"Auth: '"+auth+"',"+
					"Descripcion: '"+desc+"'}",
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
    
    window.u_Reg_Permiso = function (idTipoUsuario, idPagina, C, R, U, D) {
		//return 0;
		var fErr = -1;
				
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Editando '+tabla);
	        $.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Permiso",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"idTipoUsuario: '"+idTipoUsuario+"'," +
                	"idPagina: '"+idPagina+"'," +
                	"C: '"+C+"'," +
                	"R: '"+R+"'," +
                	"U: '"+U+"'," +
					"D: '"+D+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', 'Permisos actualizados Exitosamente!');		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al actualizar Permisos ');
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
            url: domin + "/fWS.asmx/d_TipoUsuario",
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
    
    
    
    
    
    function INI_PAGE(){
    	
    	s_Reg();
    	//s_Reg_Pagina();
    	
    }
    
    s_Tipo();/**/


});