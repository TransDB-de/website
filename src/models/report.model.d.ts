export interface Report {
	id: string | null;
	type: "edit" | "report" | "other" | "";
	message: string;
}
