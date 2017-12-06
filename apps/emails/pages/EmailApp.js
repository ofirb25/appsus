import MailService from '../mailServices/MailService.js';
import EmailDetails from '../comps/EmailDetails.js';
import EmailList from '../comps/EmailList.js'

export default {
    template: `
        <section>
        <div class="columns">
            <div class="column is-third">
                <email-list @updateSelected="updateSelected"></email-list>
            </div>
            <div class="column">
                <email-details v-if="" :mail="selectedMail" @deleteMail="deleteMail"></email-details>
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
        }
    },
    components: {
        EmailDetails,
        EmailList
    }
}