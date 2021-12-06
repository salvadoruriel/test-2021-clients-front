import axiosInstance, { MY_NAME } from "./axiosInstance";

//gets the lsit of employees
export const getGroups = async () => {

	return axiosInstance.get(`groups/${MY_NAME}`)
		.then(res => {
			console.log('[getGroups] ANS:', res);
			return res;
		})
		.catch(err => {
			console.warn('[getGroups] ERROR: ', err);
			console.log('[getGroups] ERROR-OBJ: ', { ...err });
			return err.response;
		})
}