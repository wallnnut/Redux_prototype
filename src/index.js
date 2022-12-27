import React from 'react';
import ReactDOM from 'react-dom/client';

function createStore(initialState) {
	let state = initialState;
	function getState() {
		return state;
	}
	function dispatch(action) {
		if (action.type === "task/completed") {
			const newArray = new Array(state);
			const index = newArray.findIndex(
				(elem) => elem.id === action.payload.id
			);

			newArray[index].completed = true;
			state = newArray;
			console.log(state);
		}
	}
	return { getState, dispatch };
}
const store = createStore({
	id: 1,
	description: "description",
	completed: false,
});
const App = () => {
	return (
		<>
			<button
				onClick={() =>
					store.dispatch({
						type: "task/completed",
						payload: { id: 1 },
					})
				}
			>
				Complete
			</button>
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

