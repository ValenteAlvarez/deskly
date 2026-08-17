from app.models.ticket import Priority, State

valid_transitions_dict = {
	State.OPEN: [State.IN_PROGRESS],
	State.IN_PROGRESS: [State.RESOLVED],
	State.RESOLVED: [State.CLOSED, State.REOPENED],
	State.CLOSED: [],
	State.REOPENED: [State.IN_PROGRESS]
}

def can_transition(prev: State, next: State) -> bool:
	if next in valid_transitions_dict[prev]:
		print(f'Transition from {prev} to {next} is valid')
		return True
	else:
		print(f'Transition from {prev} to {next} is NOT valid') 
		return False
