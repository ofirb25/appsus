import EmailServices from '../emailServices/EmailServices.js'

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
            MailsService.getMails().then(mails=>this.mails = mails);
        },
    }
}