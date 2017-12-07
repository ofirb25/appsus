import PlacePreview from '../comps/PlacePreview.js'
export default {
    template: `
        <section class="places-list-container">
            <place-preview v-for="place in places" :place="place"></place-preview>
        </section>
    `,
    props: {
        places: Array
    },
    components: {
        PlacePreview
    }
}