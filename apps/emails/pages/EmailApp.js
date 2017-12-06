import MailService from '../emailServices/MailService.js'

export default {
    template : `
    
    `,
    data() {
        return {
            mails: [],
            selectedEmail: null
        }
    },
    created() {
        this.getMails()
    },
    methods: {
        getMails() {
            MailService.getMails().then(mails=>this.mails = mails);
        },
    }
}