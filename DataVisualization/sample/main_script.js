function readFile() {

	var files = document.getElementById('files').files;
	if(!files.length){
		alert('파일을 선택해주세요');
	}
	
	var file = files[0];
	document.getElementById('fileSize').textContext = file.size + "bytes";
	
	var reader = new FileReader();
	
	reader.onload = function(){
		var content = document.getElementById('fileContent');
		content.textContent = event.target.result;
		
	};
	
	reader.onerror = function(event){
		var errcode = event.target.error.code;
			if(errcode == 1)
				alert("File을 찾지 못하였습니다.");
	};
	//===================================== Data Load =====================================//
/*
var maxData = 4000;
var balanceData = new Array(maxData,2);
var smoothedData = new Array(maxData,2);

var loader = new Boolean(false);
var nData = 0;

var DataLoad = function(){
	
	var filename = files;
	var fileObject = new ActiveXObject("Scripting.FileSystemObject");
	
	if(fileObject.FileExists(filename))
	{
		var fOpen = fileObject.OpenTextFile(filename,1);
		var c;
		var readingX =  new Boolean(true);
		var x; var y;
		var count = 0;
		
		while( (fOpen.read()) != -1 && count<maxData){
			if(c == '+'){
				var base = 100; x=0; y=0;
				for(var i=0; i<3; i++){
					c=fin.read();
                	if(readingX)
						x += (c-'0')*base;
                	else
						y+= (c-'0')*base;
                	base /= 10;
				}
				if(readingX)
					balanceData[count][0] = x;
               	else
					balanceData[count][1] = y;
               	readingX = readingX?false:true;
               	if(readingX)
					count++;
			}
			else if(c=='-') {
               	var base = 100; x=0; y=0;
               	for(var i=0;i<3;i++) {
               		c=fin.read();
               		if(readingX)
						x += (c-'0')*base;
               		else
						y+= (c-'0')*base;
               		base /= 10;
                	}
               	if(readingX)
					x*=-1.0;
               	else
					y*=-1.0;
               	if(readingX)
					balanceData[count][0] = x;
               	else
					balanceData[count][1] = y;
               	readingX = readingX?false:true;
               	if(readingX)
					count++;
            }
            if(c<10) break;
		}
		this.nData = count;
        if(count>=1000)
			loaded = true;
        fOpen.close();
	}
		
};
	
	*/
	reader.readAsText(file);
//	document.write(balanceData[0][1]);
};
/*
var main = function(){
		
//===================================== Data Load =====================================//

final int maxData = 4000;
double balanceData[][] = new double[maxData][2];
double smoothedData[][] = new double[maxData][2];

boolean loaded = false;
int nData = 0;

var DataLoad = function(){
	
	var filename = file;
	var fileObject = new ActiveXObject("Scripting.FileSystemObject");
	
	if(fileObject.FileExists(filename))
	{
		var fOpen = fileObject.OpenTextFile(filename,1);
		int c;
		boolean readingX = true;
		float x; float y;
		int count = 0;
		
		while( (fOpen.read()) != -1 && count<maxData){
			if(c == '+'){
				int base = 100; x=0; y=0;
				for(int i=0; i<3; i++){
					c=fin.read();
                	if(readingX)
						x += (c-'0')*base;
                	else
						y+= (c-'0')*base;
                	base /= 10;
				}
				if(readingX)
					balanceData[count][0] = x;
               	else
					balanceData[count][1] = y;
               	readingX = readingX?false:true;
               	if(readingX)
					count++;
			}
			else if(c=='-') {
               	int base = 100; x=0; y=0;
               	for(int i=0;i<3;i++) {
               		c=fin.read();
               		if(readingX)
						x += (c-'0')*base;
               		else
						y+= (c-'0')*base;
               		base /= 10;
                	}
               	if(readingX)
					x*=-1.0;
               	else
					y*=-1.0;
               	if(readingX)
					balanceData[count][0] = x;
               	else
					balanceData[count][1] = y;
               	readingX = readingX?false:true;
               	if(readingX)
					count++;
            }
            if(c<10) break;
		}
		this.nData = count;
        if(count>=1000)
			loaded = true;
        fOpen.close();
	}
		
};
};*/

