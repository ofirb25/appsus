import EmailServices from '../emailservices/EmailServices.js';

export default {
    template: `
    <div v-if="mail" class="card">
        <header class="card-header">
        <p class="card-header-title">
            {{mail.title}}
        </p>
        </header>
        <div class="card-content">
            <div class="content">
                <img src="/assets/senders-pics/gal_gadot.png"/>>
                <p>sent by: {{mail.sender}}</p>
                <p>{{mail.text}}</p>
                <br>
                <p>{{mail.timeAgo}} ago</p>
                <span @click="deleteMail(mail.id)" class="icon has-text-info trash-container">
                    <i class="fa fa-trash-o fa-lg details-trash"></i>
                </span>
            </div>
        </div>
    </div>
    `,
    props: [],
    data() {
        return {
            mail: null
        }
    },
    created() {
        EmailServices.getMailById(+this.$route.params.mailId).then(mail => {
            this.mail = mail;
            this.mail.timeAgo = moment(this.mail.time).fromNow(true);
        })
    },
    methods: {
        deleteMail(noteId) {
            this.$emit('deleteNote', noteId)
        }
    }

}