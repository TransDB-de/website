import * as filterLang from "@transdb-de/filter-lang"
import * as entryMappings from "./entryMappings"
import type { Subscriber, Updater, Writable } from "svelte/store"
import { removeFromArray } from "./utils"

type Dict = {[key: string]: string};

function flipDictrionay(dict: Dict): Dict {
	let newDict: Dict = {};
	
	for (const [key, val] of Object.entries(dict)) {
		newDict[val] = key;
	}
	
	return newDict;
}

const generalFields = {
	"Stadt": "address.city",
	"Postleitzahl": "address.plz",
	"PLZ": "address.plz",
	"Straße": "address.street",
	"Hausnummer": "address.house",
	
	"Name": "name",
	"Vorname": "firstName",
	"Nachname": "lastName",
	"email": "email",
	"website": "website",
	"telefon": "telephone",
	
	"Spezialangebote": "meta.specials",
	"Thema": "meta.subject"
}

const langDef: filterLang.LanguageDefinition = [
	{
		name: "ist",
		negationSuffix: "nicht",
		type: "text",
		field: "type",
		mappings: flipDictrionay(entryMappings.typeMappingData)
	},
	
	{
		name: "ist",
		negationSuffix: "nicht",
		type: "boolean",
		mappings: {
			"Freigeschaltet": "approved",
			"Blocked": "blocked"
		}
	},
	
	{
		name: "barrierefrei",
		type: "text",
		field: "accessible",
		mappings: {
			"ja": "yes",
			"nein": "no",
			"unbekannt": "unkown"
		}
	},
	
	{
		name: "bietet",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entryMappings.attributeMapping.group),
			...flipDictrionay(entryMappings.attributeMapping.hairremoval),
			...flipDictrionay(entryMappings.offerMapping.therapist),
			...flipDictrionay(entryMappings.offerMapping.surgeon)
		}
	},
	
	{
		name: "angebote",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entryMappings.offerMapping.therapist),
			...flipDictrionay(entryMappings.offerMapping.surgeon)
		}
	},
	
	{
		name: "attribute",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entryMappings.attributeMapping.group),
			...flipDictrionay(entryMappings.attributeMapping.hairremoval)
		}
	},
	
	{
		name: "hat",
		negationSuffix: "nicht",
		type: "include",
		mappings: {
			...generalFields,
			"Mindestalter": "meta.minAge",
			"Geodaten": "location"
		}
	},
	
	{
		type: "text",
		mappings: generalFields
	},
	
	{
		name: "eingereicht",
		type: "date-compare",
		suffixes: ["am", "vor", "nach"],
		field: "submittedTimestamp"
	},
	
	{
		name: "freigeschaltet",
		type: "date-compare",
		suffixes: ["am", "vor", "nach"],
		field: "approvedTimestamp"
	},
	
	{
		name: "freigeschaltet-von",
		type: "text",
		field: "approvedBy"
	},
	
	{
		name: "umgebung",
		type: "location",
		field: "location"
	},
	
	{
		name: "id",
		type: "text",
		field: "_id"
	},
	
	{
		name: "mindestalter",
		type: "number",
		negationSuffix: "ist-nicht",
		field: "meta.minAge",
		suffixes: [ "ist", "unter", "über" ]
	},
	
	{
		name: "nicht",
		type: "wildcard-not"
	}
]

export const language = new filterLang.Language(langDef);

type filterCallback = Subscriber<filterLang.IntermediateFormat.AbstractFilters>;

class FilterStore implements Writable<filterLang.IntermediateFormat.AbstractFilters> {
	callbacks: filterCallback[] = [];
	filters: filterLang.IntermediateFormat.AbstractFilters = {};
	
	constructor() {
		this.set({});
	}
	
	subscribe(callback: filterCallback) {
		this.callbacks.push(callback);
		
		return () => {
			removeFromArray(this.callbacks, callback);
		}
	}
	
	set(new_filters: filterLang.IntermediateFormat.AbstractFilters) {
		this.filters = new_filters
	}
	
	update(updater: Updater<filterLang.IntermediateFormat.AbstractFilters>) {
		this.filters = updater(this.filters);
	}
	
	/** run the callbacks on all subscribers */
	filter() {
		this.callbacks.forEach(c => {
			c(this.filters);
		});
	}
}

export const filters = new FilterStore();
