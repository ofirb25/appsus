export default {
    template: `
    <div v-if="mail" class="card mail-details">
        <header class="card-header">
        <p class="card-header-title">
            {{mail.title}}
        </p>
        <router-link to="/mails">
            <span tag="button" class="delete closeMail" aria-label="close"></span>        
        </router-link>
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
                <div class ="mail-details-ops">
                <span @click="deleteMail(mail.id)" class="icon has-text-info trash-container">
                    <i class="fa fa-trash-o fa-lg details-trash"></i>
                </span>
                <p @click="markUnread(mail.id)" class="mark-unread">Mark as unread</p>
                </div>
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
        },
        markUnread(mailId) {
            this.$emit('markUnread', mailId)
        }
    }

}