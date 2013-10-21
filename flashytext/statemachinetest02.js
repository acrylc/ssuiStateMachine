// Sample test file for the state machine class
// Implements a simple draggable div which changes color when pressed.

// This test file tests keypress
// Click on the text input to put it in focus, every key press changes the div to a dfiferent color

// Record the location where the div was clicked.
function do_focus(e, attachedElement) {
    console.log("record down location: " + e.clientX + ", " + e.clientY);
    attachedElement.downX = e.clientX;
    attachedElement.downY = e.clientY;
    attachedElement.origLeft = parseInt(attachedElement.style.left) || 0;
    attachedElement.origTop = parseInt(attachedElement.style.top) || 0;
    attachedElement.style.backgroundColor = "white";

}
function do_unfocus(e, attachedElement) {
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
					input: "focus", 
					action: do_focus,
					endState: "focused"
				},
			]
		},
		{
			name: "focused",
			transitions: [
				{
					input: "keyPress",
					action: color,
					endState: "colored"
				}, 
				{
					input: 'focusout',
					action: do_unfocus,
					endState:'start'
				}
			]
		},
		{
			name: "colored",
			transitions: [
				{
					input: "keyPress",
					action: color,
					endState: "colored"
				}, 
				{
					input: 'focusout',
					action: do_unfocus,
					endState:'start'
				}
				
			]
		},

	]
	};

    var stateMachine = new StateMachine(sampleDescription, myDiv);
    myDiv.dispatchEvent(myEvent);

};
