import { h } from 'hyperapp'
import { Link } from 'tlRouter'

// wrapper element to register custom behavior on router link click
const WithCustomOnclick = ({ handler }, children) => (
    <span onclick={handler}>{children}</span>
)

// lazy component for the sake of laziness
module.exports = () => (state, actions) => (
    <div id='navbar'>
        {/* update element style based on state */ }
        { /* clicking 'home' button sends an action to update this state */}
        <p style={{ border: '3px solid ' + state.itemColor }}>Colorful!</p>

        {/* ensure custom click handlers work via wrapper element */}
        {/* custom handler and navigation should both be invoked */}
        <WithCustomOnclick handler={actions.updateColor}>
            <Link to='/'>Home</Link>
        </WithCustomOnclick>

        {/*  ensure custom href properties are applied to the rendered element -->*/}
        <Link to='/preferences' href='#customHref'>Preferences</Link>

        {/* ensure classes and IDs are applied to the rendered element */}
        <Link to='/details' id='customID' className='bolded'>Details</Link>
    </div>
)
