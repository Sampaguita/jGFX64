/**
 * selecting, reading and writing files
 * */

var Palette = function() {
	this.init();
};

Palette.prototype.init = function() {
	this.defaultPalette = "palette-c64-pepto";
	this.currentPalette = '';
};

Palette.prototype.setPalette = function(palette) {
	var that = this;
	if(typeof(palette) !== "string") {palette = that.defaultPalette;}
	if(that.currentPalette != '') {
		$j("body").removeClass(that.currentPalette);
	}
	that.currentPalette = palette;
	$j('body').addClass(palette);
	consoleDebug('current palette: '+ that.currentPalette);
};

var colorPalette = new Object();

colorPalette['palette-c64-pepto'] = new Object();
colorPalette['palette-c64-pepto']['0'] = 'rgb(0,0,0)';
colorPalette['palette-c64-pepto']['1'] = 'rgb(255,255,255)';
colorPalette['palette-c64-pepto']['2'] = 'rgb(104,55,43)';
colorPalette['palette-c64-pepto']['3'] = 'rgb(112,164,178)';
colorPalette['palette-c64-pepto']['4'] = 'rgb(111,61,134)';
colorPalette['palette-c64-pepto']['5'] = 'rgb(88,141,67)';
colorPalette['palette-c64-pepto']['6'] = 'rgb(53,40,121)';
colorPalette['palette-c64-pepto']['7'] = 'rgb(184,199,111)';
colorPalette['palette-c64-pepto']['8'] = 'rgb(111,79,37)';
colorPalette['palette-c64-pepto']['9'] = 'rgb(67,57,0)';
colorPalette['palette-c64-pepto']['A'] = 'rgb(154,103,89)';
colorPalette['palette-c64-pepto']['B'] = 'rgb(68,68,68)';
colorPalette['palette-c64-pepto']['C'] = 'rgb(108,108,108)';
colorPalette['palette-c64-pepto']['D'] = 'rgb(154,210,132)';
colorPalette['palette-c64-pepto']['E'] = 'rgb(108,94,181)';
colorPalette['palette-c64-pepto']['F'] = 'rgb(149,149,149)';

colorPalette['palette-c64-straight'] = new Object();
colorPalette['palette-c64-straight']['0'] = 'rgb(0,0,0)';
colorPalette['palette-c64-straight']['1'] = 'rgb(255,255,255)';
colorPalette['palette-c64-straight']['2'] = 'rgb(255,0,0)';
colorPalette['palette-c64-straight']['3'] = 'rgb(0,255,255)';
colorPalette['palette-c64-straight']['4'] = 'rgb(255,0,255)';
colorPalette['palette-c64-straight']['5'] = 'rgb(0,255,0)';
colorPalette['palette-c64-straight']['6'] = 'rgb(0,0,255)';
colorPalette['palette-c64-straight']['7'] = 'rgb(255,255,0)';
colorPalette['palette-c64-straight']['8'] = 'rgb(255,127,0)';
colorPalette['palette-c64-straight']['9'] = 'rgb(127,63,0)';
colorPalette['palette-c64-straight']['A'] = 'rgb(255,127,127)';
colorPalette['palette-c64-straight']['B'] = 'rgb(63,63,63)';
colorPalette['palette-c64-straight']['C'] = 'rgb(127,127,127)';
colorPalette['palette-c64-straight']['D'] = 'rgb(127,255,127)';
colorPalette['palette-c64-straight']['E'] = 'rgb(127,127,255)';
colorPalette['palette-c64-straight']['F'] = 'rgb(191,191,191)';
