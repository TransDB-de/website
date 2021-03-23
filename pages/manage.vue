<template>
    <div class="manage">
        <div class="header">
            <h2>{{username}}</h2>

            <span v-if="loggedIn">
                <Button class="settings-button" :title="mouseOverTexts['accountSettings']" center v-on:click="$router.push('/manage/account')">
                    <SettingsIcon />
                    Account
                </Button>

                <Button color="red" :title="mouseOverTexts['logout']" @click="logout" center>
                    <LogOutIcon />
                    Abmelden
                </Button>
            </span>
            <span v-else>
                <Button center v-on:click="$router.push('/login')">
                    <LogInIcon />
                    Anmelden
                </Button>
            </span>

            <div class="links" v-if="isAdmin">
                <nuxt-link to="/manage" class="index" center>
                    Ausstehende Einträge
                </nuxt-link>

                <nuxt-link to="/manage/database" center>
                    Datenbank Verwaltung
                </nuxt-link>

                <nuxt-link to="/manage/users" center>
                    Nutzer Verwaltung
                </nuxt-link>
            </div>

        </div>

        <NuxtChild class="content" />
    </div>
</template>

<script>
import Button from "@/components/utils/Button";
import { LogInIcon, LogOutIcon, SettingsIcon } from 'vue-feather-icons';

import AccountMixin from "@/mixins/account";
import MouseoverMixin from "@/mixins/mouseover";

export default {
    name: "manage",
    components: { Button, LogInIcon, LogOutIcon, SettingsIcon },
    mixins: [ AccountMixin, MouseoverMixin ],
    computed: {
        username() {
            
            if (this.$store.state.user) {
                return this.$store.state.user.username;
            } else {
                return "Bitte melde dich an";
            }
            
        },

        loggedIn() {
            return this.$store.state.user ? true : false;
        }
    }
}
</script>

<style scoped>
.manage {
    padding: 0 min(calc(100% - 740px), 40px);
    width: 100%;
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.header {
    display: grid;
    grid-template-columns: minmax(0, 100px) auto 1fr auto;
    grid-template-areas: "line1 name line2 buttons"
                         "links links links links";
    justify-content: space-between;
    align-items: center;
    justify-items: center;
}

.content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}

.content >>> .heading, .content >>> h1 {
    text-align: center;
    margin-top: 18px;
    margin-bottom: 12px;
}

.links {
    grid-area: links;
    display: flex;
    flex-direction: row;
}

.header > span {
    display: flex;
    flex-direction: row;
    grid-area: buttons;
    margin-right: 20px;
}

.settings-button {
    margin-right: 10px;
}

h2 {
    grid-area: name;
}

.header:before, .header:after{
    content: "";
    display: block;
    width: calc(100% - 40px);
    height: 2px;
    background-color: var(--color-light);
    border-radius: 2px;
    top: 50%
}

.header:before {
    left: 0;
    grid-area: line1;
}

.header:after {
    right: 0;
    grid-area: line2;
}

.links > a {
    color: var(--color-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    margin: 10px 10px;
    position: relative;
    cursor: pointer;
    text-align: center;
    min-height: 36px;
}

.links a:after {
    transition: 0.2s ease width, 0.2s ease opacity;
    display: inline-block;
    width: 0;
    content: "";
    opacity: 0;
    border-bottom: 3px solid var(--color-dark);
    box-shadow: 0 1px 0 var(--color-box-shadow);
    position: absolute;
    bottom: 0px;
}

.links a:hover:after {
    opacity: 1;
    width: 100%;
}

.links .nuxt-link-exact-active:after {
    opacity: 1;
    width: 70%;
}

.backup-button {
    align-self: center;
}

@media only screen and (max-width: 720px) {
    .header {
        grid-template-columns: 1fr auto 1fr;
        grid-template-areas: "line1 name line2"
                             "buttons buttons buttons"
                             "links links links";
    }

    .links {
        margin-top: 20px;
    }
}
</style>
