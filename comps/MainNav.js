import EventBusService from '../../../services/EventBusService.js';
import NotesService from '../apps/keeper/services/note.service.js'
import MailService from '../apps/emails/mailServices/MailService.js';
import PlacesService from '../apps/places/placesServices/PlacesService.js';


export default {
  template: `
<div class="nav-container">
  <nav class="nav" >
    <a class="navbar-item nav-logo" href="/">
      <img src="../assets/logo.png" alt="Apsus app" width="112" height="28" class="logo-img">
    </a>
    <div id="main-nav" class="nav-menu">
        <router-link class="nav-item nav-home" active-class="is-active" to="/" exact>
        <img src="assets/house.png"/>
        </router-link>
        <router-link class="nav-item" active-class="is-active" to="/places">
        <img src="assets/location.png"/>
        <div>{{placesCount}}</div>
        </router-link>
        <router-link class="nav-item" active-class="is-active" to="/notes">
        <img src="assets/test.png"/>
        <div>{{notesCount}}</div>
        </router-link>
        <router-link class="nav-item" active-class="is-active" to="/mails">
        <img src="assets/mail.png"/>
        <div>{{mailsCount}}</div>
      </router-link>

    </div>
  </nav>
</div>
`,
  data() {
    return {
      isOpen: false,
      mailsCount: null,
      placesCount: PlacesService.places.length,
      notesCount: NotesService.notes.length
    }
  },
  created() {
    MailService.filterUnread().then(filteredMails =>this.mailsCount = filteredMails.length)
    EventBusService.$on('changeMailsCount', this.editMailNum);
    EventBusService.$on('changePlacesCount', this.changePlacesCount);
    EventBusService.$on('changeNotesCount', this.changeNotesCount);
    
  },
  methods: {
    editMailNum() {
      MailService.filterUnread().then(filteredMails =>this.mailsCount = filteredMails.length)  
    },
    changeNotesCount() {
      this.notesCount = NotesService.notes.length  
    },
    changePlacesCount() {
      this.placesCount = PlacesService.places.length  
    }
  }
}