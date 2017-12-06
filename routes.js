import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';
import EmailList from './apps/emails/comps/EmailList.js';
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
<<<<<<< HEAD
        path: '/test' ,
        component: EmailList
    }
=======
        path: '/mails/details/:mailId',
        component: EmailDetails
    }
    
    
>>>>>>> c7aea013bad15490e90f363e097015053ad01290
]

export default routes