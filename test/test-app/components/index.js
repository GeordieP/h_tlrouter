import { h } from 'hyperapp'

import { Link } from 'tlRouter'

module.exports = (state, actions) => (
    <div>
        <Link to='/preferences'>Prefs</Link>
        <h1>Index</h1>
        <p>Counter: {state.counter}</p>
        <button onclick={ actions.countUp }>+</button>
        <button onclick={ actions.countDown }>-</button>
    </div>
)

