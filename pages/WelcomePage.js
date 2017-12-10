import PlaceService from '../apps/places/placesServices/PlacesService.js';

export default {
    template: `
<section class="home">
    <div class="now-info">
            <h1 class="title is-3">Welcome To Appsus</h1>
            <div class="now-content">

            <div class="now-time">
                {{time}}
            </div>
            <div class="now-place">
                {{location.place}}
            </div>
            <div class="now-img">
                <img :src="'http://openweathermap.org/img/w/'+location.icon+'.png'" alt="">
            </div>
            <div class="now-temp">
                {{location.temp}}&#x2103 {{location.status}}
            </div>
        </div>        
    </div>
    <section class="apps">
        <div class="app-wrapper">
            <img src="assets/mail.png" alt="">
        </div>
        <div class="app-wrapper">
            <img src="assets/test.png" alt="">
        </div>
        <div class="app-wrapper">
                <img src="assets/location.png" alt="">
        </div>
    </section>
</section>
`
    , data() {
        return {
            location: null,
            time: null,
            timeInterval: null
        }
    },
    created() {
        PlaceService.getWeather()
            .then(weather => {
                console.log(weather);
                this.location = {
                    place: weather.name,
                    temp: weather.main.temp,
                    status: weather.weather[0].main,
                    icon: weather.weather[0].icon
                }
                this.time = moment().format('LLLL')
                this.timeInterval = setInterval(() => {
                    this.time = moment().format('LLLL')
                }, 60000);
            });
    },
    destroyed(){
        clearInterval(this.timeInterval)
    }
}