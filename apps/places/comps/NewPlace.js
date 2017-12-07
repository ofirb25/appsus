export default {
    template :`
    <div v-if="place"class="card place-details">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
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
    }
}