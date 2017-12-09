import EventBusService from '../../../services/EventBusService.js';
import PlacesService from '../placesServices/PlacesService.js';
import PlaceDetails from '../comps/PlaceDetails.js';
import NewPlace from '../comps/NewPlace.js';
import PlacesList from '../comps/PlacesList.js';
import SearchPlace from '../comps/SearchPlace.js';
import MapComp from '../comps/MapComp.js';
import MyLocation from '../comps/MyLocation.js';


export default {
    template: `
        <section>
            <map-comp @gotMap="gotMap"></map-comp>
            <div class="comps">
            <my-location @GoToUserPos="GoToUserPos"></my-location>
            <search-place @changeLocation="changeLocation"></search-place>
            <places-list :places="places" @searchPlace="searchPlace"></places-list>
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
            return this.$route.params.action === 'add'
        }
    },
    methods: {
        changeLocation(query) {
            PlacesService.getLocation(query)
                .then(data => {
                    this.userNavigation = data;
                    let pos = {
                        lat: data.results[0].geometry.location.lat,
                        lng: data.results[0].geometry.location.lng
                    }
                    this.map.setCenter(pos)
                    PlacesService.addMarker(pos, data.results[0].formatted_address)
                    this.$router.push('/places/add')
                });
        },
        gotMap() {
            this.map = PlacesService.getMap();
        },
        savePlace(place) {
            PlacesService.savePlace(place).then(res => { console.log('saved!') });
            if (this.$route.params.placeId) { this.$router.push('/places/place/' + this.selectedPlace.id) }
            else this.$router.push('/places');
        },
        cancelPlace() {
            
            this.marker.setMap(null);
            console.log(this.map)
        },
        deletePlace(placeId) {
            PlacesService.deletePlace(placeId)
                .then(mails => {
                    this.selectedPlace = null
                    this.$router.push('/places');
                })
        },
        searchPlace(query) {
            PlacesService.searchPlace(query)
                .then(places => this.places = places)
                .catch(res => this.places = res);
        },
        GoToUserPos() {
            PlacesService.getUserLocation()
                .then(position => {
                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    this.map.setCenter(pos)
                })
        }
    },
    components: {
        PlacesList,
        PlaceDetails,
        MapComp,
        SearchPlace,
        NewPlace,
        MyLocation
    }
}