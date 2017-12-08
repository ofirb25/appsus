import EventBusService from '../../../services/EventBusService.js';
import PlacesService from '../placesServices/PlacesService.js';
import PlaceDetails from '../comps/PlaceDetails.js';
import NewPlace from '../comps/NewPlace.js';
import PlacesList from '../comps/PlacesList.js';
import SearchPlace from '../comps/SearchPlace.js';
import MapComp from '../comps/MapComp.js';

export default {
    template: `
        <section>
            <map-comp @gotMap="gotMap"></map-comp>
            <div class="comps">
            <search-place @changeLocation="changeLocation"></search-place>
            <places-list :places="places"></places-list>
            <transition name="custom-classes-transition"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft">
            <place-details v-if="showDetailsMode" :place="selectedPlace" @updatePlace="savePlace" @deletePlace="deletePlace"></place-details>
            <new-place @cancelPlace="cancelPlace"  @savePlace="savePlace" v-if="isAdding && userNavigation" 
            :apiData="userNavigation" :map="map"></new-place>            
            </transition>
            </div>
        </section>
    `,
    data() {
        return {
            places: [],
            selectedPlace: null,
            marker: null,
            map: null,
            userNavigation: null
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
                    .then(place => {
                        this.selectedPlace = place;
                    });
                return true
            }
            return false
        },
        isAdding() {
            console.log(this.$route.params.action === 'add')
            return this.$route.params.action === 'add'
        }
    },
    methods: {
        changeLocation(query) {
            PlacesService.getLocation(query)
                .then(data => {
                    this.userNavigation = data;
                    var pos = {
                        lat: data.results[0].geometry.location.lat,
                        lng: data.results[0].geometry.location.lng
                    }
                    this.map.setCenter(pos)
                    this.marker = new google.maps.Marker({
                        position: pos,
                        title: data.results[0].formatted_address
                    });
                    this.marker.setMap(this.map);
                    this.$router.push('/places/add')
                });
        },
        gotMap() {
            this.map = PlacesService.getMap();
            console.log(this.map)
        },
        savePlace(place) {
            PlacesService.savePlace(place).then(res => { console.log('saved!') });
            this.$router.push('/places');
        },
        cancelPlace() {
            console.log('marker', this.marker);
            // PlacesService.displayMap()
            this.marker.setMap(null);
            console.log(this.map)
        },
        deletePlace(placeId) {
            PlacesService.deletePlace(placeId)
                .then(mails => {
                    this.selectedPlace = null
                    this.$router.push('/places');
                })
        }
    },
    components: {
        PlacesList,
        PlaceDetails,
        MapComp,
        SearchPlace,
        NewPlace
    }
}