export default { 
template : `
<section @click="readMail">
    <a class="mail-preview panel-block is-active"
     :class="{'not-read':!mail.isRead}" >
            <div class="mail-avatar-wrapper">
                    <img class="avatar-img" :src="mail.senderPic"> 
                  </div>
        <div class="mail-content" >
        <div class="mail-title">
           {{mail.title}}
           <span class="preview-time is-pulled-right">{{timeAgo}}</span>
        </div>
        <div class="mail-body">
            {{shortTxt}}
        </div>
        </div>
    </a>
</div>
</section>
`,
methods : {
    readMail(){
        this.$emit('updateSelected',this.mail.id)
    }
},
data () {
    return {
       timeAgo : null
    }
},
computed : {
    shortTxt(){
        return this.mail.text.substring(0,120) + '...'
    }
},
created () {
    this.timeAgo =moment(this.mail.time).format("MMM Do");
},
props : {
    mail : Object
}
}