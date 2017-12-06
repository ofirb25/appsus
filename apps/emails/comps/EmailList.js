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
        <a>public</a>
        <a>private</a>
        <a>sources</a>
        <a>forks</a>
    </p>
    <email-preview v-for="mail in mails" :mail="mail" @updateSelected="updateSelected"></email-preview>
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
            console.log('h');
            console.log('mailid', mailId);
            this.selectedMailId = mailId
            console.log('selected', this.selectedMailId);
        }
    },
    components : {
        EmailPreview
    }
}