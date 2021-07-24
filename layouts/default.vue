<template>
    
    <div class="app">
        
        <Header></Header>
    
        <transition name="fade" mode="out-in">
            <Nuxt />
        </transition>
        
        <div class="footer">
            <nuxt-link to="/imprint">Impressum</nuxt-link>
            <nuxt-link to="/privacy">Datenschutz</nuxt-link>
            <!--nuxt-link to="/contact">Kontakt</nuxt-link-->
            <a href="https://github.com/TransDB-de" target="_blank">GitHub</a>
        </div>

        <Popup />

    </div>
    
</template>

<script>
import Header from "@/components/header/Header";
import Popup from "@/components/utils/Popup";

export default {
    components: { Header, Popup },
    mounted() {

        // Set user data to state if user data is in local storage
        if(this.$store.getters["getUserData"]) {
            this.$store.commit("SET_USER_DATA", this.$store.getters["getUserData"]);
        }
    
        let token = this.$store.getters["getLoginToken"];
        
        if(token) {
            this.$axios.setToken(token, "Bearer");
        }
        
    }
}
</script>

<style>
@import url("../css/colors.css");

* {
    box-sizing: border-box;
}

html {
    min-height: 100vh;
}

body {
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    font-family: "Fira Sans", sans-serif;
    overflow: auto;
    min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
    font-family: "Poppins", sans-serif;
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

body > #__nuxt, #__layout, .app {
    min-height: 100vh;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.nuxt-content a, form > p a {
    border: 0;
    text-decoration: none;
    border-bottom: 2px solid var(--color-radio-selected);
    color: var(--color-radio-selected);
}

.footer {
    padding: 15px;
    margin-top: auto;
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    text-align: center;
}

.footer > a {
    color: var(--color-grey);
    margin: 0 10px;
    display: inline-block;
    text-decoration: none;
    font-weight: 500;
}
.footer > a:hover {
    color: var(--color-grey-accent);
}
</style>