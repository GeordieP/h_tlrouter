import { app, h } from 'hyperapp'

import state from './state'
import actions from './actions'

import Index from './components/index'
import Preferences from './components/preferences'
import Details from './components/details'

import { Router, withTlRouter } from 'tlRouter'

const router = Router({
    '/': Index,
    '/preferences': Preferences,
    '/details': Details
})

const dispatch = withTlRouter(app)(
    state,
    actions,
    router,
    document.body
)

// basic hot reloading for now
if (module.hot) {
    module.hot.accept()
}
