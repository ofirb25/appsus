import MailService from '../mailServices/MailService.js';
import EmailDetails from '../comps/EmailDetails.js';
import EmailList from '../comps/EmailList.js'
import EmailCompose from '../comps/EmailCompose.js'

export default {
    template: `
    <section>
        <div class="columns">
            <div class="column is-third">
                <email-list :mails="mails" @updateSelected="updateSelected" 
                @doSearch="doSearch" @sortList="sortList">
                </email-list>
                <img v-if="isLoading" src="assets/Loading_icon.gif"/>                
            </div>
            <div class="column" v-if="showDetailsMode">
                <transition name="custom-classes-transition"
                enter-active-class="animated fadeInDown" 
                leave-active-class="animated bounceOutRight">
                    <email-details v-if="selectedMail" :mail="selectedMail"
                    @deleteMail="deleteMail" @markUnread="markUnread"></email-details>
                </transition>
                
            </div>
            <div class="column" v-else-if="onAddMode">
                <email-compose @sendMail="sendMail"></email-compose>
            </div>
            <div class="column" v-else></div>
        </div>
        <router-link v-if="!onAddMode" to="/mails/compose" tag="button" class="add-note button is-danger">
            <span class="fa fa-plus"></span>
        </router-link>                                                

    </section>
    `,
    data() {
        return {
            mails: [],
            selectedEmailId: null,
            selectedMail: null,
            isLoading: false            
        }
    },
    created() {
        this.isLoading = true;        
        this.getMails()
        if (this.$route.params.mailId) {
            this.updateSelected(+this.$route.params.mailId)
        }
    },
    methods: {
        getMails() {
            MailService.getMails().then(mails => {
                this.isLoading = false;                        
                this.mails = mails});
        },
        updateSelected(mailId) {
            this.selectedEmailId = mailId
            this.$router.push('/mails/mail/' + mailId);
            MailService.getMailById(mailId)
                .then(mail => {
                    this.selectedMail = mail
                    if (!mail.isRead) MailService.markRead(mailId)
                    console.log(mail)
                });
        },
        deleteMail(mailId) {
            MailService.deleteMail(mailId)
                .then(mails => {
                    console.log('deleted!');
                    this.selectedMail = null 
                    this.$router.push('/mails');                    
                })
        },
        markUnread(mailId) {
            MailService.markRead(mailId)
            .then(mails => {
                console.log('marked!');
                this.selectedMail = null 
                this.$router.push('/mails');                    
            })
        },
        doSearch(query){
            MailService.searchMail(query)
                .then(mails => this.mails = mails)
                .catch(res => this.mails = res);
        },
        sortList(sortBy) {
            if (sortBy === 'time') {
                this.mails = MailService.sortByDate()
            } else if (sortBy === 'title') {
                this.mails = MailService.sortByTitle()
            }
            else if (sortBy === 'unread') {
                MailService.filterUnread().then(filteredMails =>this.mails = filteredMails)
            } else {
                this.getMails()
            }
        },
        sendMail(mail) {
            MailService.saveMail(mail).then(res => {
                this.$router.push('/mails');
            })
        }
    },
    computed: {
        onAddMode() {
            if (this.$route.params.action === 'compose') {
                return true
            }
            return false
        },
        showDetailsMode() {
            if (this.$route.params.mailId) {
                return true
            }
            return false
        }

    },
    components: {
        EmailDetails,
        EmailList,
        EmailCompose
    }
}