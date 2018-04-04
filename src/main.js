'use strict'

import { h } from 'hyperapp'

export const actions = {
    navigate: location => () => ({ location })
}

export const state = {
    location: '/'
}

export const Router = routes => {
    if (routes == null || Object.keys(routes).length === 0) {
        throw new Error('No routes provided to tlRouter.Router.')
    }

    if (!routes['ROUTE_FALLBACK'] && !routes['/']) {
        throw new Error('No fallback or base route; please provide a route matching either "/" or "ROUTE_FALLBACK".')
    }

    return (state, actions) => {
        if (state.tlRouter == null) {
            throw new Error('"tlRouter" object not found in app state. Did you configure your app correctly? (Check tlRouter documentation)')
        }

        return routes[state.tlRouter.location] || routes['ROUTE_FALLBACK'] || routes['/']
    }
}

export const Link = ({ to, href }, children) => (state, actions) => {
    if (actions.tlRouter == null) {
        throw new Error('"tlRouter" object not found in app actions. Did you configure your app correctly? (Check tlRouter documentation.)')
    }

    if (href == null) href = '#'

    return (
        <a href={href} onclick={actions.tlRouter.navigate.bind(null, to)}>{children}</a>
    )
}
