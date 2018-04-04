'use strict'

import { h } from 'hyperapp'

const TLROUTER_SLICE_KEY = '__TLROUTER__'

const tlRouterStateBase = Object.freeze({
    [TLROUTER_SLICE_KEY]: {
        location: '/'
    }
})

const tlRouterActionsBase = Object.freeze({
    [TLROUTER_SLICE_KEY]: {
        navigate: location => () => ({ location })
    }
})

// HOA app function
// bind our internal state and actions to the app's state and actions,
// and return the call to app.
export const withTlRouter = app => (state, actions, view, mountPoint) => app(
    Object.assign({}, state, tlRouterStateBase),
    Object.assign({}, actions, tlRouterActionsBase),
    view,
    mountPoint
)

export const Router = routes => {
    if (routes == null || Object.keys(routes).length === 0) {
        throw new Error('No routes provided to tlRouter.Router.')
    }

    if (!routes['ROUTE_FALLBACK'] && !routes['/']) {
        throw new Error('No fallback or base route; please provide a route matching either "/" or "ROUTE_FALLBACK".')
    }

    return (state, actions) => routes[state[TLROUTER_SLICE_KEY].location] || routes['ROUTE_FALLBACK'] || routes['/']
}

export const Link = ({ to, href }, children) => (state, actions) => {
    if (href == null) href = '#'

    return (
        <a href={href} onclick={actions[TLROUTER_SLICE_KEY].navigate.bind(null, to)}>{children}</a>
    )
}

