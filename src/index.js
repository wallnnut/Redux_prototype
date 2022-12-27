import React from 'react';
import ReactDOM from 'react-dom/client';

function taskReducer(state, action) {
	switch (action.type) {
		case "task/completed":
			const newArray = [...state];
			const index = newArray.findIndex(
				(elem) => elem.id === action.payload.id
			);

			newArray[index].completed = true;
			return newArray;

		default:
			break;
	}
}

function createStore(reducer, initialState) {
	let state = initialState;
	function getState() {
		return state;
	}
	function dispatch(action) {
		return (state = taskReducer(state, action));
	}
	return { getState, dispatch };
}
const store = createStore(taskReducer, [
	{
		id: 1,
		description: "description",
		completed: false,
	},
]);
const App = () => {
	const complete = () => {
		store.dispatch({
			type: "task/completed",
			payload: { id: 1 },
		});
		console.log(store.getState());
	};
	return (
		<>
			<button onClick={complete}>Complete</button>
			<h1>App</h1>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

