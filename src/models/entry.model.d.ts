import type * as FilterLang from "@transdb-de/filter-lang"

export interface Entry {
	_id?: string;
	type: string;
	name: string;
	approved ?: boolean;
	blocked ?: boolean;
	academicTitle ?: string;
	firstName ?: string;
	lastName ?: string;
	email ?: string;
	website ?: string;
	telephone ?: string;
	accessible ?: string;
	
	address: Address;
	meta: Meta;
	
	location?: GeoJsonPoint;
	distance?: number;
	
	possibleDuplicate?: string;
	
	submittedTimestamp?: number;
	approvedTimestamp?: number;
	approvedBy?: string;
}

export interface GeoJsonPoint {
	type: "Point",
	coordinates: [number, number]
}

export interface Address {
	city: string;
	plz ?: string;
	street ?: string;
	house ?: string;
}

export interface Meta {
	attributes: string[];
	offers: string[];
	specials ?: string;
	minAge ?: number;
	subject ?: string;
}

export interface EntriesResponse {
	entries: Entry[];
	locationName?: string;
	more: boolean;
}

export interface FilterFull {
	filter: FilterLang.IntermediateFormat.AbstractFilters,
	page: number
}
