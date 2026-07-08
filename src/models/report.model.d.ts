export interface Report {
	id: string | null;
	type: "Report" | "Edit" | "Other" | "";
	message: string;
}
