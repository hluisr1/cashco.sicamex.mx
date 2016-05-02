$(document).ready(function () {	
	
	//var domin = 'http://sub.sicamex.mx/adminweb';
	var domin = "http://localhost/AdminWeb";	
	
    window.s_Reg = function (CompanyCODE) {
    	
    	 //var win_app = new ActiveXObject("WScript.shell"); win_app.run("notepad.exe", 1, True); 
						
		console.log('Consultando ');
		
		var TiempoMax = 10;
		
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/KillSleep",
            data: "{'CompanyCode':'"+CompanyCODE+"', "+
            "TimeElapsed: "+TiempoMax+" " +
            "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	
            	console.log(data);
            	        	
	        	
				updateVDD();  		
	    		

            },
            error: function (e) {
                console.log('Error al consultar los ...');
            }
        });        

    };
    
    window.s_Reg_VDD = function (CompanyCODE) {
        var TiempoMax = 10;
		$.ajax({
            type: "POST",
            url: domin + "/fWS.asmx/KillSleep",
            data: "{'CompanyCode':'"+CompanyCODE+"', "+
            "TimeElapsed: "+TiempoMax+" " +
            "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {	        	
				console.log('DRAW... ' + CompanyCODE);
				console.log(data);
            },
            error: function (e) {
                console.log('Error al consultar los ...');
            }
        });        

    };
    
    
    function updateVDD(){
    	
    	//console.log('DRAW..');
    	/*
    	SCMEX765FG2R
		BYDSA98GY1B3
		CASH48J9GX7Y
		ONTIME56SD09
		BYDSA0MTY3Z7
		*/
		
    	s_Reg_VDD('BYDSA0MTY3Z7');
    	//s_Reg_VDD('CASH48J9GX7Y');
    	
    	setTimeout(updateVDD, 1000);
    	 			
    			
    };
    
   
    s_Reg('BYDSA0MTY3Z7');
    
    
    
   



});