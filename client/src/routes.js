import MainLayout from './pages/layout/MainLayout'
import homeRoutes from './pages/home/homeRoutes'
import errorRoutes from './pages/error/errorRoutes'
import petsRoutes from './pages/pets/petsRoutes'
import HomePage from './pages/home/HomePage'

const redirectToPageNotFound = (nextState, replace) => {
	replace('/error/404')
}

export default () => ({
	childRoutes: [
		{
			path: '/',
			component: MainLayout,
			indexRoute: { component:  HomePage },
			childRoutes: [
				...homeRoutes,
				...petsRoutes,
				...errorRoutes
			]
		},
		{
			path: '*',
			onEnter: redirectToPageNotFound
		}
	]
})
