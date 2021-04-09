<template>
    
    <div class="homepage">
    
        <div class="section one">
            <nuxt-content :document="section_1" />

            <div class="skyline">
                <img src="~/assets/index/skyline_right.svg" class="right" >
                <img src="~/assets/index/skyline_left.svg" class="left" >
            </div>

        </div>

        <div class="stripe">
            <Button center @click="$router.push('/submit')" class="button_submit">
                Einen neuen Eintrag einreichen
            </Button>

            <div class="section two">
                <h2> Wie kann ich helfen? </h2>

                <img src="~/assets/index/contribute_large.svg" class="contribute large" >
                <img src="~/assets/index/contribute_small.svg" class="contribute small" >

                <nuxt-content :document="section_2" />
            </div>
        </div>

        <div class="section three">
            <h2> Vielen Dank! </h2>

            <img src="~/assets/index/heart.svg" class="heart" >

            <nuxt-content :document="section_3" />
        </div>
        
    </div>
    
</template>

<script>
import Button from "@/components/utils/Button";

export default {
    name: "index",
    components: {Button},
    async asyncData({ $content }) {
        let sections = await $content("homepage").limit(3).sortBy("slug").fetch();
        
        return { section_1: sections[0], section_2: sections[1], section_3: sections[2] };
    }
}
</script>

<style>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

/* Text */

.homepage p {
    line-height: 1.4em;
    font-size: 21px;
    text-align: left;
    font-weight: 500;

    margin-top: 0;
}

.homepage h1, .homepage h2 {
    text-align: center;
}

.homepage h2 {
    margin: 1.2em 0;
}

/* Sections */

.homepage .section {
    position: relative;
    padding: 45px 12px;
    width: 100%;

    max-width: 1100px;
}

.homepage .stripe {
    width: 100%;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
}

.homepage .section:not(.one) {
    display: grid;
    column-gap: 48px;
    align-items: center;
}


/* Section 1 */

.homepage .section.one {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.homepage .section.one p {
    text-align: center;
    max-width: 580px;
}

/* Skyline Image */

.homepage .skyline {
    display: block;
    z-index: -1;

    position: relative;
    margin-top: -158px;

    height: 256px;
    width: 100%;
}

.homepage .skyline img {
    position: absolute;
    height: 100%;
}

.homepage .skyline img.left {
    left: 0;
}

.homepage .skyline img.right {
    right: 0;
}

@media only screen and (max-width: 950px) {
    .homepage .skyline {
        height: calc( min(256px, calc(50vw - 24px)));

        margin-top: 0;
    }
}

/* Section 2 */

.homepage .section.two {
    grid-template-columns: 2fr 3fr;
    grid-template-areas: "h2  h2 "
                         "img txt";
}

.homepage .section.two h2 {
    grid-area: h2;
}

.homepage .section.two .nuxt-content {
    grid-area: txt;
    width: 100%;
}

.homepage .section.two .contribute {
    grid-area: img;
}

.homepage .section.two .contribute.small {
    display: none;
}

@media only screen and (max-width: 720px) {
    .homepage .section.two {
        grid-template-columns: 100%;
        grid-template-areas: "h2"
                             "img"
                             "txt";
    }

    .homepage .section.two .nuxt-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1em;
    }

    .homepage .section.two p {
        text-align: center;
        max-width: 540px;
    }

    .homepage .section.two .contribute.large {
        display: none;
    }

    .homepage .section.two .contribute.small {
        display: block;
    }
}

/* Button */

.homepage .button_submit {
    font-weight: 900;
    font-size: 18px;
    height: 45px;
    color: var(--color-background);
    padding: 12px;
    background: linear-gradient(50deg, var(--color-blue) 5%, var(--color-pink) 90%);

    box-shadow: 1px 1.2px 4px var(--color-box-shadow-strong),
        2px 2.5px 8px var(--color-box-shadow-rim),
        0 0 16px var(--color-box-shadow-glow);

    text-shadow: 0.5px 1px 3px var(--color-text-shadow-rim),
        0 0 8px var(--color-text-shadow-glow);

    position: absolute;
    top: -17.188px;
    
    left: 0;
    right: 0;
    margin: auto;

    max-width: max-content;
}

.homepage .button_submit:hover {
    box-shadow: 1px 1.2px 4px var(--color-box-shadow-strong),
        2px 2.5px 8px var(--color-box-shadow-rim),
        0 0 16px var(--color-box-shadow-glow),
        2px 3px 6px var(--color-box-shadow);;
}

/* Section 3 */

.homepage .section.three {
    grid-template-columns: 3fr 2fr;
    grid-template-areas: "h2  h2 "
                         "txt img";
}

.homepage .section.three h2 {
    grid-area: h2;
}

.homepage .section.three .heart {
    grid-area: img;
}

.homepage .section.three .nuxt-content {
    grid-area: txt;
}


@media only screen and (max-width: 720px) {
    .homepage .section.three {
        grid-template-columns: 100%;
        grid-template-areas: "h2"
                             "img"
                             "txt";
        
        justify-items: center;
    }

    .homepage .section.three .heart {
        max-height: 320px;
    }

    .homepage .section.three .nuxt-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1em;
    }

    .homepage .section.three p {
        text-align: center;
    }
}

</style>