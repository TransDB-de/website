<template>

    <div class="text-filter">

        <div class="autocomplete">

            <input ref="input" type="text"
                v-model="userInput"
                @focus="focused = true"
                @blur="focused = false"
                @keydown.up="inputKeyUpDown(true, $event)"
                @keydown.down="inputKeyUpDown(false, $event)"
                @keydown.enter="inputKeyEnter"
                :placeholder='`Freitext oder Filter. Versuche "${randomSuggestion}"`'
            >

            <ul class="dropdown" ref="dropdown" :class="suggestions.length > 0 && focused ? '' : 'hidden'">
                <li v-for="suggestion in suggestions" :key="suggestion"
                    ref="suggestions"
                    :class="selectedSuggestion === suggestion ? 'selected' : ''"
                    v-on:mousedown="$event.preventDefault();"
                    @click="selectSuggestion(suggestion)"
                >
                    <span class="user-input">{{userInput}}</span><span class="suggestion">{{suggestion}}</span>
                </li>
            </ul>

        </div>

        <Button :title="mouseOverTexts['filter']" @click="submit">Filtern</Button>
    </div>

</template>

<script>
import Button from "@/components/utils/Button";
import FilterLangMixin from "@/mixins/filterLang";
import MathMixin from "@/mixins/math";
import MouseoverMixin from "@/mixins/mouseover";

export default {
    components: { Button },
    mixins: [ FilterLangMixin, MathMixin, MouseoverMixin ],
    data() {
        return {
            userInput: "",
            focused: false,
            selectedSuggestion: "",
            randomSuggestion: "ist: ..."
        }
    },
    computed:{
        suggestions() {
            if (this.userInput === "") return [];

            return this.getAutocompletion(this.userInput);
        }
    },
    watch: {
        userInput(input) {
            if (input === "") {
                this.randomSuggestion = this.getRandomSuggestion();
            }
        }
    },
    created() {
        this.randomSuggestion = this.getRandomSuggestion();
    },
    methods: {
        getAutocompletion(input) {
            let details = this.language.liveParse(input);
            let autoComp = details.autocomplete;

            if (!autoComp.includes(this.selectedSuggestion)) {
                this.selectedSuggestion = "";
            }

            return autoComp;
        },

        selectSuggestion(s) {
            this.userInput += s;
        },

        async inputKeyUpDown(up, event) {
            if (!this.suggestions) return;

            event.preventDefault();

            let index;

            if (this.selectedSuggestion === "") {
                index = 0;
            } else {
                index = this.suggestions.indexOf(this.selectedSuggestion);

                index += up ? -1 : 1;
                index = this.clamp(index, 0, this.suggestions.length - 1);
            }

            this.selectedSuggestion = this.suggestions[index];

            await this.$nextTick;
            
            this.scrollSelectedToView(index);
        },

        scrollSelectedToView(index) {
            if (!this.$refs.suggestions) return;

            const scrollMargin = 20;
            let selected = this.$refs.suggestions[index];

            if (selected) {
                let { offsetHeight, scrollTop } = this.$refs.dropdown;
                
                this.$refs.dropdown.scrollTop = this.clamp(
                    scrollTop,
                    selected.offsetTop + selected.offsetHeight - offsetHeight + scrollMargin,
                    selected.offsetTop - scrollMargin
                );
            }
        },

        inputKeyEnter() {
            if (!this.suggestions || !this.selectedSuggestion) {
                this.submit();
            } else {
                this.selectSuggestion(this.selectedSuggestion);
            }
        },

        submit() {
            let parsed = this.language.parse(this.userInput);
            this.$emit("submit", parsed);
        },
        
        getRandomSuggestion() {
            let arr = Object.keys(this.language.filters);
            let rnd = Math.floor(Math.random() * arr.length);
            return arr[rnd] + ": ...";
        }

    }
}
</script>

<style scoped>
.text-filter {
    display: grid;
    grid-template-columns: 1fr auto;
}

.autocomplete {
    position: relative;
    width: 100%;
}

button {
    margin-left: 16px;
}

.dropdown {
    position: absolute;
    top: 36px;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    background-color: var(--color-light);

    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    
    margin: 0;
    padding: 0;
    border: 2px solid #e1e3e5;
    border-top: 0;
    border-radius: 0 0 4px 4px;
}

.dropdown.hidden {
    visibility: hidden;
}

.dropdown > li {
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    overflow-x: hidden;
    padding: 0 12px;
    scroll-snap-type: y mandatory;
}

.dropdown > li:hover {
    background-color: var(--color-light-accent);
}

.dropdown > li.selected {
    background-color: var(--color-highlight);
    scroll-snap-align: center;
}

.user-input {
    color: var(--color-grey);
}

.suggestion {
    color: var(--color-radio-selected);
}

li.selected > .suggestion {
    color: white;
}

input {
    background-color: var(--color-input-background);

    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: var(--text-color);
    outline: 0;
    border-radius: 4px;
    border: 2px solid var(--color-input-outline);

    padding: 6px 12px;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
}

input:focus {
    border: 2px solid var(--color-input-outline-focus);
}

input:focus ~ .dropdown {
    border: 2px solid var(--color-input-outline-focus);
    border-top: 0;
}

input::placeholder {
    color: var(--color-input-placeholder);
    font-weight: 500;
}

</style>
