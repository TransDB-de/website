import type { Entry } from "./entry.model";

export enum EEntryChangeProposalStatus {
	Open = 0,
	Accepted = 1,
	Rejected = 2
}

export enum EDataOrigin {
	User = 0,
	Member = 1,
	Machine = 2
}

export interface EntryChangeProposal {
	id: string;
	entryId: string;
	timestamp: Date;
	originalEntryState: Entry;
	changeProposal: Entry & { comment: string };
	status: EEntryChangeProposalStatus;
	userId: string;
	origin: EDataOrigin;
}
