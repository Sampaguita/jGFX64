/**
 * graphic user interface
 * */

var GUI = function() {
	this.init();
};

GUI.prototype.init = function() {
	this.defaultTheme = "darkTheme";
	this.currentTheme = '';
	this.toolsAreVisible = true;
	this.canvasHasGrid = false;
	this.canvasZoom = 1;

	this.resizeCanvas();
	this.showGrid();
	this.zoomCanvas();
	this.updateHistory();
};

GUI.prototype.setTheme = function(theme) {
	var that = this;
	if(typeof(theme) !== "string") {theme = that.defaultTheme;}
	$j('body').removeClass(this.currentTheme).addClass(theme);
	this.currentTheme = theme;
};

GUI.prototype.showPaintTools = function() {
	var that = this;
};

GUI.prototype.resizeCanvas = function() {
	var that = this;
	var windowHeight = $j(window).height();
	var windowWidth = $j(window).width();
	if(that.toolsAreVisible == true) {
		$j('#canvas').css('height', (windowHeight-200) +'px');
	} else {

	}
};

GUI.prototype.showGrid = function() {
	var that = this;
	$j('#workspace input#grid').on('change', function() {
		if($j(this).prop('checked') == true) {
			that.canvasHasGrid = true;
		} else {
			that.canvasHasGrid = false;
		}
		if(that.canvasHasGrid == true) {
			$j('#canvas-display').addClass('hasGrid');
		} else {
			$j('#canvas-display').removeClass('hasGrid');
		}
	});
	if(that.canvasHasGrid == true) {
		$j('#canvas-display').addClass('hasGrid');
	} else {
		$j('#canvas-display').removeClass('hasGrid');
	}
};

GUI.prototype.zoomCanvas = function() {
	var that = this;
	$j('#workspace #canvas-zoom').on('change', function() {
		$j('#canvas').removeClass('bigImage');
		$j('#canvas-display').removeClass('zoom-'+ that.canvasZoom);
		that.canvasZoom = $j(this).val();
		image.showImage();
		$j('#canvas-display').addClass('zoom-'+ that.canvasZoom);

		var canvasHeight = $j('#canvas').height();
		var canvasWidth = $j('#canvas').width();
		var imageHeight = $j('#canvas #image #pixel').height();
		var imageWidth = $j('#canvas #image #pixel').width();
		consoleLog(canvasHeight +'x'+ canvasWidth +'|'+ imageHeight +'x'+ imageWidth);
		if((imageHeight > canvasHeight) || (imageWidth > canvasWidth)) {
			$j('#canvas').addClass('bigImage');
		}
	});
	$j('#canvas-display').addClass('zoom-'+ that.canvasZoom);
};

GUI.prototype.updateHistory = function() {
	var that = this;
	var historyToolsList = $j('#historyTools ul');
	var historyStack = history.stack;
	var stackLength = historyStack.length;
	if(stackLength > 0) {
		historyToolsList.find('li').remove();
		for(var i=0; i<stackLength; i++) {
			var currentAction = historyStack[i];
			historyToolsList.append('<li class="list-group-item">'+ currentAction +'</li>');
		}
	} else {
		historyToolsList.append('<li class="list-group-item unavailable">no actions found</li>');
	}
};

