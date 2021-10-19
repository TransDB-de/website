<template>
	
	<div :class="{ header: true, hide: hide }">
		
		<div :class="{navbar: true, expand, background}" ref="navbar">
			
			<h1 @click="reload">TransDB.de</h1>
			
			<nav @click="expand = !expand">
				<nuxt-link to="/" class="index">Startseite</nuxt-link>
				<nuxt-link to="/search">Suche</nuxt-link>
				
				<nuxt-link to="/manage" v-if="$store.state.user">Management</nuxt-link>
				<nuxt-link to="/submit" >Neuer Eintrag</nuxt-link>
			</nav>
			
			<span @click="expand = !expand" class="mobile">
				<MenuIcon :expand="expand" />
			</span>
			
		</div>
		
		<h1 ref="title" v-on:click="$router.push('/search')">Trans*DB</h1>
		
		<h2 ref="subtitle">Die Suchmaschine für trans* relevante Angebote</h2>
		
		<SearchBar ref="searchbar" placeholder="Suche nach Postleitzahl oder Ort" mobilePlaceholder="Suche nach PLZ oder Ort" @search="search"></SearchBar>
		
	</div>
	
</template>

<script>
import SearchBar from "@/components/header/SearchBar";
import MenuIcon from "@/components/header/MenuIcon";
import AccountMixin from "@/mixins/account";
import MouseoverMixin from "@/mixins/mouseover";
import { LogOutIcon } from 'vue-feather-icons';

export default {
	name: "Header",
	components: { SearchBar, MenuIcon, LogOutIcon },
	mixins: [ AccountMixin, MouseoverMixin ],
	data() {
		return {
			expand: false,
			background: false
		}
	},
	mounted() {
		this.$addScrollEvent(this.scrollEvent);
	},
	beforeDestroy() {
		this.$removeScrollEvent(this.scrollEvent);
	},
	computed: {
		hide() {
			return !["index", "search", "entry-entry"].includes(this.$route.name);
		}
	},
	methods: {
		
		async reload() {
			window.location.href = "/";
		},
		
		search(newQuery) {
			let currentQuery = this.$route.query;
			
			if ('location' in newQuery) {
				delete currentQuery.lat;
				delete currentQuery.long;
			} else if ('lat' in newQuery) {
				delete currentQuery.location;
			}
			
			this.$router.push({ name: "search", query: {...currentQuery, ...newQuery} });
		},
		
		scrollEvent(scroll) {
			
			let percent = (scroll / (this.$el.scrollHeight - this.$refs.navbar.scrollHeight ));
			
			let opacity = (1 - percent).toFixed(2);
			opacity = opacity > 0 ? opacity: 0;
			
			this.$refs.title.style.opacity = opacity;
			this.$refs.subtitle.style.opacity = opacity;
			this.$refs.searchbar.$el.style.opacity= opacity;
			
			this.background = percent > 1;
			
		}
		
	}
}
</script>

<style scoped>

.header {
	display: flex;
	flex-direction: column;
	align-items: center;

	box-shadow: 0 0 4px var(--color-text-shadow-strong), 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	padding: 40px 0 0 0;
	height: 325px;
	width: 100%;
	transition: 0.4s ease opacity, 0.4s ease height, 0s ease box-shadow;
	overflow: hidden;
	font-family: "Poppins", sans-serif;
}

/** Background Image */
.header, .header:after {
	background-image: var(--banner-overlay), var(--banner-gradient);
	background-position: top left;
	background-attachment: fixed;
	background-size: calc(min(200vw, 1625px)) auto, calc(min(200vw, 1625px));
}

@media only screen and (min-width: 1625px) {
	.header, .header:after {
		background-position: top;
		background-size: auto 325px, cover;
	}
}

.header.hide {
	height: 56px;
	transition: 0.4s ease opacity, 0.4s ease height, 0.8s ease box-shadow 0.2s;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 10px rgba(0, 0, 0, 0), 0 0 20px rgba(0, 0, 0, 0);
}

.header > h1, .header > h2, .header > .search-bar {
	transition: 0.3s ease-out all;
}

.header.hide > h1, .header.hide > h2, .header.hide > .search-bar {
	opacity: 0!important;
	margin: 0;
	padding: 0;
}

.header > h1 {
	color: #fff;
	font-size: 56px;
	text-shadow: 1px 1px 3px var(--color-text-shadow-strong), 2px 3px 8px var(--color-text-shadow-rim), 0 0 24px var(--color-text-shadow-glow);
	margin: 20px 0;
	cursor: pointer;
	user-select: none;
}

.header > h2 {
	margin: 0 0 40px;
	color: white;
	text-shadow: 0.3px 0.8px 2.5px var(--color-text-shadow-strong), 1px 2px 6px var(--color-text-shadow-rim), 0 0 18px var(--color-text-shadow-glow);
	text-align: center;
}

/** make all children of header appear in front of background */
.header > * {
	z-index: 10;
}

.header > .navbar {
	display: flex;
	justify-content: space-between;
	width: 100%;
	color: white;
	text-shadow: 0.5px 0.5px 2px var(--color-text-shadow-strong), 0.5px 1px 3px var(--color-text-shadow-rim), 0 0 8px var(--color-text-shadow-glow);
	position: fixed;
	top: 0;
	
	transition: 0s ease box-shadow;
	
	/** z-index higher than other children of .header, for mouse event priority */
	z-index: 100;
}

/** fixed background strip, which is always visible */
.header:after {
	top: 0;
	left: 0;
	width: 100%;
	height: 56px;
	position: fixed;
	content: " ";
	z-index: 1;
}

.header > .navbar.background {
	box-shadow: 0 0 4px var(--color-text-shadow-strong), 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
}


.header.hide > .navbar {
	box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 10px rgba(0, 0, 0, 0), 0 0 20px rgba(0, 0, 0, 0);
	animation-name: show-shadow;
	animation-duration: 0.8s;
	animation-delay: 0.2s;
	animation-timing-function: ease;
	animation-fill-mode: forwards;
}

@keyframes show-shadow {
	0% {
		box-shadow: 0 0 5px rgba(0, 0, 0, 0), 0 0 10px rgba(0, 0, 0, 0), 0 0 20px rgba(0, 0, 0, 0);
	}
	100% {
		box-shadow: 0 0 4px var(--color-text-shadow-strong), 0 0 8px var(--color-box-shadow-rim), 0 0 16px var(--color-box-shadow-glow);
	}
}

.header > .navbar > h1 {
	grid-column: 1;
	margin: 0;
	font-size: 24px;
	padding: 10px;
	cursor: pointer;
}

.header > .navbar > nav {
	grid-column: 3;
	display: flex;
}

.header > .navbar > nav > a {
	color: var(--color-nav-link);
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	font-weight: 500;
	font-size: 20px;
	margin: 10px 10px;
	position: relative;
	cursor: pointer;
}

/** makes .hightlight nav links look like a knockout button */
/*
.header > .navbar > nav > .highlight {
	background: var(--image-background) top / 150vw 325px fixed;
	background-clip: text;
	color: transparent;
	text-shadow: none;
	font-weight: 600;
	padding: 0 6px;
}

.header > .navbar > nav > .highlight:before {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	background-color: var(--color-nav-link);
	box-shadow: 0 3px 6px var(--color-box-shadow);
	border-radius: 4px;
}*/

.header > .navbar > nav > a:not( .highlight ):after {
	transition: 0.2s ease width, 0.2s ease opacity;
	display: inline-block;
	width: 0;
	content: "";
	opacity: 0;
	border-bottom: 3px solid var(--color-nav-link);
	box-shadow: 0.2px 0.5px 2px var(--color-box-shadow-strong), 0.5px 1.5px 4px var(--color-box-shadow-rim), 0 0 8px var(--color-box-shadow-glow);
	position: absolute;
	bottom: 0;
}

.header > .navbar > nav > a:not( .highlight ):hover:after {
	width: 100%!important;
}

.header > .navbar > nav > a:not( .highlight ):hover:after,
.header > .navbar .nuxt-link-active:not( .index ):not( .highlight ):after,
.header > .navbar .nuxt-link-exact-active:not( .highlight ):after {
	opacity: 1;
	width: 70%;
}

.mobile {
	display: none;
	padding: 0 10px;
	align-items: center;
	cursor: pointer;
	grid-column: 3;
	grid-row: 1;
}

.mobile > .feather {
	width: 36px;
	height: 36px;
}

@media only screen and (max-width: 720px) {
	
	.mobile {
		display: flex;
	}
	
	.header {
		height: 250px;
	}
	
	.header > h2 {
		display: none;
	}
	
	.header > .navbar > nav {
		opacity: 0;
		width: 0;
		height: 0;
		overflow: hidden;
	}
	
	.navbar.expand {
		background: var(--color-mobile-nav) !important;
		
		z-index: 100;
	}
	
	.navbar.expand:after {
		display: none;
	}
	
	.navbar.expand > nav {
		position: absolute;
		grid-column: none;
		align-items: center;
		width: 100%;
		height: auto;
		opacity: 1;
		top: 53px;
		left: 0;
		display: flex;
		flex-direction: column;
		background-color: var(--color-mobile-nav);
		
		z-index: 100;
	}
	
	.navbar.expand > nav > a {
		font-size: 24px;
		padding: 5px;
	}
	
}

</style>