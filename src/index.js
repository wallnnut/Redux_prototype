import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getErrors } from "./store/errors";
import configureStore from "./store/store";
import {
	titleChanged,
	taskDeleted,
	taskComplete,
	loadTasks,
	getTaskList,
	getTasksIsLoading,
	createTask,
} from "./store/task";

const store = configureStore();

const App = () => {
	const state = useSelector(getTaskList());
	const isLoading = useSelector(getTasksIsLoading());
	const error = useSelector(getErrors());
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadTasks());
	}, []);

	const changeTitle = (taskId) => {
		dispatch(titleChanged(taskId));
	};

	const deleteTask = (taskId) => {
		dispatch(taskDeleted(taskId));
	};
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (error) {
		return <p>{error}</p>;
	}
	const task = {
		title: "some title",
		completed: false,
	};
	return (
		<>
			<h1>App</h1>
			<button onClick={() => dispatch(createTask(task))}>
				Добавить задачу
			</button>
			<ul>
				{state.map((s) => (
					<li key={s.id}>
						<p>{s.title}</p>
						<p>{`Completed: ${s.completed}`}</p>
						<button onClick={() => dispatch(taskComplete(s.id))}>
							Complete
						</button>
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
	<Provider store={store}>
		<App />
	</Provider>
);
