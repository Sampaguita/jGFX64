/**
 * selecting, reading and writing files
 * */

var Data = function() {
	this.init();
};

Data.prototype.init = function() {
	this.filesize = {};
	this.filesize.kla = 10003;
	this.filesize.ddl = 9216;
	this.filesize.spr_multi = 64;
	this.filesize.spr_hires = 64;
	this.data = [];
};

Data.prototype.getBinaryFromFile = function(filename) {
	var that = this;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", filename, false); // getting the file synchronously!
	oReq.responseType = "arraybuffer";

	oReq.onload = function(oEvent) {
		var arrayBuffer = oReq.response; // Note: not oReq.responseText
		if (arrayBuffer) {
			var byteArray = new Uint8Array(arrayBuffer);
			for (var i = 0; i < byteArray.byteLength; i++) {
				that.data[i] = pad(Dec2Bin(byteArray[i]),8);
			}
			history.addAction('getBinaryFromFile('+ filename +')');
		}
		return false;
	};

	oReq.send(null);
};

Data.prototype.saveBinaryToFile = function(binary, filename) {
};
