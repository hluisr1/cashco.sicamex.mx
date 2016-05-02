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
	
	var tabla = 'Usuario';
	var MsjValida = ['Escriba el Nombre del ' + tabla,
						'Escriba el Apellido Paterno del ' + tabla,
						'Escriba el Apellido Materno del ' + tabla,
						'Escriba el Celular del ' + tabla,
						'Escoja el CEDIS al que pertenece el '+tabla+'.',
						'Escoja el tipo de usuario del '+tabla,
						'Escriba el Nickname del '+tabla,
						'Escriba el correo del '+tabla];
	
	//nice select boxes
	$('#idCedis').select2();
	$('#idTipoUsuario').select2();	
	
	
	var CEDIS;
	var TIPOS;
	
	var dataUser;
	
	
	var FRM = new CRUD('3-USUARIO', {C: '#CRUD_C', R: '.CRUD_R', U: '#EDITA', D: '#ELIMINA'}, INI_PAGE);
	var MTDS = new METODOS();
	
							
	function getRegFragment(id, Nombre, ApePat, ApeMat, Cel, Cedis, Tipo)
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
									'<i class="fa fa-child"></i> '+ Tipo +
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
	
	function castDate(Fecha)
	{
		var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
		var d = new Date(parseInt(milli));
		//d.toLocaleDateString();
		
		Fecha = Fecha.replace('T', ' ');
		//console.log('HI....');
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return d.toLocaleDateString();//Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}
	
	function getRowFragment(id, ApePat, ApeMat, Nombre, Cel, Email, Cedis, Tipo, Alta)
	{
		if(Email == '')Email = '-';
		if(Cel == '')Cel = '-';
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+ApePat+'</td>'+
						'<td>'+ApeMat+'</td>'+
						'<td>'+Nombre+'</td>'+
						'<td>'+Cel+'</td>'+
						'<td>'+Email+'</td>'+
						'<td>'+Cedis+'</td>'+
						'<td>'+Tipo+'</td>'+
						'<td>'+Alta+'</td>'+
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
    	$('#Nickname').val('');
    	$('#Nombre').val('');
    	$('#ApellidoP').val('');
    	$('#ApellidoM').val('');
    	$('#Celular').val('');
    	$('#Email').val('');
    	
    	$('#idCedis').val(0);
    	$('#idTipoUsuario').val(0);
    	
    	$('#idCedis').select2();
		$('#idTipoUsuario').select2();
    	
    	
    }
	
	$("#Nickname").keyup(function (ee) {
	    if (ee.keyCode == 32) $(this).val($(this).val().substring(0, $(this).val().length - 1).trim());
	});
	
	$("input:not([type='email']), textarea").keydown(function () {
	    $(this).val($(this).val().toUpperCase());
	});
	
	$('#SAVE').on('click', function(){
		i_Reg($('#Nickname').val(), $('#idCedis').val(), $('#idTipoUsuario').val(), $('#Nombre').val(), $('#ApellidoP').val(), $('#ApellidoM').val(), $('#Celular').val(), $('#Email').val());
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidCedis').val(), $('#edtidTipoUsuario').val(), 
				$('#edtNombre').val(), $('#edtApellidoP').val(), $('#edtApellidoM').val(), $('#edtCelular').val(),
				$('#edtActivo').is(':checked'), $('#edtEmail').val());
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
		//alert(MAPA.tempMarker.XX + ' | ' + MAPA.tempMarker.YY);
	});
	
	$('#EXPORTA').on('click', function(){
		var objH = [{F:'Nickname',H:'Nickname', str:true},    			 
    			{F:'ApellidoP', H:'ApellidoP', str:true},
    			{F:'ApellidoM', H:'ApellidoM', str:true},
    			{F:'Nombre', H:'Nombre', str:true},
    			{F:'Celular', H:'Celular', str:true},
    			{F:'Email', H:'Email', str:true},
    			{F:'Cedis', H:'Cedis', str:true},
    			{F:'TipoUsuario', H:'Tipo', str:true},
    			{F:'fAlta', H:'Fecha de Alta', str:false},
    			{F:'idCedis', H:'idCedis', str:false},
    			{F:'idTipo', H:'idTipo', str:false}];
		Export(objH, dataUser, 'Usuarios');
	});
	
    
	window.i_Reg = function (Nickname, idCedis, idTipo, nombre, apePat, apeMat, cel, email) {
		
		var fErr = -1;
		
		console.log(idTipo + ' - ' + idCedis);
		
		
		if(idTipo == 0)fErr = 5;
		if(idCedis == 0)fErr = 4;
		if(email == '')fErr = 7;
		//if(cel == '')fErr = 3;
		if(apeMat == '')fErr = 2;
		if(apePat == '')fErr = 1;
		if(nombre == '')fErr = 0;
		if(Nickname == '')fErr = 6;		
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Usuario",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"Nickname: '"+Nickname+"'," +
					"idCedis: '"+idCedis+"',"+
					"idTipo: '"+idTipo+"',"+
					"Nombre: '"+nombre+"',"+
					"ApePat: '"+apePat+"',"+
					"ApeMat: '"+apeMat+"',"+
					"Celular: '"+cel+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"Email: '"+email+"'}",
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
            url: domin + "/fWS.asmx/s_Usuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	$('#REG div').remove();        	
	        	$('#tablaDatos tbody tr').remove();
	        	
	        	var dta = JSON.parse(data.d);
	        	//dataUser = dta;
	        	dataUser = new Array();
	        	console.log(dta);
	        	$.each(dta, function (index, value) {
	        		
	        		if(getUserSession().idCedis == value.idCedis || getUserSession().idTipo == 5)
	        		{
	        			value.fAlta = castDate(value.fAlta);
		        		dataUser.push(value);
		        		
						
		    			//console.log(index + ' | ' + value);
		    			if(index+1 > dta.length - 3 )
		    				$('#REG').append($(getRegFragment(value.Nickname, value.Nombre, value.ApellidoP, value.ApellidoM, value.Celular, value.Cedis, value.TipoUsuario)).fadeIn(0));    			
		    			
		    			$('#tablaDatos tbody').append($(getRowFragment(value.Nickname, value.ApellidoP, value.ApellidoM, value.Nombre, value.Celular, value.Email, value.Cedis, value.TipoUsuario, value.fAlta)).fadeIn(0));
		    			
		    			
		    			$('.edt-'+value.Nickname).on('click', function(){
		    				    				
		    				$('#EDITA').attr('idRegistro',value.Nickname);
		    				$('#ELIMINA').attr('idRegistro',value.Nickname);
		    				
		    				
		    				$('#edtNickname').val(value.Nickname);
		    				$('#edtNombre').val(value.Nombre);
					    	$('#edtApellidoP').val(value.ApellidoP);
					    	$('#edtApellidoM').val(value.ApellidoM);
					    	$('#edtCelular').val(value.Celular);
					    	$('#edtEmail').val(value.Email);
					    	
					    	$('#edtidCedis').val(value.idCedis);
					    	$('#edtidTipoUsuario').val(value.idTipo);
					    	
					    	$('#edtidCedis').select2();
							$('#edtidTipoUsuario').select2();
					    	
					    	console.log(value.Activo);
					    	
					    	$('#edtActivo').attr('checked', value.Activo);
					    	
					    	  	
		    				
			
		    				
		    				$("#btnEDT").click();
		    				
		    				
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
                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los '+tabla);
            }
        });

    };
    
    window.u_Reg = function (Nickname, idCedis, idTipo, nombre, apePat, apeMat, cel, activo, email) {
		
		var fErr = -1;
		
		if(idTipo == 0)fErr = 5;
		if(idCedis == 0)fErr = 4;
		if(email == '')fErr = 7;
		//if(cel == '')fErr = 3;
		if(apeMat == '')fErr = 2;
		if(apePat == '')fErr = 1;
		if(nombre == '')fErr = 0;
		if(Nickname == '')fErr = 6;			
		
		//console.log(fErr + ' | '+nombre + ' | ' + latitud + longitud);
		
		if(fErr == -1){
			console.log('Editando '+tabla + ' |'+ activo);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Usuario",
                data: "{'CompanyCode':'"+company+"',"+ 
                	"Nickname: '"+Nickname+"'," +
					"idCedis: '"+idCedis+"',"+
					"idTipo: '"+idTipo+"',"+
					"Nombre: '"+nombre+"',"+
					"ApePat: '"+apePat+"',"+
					"ApeMat: '"+apeMat+"',"+
					"Celular: '"+cel+"',"+
					"Activo: '"+activo+"',"+
					"idUsuario: '"+getUserSession().Nickname+"',"+
					"Email: '"+email+"'}",
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
    
    window.d_Reg = function (Nickname) {
		
		console.log('Deleting '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/d_Usuario",
            data: "{'CompanyCode':'"+company+"',"+ 
            	"idUsuario: '"+getUserSession().Nickname+"',"+
            	"Nickname: '"+Nickname+"'}",
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
	        		
	        		$('#idCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidCedis').append('<option value="'+value.id+'">'+value.Nombre+'</option>');	
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los CEDIS.');
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
	        		
	        		$('#idTipoUsuario').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
    				$('#edtidTipoUsuario').append('<option value="'+value.id+'">'+value.Nombre+'</option>');
	    			
	    		});                

            },
            error: function (e) {
                ANIM.Error('Error al consultar los Tipos.');
            }
        });

    };
    
    
    
    
    
    
    function INI_PAGE(){
    	
    	s_Reg();
    
		s_Cedis();
    	s_Tipo();
    }
    


});