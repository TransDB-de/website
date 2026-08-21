<script lang="ts">
	import Form from "$formElements/form.svelte";
	import Input from "$formElements/input.svelte";
	import Select from "$formElements/select.svelte";
	import Checkbox from "$formElements/checkbox.svelte";
	import Textarea from "./elements/textarea.svelte";

	import Button from "$components/elements/button.svelte";
	import ErrorBox from "$components/elements/errorBox.svelte";
	import { popupOk, popupError, popupWarn } from "$components/popup.svelte";

	import type { CreateEntryResponse, Entry } from "$models/entry.model";
	import { env } from "$env/dynamic/public";
	import { t, tEntry } from "$lib/localization.svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";
	import { apiRequestHandler } from "$lib/apiRequestHandler";

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

	export interface ISubmitResponse {
		errors?: Record<string, string>;
		reset?: boolean;
	}

	interface Props {
		entry?: Entry;
		mode?: "create" | "edit" | "public-edit";
		onSubmit: (data: Entry, comment: string) => Promise<ISubmitResponse>;
	}

	let { entry, mode = "create", onSubmit }: Props = $props();

	let isEdit = $derived(mode !== "create");
	let isPublicEdit = $derived(mode === "public-edit");

	let loading = $state(false);
	let errors: Record<string, string> = $state({});
	let formElement: Form;
	let isSpecialsFocused = $state(false);
	let editComment = $state("");

	const sanitizedTypeMapping = $derived(typeMapping.filter((v) => v));

	function blankEntry(): Entry {
		return {
			type: "",
			name: "",
			contact: {
				academicTitle: null,
				firstName: null,
				lastName: null
			},
			telephone: null,
			email: null,
			website: null,
			accessible: null,
			status: {
				approved: false,
				blocked: false,
				archived: false
			},
			address: {
				city: "",
				plz: null,
				street: null,
				house: null
			},
			attributes: [],
			offers: [],
			specials: null,
			subject: null,
			id: null,
			location: null,
			distance: null,
			possibleDuplicate: null
		};
	}

	let workingEntry: Entry = $state(blankEntry());

	$effect(() => {
		if (entry) {
			// contact can be null, workaround:
			if (entry.contact === null) {
				var template = blankEntry();
				entry.contact = template.contact;
			}
			workingEntry = entry;
		}
	});

	let typePlaceholder = $derived(
		workingEntry.type ? tEntry("typeDescriptions")[workingEntry.type] : ""
	);

	function resetMeta() {
		workingEntry.attributes = [];
		workingEntry.offers = [];
		workingEntry.specials = null;
		workingEntry.subject = null;
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

	async function submit() {
		loading = true;
		const res = await onSubmit(workingEntry, editComment);
		loading = false;

		if (res.errors) {
			errors = res.errors;
		}

		if (res.reset) {
			formElement.reset();
		}
	}
</script>

<Form onsubmit={submit} bind:this={formElement}>
	{#if isEdit && !isPublicEdit}
		<Input label="ID" value={workingEntry.id} readonly />
	{/if}

	<Select
		bind:value={workingEntry.type}
		required
		onchange={resetMeta}
		label={t("submitForm.categoryLabel")}
		disabled={isEdit}
	>
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
		<Select bind:value={workingEntry.contact!.academicTitle} label={t("submitForm.academicTitle")}>
			<option value={null} selected> {t("submitForm.noTitle")} </option>

			{#each academicTitleMapping as title (title)}
				<option value={title}> {tEntry("academicTitleMapping")[title]} </option>
			{/each}
		</Select>
		<Input
			bind:value={workingEntry.contact!.firstName}
			label={t("submitForm.firstName")}
			placeholder={t("submitForm.firstName") + "..."}
			minlength="2"
			maxlength="50"
			error={errors["contact.firstName"]}
		/>
		<Input
			bind:value={workingEntry.contact!.lastName}
			label={t("submitForm.lastName")}
			placeholder={t("submitForm.lastName") + "..."}
			minlength="2"
			maxlength="50"
			error={errors["contact.lastName"]}
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

	{#if workingEntry.type === "Therapist"}
		<Select bind:value={workingEntry.subject} required label={t("submitForm.subject")}>
			<option value={null} disabled selected> {t("submitForm.selectSubject")} </option>

			{#each subjectMapping[workingEntry.type] as subject (subject)}
				<option value={subject}> {tEntry("subjectMapping")[subject]} </option>
			{/each}
		</Select>
	{/if}

	{#if offerMapping[workingEntry.type]}
		<SubHeading>{t("submitForm.offers")}:</SubHeading>

		<ErrorBox error={errors["offers"]}>
			<fieldset>
				{#each offerMapping[workingEntry.type] as offer (offer)}
					<Checkbox bind:group={workingEntry.offers} value={offer}>
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
				<Checkbox bind:group={workingEntry.attributes} value={attribute}>
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
		bind:value={workingEntry.specials}
		onfocus={() => specialsFocus(true)}
		onblur={() => specialsFocus(false)}
		label={t("submitForm.specials")}
		placeholder={t("submitForm.specials") + "..."}
		maxlength={280}
	/>

	<Select bind:value={workingEntry.accessible} label={t("submitForm.accessibility")}>
		<option value={null}> {t("submitForm.accessibilityUnknown")} </option>
		<option value={true}> {t("submitForm.accessible")} </option>
		<option value={false}> {t("submitForm.notAccessible")} </option>
	</Select>

	{#if !isEdit}
		<Paragraph>
			{t("submitForm.info")}
		</Paragraph>
	{/if}

	{#if isEdit}
		<hr />
		<Textarea
			label={t("submitForm.editComment")}
			bind:value={editComment}
			placeholder={t("submitForm.editCommentPlaceholder")}
			required
			maxlength={2000}
		/>
	{/if}

	<Button {loading}
		>{isEdit && !isPublicEdit ? t("submitForm.save") : t("submitForm.submit")}</Button
	>
</Form>

<style lang="scss">
	@use "../../scss/mixins" as *;

	.address-grid {
		display: grid;
		grid-template-columns: 6fr 4fr;

		@include media-mobile {
			grid-template-columns: 1fr;
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

	hr {
		margin: 0;
		border: none;
		margin-top: 5px;
		border-bottom: 2px solid var(--color-edge-dimmed);
		border-bottom-style: dashed;
	}

	h3::after {
		content: ":";
	}
</style>
