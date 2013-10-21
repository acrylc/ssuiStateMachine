// Sample test file for the state machine class
// Implements a simple draggable div which changes color when pressed.

// This test file tests keypress
// Click on the text input to put it in focus, every key press changes the div to a dfiferent color

// Record the location where the div was clicked.
function do_focus(e, attachedElement) {
    console.log("clicked");
    attachedElement.downX = e.clientX;
    attachedElement.downY = e.clientY;
    attachedElement.origLeft = parseInt(attachedElement.style.left) || 0;
    attachedElement.origTop = parseInt(attachedElement.style.top) || 0;

    $(attachedElement).data({'radius':'50'});
    setInterval( function(){
    	// console.log('throbbing');
    	$(attachedElement).width(    $(attachedElement).data('radius') );
    	$(attachedElement).height(    $(attachedElement).data('radius') );
    	$(attachedElement).css(  {'border-radius' : $(attachedElement).data('radius')/2 } );
    	$(attachedElement).data({ 'radius' :   ($(attachedElement).data('radius') + 1) % 100 } )  ;
    }, 30);

}
function start_move(e, attachedElement) {
    console.log("record down location: " + e.clientX + ", " + e.clientY);
    attachedElement.downX = e.clientX;
    attachedElement.downY = e.clientY;
    attachedElement.origLeft = parseInt(attachedElement.style.left) || 0;
    attachedElement.origTop = parseInt(attachedElement.style.top) || 0;
    attachedElement.style.backgroundColor = "rgb(40,40,60)";

}

// When the div is released, make its background color red again.
function color(e, attachedElement) {
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	console.log(attachedElement);
    // attachedElement.style.backgroundColor = "blue";
    attachedElement.style.backgroundColor = "rgb("+r+","+g+","+b+")";
}



// Provides the state machine description and creates a new state machine attached to myDiv
window.onload = function() {
    var myDiv = document.getElementById("myDiv");
	
	var myEvent = new CustomEvent("customSetInterval", {
	detail: {
		username: "davidwalsh"
	}
});

// Trigger it!

	var sampleDescription = {
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
			name: "focused",
			transitions: [
				{
					input: "mouseIn",
					action: color,
					endState: "colored"
				}
				
			]
		},
		{
			name: "colored",
			transitions: [
				{
					input: "mouseIn",
					action: color,
					endState: "colored"
				}
				
			]
		},

	]
	};

    var stateMachine = new StateMachine(sampleDescription, myDiv);

    setInterval( function(){
    	$('#myDiv').css({'top' : ((parseInt($('#myDiv').css('top')) +2)% 400 ) });
    	console.log('ta');
    },30);


};
