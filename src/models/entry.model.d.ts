export interface EntryStatus {
	approved: boolean;
	blocked: boolean;
	archived: boolean;
}

export interface DuplicateMatch {
	entryId: string;
	probability: number;
}

export interface GeoJsonPoint {
	type: "Point";
	coordinates: [number, number];
}

export interface Address {
	city: string;
	plz: string | null;
	street: string | null;
	house: string | null;
}

export interface Entry {
	id: string | null;
	type: string;
	name: string;
	status: EntryStatus | null;
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
	location: GeoJsonPoint | null;
	distance: number | null;
	possibleDuplicate: DuplicateMatch | null;
}

export interface PaginatedEntryResponse<T = Entry> {
	items: T[];
	more: boolean;
	locationName?: string | null;
}

export type EntriesResponse = PaginatedEntryResponse;

export interface CreateEntryResponse {
	entry: Entry;
	revocationToken: string;
	possibleDuplicate: DuplicateMatch | null;
}
