<<<<<<< HEAD
import MailService from '../mailServices/MailService.js';
=======
import MailService from '../mailservices/MailService.js';
>>>>>>> 4451e05eeb1477e05855429ad502324244e4e55a

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
                 <div class="mail-avatar-wrapper">
                    <img class="avatar-img" :src="mail.senderPic"> 
                 </div>
                <p>{{mail.sender}}</p>
                <p>{{mail.text}}</p>
                <br>
                <p>{{timeAgo}} </p>
                <span @click="deleteMail(mail.id)" class="icon has-text-info trash-container">
                    <i class="fa fa-trash-o fa-lg details-trash"></i>
                </span>
            </div>
        </div>
    </div>
    `,
    props: {
        mail: Object
    },
    data() {
        return {
            timeAgo : null
        }
    },
    updated () {
        if(this.mail) this.timeAgo = moment(this.mail.time).fromNow()
        
    },
    created() {
    },
    methods: {
        deleteMail(mailId) {
            this.$emit('deleteMail', mailId)
        }
    }

}