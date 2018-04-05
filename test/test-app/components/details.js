import { h } from 'hyperapp'

import NavBar from './navbar'

module.exports = (state, actions) => (
    <div>
        <NavBar />
        <h1>Details</h1>
        <p>Counter: {state.counter}</p>
        <button disabled onclick={ actions.countUp }>+</button>
        <button disabled onclick={ actions.countDown }>-</button>
        <p>No control here.</p>
    </div>
)

