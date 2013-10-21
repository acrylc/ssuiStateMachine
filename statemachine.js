// Your task is to fill in the rest of this file with your state machine, and then save
// the file to statemachine.js.
function StateMachine(description, elementToAttach) {

	this.stateTable = description.states;
	this.currentState = description.states[0].name;
	this.domElement = elementToAttach;

	$(elementToAttach).data({
		'stateMachine' : this
	});

	var domEvents = ['mousedown', 'mouseup', 'click', 'mousemove', 'mouseover', 'mouseout', 'keypress', 'customSetInterval', 'focus', 'focusout'];
	var stateMachineEvents = ['mouseDown','mouseUp','click','mouseMove','mouseIn','mouseOut','keyPress', 'timerTick30Ms','focus','focusout'];
	// var domEvents = ['mousedown'];
	// var stateMachineEvents = ['mouseDown'];

	var that = this;

	console.log((elementToAttach));
(elementToAttach).addEventListener("customSetInterval", function(e) {
	console.info("Event is: ", e);
	console.info("Custom data is: ", e.detail);
})


	for (var i=0;i<domEvents.length;i++){

		(function(){ var input_type = stateMachineEvents[i];

		$(elementToAttach).bind(domEvents[i], function(event){
			that.updateState(event, input_type);
		}); }());

	}
	// input_type = stateMachineEvents[ domEvents.length ];

}

StateMachine.prototype.updateState = function( input_event, input_type ){

	var transitions = [];

	for (var i=0;i<this.stateTable.length;i++){
		if (this.stateTable[i].name == this.currentState){
			transitions = this.stateTable[i].transitions;
		}
	}

	for (var i=0;i<transitions.length;i++){
		if (transitions[i].input == input_type){
			transitions[i].action( input_event, this.domElement );
			this.currentState = transitions[i].endState;
		}
	}
}
