this.readFile = function() {
	
	var file = document.getElementById("file").files[0];
		
	document.getElementById("fileName").textContent = file.name;
	document.getElementById("fileSize").textContent = "(" + file.size + "bytes)";

				
	var reader = new FileReader();
	
	this.balanceData = new Array();
	var smoothedData = new Array();
	var a,b,c,d,count;
	var ArrayNumber = 0;	
			
	reader.onload = function(){

		dataLoad();
	};
		
	reader.onerror = function(event){
		var errcode = event.target.error.code;
			if(errcode == 1)
				alert("File을 찾지 못하였습니다.");
	};
	
	var dataLoad = function()
	{
		var i = 0;	
	
		var display = document.getElementById("content");
		var result = reader.result;

		while(1){
			if(result[i] == '+'){
				a = +1;
				count = 0;
			}
			else if(result[i] == '-'){
				a = -1;
				count = 0;
			}
			else if(result[i] == 'C')
				break;
			else{
				if (count == 1)
					b = parseInt(result[i]) * 100;
				else if (count == 2)
					c = parseInt(result[i]) * 10;
				else if (count == 3){
					d = parseInt(result[i]);
					balanceData[ArrayNumber] = a*(b+c+d);
					ArrayNumber++;
				}
			}
			i++;
			count++;
		}
		for(var k=0; k<8000; k++)
			smoothedData[k] = balanceData[k];
		for(var k = 0; k < 8000; k++)
		{
			var l = k - 2;
			var m = k + 2;
			var mid = 0;
			if( l >= 0 && m < 8000)
			{
				mid = (smoothedData[l] + smoothedData[m]) *0.5;
				smoothedData[k] = (mid + smoothedData[k]) *0.5
			}
		}
		var s1 = new Array();
		for(var k=0; k<4000; k++)
		{
			s1[3*k] = balanceData[2*k];
			s1[3*k+1] = balanceData[2*k+1];
			s1[3*k+2] = 0;
		}
		display.textContent = balanceData;
		return balanceData;
	};
	
	var encodingList = document.getElementById("encoding");
	var encoding = encodingList.options[encodingList.selectedIndex].value;

	reader.readAsText(file);
	
};
