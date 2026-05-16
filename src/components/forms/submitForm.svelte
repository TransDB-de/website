<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import Select from "$formElements/select.svelte";
	import Checkbox from "$formElements/checkbox.svelte";

	import Button from "$components/elements/button.svelte";
	import ErrorBox from "$components/elements/errorBox.svelte";
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";

	import type { Entry } from "$models/entry.model";
	import { env } from "$env/dynamic/public";
	import { t, tEntry } from "$lib/localization.svelte";
	import axios, { type AxiosResponse } from "axios";
	import { goto } from "$app/navigation";
	import { parseValidationErrors, type NestedDict } from "$lib/utils";
	import type { ValidationErrorMap } from "$models/error";
	import { slide } from "svelte/transition";

	import {
		typeMapping,
		offerMapping,
		attributeMapping,
		subjectMapping,
		academicTitleMapping
	} from "$lib/entryMappings";
	import { onMount } from "svelte";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import Textarea from "./elements/textarea.svelte";

	let loading = $state(false);
	let errors: ValidationErrorMap = $state({});
	let formElement: Form;
	let isSpecialsFocused = $state(false);

	const sanitizedTypeMapping = $derived(typeMapping.filter((v) => v));

	const props: { entry?: Entry } = $props();

	let newEntry: Entry = $state({
		type: "",
		name: null,
		academicTitle: null,
		firstName: null,
		lastName: null,
		telephone: null,
		email: null,
		website: null,
		accessible: "unknown",
		address: {
			city: null,
			plz: null,
			street: null,
			house: null
		},
		meta: {
			attributes: [],
			offers: [],
			specials: null,
			subject: null,
			minAge: undefined
		}
	} as unknown as Entry);

	onMount(() => {
		if (props.entry) {
			newEntry = props.entry;
		}
	});

	let typePlaceholder = $derived(newEntry.type ? tEntry("typeDescriptions")[newEntry.type] : "");

	function resetMeta() {
		newEntry.meta = {
			attributes: [],
			offers: [],
			specials: "",
			subject: "",
			minAge: undefined
		};
	}

	function specialsFocus(value: boolean) {
		isSpecialsFocused = value;
	}

	// Check and correct the contents of the Website field
	function checkWebsite() {
		const httpRegex = /^https?:\/\//gm;
		const removePrefixRegex = /^[a-z]*:?\/?\//gim;

		if (!newEntry.website) {
			return;
		}

		if (newEntry.website.match(httpRegex)) {
			return;
		}

		// clear possibly faulty website prefix
		newEntry.website = newEntry.website.replace(removePrefixRegex, "");

		// prefix https://
		newEntry.website = "https://" + newEntry.website;
	}

	async function submit() {
		loading = true;

		const result = await apiRequestHandler(axios.post("entries", newEntry));

		errors = result.handleErrors({
			422: () => popupWarn(t("errors.checkInput")),
			429: () => popupError(t("errors.tooMany")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		loading = false;

		if (result.success) {
			formElement.reset();
			if (typeof umami !== "undefined") umami.track(env.PUBLIC_UMAMI_EVENT_NEW_ENTRY);
			goto("/submitted");
		}
	}
</script>

<Form onsubmit={submit} bind:this={formElement}>
	<Select bind:value={newEntry.type} onchange={resetMeta} label={t("submitForm.categoryLabel")}>
		<option value="" disabled selected> {t("submitForm.selectCategory") + "..."} </option>

		{#each sanitizedTypeMapping as type (type)}
			<option value={type}> {tEntry("typeMapping")[type]} </option>
		{/each}
	</Select>

	{#if newEntry.type}
		<Input
			bind:value={newEntry.name}
			label={typePlaceholder}
			placeholder={typePlaceholder + "..."}
			required
			minlength="1"
			maxlength="160"
			error={errors["name"]}
		/>
	{/if}

	<h2>{t("submitForm.address")}</h2>

	<section>
		<Input
			bind:value={newEntry.address.street}
			label={t("submitForm.street")}
			placeholder={t("submitForm.street") + "..."}
			minlength="0"
			maxlength="50"
			error={errors["address.street"]}
		/>
		<Input
			bind:value={newEntry.address.house}
			label={t("submitForm.house")}
			placeholder={t("submitForm.house") + "..."}
			minlength="0"
			maxlength="10"
			error={errors["address.house"]}
		/>
	</section>

	<section>
		<Input
			bind:value={newEntry.address.city}
			label={t("submitForm.city")}
			placeholder={t("submitForm.city") + "..."}
			required
			minlength="2"
			maxlength="50"
			error={errors["address.city"]}
		/>
		<Input
			bind:value={newEntry.address.plz}
			label={t("submitForm.plz")}
			placeholder={t("submitForm.plz") + "..."}
			minlength="0"
			maxlength="10"
			error={errors["address.plz"]}
		/>
	</section>

	<h2>{t("submitForm.contact")}</h2>

	<p>
		{t("submitForm.contactDescription")}
	</p>

	<section>
		<Select
			bind:value={newEntry.academicTitle}
			onchange={resetMeta}
			label={t("submitForm.academicTitle")}
		>
			<option value={null} selected> {t("submitForm.noTitle")} </option>

			{#each academicTitleMapping as title (title)}
				<option value={title}> {tEntry("academicTitleMapping")[title]} </option>
			{/each}
		</Select>
		<Input
			bind:value={newEntry.firstName}
			label={t("submitForm.firstName")}
			placeholder={t("submitForm.firstName") + "..."}
			minlength="2"
			maxlength="30"
			error={errors["firstName"]}
		/>
		<Input
			bind:value={newEntry.lastName}
			label={t("submitForm.lastName")}
			placeholder={t("submitForm.lastName") + "..."}
			minlength="2"
			maxlength="30"
			error={errors["lastName"]}
		/>
	</section>

	<h2>{t("submitForm.contactDetails")}</h2>

	<Input
		bind:value={newEntry.email}
		type="email"
		label={t("submitForm.email")}
		placeholder={t("submitForm.email") + "..."}
		minlength="5"
		maxlength="320"
		error={errors["email"]}
	/>
	<Input
		bind:value={newEntry.telephone}
		type="text"
		label={t("submitForm.tel")}
		placeholder={t("submitForm.tel") + "..."}
		minlength="5"
		maxlength="30"
		error={errors["telephone"]}
	/>
	<Input
		bind:value={newEntry.website}
		type="url"
		label={t("submitForm.website")}
		placeholder={t("submitForm.website") + "..."}
		minlength="3"
		maxlength="500"
		error={errors["website"]}
		onchange={checkWebsite}
	/>

	<h2>{t("submitForm.specifics")}</h2>

	{#if offerMapping[newEntry.type]}
		<h3>{t("submitForm.offers")}</h3>

		<ErrorBox error={errors["meta.offers"]}>
			{#each offerMapping[newEntry.type] as offer (offer)}
				<Checkbox bind:group={newEntry.meta.offers} value={offer}>
					{tEntry("offerDetails")[offer]}
				</Checkbox>
			{/each}
		</ErrorBox>
	{/if}

	{#if attributeMapping[newEntry.type]}
		{#if offerMapping[newEntry.type]}
			<h3>{t("submitForm.attributes")}</h3>
		{/if}

		{#each attributeMapping[newEntry.type] as attribute (attribute)}
			<Checkbox bind:group={newEntry.meta.attributes} value={attribute}>
				{tEntry("attributeDetails")[attribute]}
			</Checkbox>
		{/each}
	{/if}

	{#if isSpecialsFocused}
		<p class="info" transition:slide>
			{t("submitForm.specialsInfo")[0]}<br />
			{t("submitForm.specialsInfo")[1]}
		</p>
	{/if}

	<Textarea
		bind:value={newEntry.meta.specials}
		onfocus={() => specialsFocus(true)}
		onblur={() => specialsFocus(false)}
		type="text"
		label={t("submitForm.specials")}
		placeholder={t("submitForm.specials") + "..."}
		maxlength={280}
	/>

	{#if newEntry.type === "group"}
		<Input
			bind:value={newEntry.meta.minAge}
			type="number"
			label={t("submitForm.minAge")}
			placeholder={t("submitForm.minAge") + "..."}
		/>
	{:else if newEntry.type === "therapist"}
		<Select bind:value={newEntry.meta.subject} required label={t("submitForm.subject")}>
			<option value="" disabled selected> {t("submitForm.selectSubject")} </option>

			{#each subjectMapping[newEntry.type] as subject (subject)}
				<option value={subject}> {tEntry("subjectMapping")[subject]} </option>
			{/each}
		</Select>
	{/if}

	<Select bind:value={newEntry.accessible} required label={t("submitForm.accessibility")}>
		<option value="unknown" selected> {t("submitForm.accessibilityUnknown")} </option>
		<option value="yes"> {t("submitForm.accessible")} </option>
		<option value="no"> {t("submitForm.notAccessible")} </option>
	</Select>

	<p>
		{t("submitForm.info")}
	</p>

	<Button {loading}>{t("submitForm.submit")}</Button>
</Form>

<style lang="scss">
	h3::after {
		content: ":";
	}
</style>
