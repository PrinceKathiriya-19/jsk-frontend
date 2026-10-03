import axios from 'axios';
import type { AxiosResponse } from 'axios';

const BACKEND_BASE_URL = import.meta.env.VITE_REACT_BACKEND_URL || 'http://localhost:8085';

export interface Response<T = any> {
	success: boolean;
	statusCode?: number;
	message?: string;
	data?: T;
	errormsg?: string;
}

export const handleUnauthorizedUser = () => {
	localStorage.removeItem('jsk_usertoken');
	localStorage.removeItem('jsk_customer_session');
	localStorage.removeItem('jsk_admin_auth');
};

const axiosInstance = axios.create({
	baseURL: BACKEND_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('jsk_usertoken');
		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			handleUnauthorizedUser();
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
