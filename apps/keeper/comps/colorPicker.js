export default {
    template : `
    <section>
        <h4>select color</h4>
        <div class="colors">
            <div class="color" :class="isSelected(color)" v-for="color in colors" :style="{backgroundColor:color}" @click="changedColor(color)">
            </div>
        </div>
    </section>
    `,
    data () {
        return {
            colors : ['lightblue','lightgreen','salmon'],
        }
    },
    methods : {
        changedColor(color) {
            // this.selectedColor = color;
            this.$emit('input',color)
        },
        isSelected(color){
            return {'color-selected': color === this.selectedColor}
        }
    },
   
    props: {
        value : String
    },
    computed: {
        selectedColor() {
            return this.value
        }
    }
}