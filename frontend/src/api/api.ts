import { cookies } from "next/headers";
import { ApiResponse } from "./types";

export const ApiClient = () => {
	const Get = async <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
		nextOptions: { next: { tags: string[] } } | undefined = undefined,
	): Promise<ApiResponse<ResponseType>> => {
		// paramsをクエリパラメータに変換
		const queryString = params ? requestToUrlSearch(params).toString() : "";
		// クエリパラメータがあればURLに追加
		const requestUrl = queryString ? `${path}?${queryString}` : path;

		return request(requestUrl, "GET", undefined, auth, nextOptions);
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
	): Promise<ApiResponse<ResponseType>> => request(path, "PUT", params, auth);
	const Delete = <RequestType = undefined, ResponseType = unknown>(
		path: string,
		params?: RequestType,
		auth: boolean = true,
	): Promise<ApiResponse<ResponseType>> => request(path, "DELETE", params, auth);

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
	nextOptions: { next: { tags: string[] } } | undefined = undefined,
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
			"Authorization": auth ? `Bearer ${accessToken}` : "",
		}
	};

	// リクエストがFormData以外の場合はContent-Typeをapplication/jsonに設定
	if (params && !(params instanceof FormData)) {
		options.headers = {
			...options.headers,
			"Content-Type": "application/json",
		}
	}

	if (method !== "GET" && params) {
		if (params instanceof FormData) {
			// FormDataの場合はそのまま設定
			options.body = params;
		} else {
			// FormData以外の場合はJSON形式に変換
			options.body = JSON.stringify(params);
		}
	}

	if (method === "GET" && nextOptions) {
		options.next = nextOptions.next;
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
