import MailService from '../mailServices/MailService.js';
import EmailDetails from '../comps/EmailDetails.js';
import EmailList from '../comps/EmailList.js'
import EmailCompose from '../comps/EmailCompose.js'

export default {
    template: `
        <section>
        <div class="columns">
            <div class="column is-third">
                <email-list @updateSelected="updateSelected"></email-list>
            </div>
            <div class="column" v-if="showDetailsMode">
                <email-details :mail="selectedMail" @deleteMail="deleteMail" @closeDetails="closeDetails"></email-details>
            </div>
            <div class="column" v-else-if="onAddMode">
                <email-compose @sendMail="sendMail"></email-compose>
            </div>
            <div class="column" v-else>
            </div>
        </div>
        </section>
    `,
    data() {
        return {
            mails: [],
            selectedEmailId: null,
            selectedMail: null
        }
    },
    created() {
        if (this.$route.params.mailId) {
            this.updateSelected(+this.$route.params.mailId)
        }
    },
    methods: {
        getMails() {
            MailService.getMails().then(mails => this.mails = mails);
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
                    swal(
                        'Deleted!',
                        'Your mail has been deleted.',
                        'success'
                    )
                    console.log('deleted!');
                    this.selectedMail = null;
                    this.$router.push('/mails')
                })
        },
        closeDetails() {
            this.selectedMail = null;
            this.$router.push('/mails')
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