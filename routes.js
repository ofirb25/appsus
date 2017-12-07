import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';
// import EmailList from './apps/emails/comps/EmailList.js';
// import EmailDetails from './apps/emails/comps/EmailDetails.js';
import EmailApp from './apps/emails/pages/EmailApp.js';

const routes = [
    {
        path: '/',
        component : WelcomePage
    },
    {
        path: '/notes',
        component : NotesHomePage
    },
    {
        path: '/notes/:action',
        component : NotesHomePage
    },
    {
        path: '/notes/:noteId/:action',
        component: NotesHomePage
    },
    {
        path: '/mails' ,
        component: EmailApp
    },
    {
        path: '/mails/mail/:mailId' ,
        component: EmailApp
    },
    {
        path: '/mails/:action',
        component: EmailApp
    }
]

export default routes