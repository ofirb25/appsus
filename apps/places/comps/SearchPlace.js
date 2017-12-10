export default {
  template: `
        <section class="search-place">
        <div class="field">
        <p class="control has-icons-left">
          <input ref="auto" class="input map-input" 
          type="text" placeholder="Search a place"
           v-model="query" @change="changeLocation" @keyup.enter="changeLocation" @input="doAutocomplete($event)">
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
  },
  methods: {
    changeLocation() {
      if (!this.query) return
      this.$emit('changeLocation', this.query)
    },
    doAutocomplete(event) {
      var autoComplete = new google.maps.places.Autocomplete(event.target);
    }
  }
}
