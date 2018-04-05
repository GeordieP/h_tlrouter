'use strict'
import { h } from 'hyperapp'

// name of app's actions/state slice reserved for the router
const TLROUTER_SLICE_KEY = '__TLROUTER__'

// router state object, gets added to app's state at key defined in TLROUTER_SLICE_KEY constant
const tlRouterStateBase = Object.freeze({
    [TLROUTER_SLICE_KEY]: {
        location: '/'
    }
})

// router actions object, gets added to app's actions at key defined in TLROUTER_SLICE_KEY constant
const tlRouterActionsBase = Object.freeze({
    [TLROUTER_SLICE_KEY]: {
        navigate: location => () => ({ location })
    }
})

// HOA app function.
// Bind our internal state and actions to the app's state and actions,
// and return the call to app.
export const withTlRouter = app => (state, actions, view, mountPoint) =>
    app(
        Object.assign({}, state, tlRouterStateBase),
        Object.assign({}, actions, tlRouterActionsBase),
        view,
        mountPoint
    )

// Main Router function.
// Pass an object mapping strings to hyperapp component modules.
// Returns a function that matches the component function shape that hyperapp expects.
// Pass the returned function to the root hyperapp.app() call as the view argument.
// When the router's "location" state property changes, we'll look through the routes map for
// a match, and render the component provided.
// If there's no match for the current location, render the component provided at key 'ROUTE_FALLBACK.
// If there's no match again, render the root route.
// We throw an error if a router is created without at least one of these two fallback options.
export const Router = routes => {
    if (routes == null || Object.keys(routes).length === 0) {
        throw new Error('No routes provided to tlRouter.Router')
    }

    if (!routes['ROUTE_FALLBACK'] && !routes['/']) {
        throw new Error('No fallback or base route; please provide a route matching either "/" or "ROUTE_FALLBACK".')
    }

    // component render. Return the component that matches the router location state property.
    // fallback on ROUTE_FALLBACK key if location doesn't match;
    // if it's provided, it should take priority over returning the root route.
    // otherwise return root route.
    return (state, actions) => routes[state[TLROUTER_SLICE_KEY].location] || routes['ROUTE_FALLBACK'] || routes['/']
}

// Link component.
// Allows for for changing the application route anywhere it's used.
// Passsed prop 'to' should match a route provide in the router setup. It defaults to '/'.
// Any extra props given are passed along to the rendered element.
export const Link = (props, children) => (state, actions) => {
    // build an attributes object out of a default href, the router click handler, and any passed props
    const attrs = Object.assign(
        {
            // default href
            href: '#',
            // click handler
            onclick: actions[TLROUTER_SLICE_KEY].navigate.bind(null, props.to)
        },
        // rest of passed props; matching keys will overwrite any values above if provided
        props
    )

    // render the anchor tag, pass built attributes object, and child elements.
    return h('a', attrs, children)
}
