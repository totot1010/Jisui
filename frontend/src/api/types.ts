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