import { createSlice } from "@reduxjs/toolkit";
import todoService from "../service/todos.service";
import { setErrors } from "./errors";

// const update = createAction("task/updated");
// const remove = createAction("task/removed");

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		update(state, action) {
			const index = state.entities.findIndex(
				(elem) => elem.id === action.payload.id
			);
			state.entities[index] = {
				...state.entities[index],
				...action.payload,
			};
		},
		remove(state, action) {
			const filtered = state.entities.filter(
				(elem) => elem.id !== action.payload.id
			);
			state.entities = filtered;
		},
		received(state, action) {
			state.entities = action.payload;
			state.isLoading = false;
		},
		taskRequested(state) {
			state.isLoading = true;
		},
		taskRequestFailed(state, action) {
			state.isLoading = false;
		},
		created(state, action) {
			state.entities.push(action.payload);
			state.isLoading = false;
		},
	},
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskRequestFailed, created } =
	actions;

export const loadTasks = () => async (dispatch) => {
	dispatch(taskRequested());
	try {
		const data = await todoService.fetch();
		console.log(data);
		dispatch(received(data));
	} catch (error) {
		dispatch(taskRequestFailed());
		dispatch(setErrors(error.message));
	}
};

export const createTask = (task) => async (dispatch) => {
	dispatch(taskRequested());
	try {
		const data = await todoService.addTask(task);
		dispatch(created(data));
	} catch (error) {
		dispatch(taskRequestFailed());
		dispatch(setErrors(error.message));
	}
};

export const taskComplete = (id) => (dispatch) => {
	dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
	return update({ id, title: `New title for task ${id}` });
}

export function taskDeleted(id) {
	return remove({ id });
}

export const getTaskList = () => (state) => state.tasks.entities;
export const getTasksIsLoading = () => (state) => state.tasks.isLoading;

// const taskReducer = createReducer(initialState, (builder) => {
// 	builder
// 		.addCase(update, (state, action) => {
// 			const index = state.findIndex(
// 				(elem) => elem.id === action.payload.id
// 			);
// 			state[index] = { ...state[index], ...action.payload };
// 		})
// 		.addCase(remove, (state, action) => {
// 			return state.filter((elem) => elem.id !== action.payload.id);
// 		});
// });
// function taskReducer(state, action) {
// 	switch (action.type) {
// 		case update.type: {
// 			const newArray = [...state];
// 			const index = newArray.findIndex(
// 				(elem) => elem.id === action.payload.id
// 			);
// 			newArray[index] = { ...newArray[index], ...action.payload };
// 			return newArray;
// 		}
// 		case remove.type: {
// 			const newArray = [...state];
// 			const filtered = newArray.filter(
// 				(elem) => elem.id !== action.payload.id
// 			);
// 			return filtered;
// 		}

// 		default:
// 			return state;
// 	}
// }

export default taskReducer;
