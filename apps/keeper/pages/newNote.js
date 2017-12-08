import NotesService from '../services/note.service.js'
import colorPicker from '../comps/colorPicker.js'

export default {
    template: `
    
    <div class="modal" :class="{'is-active' : isDDActive}" @keyUp.esc="test">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Note Details</p>
        <router-link tag="button" to="/notes" class="delete" aria-label="close"></router-link>
      </header>
      <section class="modal-card-body">
        <h2></h2>
        <form @submit.prevent="saveNote">
          <div class="field">
            <div class="control">
              <input v-model="note.title" class="input" type="text" placeholder="Title" required>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="note.text" class="textarea note-description" rows="2" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="note.image" class="input" type="text" placeholder="Image url">
              <span class="icon is-small is-left">
                <i class="fa fa-camera"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <div class="control">
            </div>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <span class="select">
                <select v-model="note.proiority">
                  <option value="3" selected>High</option>
                  <option value="2">Medium</option>
                  <option value="1">Low</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fa fa-flag"></i>
              </span>
            </p>
          </div>
          <color-picker :value="note.color" v-model="note.color"></color-picker>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Save</button>
            </div>
            <div class="control">
              <router-link to="/notes" class="button is-text">Cancel</router-link>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
`,
    data() {
        return {
            note: {
                text: '',
                title: '',
                image: '',
                color: ''
            },
            isDDActive : true            
        }
    },
    methods: {
        saveNote() {
            NotesService.saveNote(this.note).then(res => {
                this.$router.push('/notes');
            })
            .catch(err => console.log('err', err))
        },
        closeModal() {
          this.$router.push('/notes')
      }
    },
    created (){
        if (this.$route.params.noteId) {
            NotesService.getNoteById(this.$route.params.noteId).then(note=>this.note = note)
        }
        console.log('params', this.$route.params.noteId);
    },
    components : {
        colorPicker
    }
}