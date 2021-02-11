import * as filterLang from "filter-lang";
import * as entry from "./entry.js";

// this mixin sets a langauge definition for FilterLang and creates a new Language instance,
// which can them be used by components to parse user input, or provide feedback

function flipDictrionay(dict) {
	let newDict = {};

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

	"Besonderheiten": "meta.specials",
	"Thema": "meta.subject"
}

const langDef = [
	{
		name: "ist",
		negationSuffix: "nicht",
		type: "text",
		field: "type",
		mappings: flipDictrionay(entry.typeMappingData)
	},

	{
		name: "ist",
		negationSuffix: "nicht",
		type: "include",
		mappings: {
			"Freigeschaltet": "approved"
		}
	},

	{
		name: "bietet",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entry.attributeMapping.group),
			...flipDictrionay(entry.attributeMapping.hairremoval),
			...flipDictrionay(entry.offerMapping.therapist),
			...flipDictrionay(entry.offerMapping.surgeon)
		}
	},

	{
		name: "angebote",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entry.offerMapping.therapist),
			...flipDictrionay(entry.offerMapping.surgeon)
		}
	},

	{
		name: "attribute",
		negationSuffix: "nicht",
		type: "array-contains",
		fields: [ "meta.attributes", "meta.offers" ],
		mappings: {
			...flipDictrionay(entry.attributeMapping.group),
			...flipDictrionay(entry.attributeMapping.hairremoval)
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

export default {

    created() {
		this.language = new filterLang.Language(langDef);
    }

}
