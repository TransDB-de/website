import type { ApiValidationProblem } from "$models/error";
import { t, type TranslationMapping } from "./localization.svelte";

/**
 * Parse input validation problems from the api and transform them into a flat map.
 * @param problems Validation problems returned from the api (422 response)
 * @param translate Function to resolve a validation code to a human-readable message
 */
export function parseValidationErrors(problems: ApiValidationProblem[]): Record<string, string> {
	let errors: Record<string, string> = {};

	for (const problem of problems) {
		if (errors[problem.property]) {
			continue;
		}

		errors[problem.property] = t(`errors.validation` as keyof TranslationMapping)[
			problem.code
		] as string;
	}

	return errors;
}
