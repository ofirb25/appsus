export default {
  template: `
        <section class="search-place">
        <div class="field">
        <p class="control has-icons-left">
          <input ref="auto" class="input map-input" type="text" placeholder="Search a place" v-model="query" @keyup.enter="changeLocation" @blur="changeLocation">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
        </section>
    `,
  data() {
    return {
      query: ''
    }
  },
  mounted() {
    // var input = document.querySelector('map-input');      
    // var autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete), { types: ['geocode'] });
  },
  methods: {
    changeLocation() {
      this.$emit('changeLocation', this.query)
    }
  }
}