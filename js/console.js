/**
 * Created with JetBrains PhpStorm.
 * User: djatzke
 * Date: 06.05.13
 * Time: 11:28
 * To change this template use File | Settings | File Templates.
 */

if(typeof _globalVar != "undefined") {
} else {
	_globalVar = {
		debugMode: 0
	};
}

var consoleLog = function(text) {
	if((typeof console != "undefined") && (_globalVar.debugMode == 5)) {
		console.log(text);
	} else {
		return false;
	}
};

var consoleDebug = function(text, obj) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 4)) {
		console.debug("%cDEBUG: "+ text, "background-color:#ccf;color:#008;");
		if(typeof obj != "undefined") console.log(obj);
	} else {
		return false;
	}
};

var consoleInfo = function(text, obj) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 3)) {
		console.info("%cINFO: "+ text, "background-color:#cfc;color:#080;");
		if(typeof obj != "undefined") console.log(obj);
	} else {
		return false;
	}
};

var consoleWarn = function(text, obj) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 2)) {
		console.warn("%cWARNING: "+ text, "background-color:#eec;color:#880;");
		if(typeof obj != "undefined") console.log(obj);
	} else {
		return false;
	}
};

var consoleError = function(text, obj) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 1)) {
		console.error("%cERROR: "+ text, "background-color:#fdd;color:#700;");
		if(typeof obj != "undefined") console.log(obj);
	} else {
		return false;
	}
};

var consoleTimeStart = function(text) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 3)) {
		console.time(text);
	} else {
		return false;
	}
};

var consoleTimeStop = function(text) {
	if((typeof console != "undefined") && (_globalVar.debugMode >= 3)) {
		console.timeEnd(text);
	} else {
		return false;
	}
};
