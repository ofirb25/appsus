import PlacePreview from '../comps/PlacePreview.js'
export default {
    template: `
        <section class="places-list-container" :class="classObj">
            <div class="map-legend-trigger" :class="classObj" @click="isOpen=!isOpen">Map Legend</div>
            <place-preview v-for="place in places" :place="place"></place-preview>
        </section>
    `,
    props: {
        places: Array
    },
    data (){
        return {
            isOpen : false
        }
    },
    computed : {
        classObj() {
            if(innerWidth <= 600) {
                console.log('width', innerWidth)
                if (this.isOpen ) {
                    return {open : this.isOpen}
                } else {
                    return {close : !this.isOpen}
                }
            }
        }
    },
    components: {
        PlacePreview
    }
}

