import { h } from 'hyperapp'

import NavBar from './navbar'

module.exports = (state, actions) => (
    <div>
        <NavBar />
        <h1>Preferences</h1>
        <p>Counter: {state.counter}</p>
        <button onclick={ actions.countUp }>+</button>
        <button onclick={ actions.countDown }>-</button>
    </div>
)

