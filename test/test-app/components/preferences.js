import { h } from 'hyperapp'

import { Link } from 'tlRouter'

module.exports = (state, actions) => (
    <div>
        <Link to='/'>Home</Link>
        <h1>Preferences</h1>
    </div>
)

