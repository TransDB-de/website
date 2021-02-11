<template>

    <div class="user-item">
        
        <div>
            <h1>{{ user.username }}</h1>
        
            <span>
                <b>E-Mail:</b> {{ user.email }}
            </span>
        
            <span>
                <b>Admin:</b> {{ user.admin ? 'Ja' : 'Nein' }}
            </span>
        
            <span>
                <b>Registriert:</b> {{ formatDate(user.registerDate) }}
            </span>
        
            <span>
                <b>Letzter Login:</b> {{ formatDate(user.lastLogin) }}
            </span>
        </div>
        
        <div>
            <Button color="red" @click="deleteUser">Löschen</Button>
        </div>
    
    </div>

</template>

<script>
import Button from "@/components/utils/Button";
export default {
    name: "UserItem",
    components: {Button},
    props: {
        user: Object
    },
    methods: {
        formatDate: function (date) {
            return new Date(date).toLocaleDateString('de-DE', { year: 'numeric', day: '2-digit', month: '2-digit' })
        },
        deleteUser: async function() {
        
            let sure = confirm("Soll dieser Benutzer wirklich gelöscht werden?");
            
            if(!sure) return;
            
            try {
                await this.$axios.$delete("users/" + this.user._id);
            } catch (e) {
                return;
            }
            
            this.$emit("removed", this.user._id);
            
        }
    }
}
</script>

<style scoped>
.user-item {
    display: flex;
    background-color: white;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 10px 10px 20px;
    margin-bottom: 20px;
    word-break: break-word;
}

.user-item h1 {
    font-size: 24px;
    margin: 0;
    font-weight: 500;
    text-align: left;
}

.user-item > div {
    display: flex;
    flex-direction: column;
}
.user-item > div:first-child {
    flex-grow: 1;
}

</style>