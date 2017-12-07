import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';
import EmailApp from './apps/emails/pages/EmailApp.js';
import PlacesApp from './apps/places/pages/PlacesApp.js';


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
    },
    {
        path: '/places',
        component: PlacesApp
    },
    {
        path: '/places/place/:placeId',
        component : PlacesApp
    }
]

export default routes