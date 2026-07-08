export type EntryActivityType =
	| "Submitted"
	| "DuplicateDetected"
	| "Approved"
	| "Archived"
	| "Edited"
	| "Blocked"
	| "Unblocked"
	| "Reported"
	| "Deleted"
	| "Restored"
	| "GeoLocationFailed";

export interface DuplicateMatchAttachment {
	entryId: string;
	probability: number;
}

export interface EntryActivityAttachments {
	CmsTicketId?: string;
	ReportType?: string;
	PossibleDuplicate?: DuplicateMatchAttachment;
	RevertedActivityId?: string;
}

export interface EntryActivity {
	id: string;
	entryId: string;
	entryName?: string | null;
	type: EntryActivityType;
	timestamp?: string;
	userId?: string;
	comment?: string;
	attachments?: EntryActivityAttachments;
}
