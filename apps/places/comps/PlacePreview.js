export default {
    template: `
    <section class="place-list-item" @click="changePlace" :class="classObj">
        <router-link :to="'/places/place/'+place.id" 
         class="place-preview panel-block">
            <div class="place-marker-wrapper">
                <img :src="'assets/marker-icons/'+place.tag+'.png'" />
            </div>
            <div class="place-content">
                <div class="place-title">
                    {{place.name}}
                </div>
            </div>
        </router-link>
    </section>
    `,
    methods : {
        changePlace(){
            this.$emit('changePlace')
        }
    },
    computed : {
        classObj(){
            console.log(this.place.id,this.$route.params.placeId)
            return ('is-active' , this.place.id === this.$route.params.placeId) 
        }
    },
    props: {
        place: Object
    }
}