import MailService from '../mailServices/MailService.js'
import EmailPreview from './EmailPreview.js'

export default {
    template: `
    <section class="mail-list panel">
    <p class="panel-heading">
        Emails
    </p>
    <div class="panel-block">
        <p class="control has-icons-left">
            <input class="input is-small" type="text" @input="doSearch" @keyup.enter="doSearch"
            placeholder="search" v-model="searchQuery">
            <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
            </span>
        </p>
    </div>
    <div class="panel-block">
        <progress class="progress" :value="mailsLength - countMails" :max="mailsLength">15%</progress>                
    </div>
    <p class="panel-tabs">
        <a :class="{'is-primary' : filterType ==='all'}" 
        @click="sortList('all')" class="tag">all</a>
        <a :class="{'is-primary' : filterType ==='unread'}"
         @click="sortList('unread')"class="tag"> <span class="fa fa-envelope"></span>  {{countMails}}</a>
        <a :class="{'is-primary' : filterType ==='time'}" 
        @click="sortList('time')" class="tag">Newest First</a>
        <a :class="{'is-primary' : filterType ==='title'}"
         @click="sortList('title')" class="tag">By Title</a>
    </p>
    <div v-if="mails.length" class="preview-container">
    <transition-group name="flip-list" tag="section">
        <email-preview  v-for="mail in mails" :mail="mail" :selectedMailId="selectedMailId"
        @updateSelected="updateSelected" :key="mail.id">
        </email-preview>
        </transition-group>    
    </div>
    <div v-else="!mails.length" class="panel-block">Nothing to show...</div>
    </div>
    </section>
    `
    ,
    data() {
        return {
            // mails : [],
            selectedMailId: null,
            searchQuery: '',
            filterType: 'all',
        }
    },
    methods: {
        updateSelected(mailId) {
            this.selectedMailId = mailId
            this.$emit('updateSelected', mailId)
        },
        sortList(sortBy) {
            this.$emit('sortList',sortBy);
            this.filterType = sortBy
        },
        doSearch() {
            this.$emit('doSearch', this.searchQuery);
        }
    },
    computed: {
        countMails() {
            return this.mails.reduce((acc, mail) => {
                return acc + !mail.isRead
            }, 0)
        },
        mailsLength(){
            return this.mails.length
        }
    },
    components: {
        EmailPreview
    },
    props: {
        mails: Array
    }
}