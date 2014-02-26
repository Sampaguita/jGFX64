/**
 * selecting, reading and writing files
 * */

var Image = function() {
	this.init();
};

Image.prototype.init = function() {
	this.data = [];
	this.colorMode = 'multicolor'; //hires|multicolor
	this.pixelWidth = 2;
	this.canvasWidth = 320;
	this.canvasHeight = 200;
	this.lineHeight = 8;

	this.setColorMode();
};

Image.prototype.setColorMode = function() {
	var that = this;
	$j('.setColorMode').on('click', function(e) {
		var selectedColorMode = $j(this).attr('data-content');

		switch(selectedColorMode){
			case 'multicolor':
				history.addAction('setColorMode('+ selectedColorMode +')');
				that.colorMode = selectedColorMode;
				that.showImage();
				break;
			case 'hires':
				history.addAction('setColorMode('+ selectedColorMode +')');
				that.colorMode = selectedColorMode;
				that.showImage();
				break;
			default:
				consoleError('color mode not supported: '+ colorMode);
				return false;
		}
	});
};

Image.prototype.showDataAsFormat = function(format) {
	var that = this;
	if(typeof format !== 'string') {
		consoleError('Image.prototype.showDataAsFormat: format is not a string!', format);
		return false;
	}
	switch(format) {
		// KOALA
		case 'kla': {
			if(imgData.data.length != imgData.filesize.kla) {
				consoleError('Filesize('+ imgData.data.length +' Bytes) wrong! Koala = 10003 Bytes');
				return false;
			}
			that.data.startAdr = imgData.data.slice(0,2);
			that.data.bitmap = imgData.data.slice(2,8002);
			that.data.screenRAM = imgData.data.slice(8002,9002);
			that.data.colorRAM = imgData.data.slice(9002,10002);
			that.data.bgColor = imgData.data.slice(10002,10003);
			that.colorMode = 'multicolor';
			that.pixelWidth = 2;
			history.addAction('showDataAsFormat(kla)');
			consoleInfo('*** KOALA format ***\nstartAdr:         2 Bytes\nbitmap:        8000 Bytes\nscreenRAM:     1000 Bytes\ncolorRAM:      1000 Bytes\nbgColor:          1 Byte\n================================\n              10003 Bytes', that.data);
			break;
		}
		// DOODLE
		case 'ddl': {
			if(imgData.data.length != imgData.filesize.ddl) {
				consoleError('Filesize('+ imgData.data.length +' Bytes) wrong! Doodle = 9216 Bytes');
				return false;
			}
			that.data.screenRAM = imgData.data.slice(0,1024);
			that.data.bitmap = imgData.data.slice(1024,9216);
			that.colorMode = 'hires';
			that.pixelWidth = 1;
			history.addAction('showDataAsFormat(ddl)');
			consoleInfo('*** DOODLE format ***\nscreenRAM:     1024 Bytes\nbitmap:        8192 Bytes\n================================\n               9216 Bytes', that.data);
			break;
		}
		// SPRITE - multicolor mode
		case 'spr_multi': {
			if(imgData.length != imgData.filesize.spr_multi) {
				consoleError('Filesize('+ imgData.data.length +' Bytes) wrong! Sprite = 64 Bytes');
				return false;
			}
			that.data.bitmap = imgData.data.slice(0,63);
			that.data.config = imgData.data.slice(63,64);
			that.colorMode = 'multicolor';
			that.pixelWidth = 2;
			history.addAction('showDataAsFormat(spr_multicolor)');
			consoleInfo('*** SPRITE format ***\nbitmap:        63 Bytes\nplaceholder:    1 Byte\n================================\n               64 Bytes', that.data);
			break;
		}
		// SPRITE - hires mode
		case 'spr_hires': {
			if(imgData.length != imgData.filesize.spr_hires) {
				consoleError('Filesize('+ imgData.data.length +' Bytes) wrong! Sprite = 64 Bytes');
				return false;
			}
			that.data.bitmap = imgData.data.slice(0,63);
			that.data.config = imgData.data.slice(63,64);
			that.colorMode = 'hires';
			that.pixelWidth = 1;
			history.addAction('showDataAsFormat(spr_hires)');
			consoleInfo('*** SPRITE format ***\nbitmap:        63 Bytes\nplaceholder:    1 Byte\n================================\n               64 Bytes', that.data);
			break;
		}
		default:
			consoleError('Image.prototype.showDataAsFormat: format unknown or not supported!', format);
			return false;
	}
	that.showImage();
};

Image.prototype.showImage = function() {
	var that = this;
	var color = new Array();
	var canvas = $j('#canvas-display #image');
	var canvasContent = false;
	var gfxLine = 0;
	var gfxBlock = 0;
	var gfxBlockLine = 0;
	switch(that.colorMode) {
		case 'multicolor':
			that.pixelWidth = 2;
			break;
		case 'hires':
			that.pixelWidth = 1;
			break;
		default:
			consoleError('no color mode set!');
	}
	var pixelHeight = gui.canvasZoom;
	var pixelWidth = that.pixelWidth*gui.canvasZoom;



	/* GRID */
	var canvasGridTag = '<canvas id="grid" class="canvas" height="'+ (that.canvasHeight*gui.canvasZoom) +'" width="'+ (that.canvasWidth*gui.canvasZoom) +'"></canvas>';
	if($j('canvas#grid').length > 0) { $j('canvas#grid').remove(); }
	canvas.append(canvasGridTag);
	var layerGrid = document.getElementById("grid");
	var ctxGrid = layerGrid.getContext("2d");
	ctxGrid.clearRect(0,0,that.canvasWidth*gui.canvasZoom,that.canvasHeight*gui.canvasZoom);

	var linesV = that.canvasHeight/that.lineHeight;
	var linesH = that.canvasWidth/that.lineHeight;
	ctxGrid.strokeStyle = "rgba(255,255,255,0.33)";
	for(var i=1; i<linesV; i++) {
		ctxGrid.beginPath();
		ctxGrid.moveTo(0,(i*that.lineHeight*gui.canvasZoom)+0.5);
		ctxGrid.lineTo(that.canvasWidth*gui.canvasZoom,(i*that.lineHeight*gui.canvasZoom)+0.5);
		ctxGrid.stroke();
	}
	for(var i=1; i<linesH; i++) {
		ctxGrid.beginPath();
		ctxGrid.moveTo((i*that.lineHeight*gui.canvasZoom)+0.5,0);
		ctxGrid.lineTo((i*that.lineHeight*gui.canvasZoom)+0.5,that.canvasWidth*gui.canvasZoom);
		ctxGrid.stroke();
	}




	/* IMAGE */
	var canvasPixelTag = '<canvas id="pixel" class="canvas" height="'+ (that.canvasHeight*gui.canvasZoom) +'" width="'+ (that.canvasWidth*gui.canvasZoom) +'"></canvas>';
	if($j('canvas#pixel').length > 0) { $j('canvas#pixel').remove(); }
	canvas.append(canvasPixelTag);
	var layerPixel = document.getElementById("pixel");
	var ctxPixel = layerPixel.getContext("2d");
	ctxPixel.clearRect(0,0,that.canvasWidth*gui.canvasZoom,that.canvasHeight*gui.canvasZoom);

	for(var i=0; i<1000; i++) {
		for(var j=0; j<8; j++) {
			var bitmapValue = that.data.bitmap[(i*8)+j];
			var pixelsPerLine = 8/that.pixelWidth;
			for(var k=0; k<pixelsPerLine; k++) {
				var pixelValue = Bin2Hex(bitmapValue.substr((k*that.pixelWidth),that.pixelWidth));

				switch(that.colorMode) {
					case 'multicolor':
						color[0] = Bin2Hex(that.data.bgColor);
						color[1] = Bin2Hex(that.data.screenRAM[i].substr(0,4));
						color[2] = Bin2Hex(that.data.screenRAM[i].substr(4,4));
						color[3] = Bin2Hex(that.data.colorRAM[i].substr(4,4));
						break;
					case 'hires':
						color[0] = Bin2Hex(that.data.bgColor);
						color[1] = Bin2Hex(that.data.screenRAM[i].substr(4,4));
						color[2] = Bin2Hex(that.data.screenRAM[i].substr(0,4));
						break;
					default:
						consoleError('no color mode set!');
				}
				var pixelPosX = (gfxBlock*that.lineHeight*gui.canvasZoom) + (k*pixelWidth);
				var pixelPosY = (gfxBlockLine*that.lineHeight*gui.canvasZoom) + (gfxLine*pixelHeight);
				var pixelColor = colorPalette[palette.currentPalette][color[pixelValue]];

//				if((i==0) && (j<2)){
//					consoleLog('Pixel#'+ k +' Color('+ pixelColor +') Line#'+ gfxLine +' Block#'+ gfxBlock +' BlockLine#'+ gfxBlockLine);
//					consoleInfo('X'+ pixelPosX +' Y'+ pixelPosY +' H'+ pixelHeight +' W'+ pixelWidth);
//				}
				ctxPixel.fillStyle = pixelColor;
				ctxPixel.fillRect(pixelPosX,pixelPosY,pixelWidth,pixelHeight);

				if(k==(pixelsPerLine-1)) { gfxLine = gfxLine+1 };
				if(gfxLine==that.lineHeight) { gfxBlock = gfxBlock+1; gfxLine=0; }
				if(gfxBlock==40) { gfxBlockLine = gfxBlockLine+1; gfxBlock=0; gfxLine=0; }
			}
		}
	}
	if(canvas.find('.canvas-block').length > 0) {
		canvas.find('.canvas-block').remove();
	}
	canvas.append(canvasContent);
};






















