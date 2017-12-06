import MailService from '../mailServices/MailService.js'
import EmailPreview from './EmailPreview.js'

export default {
    template :`
    <section class="panel">
    <p class="panel-heading">
        Emails
    </p>
    <div class="panel-block">
        <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search">
            <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
            </span>
        </p>
    </div>
    <p class="panel-tabs">
        <a class="is-active">all</a>
        <a>unRead {{countMails}}</a>
        <a @click="sortList('time')">Newest First</a>
        <a @click="sortList('title')">By Title</a>
        <a>sources</a>
        <a>forks</a>
    </p>
    <div class="preview-container">
    <email-preview v-for="mail in mails" :mail="mail" @updateSelected="updateSelected"></email-preview>
    </div>
    </div>
    </section>
    `
    ,
    data () {
        return {
            mails : [],
            selectedMailId : null
        }
    },
    created () {
        MailService.getMails().then(mails => this.mails = mails)
        console.log(this.mails)
    },
    methods : {
        updateSelected(mailId) {
            this.selectedMailId = mailId
            this.$emit('updateSelected',mailId)
        },
        sortList(sortBy) {
            if(sortBy === 'time') {
                this.mails = MailService.sortByDate()
            } else {
                this.mails = MailService.sortByTitle()                
            }
        }
    },
    computed : {
        countMails(){
           return this.mails.reduce((acc,mail)=>{
                return acc + !mail.isRead
            },0)
        }
    },
    components : {
        EmailPreview
    }
}