export default {
  template: `
  <div v-if="place" class="card place-details">
    <div class="card-image">
        <figure class="image is-4by3">
            <img v-for="(photo,idx) in place.photos" :src="photo" v-if="curPhoto === idx" alt="Placeholder image">
        </figure>
        <div class="details-selectors">
            <span v-for="(photo,idx) in place.photos" class="fa" @click="curPhoto=idx" :class="isCurpic(idx)"></span>
        </div>
    </div>
    <router-link to="/places" class="exit-place-details">
        <span tag="button" class="delete" aria-label="close"></span>        
    </router-link>

    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48" v-if="!onEditMode">
                    <img :src="place.tagIcon" alt="Placeholder image">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4" :contenteditable="onEditMode" @input="tempUpdatePlace($event, 'name')" autofocus>{{place.name}}</p>
            </div>
        </div>
        <div class="field" v-if="onEditMode">
            <p class="control has-icons-left">
                <span class="select">
                    <select v-model="updatedPlace.tag">
                        <option value="fun" selected>Fun</option>
                        <option value="food">Food</option>
                        <option value="shopping">Shopping</option>
                        <option value="animals">Animals</option>
                    </select>
                </span>
                <span class="icon is-small is-left">
                    <i class="fa fa-hashtag"></i>
                </span>
            </p>
        </div>
        <div class="content" :contenteditable="onEditMode" @input="tempUpdatePlace($event, 'description')">
            {{place.description}}
            <br>
        </div>
        <div class="field is-grouped is-clearfix">
        <span v-if="!onEditMode" class="icon has-text-info place-details-icon" @click="switchToEdit">
          <i class="fa fa-pencil fa-lg"></i>
        </span>
        <span v-if="!onEditMode" @click="deletePlace(place.id)" class="icon has-text-info place-details-icon">
          <i class="fa fa-trash-o fa-lg "></i>
        </span>
        </div>
        <div class="field is-grouped" v-if="onEditMode">
            <div class="control">
                <button class="button is-link" @click="updatePlace">Save</button>
            </div>
            <router-link :to="'/places/place/'+place.id">
                <div class="control">
                    <button class="button is-text">Cancel</button>
                </div>
            </router-link>
        </div>

    </div>
  </div>
    `,
  props: {
    place: Object,
  },
  data() {
    return {
      curPhoto: 0,
      updatedPlace: '',
    }
  },
  methods: {
    isCurpic(idx) {
      return this.curPhoto === +idx ? { 'fa-circle': true } : { 'fa-circle-o': true }
    },
    tempUpdatePlace(e, propToUpdate) {
      if (propToUpdate === 'name') this.updatedPlace.name = e.target.innerText
      else this.updatedPlace.description = e.target.innerText
    },
    switchToEdit() {
      this.$router.push('/places/place/' + this.place.id + '/edit');
    },
    updatePlace() {
      this.$emit('updatePlace', this.updatedPlace)
    },
    deletePlace(placeId) {
      this.$emit('deletePlace', placeId)      
    }
  },
  computed: {
    onEditMode() {
      this.updatedPlace = JSON.parse(JSON.stringify(this.place))
      return this.$route.params.action === 'edit'
    }
  },
  updated 
}