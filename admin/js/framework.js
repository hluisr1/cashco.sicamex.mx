

window.S_PERM = function (idUsuario) {
    	var PERM_OBJ = new Array();
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_PermisoUsuario",
            data: "{'CompanyCode':'"+company+"', "+
            			"'idUsuario':'"+idUsuario+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {            	
            	//console.log('A');
            	var dta = JSON.parse(msg.d);
            	//console.log(dta);
            	var obj = [];
            	$.each(dta, function (index, P) {            		
            		obj[P.idPagina+'-'+P.Pagina] = {C: P.C, R: P.R, U: P.U, D: P.D};
            		//PERM_OBJ.push(obj[P.Pagina]);	
	    		});
	    		
	    		PERM_OBJ.push(obj);PERM_OBJ = PERM_OBJ[0];
	    		console.log(PERM_OBJ);
	    		
	    		return PERM_OBJ;				
				//console.log(obj[0]);
            },
            error: function (e) {           	
                ANIM.Error('Error al consultar los Servicios | '+ e);
                return 0;
            }
        });

    };
        

var METODOS = function(){
	
	this.EXPORT = function(Headers, DATA, filename){
		
		var infCSV = '';
		var bndHeaders = false; 
		$.each(DATA, function(indx, obj){
		    //console.log(DATA);
			if(!bndHeaders){
			    $.each(Headers, function (ind, h) {
			        //console.log(h);
					h.H = h.str == true ? h.H.replace(/,/g, '.') : h.H;
					h.H = h.H == 'null' ? h.F : h.H;
					
					infCSV += h.H + ',';
				});				
				infCSV += '\r\n';
				bndHeaders = true;
			}
			
			$.each(Headers, function (ind, h) {
			    /*console.log(Headers);
			    console.log(h);
			    console.log(ind);*/
			    try { obj[h.F] = h.str == true ? obj[h.F].replace(/,/g, '.') : obj[h.F]; }
			    catch (ex) { obj[h.F] = 'ex'}
				
				infCSV += obj[h.F] + ',';
			});
				
			infCSV += '\r\n';
			
		});
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		var yyyy = today.getFullYear();
		
		var hoy = yyyy + '-' + mm + '-' + (dd);
		

		var a = document.createElement('a');
		//a.href     = 'data:attachment/csv,' + csvString;
		a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(infCSV);
		a.target   = '_blank';
		a.download = hoy + '_' + filename+ '_' + today.getTime() + '.csv';
		document.body.appendChild(a);
		a.click();
		console.log('-.-3');
	};

	this.CAST_DATE = function(Fecha)
	{
		var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
		var d = new Date(parseInt(milli));
		
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return d.toLocaleDateString();//Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	};
	
	this.CAST_HOUR = function(Fecha)
	{
		var milli = Fecha.replace(/\/Date\((-?\d+)\)\//, '$1');
		var d = new Date(parseInt(milli));
		
		//console.log(d);
		
		var SP = '/';
		Fecha = Fecha.split(' ', 1);
		Fecha = Fecha[0].split('/');
		
		return d.toLocaleTimeString();//Fecha[2] + SP + Fecha[1] + SP + Fecha[0];		
	};
	
	this.COMMA = function(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	
	this.TODAY = function(){
		var today = new Date();
		//console.log(today);
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		mm = (mm+'').length > 1 ? mm : '0'+mm;
		dd = (dd+'').length > 1 ? dd : '0'+dd;
		
		hoy = yyyy + '-' + mm + '-' + (dd);
		
		return hoy;
	};

	this.GET_ROW_FRAGMENT_OBJ = function(id, OBJ)
	{
		var frag = '<tr>';
		
		$.each(OBJ, function(indx, C){
			frag += '<td>'+C+'</td>';
		});
		
		frag = frag += '<td >'+							
							'<a id="edt-'+id+'" class="table-link danger edt-'+id+'">'+
								'<span class="fa-stack">'+
									'<i class="fa fa-square fa-stack-2x"></i>'+
									'<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>'+
								'</span>'+
							'</a>'+							
						'</td>'+
					'</tr>';
			
		$(frag).css('display', 'none');
			
		return frag;
	};
	
	this.GET_SELECT_ITEM = function(DTA){
		var ITEMS = '';
		$.each(DTA, function (index, value) {			
    		ITEMS += '<option class="elmnt" value="'+value.id+'">'+ value.text +'</option>';
		});
		
		return ITEMS;
	};
	
	this.CAST_LTR_DATE = function(FECHA){
		/*Viernes 21 de Agosto */
		
		var Dias = ['Lunes', 'Martes', 'Miercole', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
		var Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		
		var ff = this.CAST_DATE(FECHA);//PASA LA FECHA A FORMATO LEGIBLE.
		var dd = new Date(ff.split('/')[2] + '-' +ff.split('/')[1] + '-' + ff.split('/')[0]);//YYYY-MM-DD
		
		var ltrF = Dias[(dd.getDay()-1)] + ' ' + dd.getDate() + ' de ' + Meses[dd.getMonth()];
		
		return ltrF;
	};
	
};

var CRUD = function(ID_PAGE, MOD_OBJ, INI_PAGE){
	
	this.PERM = {C: true, R: false, U: false, D: false};
	
	this.ID_PAGE = ID_PAGE;
	
	this.MOD_OBJ = MOD_OBJ;//{C: '', R: '', U: '', D: ''};
	

	this.VERIF = function(PERM, MOD_OBJ){
		console.log(this.ID_PAGE);console.log(PERM);
		var P = 4;
		if(!PERM.C && MOD_OBJ.C!= 'null'){$(MOD_OBJ.C).hide(); P--;}
		if(!PERM.R && MOD_OBJ.R!= 'null'){$(MOD_OBJ.R).remove(); P--;}
		else{INI_PAGE();}
		if(!PERM.U && MOD_OBJ.U!= 'null'){$(MOD_OBJ.U).hide(); P--;}
		if(!PERM.D && MOD_OBJ.D!= 'null'){$(MOD_OBJ.D).hide(); P--;}
		
		if(P==0){alert('REDIRECT, YOU DON´T HAVA ACCESS.');}
	};
	
	
	this.C = function(trigger, callback){
		$(trigger).on('click', function(){
			callback();
		});
	};
	
	this.R = function(){
		
	};
	
	this.U = function(trigger, callback){
		$(trigger).on('click', function(){
			callback();
		});
	};
	
	this.D = function(trigger, callback){
		$(trigger).on('click', function(){
			callback();
		});
	};
	
	
	this.S_PERM = function (idUsuario) {
		var THIS = this;
    	var PERM_OBJ = new Array();
    	$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/s_PermisoUsuario",
            data: "{'CompanyCode':'"+company+"', "+
            			"'idUsuario':'"+idUsuario+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {            	
            	//console.log('A');
            	var dta = JSON.parse(msg.d);
            	//console.log(dta);
            	var obj = [];
            	$.each(dta, function (index, P) {            		
            		obj[P.idPagina+'-'+P.Pagina] = {C: P.C, R: P.R, U: P.U, D: P.D};
            		//PERM_OBJ.push(obj[P.Pagina]);	
	    		});
	    		
	    		PERM_OBJ.push(obj);PERM_OBJ = PERM_OBJ[0];
	    		//console.log(PERM_OBJ);
	    		
	    		THIS.VERIF(PERM_OBJ[THIS.ID_PAGE], THIS.MOD_OBJ);
	    		
	    		//return PERM_OBJ;				
				//console.log(obj[0]);
            },
            error: function (e) {           	
                ANIM.Error('Error al consultar los Servicios | '+ e);
                //return 0;
            }
        });

    };
	
	
	//--------------------------------------
	//----------------INI-------------------
	//--------------------------------------	
	
	this.PERM = this.S_PERM(getUserSession().Nickname);
	//console.log(this.PERM);
	
	
	
};

var bttn = document.getElementById( 'SAVE' );
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




window.FRAME_MENU = function (Page) {
    	
    	var frame = '<div class="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">'+	
			'<ul class="nav nav-pills nav-stacked">'+
				'<li class="nav-header nav-header-first hidden-sm hidden-xs">'+
					'Modulos'+
				'</li>'+
				'<li>'+
					'<a href="cedis.html">'+
						'<i class="fa fa-building"></i>'+
						'<span>CEDIS</span>'+											
					'</a>'+
				'</li>'+									
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-users"></i>'+
						'<span>Usuarios</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+											
						'<li>'+
							'<a href="tipo-usuario.html">'+
								'Tipos de Usuario'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="usuario.html">'+
								'Usuarios'+
							'</a>'+
						'</li>'+
					'</ul>'+
				'</li>'+									
				'<li>'+ //'<li class="active">'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-cubes"></i>'+
						'<span>Productos</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="marca.html">'+
								'Marcas'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="grupo.html">'+
								'Grupos'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="producto.html">'+
								'Productos'+
							'</a>'+
						'</li>'+
						'<li>'+ //'<li class="active">'+
							'<a href="lista.html">'+
								'Listas'+
							'</a>'+
						'</li>' +
                        
						/*'<li>'+
							'<a href="promocion.html">'+
								'Promoción'+
							'</a>'+
						'</li>'+*/
					'</ul>'+
				'</li>'+									
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-child"></i>'+
						'<span>Clientes</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="cliente.html">'+
								'Clientes'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="direccion.html">'+
								'Direcciones'+
							'</a>'+
						'</li>'+
						/*'<li>'+
							'<a href="foto.html">'+
								'Fotos'+
							'</a>'+
						'</li>'+*/
					'</ul>'+
				'</li>'+									
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-truck"></i>'+
						'<span>Rutas</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="tipo-ruta.html">'+
								'Tipos de Ruta'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="ruta.html">'+
								'Ruta'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="index-recorrido.html">'+
								'Recorridos'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="estatus-visita.html">'+
								'Estatus de Visita'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="visita-cliente.html">'+
								'Visita a Cliente'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="frecuencia-visita.html">'+
								'Frecuencia de Visita'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="orden-visita.html">'+
								'Orden de Visita'+
							'</a>'+
						'</li>' +
                        '<li>' + //'<li class="active">'+
							'<a href="carga-ruta.html">' +
								'Cargas' +
							'</a>' +
						'</li>' +
					'</ul>'+
				'</li>'+
				'<li>'+
					'<a href="index-secuencia.html">'+
						'<i class="fa fa-car"></i>'+
						'<span>Reingenieria</span>'+											
					'</a>'+
				'</li>'+									
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-expand"></i>'+
						'<span>Ventas</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="entregas.html">'+
								'Entregas'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="devoluciones.html">'+
								'Devoluciones'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="pagos.html">'+
								'Pagos'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="factura.html">'+
								'Facturas'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="deposito.html">'+
								'Depositos en Ruta'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="liquidacion.html">'+
								'Liquidación'+
							'</a>'+
						'</li>'+											
						'<li>'+
							'<a href="cobranza.html">'+
								'Cobranza'+
							'</a>'+
						'</li>'+
					'</ul>'+
				'</li>'+									
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-th"></i>'+
						'<span>Stock</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="stock.html">'+
								'En Bodega'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="usuario-carga.html">'+
								'Carga de Usuario'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="usuario-carga-fac.html">'+
								'Carga Facturas'+
							'</a>'+
						'</li>'+											
					'</ul>'+
				'</li>'+																		
				'<li>'+
					'<a href="#" class="dropdown-toggle">'+
						'<i class="fa fa-mobile"></i>'+
						'<span>Equipos</span>'+
						'<i class="fa fa-angle-right drop-icon"></i>'+
					'</a>'+
					'<ul class="submenu">'+
						'<li>'+
							'<a href="tipo-equipo.html">'+
								'Tipo de Equipo'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="equipo.html">'+
								'Equipo'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="equipo-usuario.html">'+
								'Equipo Usuario'+
							'</a>'+
						'</li>'+																					
					'</ul>'+
				'</li>'+									
				'<li>'+
					'<a href="asuetos.html">'+
						'<i class="fa fa-calendar"></i>'+
						'<span>Asuetos</span>'+											
					'</a>'+
				'</li>'+									
				'<li class="nav-header hidden-sm hidden-xs">'+
					'Reportes'+
				'</li>'+
			'</ul>'+
		'</div>';
		
		
		$('#frame_menu div').remove();
		$('#frame_menu').append(frame);
		
		//alert($('#frame_menu').attr('page'));
		
		//$("li a[href='"+$('#frame_menu').attr('page')+"']").addClass( "active" );
		$("li:has(a[href='"+$('#frame_menu').attr('page')+"'])").addClass( "active" );
		//$("li ul li a[href='"+$('#frame_menu').attr('page')+"']").addClass( "open" );
		//$("li a[href='lista.html']").addClass( "active" );
		    			


};


FRAME_MENU();




