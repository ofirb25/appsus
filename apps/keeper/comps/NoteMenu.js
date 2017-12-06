export default {
    template: `
<div class="dropdown" :class="{'is-active' : isDDActive}">
    <div @click="isDDActive = !isDDActive" class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div @click="isDDActive = !isDDActive" class="dropdown-content">
            <router-link tag="a" :to="'/notes/'+ note.id + '/details'" class="dropdown-item">
                <span class="fa fa-arrows-alt"></span>
            </router-link>
            <router-link :to="'/notes/'+ note.id + '/edit'" class="dropdown-item">
                <span class="fa fa-pencil"></span>
            </router-link>
            <a href="#" @click.prevent="deleteNote(note.id)" class="dropdown-item">
                <span class="fa fa-trash"></span>
            </a>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            isDDActive: false
        }
    },
    methods: {
        deleteNote(noteId) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                        this.$emit('deleteNote', noteId)
                    )
                }
            })            
        }
    },
    props: {
        note: Object
    }
}