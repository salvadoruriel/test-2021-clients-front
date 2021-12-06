import axiosInstance, { MY_NAME } from "./axiosInstance";

//gets the lsit of employees
export const getEmployees = async () => {

	return axiosInstance.get(`employees/${MY_NAME}`)
		.then(res => {
			console.log('[getEmployees] ANS:', res);
			return res;
		})
		.catch(err => {
			console.warn('[getEmployees] ERROR: ', err);
			console.log('[getEmployees] ERROR-OBJ: ', { ...err });
			return err.response;
		})
}

export const getEmployeesByGroup = async (id) => {
	const params = {
		id
	}

	return axiosInstance.get(`employees/${MY_NAME}/getByGroup`, {params})
		.then(res => {
			console.log('[getEmployeesByGroup] ANS:', res);
			return res;
		})
		.catch(err => {
			console.warn('[getEmployeesByGroup] ERROR: ', err);
			console.log('[getEmployeesByGroup] ERROR-OBJ: ', { ...err });
			return err.response;
		})
}