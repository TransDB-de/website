<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import Select from "$formElements/select.svelte";
	import Checkbox from "$formElements/checkbox.svelte";
	import Textarea from "./elements/textarea.svelte";

	import Button from "$components/elements/button.svelte";
	import ErrorBox from "$components/elements/errorBox.svelte";
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";

	import type { Entry } from "$models/entry.model";
	import { env } from "$env/dynamic/public";
	import { t, tEntry } from "$lib/localization.svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { getObjChanges, replaceFields } from "$lib/utils";
	import type { ValidationErrorMap } from "$models/error";
	import { apiRequestHandler } from "$lib/apiRequestHandler";
	import { slide } from "svelte/transition";

	import {
		typeMapping,
		offerMapping,
		attributeMapping,
		subjectMapping,
		academicTitleMapping
	} from "$lib/entryMappings";
	import SecondaryHeading from "$components/typography/SecondaryHeading.svelte";
	import Paragraph from "$components/typography/Paragraph.svelte";
	import InfoWarning from "$components/typography/InfoWarning.svelte";
	import SubHeading from "$components/typography/SubHeading.svelte";

	interface Props {
		entry?: Entry;
		mode?: "create" | "edit";
		onSuccess?: () => void;
	}

	let { entry, mode = "create", onSuccess }: Props = $props();

	let isEdit = $derived(mode === "edit");

	let loading = $state(false);
	let errors: ValidationErrorMap = $state({});
	let formElement: Form;
	let isSpecialsFocused = $state(false);

	const sanitizedTypeMapping = $derived(typeMapping.filter((v) => v));

	function blankEntry(): Entry {
		return {
			type: "",
			name: null,
			academicTitle: null,
			firstName: null,
			lastName: null,
			telephone: null,
			email: null,
			website: null,
			accessible: "unknown",
			blocked: false,
			approved: false,
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
		} as unknown as Entry;
	}

	let workingEntry: Entry = $state(blankEntry());
	let savedEntry: Entry | null = null;

	$effect(() => {
		if (entry) {
			const clone = JSON.parse(JSON.stringify(entry)) as Entry;
			clone.blocked = clone.blocked ?? false;
			clone.approved = clone.approved ?? false;
			clone.meta.offers = clone.meta?.offers ?? [];
			clone.meta.attributes = clone.meta?.attributes ?? [];
			workingEntry = clone;
			savedEntry = JSON.parse(JSON.stringify(clone));
		}
	});

	let typePlaceholder = $derived(
		workingEntry.type ? tEntry("typeDescriptions")[workingEntry.type] : ""
	);

	function resetMeta() {
		workingEntry.meta = {
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

	function checkWebsite() {
		const httpRegex = /^https?:\/\//gm;
		const removePrefixRegex = /^[a-z]*:?\/?\//gim;

		if (!workingEntry.website) {
			return;
		}

		if (workingEntry.website.match(httpRegex)) {
			return;
		}

		workingEntry.website = workingEntry.website.replace(removePrefixRegex, "");
		workingEntry.website = "https://" + workingEntry.website;
	}

	async function submitCreate() {
		loading = true;

		const result = await apiRequestHandler(axios.post("entries", workingEntry));

		errors = result.handleErrors({
			422: () => popupWarn(t("errors.checkInput")),
			429: () => popupError(t("errors.tooMany")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		loading = false;

		if (result.success) {
			formElement.reset();
			if (typeof umami !== "undefined") umami.track(env.PUBLIC_UMAMI_EVENT_NEW_ENTRY);

			if (onSuccess) {
				onSuccess();
			} else {
				goto("/submitted");
			}
		}
	}

	async function submitEdit() {
		if (!savedEntry) return;

		// When type changes, strip offers/attributes/subject that no longer apply
		if (workingEntry.type !== savedEntry.type) {
			workingEntry.meta.offers = workingEntry.meta.offers.filter((o) =>
				offerMapping[workingEntry.type]?.includes(o)
			);
			workingEntry.meta.attributes = workingEntry.meta.attributes.filter((a) =>
				attributeMapping[workingEntry.type]?.includes(a)
			);
			if (!(workingEntry.type in subjectMapping)) {
				workingEntry.meta.subject = "";
			}
		}

		let changes = getObjChanges(
			savedEntry as unknown as Record<string, unknown>,
			workingEntry as unknown as Record<string, unknown>
		);
		changes = replaceFields(changes, "", null);

		if (Object.keys(changes).length < 1) {
			onSuccess?.();
			return;
		}

		// API requires type to always be present when sending a PATCH
		if (!changes["type"]) {
			changes["type"] = workingEntry.type;
		}

		loading = true;

		const result = await apiRequestHandler(
			axios.patch(`entries/${workingEntry._id}/edit`, changes)
		);

		errors = result.handleErrors({
			422: () => popupWarn(t("errors.checkInput")),
			default: () => popupError(`${t("errors.unknown")}`)
		});

		loading = false;

		if (result.success) {
			savedEntry = JSON.parse(JSON.stringify(workingEntry));
			popupOk(t("submitForm.savedPopup"));
			onSuccess?.();
		}
	}

	async function submit() {
		if (isEdit) {
			await submitEdit();
		} else {
			await submitCreate();
		}
	}
</script>

<Form onsubmit={submit} bind:this={formElement}>
	{#if isEdit}
		<Input label="ID" value={workingEntry._id} readonly />
	{/if}

	<Select bind:value={workingEntry.type} onchange={resetMeta} label={t("submitForm.categoryLabel")}>
		<option value="" disabled selected> {t("submitForm.selectCategory") + "..."} </option>

		{#each sanitizedTypeMapping as type (type)}
			<option value={type}> {tEntry("typeMapping")[type]} </option>
		{/each}
	</Select>

	{#if workingEntry.type}
		<Input
			bind:value={workingEntry.name}
			label={typePlaceholder}
			placeholder={typePlaceholder + "..."}
			required
			minlength="1"
			maxlength="160"
			error={errors["name"]}
		/>
	{/if}

	<br />

	<SecondaryHeading underline>{t("submitForm.address")}</SecondaryHeading>

	<section class="address-grid">
		<Input
			bind:value={workingEntry.address.street}
			label={t("submitForm.street")}
			placeholder={t("submitForm.street") + "..."}
			minlength="0"
			maxlength="50"
			error={errors["address.street"]}
		/>
		<Input
			bind:value={workingEntry.address.house}
			label={t("submitForm.house")}
			placeholder={t("submitForm.house") + "..."}
			minlength="0"
			maxlength="10"
			error={errors["address.house"]}
		/>
		<Input
			bind:value={workingEntry.address.city}
			label={t("submitForm.city")}
			placeholder={t("submitForm.city") + "..."}
			required
			minlength="2"
			maxlength="50"
			error={errors["address.city"]}
		/>
		<Input
			bind:value={workingEntry.address.plz}
			label={t("submitForm.plz")}
			placeholder={t("submitForm.plz") + "..."}
			minlength="0"
			maxlength="10"
			error={errors["address.plz"]}
		/>
	</section>

	<br />

	<SecondaryHeading underline>{t("submitForm.contact")}</SecondaryHeading>

	<Paragraph>
		{t("submitForm.contactDescription")}
	</Paragraph>

	<section>
		<Select
			bind:value={workingEntry.academicTitle}
			onchange={resetMeta}
			label={t("submitForm.academicTitle")}
		>
			<option value={null} selected> {t("submitForm.noTitle")} </option>

			{#each academicTitleMapping as title (title)}
				<option value={title}> {tEntry("academicTitleMapping")[title]} </option>
			{/each}
		</Select>
		<Input
			bind:value={workingEntry.firstName}
			label={t("submitForm.firstName")}
			placeholder={t("submitForm.firstName") + "..."}
			minlength="2"
			maxlength="30"
			error={errors["firstName"]}
		/>
		<Input
			bind:value={workingEntry.lastName}
			label={t("submitForm.lastName")}
			placeholder={t("submitForm.lastName") + "..."}
			minlength="2"
			maxlength="30"
			error={errors["lastName"]}
		/>
	</section>

	<br />

	<SecondaryHeading underline>{t("submitForm.contactDetails")}</SecondaryHeading>

	<Input
		bind:value={workingEntry.email}
		type="email"
		label={t("submitForm.email")}
		placeholder={t("submitForm.email") + "..."}
		minlength="5"
		maxlength="320"
		error={errors["email"]}
	/>
	<Input
		bind:value={workingEntry.telephone}
		type="text"
		label={t("submitForm.tel")}
		placeholder={t("submitForm.tel") + "..."}
		minlength="5"
		maxlength="30"
		error={errors["telephone"]}
	/>
	<Input
		bind:value={workingEntry.website}
		type="url"
		label={t("submitForm.website")}
		placeholder={t("submitForm.website") + "..."}
		minlength="3"
		maxlength="500"
		error={errors["website"]}
		onchange={checkWebsite}
	/>

	<br />

	<SecondaryHeading underline>{t("submitForm.specifics")}</SecondaryHeading>

	{#if workingEntry.type === "group"}
		<Input
			bind:value={workingEntry.meta.minAge}
			type="number"
			label={t("submitForm.minAge")}
			placeholder={t("submitForm.minAge") + "..."}
		/>
	{:else if workingEntry.type === "therapist"}
		<Select bind:value={workingEntry.meta.subject} required label={t("submitForm.subject")}>
			<option value="" disabled selected> {t("submitForm.selectSubject")} </option>

			{#each subjectMapping[workingEntry.type] as subject (subject)}
				<option value={subject}> {tEntry("subjectMapping")[subject]} </option>
			{/each}
		</Select>
	{/if}

	{#if offerMapping[workingEntry.type]}
		<SubHeading>{t("submitForm.offers")}:</SubHeading>

		<ErrorBox error={errors["meta.offers"]}>
			<fieldset>
				{#each offerMapping[workingEntry.type] as offer (offer)}
					<Checkbox bind:group={workingEntry.meta.offers} value={offer}>
						{tEntry("offerDetails")[offer]}
					</Checkbox>
				{/each}
			</fieldset>
		</ErrorBox>

		<br />
	{/if}

	{#if attributeMapping[workingEntry.type]}
		{#if offerMapping[workingEntry.type]}
			<SubHeading>{t("submitForm.attributes")}:</SubHeading>
		{/if}

		<fieldset>
			{#each attributeMapping[workingEntry.type] as attribute (attribute)}
				<Checkbox bind:group={workingEntry.meta.attributes} value={attribute}>
					{tEntry("attributeDetails")[attribute]}
				</Checkbox>
			{/each}
		</fieldset>
		<br />
	{/if}

	{#if isSpecialsFocused && !isEdit}
		<InfoWarning>
			{t("submitForm.specialsInfo")[0]}<br />
			{t("submitForm.specialsInfo")[1]}
		</InfoWarning>
	{/if}

	<Textarea
		bind:value={workingEntry.meta.specials}
		onfocus={() => specialsFocus(true)}
		onblur={() => specialsFocus(false)}
		label={t("submitForm.specials")}
		placeholder={t("submitForm.specials") + "..."}
		maxlength={280}
	/>

	<Select bind:value={workingEntry.accessible} required label={t("submitForm.accessibility")}>
		<option value="unknown" selected> {t("submitForm.accessibilityUnknown")} </option>
		<option value="yes"> {t("submitForm.accessible")} </option>
		<option value="no"> {t("submitForm.notAccessible")} </option>
	</Select>

	{#if isEdit}
		<br />
		<SecondaryHeading underline>{t("submitForm.adminSection")}</SecondaryHeading>

		<Checkbox bind:checked={workingEntry.blocked} single>
			{t("submitForm.blocked")}
		</Checkbox>
		<Checkbox bind:checked={workingEntry.approved} single>
			{t("submitForm.approved")}
		</Checkbox>
		<br />
	{:else}
		<Paragraph>
			{t("submitForm.info")}
		</Paragraph>
	{/if}

	<Button {loading}>{isEdit ? t("submitForm.save") : t("submitForm.submit")}</Button>
</Form>

<style lang="scss">
	@use "../../scss/mixins" as *;

	.address-grid {
		display: grid;
		grid-template-rows: 2;
		grid-template-columns: 6fr 4fr;

		@include media-mobile {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(1, 1fr);
		}
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	h3::after {
		content: ":";
	}
</style>
