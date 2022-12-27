import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

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
	const listeners = [];
	function getState() {
		return state;
	}
	function dispatch(action) {
		state = reducer(state, action);
		for (let i = 0; i < listeners.length; i++) {
			const listener = listeners[i];
			listener();
		}
	}
	function subscribe(listener) {
		listeners.push(listener);
	}
	return { getState, dispatch, subscribe };
}
const store = createStore(taskReducer, [
	{
		id: 1,
		description: "description",
		completed: false,
	},
	{
		id: 2,
		description: "description2",
		completed: false,
	},
]);
const App = () => {
	const [state, setState] = useState(store.getState());
	useEffect(() => {
		store.subscribe(() => setState(store.getState()));
	}, []);
	const complete = (elementId) => {
		store.dispatch({
			type: "task/completed",
			payload: { id: elementId },
		});
	};
	return (
		<>
			<h1>App</h1>
			<ul>
				{state.map((s) => (
					<li key={s.id}>
						<p>{s.description}</p>
						<p>{`Completed: ${s.completed}`}</p>
						<button onClick={() => complete(s.id)}>Complete</button>
						<hr />
					</li>
				))}
			</ul>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
