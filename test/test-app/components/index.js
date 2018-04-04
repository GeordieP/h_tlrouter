import { h } from 'hyperapp'

import { Link } from 'tlRouter'

module.exports = (state, actions) => (
    <div>
        <Link to='/preferences'>Prefs</Link>
        <h1>Index</h1>
    </div>
)

