import { AuthFailedError, type ValidationErrorMap } from "$models/error";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { parseValidationErrors } from "./utils";
import { popupWarn } from "$components/popup.svelte";
import { t } from "./localization.svelte";

type errorCases = number | "default";

type handlerFunctions = Record<errorCases, (response?: AxiosResponse) => unknown>;

export function requestErrorHandler(
	err: unknown | Error | AxiosError,
	handlers: handlerFunctions
): ValidationErrorMap {
	// Catch auth errors
	if (err instanceof AuthFailedError) {
		if (handlers[401]) {
			handlers[401]();
		}
		return {};
	}

	// actual error handlers
	if (axios.isAxiosError(err) && err.response) {
		// catch validation errors and parse them
		if (err.response.status === 422 && err.response.data?.problems) {
			if (handlers[422]) {
				handlers[422](err.response);
			}

			const errors = parseValidationErrors(err.response.data.problems);
			return errors;
		}

		// catch other errors with specific handlers
		if (handlers[err.response.status]) {
			handlers[err.response.status](err.response);
		}

		return {};
	}

	handlers["default"]();
	return {};
}

interface ApiRequestHandlerResult<T> {
	success: boolean;
	data: T | null;
	handleErrors: (handlers: handlerFunctions) => ReturnType<typeof requestErrorHandler>;
}

/**
 * An elegant way to resolve promises with better readable code
 * @param task a promise to resolve
 * @returns array with first element being the result and second element a requestErrorHandler with validation errors included
 */
export async function apiRequestHandler<T>(
	task: Promise<AxiosResponse<T>>
): Promise<ApiRequestHandlerResult<T>> {
	try {
		const res = await task;
		return { success: true, data: res.data, handleErrors: () => ({}) };
	} catch (e) {
		return {
			success: false,
			data: null,
			handleErrors: (handlers) => requestErrorHandler(e, handlers)
		};
	}
}
