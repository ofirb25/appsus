export default {
    template: `
<section @click="readMail" :class="{'mail-active' : isActive}" class="mail-prev">
    <a class="mail-preview panel-block"
     :class="{'not-read':!mail.isRead}" >
            <div class="mail-avatar-wrapper">
                    <img class="avatar-img" :src="mail.senderPic"> 
                  </div>
        <div class="mail-content" >
        <span class="preview-time is-pulled-right">{{timeAgo}}</span>
        <div class="mail-title">
            <div class= "mail-sender-name"> {{mail.sender}} </div>
           {{mail.title}}
        </div>
        <div class="mail-body">
            {{shortTxt}}
        </div>
        </div>
    </a>
</div>
</section>
`,
    methods: {
        readMail() {
            this.$emit('updateSelected', this.mail.id)
        }
    },
    data() {
        return {
            timeAgo: null
        }
    },
    computed: {
        shortTxt() {
            return this.mail.text.substring(0, 120) + '...'
        },
        isActive() {
            return this.selectedMailId === this.mail.id
        }

    },
    created() {
        this.timeAgo = moment(this.mail.time).format("MMM Do");
    },
    props: {
        mail: Object,
        selectedMailId: Number
    }
}