import type { Address, Entry } from "./entry.model";

export enum EEntryChangeProposalStatus {
	Open = "Open",
	Accepted = "Accepted",
	Rejected = "Rejected"
}

export enum EDataOrigin {
	User = "User",
	Member = "Member",
	Machine = "Machine"
}

/**
 * Just the content fields of an entry, nothing else - no id, status, location or
 * possibleDuplicate. Matches the backend's CreateEntryRequest/EditEntryRequest shape. Used
 * whenever something represents a proposed or past content state, not a live entry.
 */
export interface EntryContent {
	type: string;
	name: string;
	contact: {
		academicTitle: string | null;
		firstName: string | null;
		lastName: string | null;
	} | null;
	email: string | null;
	website: string | null;
	telephone: string | null;
	accessible: boolean | null;
	address: Address;
	attributes: string[];
	offers: string[];
	specials: string | null;
	subject: string | null;
}

export type TChangeProposal = EntryContent;

export interface EntryChangeProposal {
	id: string;
	entryId: string;
	timestamp: Date;
	originalEntryState: TChangeProposal;
	changeProposal: TChangeProposal & { comment: string };
	status: EEntryChangeProposalStatus;
	/** What the entry's content looked like right before this proposal was decided. Set once accepted or rejected, empty while still open. */
	decisionEntryStateBefore?: TChangeProposal;
	/** What the rebase turned into at decision time. Set once accepted or rejected, empty while still open. */
	decisionEntryStateAfter?: TChangeProposal;
	userId: string;
	origin: EDataOrigin;
	snowflakeId: string;
}

export interface PublicEntryChangeProposal {
	id: string;
	entryId: string;
	timestamp: Date;
	comment: string;
	status: EEntryChangeProposalStatus;
	userId: string;
	origin: EDataOrigin;
	snowflakeId: string;
}

export function proposalToPublic({
	originalEntryState,
	changeProposal: { comment, ...rest },
	...p
}: EntryChangeProposal): PublicEntryChangeProposal {
	return { ...p, comment };
}

export interface ChangeProposalWithRebaseResponse {
	proposal: EntryChangeProposal;
	currentEntry: Entry;
	rebasedProposal: TChangeProposal;
}

export interface ChangeProposalCreatedResponse {
	revocationToken: string;
	proposalId: string;
}
