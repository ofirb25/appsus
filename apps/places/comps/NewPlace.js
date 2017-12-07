import PlacesService from '../placesServices/PlacesService.js';

export default {
  template: `
  <div v-if="apiData.results" class="card place-details">
      <form @submit.prevent="savePlace">
      <div class="card-content">
        <span class="place-origin">{{apiData.results[0].formatted_address}}</span>          
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Place Name" v-model="userData.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Descrition</label>
          <div class="control">
              <textarea class="textarea" placeholder="Textarea" v-model="userData.description"></textarea>
          </div>
  
      </div>
      <div class="field">
          <label class="label">Category</label>          
        <p class="control has-icons-left">
          <span class="select">
            <select v-model="userData.tag">
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
      <div class="field">
          <div class="file is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" name="resume">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
      </div>
      <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Save</button>
          </div>
          <div class="control">
            <button @click.prevent="cancelPlace" class="button is-text">Cancel</button>
          </div>
        </div>
      </div>
      </form>
</div>
`, props: {
    apiData: Object,
    map: Object

  },
  data() {
    return {
      // apiData: null,
      userData: null
    }
  },
  methods: {
    savePlace(){
      this.$emit('savePlace',this.userData)
    },
    cancelPlace(){
      this.$emit('cancelPlace')      
      this.$router.push('/places');
    }
  },
  created() {
          this.userData = PlacesService.emptyPlace();
  }
}