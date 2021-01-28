<template>
    
    <div :class="{ header: true, hide: hide }">
    
        <div :class="{navbar: true, expand, background}" ref="navbar">
    
            <h1 @click="reload">TransDB.de</h1>
            
            <nav @click="expand = !expand">
                <nuxt-link to="/" class="index">Startseite</nuxt-link>
                <nuxt-link to="/search">Suche</nuxt-link>
                
                <nuxt-link to="/manage" v-if="$store.state.user">Management</nuxt-link>
                <nuxt-link to="/account" v-if="$store.state.user">Account</nuxt-link>
                <nuxt-link to="/submit" class="highlight">Neuer Eintrag</nuxt-link>
            </nav>
            
            <span @click="expand = !expand" class="mobile">
                <MenuIcon :expand="expand" />
            </span>
            
        </div>
        
        <h1 ref="title" v-on:click="$router.push('/search')">Trans*DB</h1>
        
        <h2 ref="subtitle">Deine Anlaufstelle für Transgender-Unterstützung</h2>
        
        <SearchBar ref="searchbar" placeholder="Suche nach Postleitzahl oder Ort" mobilePlaceholder="Suche nach PLZ oder Ort" @search="search"></SearchBar>
        
    </div>
    
</template>

<script>
import SearchBar from "@/components/header/SearchBar";
import { MenuIcon } from "@/components/header/MenuIcon";

export default {
    name: "Header",
    components: {SearchBar, MenuIcon},
    data() {
        return {
            hide: !["/","/search"].includes(this.$route.path),
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
    watch: {

        $route: function(to, from) {
            this.hide = !["/","/search"].includes(to.path);
        }
        
    },
    
    methods: {
        
        reload: async function () {
            window.location.href = "/";
        },
        
        search: function (query) {
            this.$router.push({ name: "search", query });
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
    background: var(--image-background) top / 150vw 325px fixed;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    padding: 40px 0 0 0;
    height: 325px;
    width: 100%;
    transition: 0.4s ease all;
    overflow: hidden;
    font-family: "Poppins", sans-serif;
}

.header.hide {
    height: 56px;
    animation-name: hide-shaow;
    animation-delay: 0.4s;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}

@keyframes hide-shadow {
    0% {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
    100% {
        box-shadow: 0 0 9px rgba(0, 0, 0, 0);
    }
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
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    margin: 20px 0;
    cursor: pointer;
    user-select: none;
}

.header > h2 {
    margin: 0 0 40px;
    color: white;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
}

.header > .navbar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    width: 100%;
    color: white;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
    position: fixed;
    z-index: 1;
    top: 0;
}

.header > .navbar.background {
    background: var(--image-background) top / 150vw 325px fixed;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.header.hide > .navbar {
    background: var(--image-background) top / 150vw 325px fixed;
    animation-name: show-shadow;
    animation-duration: 0.8s;
    animation-delay: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes show-shadow {
    0% {
        box-shadow: 0 0 9px rgba(0, 0, 0, 0);
    }
    100% {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    margin: 10px 10px;
    position: relative;
}

.header > .navbar > nav > a:after {
    transition: 0.2s ease width, 0.2s ease opacity;
    display: inline-block;
    width: 0;
    content: "";
    opacity: 0;
    border-bottom: 3px solid white;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0px;
}

.header > .navbar > nav > a:hover:after {
    opacity: 1;
    width: 100%;
}

.header > .navbar .nuxt-link-active:not( .index ):after,
.header > .navbar .nuxt-link-exact-active:after {
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
        background: var(--color-radio-selected) !important;
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
        background-color: var(--color-radio-selected);
    }
    
    .navbar.expand > nav > a {
        font-size: 24px;
        padding: 5px;
    }
    
}

</style>