export default {
    template: `
          <section class="my-location-button">
            <span class="icon is-medium	my-location-container" @click="GoToUserPos">
            <i class="fa fa-lg fa-location-arrow"></i>
            </span>
          </section>
      `,
    methods: {
        GoToUserPos() {
            this.$emit('GoToUserPos')
        }
    }
}  