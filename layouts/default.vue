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
        
    </div>
    
</template>

<script>
import Header from "@/components/header/Header";

export default {
    components: {Header},
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

.footer {
    padding: 10px;
    margin-top: auto;
}

.footer > a {
    color: var(--color-grey);
    margin: 0 5px;
    display: inline-block;
}
.footer > a:hover {
    color: var(--color-grey-accent);
}
</style>