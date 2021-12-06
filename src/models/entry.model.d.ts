export interface Entry {
	_id?: string;
	type: string;
	name: string;
	approved ?: boolean;
	firstName ?: string;
	lastName ?: string;
	email ?: string;
	website ?: string;
	telephone ?: string;
	accessible ?: string;
	
	address: Address;
	meta: Meta;
	
	location: GeoJsonPoint;
	
	distance?: number;
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