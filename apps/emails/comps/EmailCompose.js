import MailService from '../mailservices/MailService.js';

export default {
    template: `
    <div class="card">
        <header class="card-header">
            <div class="card-header-title">
                <div class="control has-icons-left has-icons-right" v-if="inputMode">
                    <input class="input" type="text" placeholder="to:" autofocus @blur="ToggleInputMode" v-model="mailTo">
                    <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                    </span>
                </div>
                <span v-if="!inputMode" class="tag is-rounded mail-to-tag" @click="ToggleInputMode">{{mailTo}}</span>
            </div>
            <span tag="button" class="delete closeMail" aria-label="close"></span>
        </header>
        <div class="card-content">
            <div class="content">
                <form @submit.prevent="sendMail">
                    <div class="field">
                        <label class="label">title</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="title" v-model="mail.title">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Textarea" v-model="mail.text"></textarea>
                        </div>
                    </div>
                    <div class="control">
                        <button class="button is-link">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>    `,
    data() {
        return {
            mail: MailService.emptyMail(),
            mailTo: '',
            inputMode: true
        }
    },
    methods: {
        ToggleInputMode() {
            this.inputMode = !this.inputMode
        },
        sendMail() {
            this.$emit('sendMail', this.mail)
        }
    }
}