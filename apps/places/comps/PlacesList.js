import PlacePreview from '../comps/PlacePreview.js'
export default {
    template: `
        <section class="places-list-container" :class="classObj">
            <div class="map-legend-trigger" :class="classObj" @click="isOpen=!isOpen">
            <span class="fa fa-caret-up"></span> My Places 
            </div>
            <div class="panel-block">
            <p class="control has-icons-left">
            <input v-if="isOpen" class="input is-small" type="text" @input="searchPlace" 
            placeholder="Search in list" v-model="searchQuery">
            <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
            </span>
            </p>
        </div>
            <place-preview v-for="place in places" 
            :place="place" @changePlace="changePlace"></place-preview>
        </section>
    `,
    props: {
        places: Array
    },
    data (){
        return {
            isOpen : false,
            searchQuery: '',            
        }
    },
    computed : {
        classObj() {
            if(innerWidth <= 600) {
                if (this.isOpen ) {
                    return {open : this.isOpen}
                } else {
                    return {close : !this.isOpen}
                }
            }
        }
    },
    methods: {
        searchPlace() {
            this.$emit('searchPlace', this.searchQuery);
        },
        changePlace(){
            this.isOpen = false;
            this.$emit('changePlace')
        }
    },
    components: {
        PlacePreview
    }
}

