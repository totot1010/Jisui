import { cookies } from "next/headers";

export type ApiError = {
	type: "error";
	status: string;
	title?: string;
	message?: string;
};

export type ApiResponse<ResponseType> =
	| { type: "success"; data: ResponseType }
	| ApiError;

export const isApiError = (
	response: ApiResponse<unknown>,
): response is ApiError => {
	return response.type === "error";
};

export const ApiClient = () => {
	const Get = async <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
	): Promise<ApiResponse<ResponseType>> => {
		// paramsをクエリパラメータに変換
		const queryString = params ? requestToUrlSearch(params).toString() : "";
		// クエリパラメータがあればURLに追加
		const requestUrl = queryString ? `${path}?${queryString}` : path;

		return request(requestUrl, "GET", undefined, auth);
	};
	const Post = <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
	): Promise<ApiResponse<ResponseType>> => request(path, "POST", params, auth);
	const Put = <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
	): Promise<ApiResponse<ResponseType>> => request(path, "PUT", params,auth);
	const Delete = <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
	): Promise<ApiResponse<ResponseType>> => request(path, "DELETE", params,auth);

	return {
		Get,
		Post,
		Put,
		Delete,
	};
};

const requestToUrlSearch = <
	RequestType extends Record<string, unknown> | Record<string, unknown>[],
>(
	request: RequestType,
) => {
	const searchParams = new URLSearchParams();
	Object.entries(request).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((v) => searchParams.append(`${key}[]`, String(v)));
		} else {
			searchParams.append(key, String(value));
		}
	});
	return searchParams;
};

const request = async <RequestType = undefined, ResponseType = unknown>(
	path: string,
	method: string,
	params?: RequestType,
	auth: boolean = true,
): Promise<ApiResponse<ResponseType>> => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	if (auth && !accessToken) {
		return {
			type: "error",
			status: "401",
			message: "Unauthorized",
		};
	}

	const settings = {
		BaseUrl: process.env.API_ENDPOINT,
	};
	const url = `${settings.BaseUrl}${path}`;
	const options: RequestInit = {
		method,
		credentials: "include",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Authorization": auth ? `Bearer ${accessToken}` : "",
		},
	};

	if (method !== "GET" && params) {
		options.body = JSON.stringify(params);
	}

	const response = await fetch(url, options);
	return handleResponse<ResponseType>(response);
};

const handleResponse = async <ResponseType>(
	response: Response,
): Promise<ApiResponse<ResponseType>> => {
	if (!response.ok) {
		const errorData = await response.json();
		return {
			type: "error",
			status: response.status.toString(),
			title: errorData.title,
			message: errorData.message || "An error occurred",
		};
	}

	// 204 No Contentの場合はレスポンスボディがないため、空オブジェクトを返す
	if (response.status === 204) {
		return { type: "success", data: {} as ResponseType };
	}

	const data = (await response.json()) as ResponseType;
	return { type: "success", data };
};
