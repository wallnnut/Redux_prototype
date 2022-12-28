import { taskUpdated } from "./actionTypes";
import { taskDeleted } from "./actionTypes";

export function taskReducer(state, action) {
	switch (action.type) {
		case taskUpdated: {
			const newArray = [...state];
			const index = newArray.findIndex(
				(elem) => elem.id === action.payload.id
			);
			newArray[index] = { ...newArray[index], ...action.payload };
			return newArray;
		}
		case taskDeleted: {
			const newArray = [...state];
			const filtered = newArray.filter(
				(elem) => elem.id !== action.payload.id
			);
			return filtered;
		}

		default:
			return state;
	}
}
