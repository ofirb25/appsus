export default {
    template: `
    <div v-if="mail" class="card mail-details">
        <header class="card-header">
        <span v-if="isReplay">Re:</span>
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
                <p v-if="!isReplay">{{mail.text}}</p>
                <div class="field" v-if="isReplay">
                    <label class="label">Message</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Textarea" v-model="updatedMail.text"></textarea>
                    </div>
                </div>
                <br>
                <p>{{timeAgo}} </p>
                <div class ="mail-details-ops">
                <span @click="deleteMail(mail.id)" class="icon has-text-info trash-container">
                    <i class="fa fa-trash-o fa-lg details-trash"></i>
                </span>
                <span v-if="!isReplay" @click="isReplay = true" class="icon has-text-info trash-container">
                    <i class="fa fa-reply fa-lg details-trash"></i>
                </span>
                <p v-if="!isReplay" @click="markUnread(mail.id)" class="mark-unread">Mark as unread</p>
                <div class="control" v-if="isReplay">
                <button class="button is-link" @click="sendMail">Send
                <i class="fa fa-paper-plane paper-plane" aria-hidden="true"></i>                        
                </button>
                </div>

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
            timeAgo: null,
            isReplay: false,
            updatedMail: '',
        }
    },
    updated() {
        if (this.mail) this.timeAgo = moment(this.mail.time).fromNow()

    },
    created() {
    },
    methods: {
        deleteMail(mailId) {
            this.$emit('deleteMail', mailId)
        },
        markUnread(mailId) {
            this.$emit('markUnread', mailId)
        },
        sendMail() {
            this.$emit('sendMail', this.updatedMail)
        }
    },
    created() {
        this.updatedMail = JSON.parse(JSON.stringify(this.mail))
    }
}