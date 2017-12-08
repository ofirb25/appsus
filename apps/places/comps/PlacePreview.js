export default {
    template: `
    <section class="place-list-item" @click="changePlace">
        <router-link :to="'/places/place/'+place.id" 
         class="place-preview panel-block">
            <div class="place-marker-wrapper">
                <i class="fa fa-smile-o"></i>
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
    props: {
        place: Object
    }
}