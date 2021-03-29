<template>
    
    <div class="homepage">
    
        <div class="section">
            
            <p>
                Trans*db ist eine Website, mit der du nach trans*relevanten medizinischen Leistungen und Communityangeboten aus deiner Umgebung suchen kannst.<br/><br/>
                Falls du für deine Transition also noch nach geeigneten Arztpersonen, Therapeut*innen oder anderen Anlaufstellen suchst, bist du bei uns genau richtig!
            </p>
    
            <img src="~/assets/location.svg" />
            
        </div>
    
        <div class="section">
            
            <p>
                Das Projekt Trans*db lebt von der Community und allen trans* Personen, die ihre Erfahrungen mit anderen teilen.<br/><br/>
    
                Falls du hilfreiche Arztpersonen, Therapeut*innen, trans* Gruppen oder andere Anlaufstellen kennen solltest,
                welche noch nicht über unsere Suche zu finden sind, würden wir uns sehr freuen, wenn du unserer Datenbank, um deine Erfahrungen ergänzt.<br/><br/>
                
                <span class="center">
                    <Button center @click="$router.push('/submit')">Eintrag einreichen</Button>
                </span>
            </p>
    
            <img src="~/assets/content.svg" />
    
        </div>
        
        <div class="section">
    
            <p>
                Wenn du Trans*db über deine Einträge hinaus unterstützen möchtest, würden wir uns sehr darüber freuen, wenn du unseren Link mit anderen teilst.<br/><br/>
                Auch kannst du dich gerne bei uns melden, um auf andere Weise bei unserem Projekt mitzuwirken!
                Stets suchen wir nach Leuten, die beim Aufbau und der Wartung unserer Website helfen, die nach Informationen suchen oder auch Texte für unsere Website verfassen.
            </p>
            
            <img src="~/assets/group.svg" />
            
        </div>
        
    </div>
    
</template>

<script>
import Button from "@/components/utils/Button";

export default {
    name: "index",
    components: {Button},
    async asyncData({ $content }) {
        const indexPage = await $content("homepage").fetch();
        return { indexPage }
    }
}
</script>

<style scoped>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
}

.homepage .section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7% 5%;
}

.homepage .section img {
    max-height: 250px;
    margin: 0 5%;
}

.homepage .section:nth-child(2n) {
    flex-direction: row-reverse;
    background-color: white;
}

.homepage p {
    line-height: 1.4em;
    margin: 0;
    font-size: 21px;
    padding: unset;
    max-width: 580px;
    text-align: left;
    font-weight: 500;
}

.homepage .center {
    display: flex;
    justify-content: center;
}

.homepage h2 {
    margin-top: 50px;

    padding: unset;
    margin-bottom: unset;
}

.homepage a[href="/submit"] {
    font-weight: 900;
    text-decoration: none;
    font-size: 18px;
    display: block;
    margin: auto;
    width: max-content;
    color: var(--color-background);
    padding: 8px 10px;
    border-radius: 4px;
    background: linear-gradient(50deg, var(--color-blue) 5%, var(--color-pink) 90%);
}
</style>