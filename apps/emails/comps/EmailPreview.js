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
       
    }
},
computed : {
    shortTxt(){
        return this.mail.text.substring(0,120) + '...'
    }
},
props : {
    mail : Object
}
}