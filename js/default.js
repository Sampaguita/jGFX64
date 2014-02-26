_globalVar = {
	debugMode: 5
};
consoleTimeStart('default.js');
var history = new Actionstack();
var imgData = new Data();
var palette = new Palette();
var image = new Image();
var gui = new GUI();


$j(document).ready(function() {
	if(_globalVar.debugMode >= 1) {
		consoleWarn("Debug mode: "+ _globalVar.debugMode);
	}
	initGUI();

	imgData.getBinaryFromFile('files/dry-stun-kill.kla');
//	imgData.getBinaryFromFile('files/sx64ual_healing.kla');
//	consoleInfo('file content', imgData.data);

	image.showDataAsFormat('kla');
//	image.showDataAsFormat(imgData, 'ddl');

	consoleTimeStop('default.js');
});





var initGUI = function() {
	gui.setTheme();
	$j('.setTheme').on('click', function(e) {
		e.preventDefault();
		gui.setTheme($j(this).attr('data-content'));
	});
	palette.setPalette('palette-c64-pepto');
	$j('.setColorPalette').on('click', function(e) {
		e.preventDefault();
		palette.setPalette($j(this).attr('data-content'));
		image.showImage();
	});
};




































/**
 * see: http://stackoverflow.com/a/12987042/2858492
 * */
//Usefull Functions
function checkBin(n){return/^[01]{1,64}$/.test(n)}
function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
function unpad(s){s=""+s;return s.replace(/^0+/,'')}

//Decimal operations
function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16).toUpperCase()}

//Binary Operations
function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16).toUpperCase()}

//Hexadecimal Operations
function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
function Hex2Dec(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(10)}