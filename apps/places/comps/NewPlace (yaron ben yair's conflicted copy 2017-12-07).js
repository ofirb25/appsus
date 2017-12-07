import PlacesService from '../placesServices/PlacesService.js';

export default {
  template: `
  <div v-if="apiData" class="card place-details">
    <div class="card-image">

  
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
         
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
            <select>
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
        <div class="content">
   
          <br>
          
        </div>
      </div>
</div>
`, props: {
    // data: Object,
    map: Object

  },
  data() {
    return {
      apiData: null,
      userData: null
    }
  },
  created() {
    PlacesService.getLocation('tel aviv').then(data => {
      this.apiData = data
      var pos = {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      }
      this.map.setCenter(pos);
      this.userData = PlacesService.emptyPlace();
      console.log(this.userData)
    })
    // console.log(this.data);
    // this.userData = PlacesService.emptyPlace();

    // console.log('ffff',userData)
  }
}