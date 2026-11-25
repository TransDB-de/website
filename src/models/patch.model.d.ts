export interface AcceptEntryPatchRequest {
	comment: string;
	decisions: EntryPatchData | null;
}

export interface FieldPatch<T> {
	originalValue: T | null;
	newValue: T | null;
	patchAccepted: boolean;
}

export interface ListPatchItem<T> {
	value: T;
	patchAccepted: boolean;
}

export interface ListPatch<T> {
	added: ListPatchItem<T>[];
	removed: ListPatchItem<T>[];
}

export interface EntryPatchDataAddress {
	city: FieldPatch<string> | null;
	plz: FieldPatch<string> | null;
	street: FieldPatch<string> | null;
	house: FieldPatch<string> | null;
}

export interface EntryPatchData {
	type: FieldPatch<EEntryType> | null;
	name: FieldPatch<string> | null;
	address: EntryPatchDataAddress | null;
	contact: FieldPatch<ContactPerson | null> | null;
	website: FieldPatch<string> | null;
	email: FieldPatch<string> | null;
	telephone: FieldPatch<string> | null;
	accessible: FieldPatch<boolean | null> | null;
	offers: ListPatch<EEntryOffer> | null;
	attributes: ListPatch<EEntryAttribute> | null;
	subject: FieldPatch<TherapistSubject | null> | null;
	specials: FieldPatch<string> | null;
}

export interface EntryPatch {
	id: ObjectId;
	entryId: ObjectId;
	status: EEntryPatchStatus;
	type: EEntryPatchType;
	comment: string;
	userId: string | null;
	timestamp: string;
	patch: EntryPatchData | null;
}

export interface EntryPatchResponse {
	revocationToken: string;
	patchId: ObjectId;
}

export interface PublicEntryResponse {
	id: ObjectId;
	type: EEntryType;
	name: string;
	contact: ContactPerson | null;
	email: string | null;
	telephone: string | null;
	website: string | null;
	accessible: boolean | null;
	address: Address | null;
	attributes: EEntryAttribute[];
	offers: EEntryOffer[];
	specials: string | null;
	subject: TherapistSubject | null;
	distance?: number | null;
}

export interface EntryPatchDetailResponse {
	patch: EntryPatch;
	currentEntry: PublicEntryResponse;
}
