import httpService from "./http.service";

const todoEndPoint = "todos/";

const todoService = {
	fetch: async () => {
		const { data } = await httpService.get(todoEndPoint, {
			params: {
				_page: 1,
				_limit: 10,
			},
		});
		return data;
	},
	addTask: async (payload) => {
		const { data } = await httpService.post(todoEndPoint, payload);
		return data;
	},
};

export default todoService;
