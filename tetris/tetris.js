
var App = App || {};

// Tetris takes as input the tetris piece side length and the container, 
// and creates a tetris object consisting of a grid of 10 x 15 squares
App.Tetris = function( tpSideLength, container ){

	this.container = container;
	this.tpSideLength = tpSideLength;
	this.grid = [];
	for (var i=0;i<15;i++){
			this.grid[i] = [];
		for (var j=0;j<10;j++){
			this.grid[i][j] = 0;
		}
	}
}

// Checks if a tetris move is valid or not
App.Tetris.prototype.checkMoveValidity = function ( positionY , positionX , attachedElement){
	var x = Math.floor(positionX/this.tpSideLength) ;
	var y = Math.floor(positionY/this.tpSideLength) ;


	// console.log('CHECKING X ' + x + ' and Y ' + y );
	//console.log("grid x length" + this.grid[0].length);
	// Check if we hit the boundaries
	if ( y >= this.grid.length ){
		return false;
	}

	// Check if we hit another tetris piece
		for (var i=0;i<$(attachedElement).children().length;i++){
		console.log($($(attachedElement).children()[i]).css('top'));
		var y = parseInt($(attachedElement).css('top'))+ parseInt($($(attachedElement).children()[i]).css('top'));
		var x = parseInt($(attachedElement).css('left'))+ parseInt($($(attachedElement).children()[i]).css('left'));
		y = Math.floor(y/32);
		x = Math.floor(x/32);
		console.log(y);
		console.log(x);
		if (tetris.grid[y+1][x+1] == 1){
			return false;
		}
	}

	// if (this.grid[y][x] == 1){
	// 	console.log('is 1');
	// 	return false;
	// } else {
		return true;
	// }

}

// Add a new tetris unit
App.Tetris.prototype.appendTetrisPiece = function (){

	var tetrisPiece = $('<div class="myDiv" style="top:0px; left:0px" tabindex="-1"></div>').appendTo( $('#tetrisContainer') );
	for (var i=1;i<5;i++){
		tetrisPiece.append('<div class="square" id="p'+i+'"></div>');
	}

	var myEvent = new CustomEvent("customSetInterval", {
	detail: {
		username: "davidwalsh"
	}});

	myDiv = $(tetrisPiece)[0];

	var tetrisPieceDescription = {
		states: [
		{
			name: "start",
			transitions: [
				{
					input: "timerTick30Ms", 
					action: start_move,
					endState: "moving"
				},
			]
		},
		{
			name: "moving",
			transitions: [
				{
					input: "keyPress",
					action: rotate,
					endState: "moving"
				}, 
				{
					input: "stopTetrisPiece", 
					action: stop,
					endState: "stop"
				}
			]
		}
		]
	};

	var stateMachine = new StateMachine(tetrisPieceDescription, myDiv);
	myDiv.dispatchEvent(myEvent);
	console.log( $(myDiv).css('top') );



}
