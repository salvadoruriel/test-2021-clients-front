import axiosInstance, { MY_NAME } from "./axiosInstance";

//posts a new employee
//	{name, last_name, birthday}
export const postEmployees = async (body) => {
	console.log('sending:', body)

	return axiosInstance.post(`employees/${MY_NAME}`, body)
		.then(res => {
			console.log('[postEmployees] ANS:', res);
			return res;
		})
		.catch(err => {
			console.warn('[postEmployees] ERROR: ', err);
			console.log('[postEmployees] ERROR-OBJ: ', { ...err });
			return err.response;
		})
}