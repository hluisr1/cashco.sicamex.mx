$(document).ready(function () {


    //var domin = "http://localhost:15451";

    //var company = "SCMEX765FG2R";

    /*
    SCMEX765FG2R
    BYDSA98GY1B3
    CASH48J9GX7Y
    ONTIME56SD09
    */	
		
	var tabla = 'Cobranza';
	
							
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
		
	function getRowFragment(idUsuario, Liquidado, PagadoCliente, EntregadoCliente, ALiquidar, PendienteLiquidar, PendienteCobrar)
	{
		var clase = 'success">Completado';
		if((ALiquidar + PendienteLiquidar + PendienteCobrar) > 0)
		{
			clase = 'warning">Pendiente';
		}
		
		var frag = '<tr>'+
						'<td>'+idUsuario+'</td>'+
						'<td style="color:#27A823;">'+Liquidado+'</td>'+
						'<td style="color:#27A823;">'+PagadoCliente+'</td>'+
						'<td style="color:#E6291C;">'+EntregadoCliente+'</td>'+
						'<td style="color:#25CCC9;">'+ALiquidar+'</td>'+
						'<td style="color:#25CCC9;">'+PendienteLiquidar+'</td>'+
						'<td style="color:#E6291C;">'+PendienteCobrar+'</td>'+
						'<td >'+
							//<span class="label label-success">Completado</span>
								'<span class="label label-'+
								clase +
								'</span>'+				
						'</td>'+
					'</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	}


	window.s_Reg = function () {
						
		console.log('Consultando '+tabla);
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_Cobranza",
            data: "{'CompanyCode':'"+company+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	
    			$('#tablaDatos tbody tr').remove();
            	
            	var dta = JSON.parse(msg.d);
            	$.each(dta, function (index, value) {
            		
            		//id, Folio, idUsuario, uApellidoP, uApellidoM, uNombre, idFactura, fCargado
	    			$('#tablaDatos tbody').append($(getRowFragment(value.idUsuario, value.Liquidado, value.PagadoCliente, value.EntregadoCliente, value.ALiquidar, value.PendienteLiquidar, value.PendienteCobrar)).fadeIn(0));	    			
	    			
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
        
    
    s_Reg();
    
    
    
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