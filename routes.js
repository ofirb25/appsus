import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';
import EmailList from './apps/emails/comps/EmailList.js';

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
        path: '/test' ,
        component: EmailList
    }
]

export default routes