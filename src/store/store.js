import { createStore } from "redux";
import { taskReducer } from "./taskReducer";
const initialState = [
	{
		id: 1,
		title: "description",
		completed: false,
	},
	{
		id: 2,
		title: "description2",
		completed: false,
	},
];

export function initStore() {
	return createStore(taskReducer, initialState);
}
