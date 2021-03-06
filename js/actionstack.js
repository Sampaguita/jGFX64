/**
 * managing a stack for undoing/redoing actions
 * */

var Actionstack = function() {
	this.init();
};

Actionstack.prototype.init = function() {
	this.maxSteps = 30;
	this.stack = [];
};




Actionstack.prototype.addAction = function(action) {
//	consoleDebug('adding action '+ action);
	var that = this;
	if(that.stack.length >= that.maxSteps) {
		that.stack.pop();
		that.stack.unshift(action);
	} else {
		that.stack.unshift(action);
	}
	gui.updateHistory();
};

Actionstack.prototype.undoLastAction = function() {
};

Actionstack.prototype.redoLastAction = function() {
};

/* setup actionstack */
Actionstack.prototype.setMaxSteps = function(value) {
	if((typeof value === 'number') && (Math.floor(value) === value)) {
		this.maxSteps = value;
	} else {
		consoleError('Actionstack.prototype.setMaxSteps: value is not an integer!', value);
	}
};
