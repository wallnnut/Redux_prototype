import * as actionTypes from "./actionTypes";
export function completeTask(id) {
	return {
		type: actionTypes.taskUpdated,
		payload: { id, completed: true },
	};
}

export function changeTitle(id) {
	return {
		type: actionTypes.taskUpdated,
		payload: { id, title: `New title for task ${id}` },
	};
}

export function deleteTask(id) {
	return {
		type: actionTypes.taskDeleted,
		payload: { id },
	};
}
