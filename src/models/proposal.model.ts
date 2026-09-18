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
 * Just the user generated content fields of an entry, nothing else. Matches the backends CreateEntryRequest/EditEntryRequest.
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
	decisionEntryStateBefore?: TChangeProposal;
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
	entryName: string;
}

export function proposalToPublic({
	originalEntryState,
	changeProposal: { comment, ...rest },
	...p
}: EntryChangeProposal): PublicEntryChangeProposal {
	return { ...p, comment, entryName: originalEntryState.name };
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
