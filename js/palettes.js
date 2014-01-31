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

