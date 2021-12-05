export interface Report {
	id: string,
	type: "edit" | "report" | "other" | "",
	message: string
}
