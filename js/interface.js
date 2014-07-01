/**
 * graphic user interface
 * */

var GUI = function() {
	this.init();
};

GUI.prototype.init = function() {
	this.defaultTheme = "darkTheme";
	this.currentTheme = '';
	this.defaultTool = 'paint';
	this.currentTool = '';
	this.toolsAreVisible = true;
	this.canvasHasGrid = false;
	this.canvasZoom = 1;
	this.mousePos = new Object();
	this.coordinatesCorrection = 1;
	this.buttonDown = 0;
	this.defaultColor = 0;
//	this.currentColor = false;
	this.currentColor = '#f00';


	this.resizeCanvas();
	this.showGrid();
	this.zoomCanvas();
	this.initCoordinates();
	this.updateHistory();
};

GUI.prototype.setTheme = function(theme) {
	var that = this;
	if(typeof(theme) !== "string") {theme = that.defaultTheme;}
	$j('body').removeClass(this.currentTheme).addClass(theme);
	this.currentTheme = theme;
};

GUI.prototype.setTool = function(tool) {
	var that = this;
	if(typeof(tool) !== "string") {tool = that.defaultTool;}
	$j('body').removeClass('mode-'+ that.currentTool).addClass('mode-'+ tool);
	$j('#paintTools ul li').removeClass('active');
	$j('#paintTools ul li.icon-'+ tool).addClass('active');
	$j('#paintTools ul li:not(.unavailable)').on('click', function() {
		$j('#paintTools ul li:not(.unavailable)').off();
		$j(this).removeClass('active');
		var selectedTool = $j(this).attr('class').substr(5);
		that.setTool(selectedTool);
	});
	this.currentTool = tool;
};

GUI.prototype.resizeCanvas = function() {
	var that = this;
	that.mousePos['offX'] = '';
	that.mousePos['offY'] = '';
	var windowHeight = $j(window).height();
	var windowWidth = $j(window).width();
	if(that.toolsAreVisible == true) {
		$j('#canvas').css('height', (windowHeight-150) +'px');
	} else {
		// do something
	}
	$j('#canvas').on('scroll', function() {
		var pos = $j(this).find('#canvas-display').position();
		that.mousePos['offX'] = pos.left;
		that.mousePos['offY'] = pos.top;
	});
	$j(window).on('resize', function() {
		$j(window).off();
		that.resizeCanvas();
	});
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
		image.showMouseLayer();
		image.showGridLayer();
		image.showImage();
		image.updateLayers();
		$j('#canvas-display').addClass('zoom-'+ that.canvasZoom);

		var canvasHeight = $j('#canvas').height();
		var canvasWidth = $j('#canvas').width();
		var imageHeight = $j('#canvas #image #grid').height();
		var imageWidth = $j('#canvas #image #grid').width();
		consoleLog(canvasHeight +'x'+ canvasWidth +'|'+ imageHeight +'x'+ imageWidth);
		if((imageHeight > canvasHeight) || (imageWidth > canvasWidth)) {
			$j('#canvas').addClass('bigImage');
		}
		$j('#canvas #image').css({'height':imageHeight +'px','width':imageWidth +'px'});

		// dirty but highly efficient bugfix to correct the coordinates after changing the zoom
		$j('#image').hide();
		setTimeout("$j('#image').css('display','')", 10);
		setTimeout("gui.initCoordinates()", 20);
	});
	$j('#canvas-display').addClass('zoom-'+ that.canvasZoom);
};

GUI.prototype.getMouseCoordinates = function() {
	var that = this;
	that.mousePos['x'] = false;
	that.mousePos['y'] = false;
	var tempMousePos = new Object();
	var canvas = document.getElementById('mouse');
	var canvasArea = canvas.getBoundingClientRect();
	$j('#canvas #image #mouse').on('mousemove', function(e) {
		var mOffX = (that.mousePos['offX'] < 0 ? that.mousePos['offX'] : 0);
		var mOffY = (that.mousePos['offY'] < 0 ? that.mousePos['offY'] : 0);

		var mX = Math.floor((e.clientX - canvasArea.left - mOffX)/that.canvasZoom/image.pixelWidth);
		var mY = Math.floor((e.clientY - canvasArea.top - mOffY)/that.canvasZoom);

		mX = (mX>=0 ? mX : false);
		mY = (mY>=0 ? mY : false);

		that.mousePos['x'] = mX;
		that.mousePos['y'] = mY;
		if(that.buttonDown > 0) {
			image.useTool(that.buttonDown);
		}
	});
	$j('#canvas #image #mouse').on('mouseout', function(e) {
		that.mousePos['x'] = false;
		that.mousePos['y'] = false;
		image.updateMouseLayer();
	});
	$j('#canvas #image #mouse').on('mousedown', function(e) {
		e.preventDefault();
		var layerId = image.addLayer();
		image.setLayer(layerId);
		switch (e.which) {
			case 1:
				// left mouse button
				$j('#coords').css('color','red');
				that.buttonDown = 1;
				break;
			case 2:
				// middle mouse button
				$j('#coords').css('color','green');
				that.buttonDown = 2;
				break;
			case 3:
				// right mouse button
				$j('#coords').css('color','blue');
				that.buttonDown = 3;
				break;
			default:
				$j('#coords').css('color','cyan');
				that.buttonDown = 0;
		}
		if(that.buttonDown > 0) {
			image.useTool(that.buttonDown);
		}
	});
	$j('#canvas #image #mouse').on('mouseup mouseout', function(e) {
		$j('#coords').css('color','');
		that.buttonDown = 0;
	});

	// prevent the browser to show the context menu
	$j(document).bind("contextmenu",function(e){
		e.preventDefault();
		return false;
	});
};

GUI.prototype.initCoordinates = function() {
	var that = this;
	if($j('#mouse').length > 0) {
		setTimeout('gui.getMouseCoordinates()', 10);
		setInterval('gui.showCoordinates()', 10);
	} else {
		setTimeout('gui.initCoordinates()', 100);
	}
};

GUI.prototype.showCoordinates = function() {
	var that = this;
	if(that.mousePos['x'] !== false) {
		$j('#coords').text('X:'+ (that.mousePos['x']+that.coordinatesCorrection) +' | Y:'+ (that.mousePos['y']+that.coordinatesCorrection));
		image.updateMouseLayer();
	} else {
		$j('#coords').text('X: | Y:');
	}
	return false;
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

