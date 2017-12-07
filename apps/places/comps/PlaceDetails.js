export default {
    template :`
    <div v-if="place"class="card place-details">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-for="(photo,idx) in place.photos" :src="photo" v-if="curPhoto === idx"
          alt="Placeholder image">
        </figure>
        <div class="details-selectors">
          <span v-for="(photo,idx) in place.photos" class="fa" 
          @click="curPhoto=idx" :class="isCurpic(idx)"></span>
        </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="place.tagIcon" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{place.name}}</p>
            </div>
          </div>
      
          <div class="content">
            {{place.description}}
            <br>
            buttons
          </div>
        </div>
  </div>
    `,
    props : {
        place : Object
    },
    data () {
      return {
        curPhoto : 0
      }
    },
    methods : {
      isCurpic(idx){
        return this.curPhoto === +idx ? {'fa-circle' : true} : {'fa-circle-o': true}
      }
    },
    computed : {

    }
}