const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchJson = async (url, options = {}) => {
	const response = await fetch(url, options);
	const payload = await response.json();

	if (!response.ok) {
		throw new Error(payload.message || "API request failed");
	}

	return payload;
};

export const getIssueMapData = async (filters = {}) => {
	const query = new URLSearchParams();

	if (filters.severity) {
		query.set("severity", filters.severity);
	}

	if (filters.status) {
		query.set("status", filters.status);
	}

	const endpoint = query.toString()
		? `${API_URL}/v1/issues/map?${query.toString()}`
		: `${API_URL}/v1/issues/map`;

	return fetchJson(endpoint);
};

export default API_URL;