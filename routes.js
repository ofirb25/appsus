import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';
import EmailDetails from './apps/emails/comps/EmailDetails.js';

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
        path: '/mails/details/:mailId',
        component: EmailDetails
    }
    
    
]

export default routes