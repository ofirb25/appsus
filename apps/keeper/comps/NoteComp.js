import NotesService from '../services/note.service.js'
import NoteMenu from './NoteMenu.js'
export default {
    template : `
    <div class="card grid">
    <header class="card-header" :class="'card-' + note.color">
      <p class="card-header-title">
        {{note.title}}
      </p>
      <note-menu :note="note"  @deleteNote="deleteNote"></note-menu>
      
    </header>
    <div class="card-content" :class="'card-' + note.color">
      <div class="content">
        {{note.text}}
        <br>
      </div>
    </div>
  </div>
    `
    ,
    props : {note : Object},
    methods : {
        deleteNote(noteId) {
            NotesService.deleteNote(noteId).then(note=>{
                console.log(note)
            })
            .catch(err=>console.error('err',err))
        }
    },
    data () {
      return {
        isDDActive : false
      }
    },
    components : {
      NoteMenu
    }
}