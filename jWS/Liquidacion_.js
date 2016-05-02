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
	
	var tabla = 'Liquidacion';
	var MsjValida = ['Escoja a el Vendedor.',
						'Escriba el Monto.',
						'Escoja un Supervisor.'];
	
	//nice select boxes
	$('#idUsuario_VEN').select2();	
	$('#idUsuario_SP').select2();
	
	$('#edtidUsuario_VEN').select2();	
	$('#edtidUsuario_SP').select2();
	
	
	function castDate(Fecha)
	{
		var SP = '-';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	}

							
	function getRegFragment(id, Producto, Usuario, Cantidad, objProduct)
	{
		var elmnts = '';
		
		var nObjs = new Array();
		
		console.log(objProduct.length);
		var contAdd = 0;
		$.each(objProduct, function(indx, obj){
			
			
			
			if(indx > 0)
			{
				if(obj.P == objProduct[indx-1].P)
				{
						
					console.log(nObjs[0] + ' | ' + (indx-(1+contAdd)));
					nObjs[indx-(1+contAdd)].C = parseFloat(nObjs[indx-(1+contAdd)].C) + parseFloat(obj.C);
					nObjs[indx-(1+contAdd)].M = parseFloat(nObjs[indx-(1+contAdd)].M) + parseFloat(obj.M);
					
					contAdd++;
				}
				else
				{
					nObjs.push({P:obj.P, C:obj.C, M:obj.M});
				}
			}
			else
			{
				nObjs.push({P:obj.P, C:obj.C, M:obj.M});
			}
		});
		
		$.each(nObjs, function(indx, obj){
			elmnts += '<li>'+
							'<i class="fa fa-tags"></i> '+ obj.P +
						'</li>' + 
						'<li>'+
							'<i class="fa fa-cube"></i> '+ obj.C +
						'</li></br>';
		});
		
		var frag = '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" >'+
				'<div class="main-box clearfix profile-box-contact">'+
					'<div class="main-box-body clearfix">'+
						'<div id="edt-'+id+'" class="profile-box-header gray-bg clearfix">'+
							'<span class="fa fa-edit fa-3x pull-left"></span>'+
							'<h2>'+id+'</h2>'+
							'<div class="job-position">'+
								Usuario +
							'</div>'+
							
							'<br/><ul class="contact-details">'+
								
								elmnts +
							'</ul>'+
							
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}
	
	function getRowFragment(id, idUsuarioS, uApellidoP, uApellidoM, uNombre, Monto, idUsuario, sApellidoP, sApellidoM, sNombre, fCargado)
	{
		var Usuario = uApellidoP + ' ' + uApellidoM + ' ' + uNombre;
		var Supervisor = sApellidoP + ' ' + sApellidoM + ' ' + sNombre;
		
		fCargado = castDate(fCargado);
		
		var frag = '<tr>'+
						'<td>'+id+'</td>'+
						'<td>'+idUsuario+'</td>'+
						'<td>'+Usuario+'</td>'+
						'<td>'+Monto+'</td>'+						
						//'<td>'+idUsuarioS+'</td>'+
						'<td>'+Supervisor+'</td>'+						
						'<td>'+fCargado+'</td>'+
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
    	$('#idUsuario_VEN').val(0);
    	$('#idUsuario_SP').val(0);
    	$('#Monto').val('');
    	
    	$('#idUsuario_VEN').select2();
		$('#idUsuario_SP').select2();
    }
	
	
	
	
	$('#SAVE').on('click', function(){
		i_Reg($('#idUsuario_VEN').val(), $('#Monto').val(), $('#idUsuario_SP').val());
	});
	
	$('#EDITA').on('click', function(){
		u_Reg($('#EDITA').attr('idRegistro'), $('#edtidUsuario_VEN').val(), $('#edtMonto').val(), $('#edtidUsuario_SP').val());
	});
	
	$('#ELIMINA').on('click', function(){
		d_Reg($('#ELIMINA').attr('idRegistro'));
	});
	
    
	window.i_Reg = function (idUsuario_VEN, Monto, idUsuario_SP) {
		
		var fErr = -1;		
		
		if(idUsuario_SP == 0)fErr = 2;
		if(Monto == '')fErr = 1;
		if(idUsuario_VEN == 0)fErr = 0;
		
		console.log(fErr + ' | '+idUsuario_VEN + ' | ' + idUsuario_SP + Monto);
		
		if(fErr == -1){
			console.log('Adding '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/i_Liquidacion",
                data: "{'CompanyCode':'"+company+"',"+
                	"idUsuario_Resp: '"+idUsuario_SP.trim()+"',"+
                	"idUsuario_Op: '"+idUsuario_VEN.trim()+"',"+
                	"Monto: '"+Monto.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' creada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nueva '+ tabla);
                }
            });		
	        
		}
		else{
			ANIM.Alert( MsjValida[fErr] );
		}        

   };
    
    window.s_Reg = function () {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Liquidacion",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		//id, Folio, idUsuario, uApellidoP, uApellidoM, uNombre, idFactura, fCargado
	    			$('#tablaDatos tbody').append($(getRowFragment(value.id, value.idUsuario_Resp, value.vApellidoP, value.vApellidoM, value.vNombre, value.Monto, value.idUsuario_Op, value.sApellidoP, value.sApellidoM, value.sNombre, value.fCreacion)).fadeIn(0));	    			
	    			
	    			$('.edt-'+value.id).on('click', function(){
	    				    				
	    				$('#EDITA').attr('idRegistro',value.id);
	    				$('#ELIMINA').attr('idRegistro',value.id);
	    				
	    				$('#edtidUsuario_VEN').val(value.idUsuario_Op);
	    				$('#edtidUsuario_VEN').select2();
	    				$('#edtMonto').val(value.Monto);
	    				$('#edtidUsuario_SP').val(value.idUsuario_Resp);
	    				$('#edtidUsuario_SP').select2();
	    				
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
    
    window.u_Reg = function (id, idUsuario_VEN, Monto, idUsuario_SP) {
		
		var fErr = -1;
		
		if(idUsuario_SP == 0)fErr = 2;
		if(Monto == '')fErr = 1;
		if(idUsuario_VEN == 0)fErr = 0;

		
		if(fErr == -1){
			console.log('Editando '+tabla);
			$.ajax({
                type: "POST",
                url: domin + "/fWS.asmx/u_Liquidacion",
                data: "{'CompanyCode':'"+company+"',"+
                	"id: '"+id.trim()+"',"+
                	"idUsuario_Resp: '"+idUsuario_SP.trim()+"',"+
                	"idUsuario_Op: '"+idUsuario_VEN.trim()+"',"+
                	"Monto: '"+Monto.trim()+"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	ANIM.Success('fa-building', tabla + ' ' + ' actualizada Exitosamente!');
		  			ClearFields();
		  		
		  			s_Reg();
                },
                error: function (e) {
                    ANIM.Error('Error al insertar la nueva '+ tabla);
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
            url: domin + "/fWS.asmx/d_Liquidacion",
            data: "{'CompanyCode':'"+company+"',"+
            	"id: '"+id.trim()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	ANIM.Success('fa-building', tabla + ' ' + ' eliminada Exitosamente!');
	  		
	  			s_Reg();
            },
            error: function (e) {
                ANIM.Error('Error al eliminar la '+ tabla);
            }
        });
        
    };
    
    
    
    window.s_Usuario_Ven = function () {
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Usuario",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		var Cliente = value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre;
            		$('#idUsuario_VEN').append('<option value="'+value.Nickname+'">'+ Cliente + '</option>');
    				$('#edtidUsuario_VEN').append('<option value="'+value.Nickname+'">' + Cliente +'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar las Facturas');
            }
        });

    };
    
    window.s_Usuario = function () {
    	
    	var minAuth = 11;
    	var maxAuth = 20;
    	
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_UsuarioTipoBTWN",
            data: "{'CompanyCode':'"+company+"',"+
                	"minAuth: '"+ minAuth +"',"+
                	"maxAuth: '"+ maxAuth +"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		var Cliente = value.ApellidoP + ' ' + value.ApellidoM + ' ' + value.Nombre;
            		$('#idUsuario_SP').append('<option value="'+value.Nickname+'">'+ Cliente + '</option>');
    				$('#edtidUsuario_SP').append('<option value="'+value.Nickname+'">'+ Cliente +'</option>');  			         	    			          	
	
	    		});               

            },
            error: function (e) {
                ANIM.Error('Error al consultar las Usuario Supervisor');
            }
        });						
        
    };
    
    
    
    s_Reg();
    
    
    s_Usuario_Ven();
    s_Usuario();
    
    
    
    
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