import WelcomePage from './pages/WelcomePage.js';
import NotesHomePage from './apps/keeper/pages/HomePage.js';

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

]

export default routes