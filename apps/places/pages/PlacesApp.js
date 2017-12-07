import EventBusService from '../../../services/EventBusService.js'
import PlacesService from '../placesServices/PlacesService.js';
import PlaceDetails from '../comps/PlaceDetails.js'
import PlacesList from '../comps/PlacesList.js';
import SearchPlace from '../comps/SearchPlace.js';
import MapComp from '../comps/MapComp.js';
export default {
    template: `
        <section>
            <map-comp></map-comp>
            <div class="comps">
            <search-place></search-place>
            <places-list :places="places"></places-list>
            <place-details v-if="showDetailsMode" :place="selectedPlace"></place-details>
            </div>
        </section>
    `,
    data() {
        return {
            places: [],
            selectedPlace: null
        }
    },
    created() {
        EventBusService.$on('changeSelected', place => {
            this.$router.push('/places/place/' + place.id);
            this.selectedPlace = place;
        });
        PlacesService.getPlaces()
            .then(places => this.places = places)
    },
    computed: {
        showDetailsMode() {
            if (this.$route.params.placeId) {
                PlacesService.getPlaceById(+this.$route.params.placeId)
                .then(place=>{
                    this.selectedPlace = place;
                });
                return true
            }
            return false
        }
    },
        components: {
        PlacesList,
        PlaceDetails,
        MapComp,
        SearchPlace
    }
}