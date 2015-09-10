
var draw = function(){
	/*====================================== DRAW DATA ====================================================*/
	var windowSize = 700;
	var CANVAS = document.getElementById("your_canvas");
	CANVAS.width=windowSize;//window.innerWidth*0.75;
	CANVAS.height=windowSize;//window.innerHeight*0.75;
	
	/*================================= Mouse Event ==================================================*/
	var AMORTIZATION = 0.95;
	var drag = false;
	
	var old_x, old_y;
	
	var dX = 0, dY = 0;
	
	var mouseDown=function(e){
		drag = true;
		old_x = e.pageX, old_y = e.pageY;
		e.preventDefault();
		return false;
	}
	
	var mouseUp=function(e){
		drag = false;
	}
	
	var mouseMove=function(e){
		if(!drag) return false;
		dY = old_y - e.pageY;
		if(dY > 0)
			VIEWMATRIX[14] = VIEWMATRIX[14] - 1;
		else if(dY < 0)
			VIEWMATRIX[14] = VIEWMATRIX[14] + 1;
		old_x = e.pageX, old_y = e.pageY;
		e.preventDefault();
	}
	
	CANVAS.addEventListener("mousedown", mouseDown, false);
	CANVAS.addEventListener("mouseup", mouseUp, false);
	CANVAS.addEventListener("mouseout", mouseUp, false);
	CANVAS.addEventListener("mousemove", mouseMove, false);
	
	/*========================= GET WEBGL CONTEXT ========================= */
	var GL;
	try {
		GL = CANVAS.getContext("experimental-webgl", {antialias: true});
	}catch (e) {
		alert("You are not webgl compatible :(") ;
    return false;
	}
	
	/*========================= SHADERS ==================================== */
	var shader_vertex_source="\n\
		attribute vec3 position;\n\
		uniform mat4 Pmatrix;\n\
		uniform mat4 Vmatrix;\n\
		uniform mat4 Mmatrix;\n\
		attribute vec3 color; //the color of the point\n\
		varying vec3 vColor;\n\
		void main(void) { //pre-built function\n\
		gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
		vColor=color;\n\
	}";

	var shader_fragment_source="\n\
		precision mediump float;\n\
		varying vec3 vColor;\n\
		void main(void) {\n\
		gl_FragColor = vec4(vColor, 1.);\n\
	}";

	var get_shader=function(source, type, typeString) {
		var shader = GL.createShader(type);
		GL.shaderSource(shader, source);
		GL.compileShader(shader);
		if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
			alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
			return false;
		}
		return shader;
	};

	var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
	var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

	var SHADER_PROGRAM=GL.createProgram();
	GL.attachShader(SHADER_PROGRAM, shader_vertex);
	GL.attachShader(SHADER_PROGRAM, shader_fragment);

	GL.linkProgram(SHADER_PROGRAM);

	var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
	var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
	var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
  
	var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
	var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

	GL.enableVertexAttribArray(_color);
	GL.enableVertexAttribArray(_position);

	GL.useProgram(SHADER_PROGRAM);
		
	/*================================= LINE_STRIPS ============================================*/
	//POINT
	var drawdata = readFile.dataLoad;
	var drawLine = new Array();
	for(var k=0; k < 4000; k++){
		drawLine[6*k] = balanceData[2*k]*0.5;
		drawLine[6*k+1] = balanceData[2*k+1]*0.5;
		drawLine[6*k+2] = 0;
		
		//color
		drawLine[6*k+3] = 1;
		drawLine[6*k+4] = 0;
		drawLine[6*k+5] = 0;
	}
	var DRAWLINE_VERTEX = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, DRAWLINE_VERTEX);
	GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(drawLine), GL.STATIC_DRAW);
	
	var Line_faces = new Array();
	for(var k = 0; k<4000; k++)
	{
			Line_faces[k] = k;
	}
	var LINE_FACES = GL.createBuffer();
	GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LINE_FACES);
	GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(Line_faces), GL.STATIC_DRAW);

	
	/*========================= MATRIX ========================= */
	var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
	var MOVEMATRIX=LIBS.get_I4();
	var VIEWMATRIX=LIBS.get_I4();

	LIBS.translateZ(VIEWMATRIX, -5);
	 var THETA=0, PHI=0;
	/*==================================== DRAWING ===============================================*/
	GL.clearColor(0.0, 0.0, 0.0, 0.0);
	
	GL.enable(GL.DEPTH_TEST);
	GL.depthFunc(GL.LEQUAL);
	
	GL.clearDepth(1.0);
	
	var animate = function(time){
					
		GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		
		GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
		GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
		GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
		
		//vertex
		GL.bindBuffer(GL.ARRAY_BUFFER, DRAWLINE_VERTEX);
		GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 4*(3+3), 0);
		GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4*(3+3) , 3*4); // color

		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, LINE_FACES);	
		GL.drawElements(GL.LINE_STRIP, 3999, GL.UNSIGNED_SHORT, 0);
		GL.flush();
		
		window.requestAnimationFrame(animate);
		
	};

	animate(0);
};
