import NotesService from '../services/note.service.js'

export default {
    template: `
    <div class="modal" v-if="note" :class="{'is-active' : isDDActive}" @keyUp.esc="test">
    <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{note.title}}</p>
                <router-link tag="button" to="/notes" class="delete" aria-label="close"></router-link>
            </header>
            <section class="modal-card-body">
                <div class="card-content" :class="'card-' + note.color">
                    <div class="content">
                        <p>{{note.text}}</p>
                        <p>Created on: {{convertedDate}}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `,
    data() {
        return {
            note: null,
            convertedDate: null,
            isDDActive : true 
        }
    },
    methods : {
        closeModal() {
            this.$router.push('/')
        }
    },
    created() {
        if (this.$route.params.noteId) {
            NotesService.getNoteById(this.$route.params.noteId).then(note => {
                this.note = note;
                this.convertedDate = new Date(this.note.created,).toDateString()
                
            })
        }
        console.log('params', this.$route.params.noteId);
    }
}