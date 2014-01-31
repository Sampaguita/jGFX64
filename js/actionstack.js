/**
 * managing a stack for undoing/redoing actions
 * */

var Actionstack = function() {
	this.init();
};

Actionstack.prototype.init = function() {
	this.maxSteps = 10;
	this.stack = [];
};




Actionstack.prototype.addAction = function(action) {
	consoleDebug('adding action '+ action);
	if(this.stack.length >= this.maxSteps) {
		this.stack.pop();
		this.stack.unshift(action);
	} else {
		this.stack.unshift(action);
	}
};

Actionstack.prototype.undoLastAction = function() {
};

Actionstack.prototype.redoLastAction = function() {
};

Actionstack.prototype.showAllActions = function() {
	consoleDebug('show all actions:\n->'+ this.stack.join('\n->'));
	return this.stack;
};



/* setup actionstack */
Actionstack.prototype.setMaxSteps = function(value) {
	this.maxSteps = value;
};
