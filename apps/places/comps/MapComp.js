import PlacesService from '../placesServices/PlacesService.js'
export default {
    template: `
        <div id="map"> </div>
    `
    ,
    data() {
        return {

        }

    },
    mounted() {
        PlacesService.displayMap();
        PlacesService.getLocation().then(res=>console.log(res))
    }
}