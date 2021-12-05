export interface Entry {
	type: string;
	name: string;
	firstName ?: string;
	lastName ?: string;
	email ?: string;
	website ?: string;
	telephone ?: string;
	accessible ?: string;
	
	address: Address
	meta: Meta
	
	distance?: number;
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