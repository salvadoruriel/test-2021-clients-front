import axios from "axios";

export const MY_NAME = 'salvador_aguirre';

const axiosInstance = axios.create({
	baseURL: 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/'
})

//unify reading from response
axiosInstance.interceptors.response.use(
	(response) => {
		return { data: response.data.data, status: response.status }
	},
	(error) => {
		let errAns = error

		if (error.response) {
			errAns.response.message = error.response.data?.message
		}
		else {
			errAns.response = {
				status: 500,
				message: 'Error connecting with server'
			}
		}

		return Promise.reject(errAns)
	}
);

export default axiosInstance;