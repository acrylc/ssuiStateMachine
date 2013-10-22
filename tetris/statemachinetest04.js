// Sample test file for the state machine class
// Implements a simple draggable div which changes color when pressed.

// This test file tests keypress
// Click on the text input to put it in focus, every key press changes the div to a dfiferent color


function start_move(e, attachedElement) {
    $(attachedElement).focus();
    $(document).click( function(){
		$(attachedElement).focus();
    });
    var animation = setInterval( function(){
    	if (tetris.checkMoveValidity( (parseInt($(attachedElement).css('top')) + parseInt($(attachedElement).css('height')) + 2),parseInt($(attachedElement).css('left'))  , attachedElement ) == true){
    		$(attachedElement).css({'top' : ((parseInt($(attachedElement).css('top')) + 2) ) });
    	} else {
			var myEvent = new CustomEvent("stopTetrisPiece");
			$(attachedElement)[0].dispatchEvent(myEvent);
			stopAnimation();
    	} 
    },30);
    var stopAnimation = function(){
    	clearInterval(animation);
    }
}

function stop(e, attachedElement){
	console.log('stopped!');

	for (var i=0;i<$(attachedElement).children().length;i++){
		console.log($($(attachedElement).children()[i]).css('top'));
		var y = parseInt($(attachedElement).css('top'))+ parseInt($($(attachedElement).children()[i]).css('top'));
		var x = parseInt($(attachedElement).css('left'))+ parseInt($($(attachedElement).children()[i]).css('left'));
		y = Math.floor(y/32);
		x = Math.floor(x/32);
		console.log(y);
		console.log(x);
		tetris.grid[y][x] = 1;
	}

	var myEvent = new CustomEvent("appendTetrisPiece", {
	detail: {
		oldPiece: attachedElement
	}});
	var div = $('#tetrisContainer')[0];
	console.log(div);
	div.dispatchEvent(myEvent);

}

function addNewTetrisPiece(e, attachedElement){
	console.log('here');
	console.log(e.detail);
	tetris.appendTetrisPiece();
}


function rotate(event, attachedElement) {

	if ($(attachedElement).data('rotation')==undefined){
		$(attachedElement).data({'rotation':0});
	}

	// SPACEBAR press, rotate tetris piece 
	if (event.which == 32) {
		degree = $(attachedElement).data('rotation');
		var t = $(attachedElement).css('top');
		console.log('top was ' + t);
		var l = $(attachedElement).css('left');
				console.log('left was ' + l);

	    $(attachedElement).css({

	                '-webkit-transform': 'rotate(' + degree + 'deg)  ',

	                	    	    	'-webkit-transform-origin':' 0% 0%;',

   	    	    	'-moz-transform-origin':' 0% 0%;',
	                '-moz-transform': 'rotate(' + degree + 'deg) ',
   	    	    	'-ms-transform-origin':' 0% 00%;',
	                '-ms-transform': 'rotate(' + degree + 'deg)  ',
   	    	    	'-o-transform-origin':' 0% 00%;',
	                '-o-transform': 'rotate(' + degree + 'deg) ',
	    	    	'transform-origin':' 0% 0%;',
	                'transform': 'rotate(' + degree + 'deg) '
		});

		$(attachedElement).data({'rotation': ((degree+90)%360)});
		// $(attachedElement).css({'top': parseInt(t)});
		// console.log('top is ' + $(attachedElement).css('top'));
		// $(attachedElement).css({'left': (parseInt(l)+2)});
		// 		console.log('left is ' + $(attachedElement).css('left'));

	}

	// J press, move piece right 
	var stepSize = 32;
	if (event.which == 106) {
    		if ( ( parseInt($(attachedElement).css('left'))-stepSize ) <= 0 ){
    			$(attachedElement).css({'left' : (parseInt( $('#tetrisContainer').css('width')))-stepSize}); 
    		} else 
			$(attachedElement).css({'left' : ( parseInt($(attachedElement).css('left'))-stepSize ) });
	}
	// K  press, move tetris piece left 
	if (event.which == 107) {
			$(attachedElement).css({'left' : (( parseInt($(attachedElement).css('left'))+stepSize )% (parseInt( $('#tetrisContainer').css('width')))) });
	}

}




var tetris = new App.Tetris(32, '#tetrisContainer');

// Provides the state machine description and creates a new state machine attached to myDiv
window.onload = function() {
    // var myDiv = document.getElementById("myDiv");
	
	var myEvent = new CustomEvent("appendTetrisPiece", {
	detail: {
		oldPiece: ''
	}});
	var div = $('#tetrisContainer')[0];
	console.log(div);

    var myContainer = $('#tetrisContainer')[0];

	var tetrisDescription = {
		states: [
		{
			name: "start",
			transitions: [
				{
					input: "appendTetrisPiece", 
					action: tetris.appendTetrisPiece,
					endState: "waiting"
				},
			]
		},
		{
			name: "waiting",
			transitions: [
				{
					input: "appendTetrisPiece",
					action: addNewTetrisPiece,
					endState: "waiting"
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

	var stateMachine = new StateMachine(tetrisDescription, myContainer);

	myContainer.dispatchEvent(myEvent);



};
