import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";

import { initStore } from "./store/store";

const store = initStore();

const App = () => {
	const [state, setState] = useState(store.getState());
	useEffect(() => {
		store.subscribe(() => setState(store.getState()));
	}, []);
	const complete = (taskId) => {
		store.dispatch(actions.completeTask(taskId));
	};
	const changeTitle = (taskId) => {
		store.dispatch(actions.changeTitle(taskId));
	};

	const deleteTask = (taskId) => {
		store.dispatch(actions.deleteTask(taskId));
	};
	return (
		<>
			<h1>App</h1>
			<ul>
				{state.map((s) => (
					<li key={s.id}>
						<p>{s.title}</p>
						<p>{`Completed: ${s.completed}`}</p>
						<button onClick={() => complete(s.id)}>Complete</button>
						<button onClick={() => changeTitle(s.id)}>
							Change title
						</button>
						<button onClick={() => deleteTask(s.id)}>
							delete task
						</button>
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
