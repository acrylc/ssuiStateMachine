/** 
  * @desc 	Initalizes a State Machine object and binds it to an 
  * 		element in the DOM. Binds event listeners to the DOM object
  * @param 	description - description of the state machine object
  *			elementToAttach - the DOM elment to attach the state machine to
*/  
function StateMachine(description, elementToAttach) {


	// Set the state machine's fields given the inital parameters
	// currentState = the current state of the statemachine
	// stateTable = the description
	// domElement = the DOM object to attach the state machine to
	this.stateTable = description.states;
	this.currentState = description.states[0].name;
	this.domElement = elementToAttach;

	// Attach the statemachine to its DOM element 
	$(elementToAttach).data({
		'stateMachine' : this
	});

	// Arrays of the rawInputEvents and the corresponsding stateMachineEvents
	// where rawInputEvent[i] will be tranlsated into stateMachineEvent[i] which
	// can be interpreted by the state machine.
	var rawInputEvents = ['mousedown', 'mouseup', 'click', 'mousemove', 'mouseover', 'mouseout', 'keypress', 'customSetInterval', 'focus', 'focusout', 'stopTetrisPiece', 'appendTetrisPiece','appendNewTetrisPiece'];
	var stateMachineEvents = ['mouseDown','mouseUp','click','mouseMove','mouseIn','mouseOut','keyPress', 'timerTick30Ms','focus','focusout', 'stopTetrisPiece', 'appendTetrisPiece','appendNewTetrisPiece'];

	var that = this;

	// Bind each raw input event to the updating the state of the machine given
	// its corresponding state machine interpretable events.
	for (var i=0;i<rawInputEvents.length;i++){

		(function(){ var input_type = stateMachineEvents[i];

		$(elementToAttach).bind(rawInputEvents[i], function(event){
			that.updateState(event, input_type);
		}); }());
	}
}

/** 
  * @desc 	When an event occurs, updates the state of the state machine
  * 		by completeing the proper action and updating the state
  * @param 	input_event - description of the state machine object
  *			input_type  - the DOM elment to attach the state machine to
*/  
StateMachine.prototype.updateState = function( input_event, input_type ){

	var transitions = [];

	// Find the proper transitions for the current state
	for (var i=0;i<this.stateTable.length;i++){
		if (this.stateTable[i].name == this.currentState){
			transitions = this.stateTable[i].transitions;
		}
	}

	// Given the input_event, call the proper action and update
	// the state of the state machine
	for (var i=0;i<transitions.length;i++){
		if (transitions[i].input == input_type){
			transitions[i].action( input_event, this.domElement );
			this.currentState = transitions[i].endState;
		}
	}
}
