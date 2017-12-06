import NotesService from '../services/note.service.js'
import NewNote from './NewNote.js';
import NoteComp from '../comps/NoteComp.js';
import NoteDetails from '../pages/NoteDetails.js';

export default {
    template: `
        <section>
            <new-note  v-if="onAddMode||onEditMode"></new-note>
            <note-details  v-if="showDetailsMode"></note-details>
            <router-link v-if="!onAddMode" to="/notes/add" tag="button" class="add-note button is-success">
                <span class="fa fa-plus"></span>
            </router-link>                                                
            <div class="controls">
                  <div class="buttons sorting has-addons">
                      <span class="button" @click="sortTodos('priority')"title="Sort by priority"><i class="fa fa-sort-amount-desc" aria-hidden="true" ></i></span>
                      <span class="button" @click="sortTodos('time')" title="Sort by date"><i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></span>
                  </div>
            </div>
            <section class="notes">
            
                <note-comp v-for="note in notes" :note="note" >
                </note-comp>

            </section>
            </section>

    `
    ,
    data() {
        return {
            notes: [],
        }
    },
    computed : {
        onAddMode() {
            if(this.$route.params.action === 'add') {
                console.log('in new');
                return true
            }
            return false
        },
        onEditMode() {
            if(this.$route.params.action === 'edit' && this.$route.params.noteId) {
                console.log('in new');
                return true
            }
            return false
        },
        showDetailsMode() {
            if(this.$route.params.action === 'details' && this.$route.params.noteId) {
                return true
            }
            return false
        }
    },
    created (){
        this.getNotes();
    },
    methods: {
        getNotes() {
            NotesService.getNotes().then(notes=>this.notes = notes);
        },
        deleteNote(noteId) {
            NotesService.deleteNote(noteId).then(note=>{
                console.log(note)
            })
            .catch(err=>console.error('err',err))
        },
        sortTodos(sortBy) {
            if (sortBy === 'time') NotesService.sortByTime()
            else NotesService.sortByPriority()
        }
    },
    components : {
        NewNote,
        NoteComp,
        NoteDetails
    }
}