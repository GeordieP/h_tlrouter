import { app, h } from 'hyperapp'

import state from './state'
import actions from './actions'

import Index from './components/index'
import Preferences from './components/preferences'

import { Router } from 'tlRouter'

const router = Router({
    '/': Index,
    '/preferences': Preferences
})

const dispatch = app(
    state,
    actions,
    router,
    document.body
)

// basic hot reloading for now
if (module.hot) {
    module.hot.accept()
}
