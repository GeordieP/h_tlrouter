import { app, h } from 'hyperapp'

import state from './state'
import actions from './actions'

import Index from './components/index'
import Preferences from './components/preferences'

const dispatch = app(
    state,
    actions,
    Index,
    document.body
)

// basic hot reloading for now
if (module.hot) {
    module.hot.accept()
}
