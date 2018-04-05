const { Router, withTlRouter, Link } = require('../src/main')

const mockStateLocation = l => ({
    __TLROUTER__: { location: l }
})

const mockActions = () => ({
    __TLROUTER__: { navigate: l => () => ({ location: l }) }
})

// mock hyperapp app function; just return actions
const mockAppFn = () => mockActions()

// component mocks
const c_Root = () => 'root component'
const c_SecondPage = () => 'second page'
const c_ThirdPage = () => 'third page'

// tests //

describe('Router creator function', () => {
    it('returns fn with expected signature', () => {
        const testRouter = Router({
            '/': c_Root,
            '/second': c_SecondPage,
            '/third': c_ThirdPage,
        })

        expect(testRouter.toString()).toMatch(/^\(state, actions\) => /g)
    })

    it('throws error when no routes are given', () => {
        const testRouterCall = () => Router({ })
        expect(testRouterCall).toThrow(/no routes provided/gi)
    })

    it('throws error when no root or ROUTE_FALLBACK routes are given', () => {
        let testRouterCall = () => Router({ '/first': c_Root })

        expect(testRouterCall).toThrow(/no fallback or base route/gi)

        // make sure error doesnt get thrown when one of the fallbacks are provided
        testRouterCall = () => Router({ '/': c_Root })
        expect(testRouterCall).not.toThrow()

        testRouterCall = () => Router({ 'ROUTE_FALLBACK': c_Root })
        expect(testRouterCall).not.toThrow()
    })
})

describe('Router function', () => {
    const testRouter = Router({
        '/': c_Root,
        '/second': c_SecondPage,
        '/third': c_ThirdPage,
    })

    it('returns matching fn for given state location', () => {
        let state, route, actions = mockActions()

        // route / should return c_Root function
        state = mockStateLocation('/')
        route = testRouter(state, actions)
        expect(route()).toBe(c_Root())

        // route /second should return c_SecondPage function
        state = mockStateLocation('/second')
        route = testRouter(state, actions)
        expect(route()).toBe(c_SecondPage())

        // route /second should return c_ThirdPage function
        state = mockStateLocation('/third')
        route = testRouter(state, actions)
        expect(route()).toBe(c_ThirdPage())
    })

    it('falls back to / route when state path is empty', () => {
        let state, route, actions = mockActions()

        // missing route should return c_Root function
        state = mockStateLocation('')
        route = testRouter(state, actions)
        expect(route()).toBe(c_Root())
    })

    it('falls back to ROUTE_FALLBACK when state is empty and no / route exists', () => {
        let state, route, actions = mockActions()

        const subTestRouter = Router({
            '/first': c_Root,
            '/second': c_SecondPage,
            'ROUTE_FALLBACK': c_ThirdPage,
        })

        // missing route (in router with no root) should return c_ThirdPage function
        state = mockStateLocation('')
        route = subTestRouter(state, actions)
        expect(route()).toBe(c_ThirdPage())
    })
})

describe('HOA', () => {
    const state = mockStateLocation('/')
    const actions = mockActions()
    const view = {}

    const mockFn = jest.fn()
    mockFn.mockImplementation(mockAppFn)
    const hoa = withTlRouter(mockFn)(state, actions, view, 'body')

    it('calls the provided app fn and returns its result', () => {
        expect(mockFn.mock.calls.length).toBe(1)

        // ensure it returned the result of the app call
        const expected = JSON.stringify(mockActions())
        const actual = JSON.stringify(hoa)
        expect(actual).toEqual(expected)
    })

    it('applies tlrouter state to passed state', () => {
        const expected = JSON.stringify(mockStateLocation('/'))
        const actual = JSON.stringify(mockFn.mock.calls[0][0]) // index 0: state
        expect(actual).toEqual(expected)
    })

    it('applies tlrouter actions to passed actions', () => {
        const expected = JSON.stringify(mockActions())
        const actual = JSON.stringify(mockFn.mock.calls[0][1]) // index 1: actions
        expect(actual).toEqual(expected)
    })
})

describe('Link', () => {
    const state = mockStateLocation('/')
    const actions = mockActions()
    const defaultLink = Link({ to: '/details' })(state, actions)

    it('returns an anchor tag', () => {
        expect(defaultLink['nodeName']).toBe('a')
    })

    it('applies default href attribute (default is #)', () => {
        expect(defaultLink['attributes']['href']).toBe('#')
    })

    it('applies navigate fn from app\'s actions as onclick handler attribute', () => {
        expect(defaultLink['attributes']['onclick'].name).toBe('bound navigate')
    })

    it('overwrites default href attribute if one is provided', () => {
        const testhref = '#testhref'
        const testLink = Link({ to: '/details', href: testhref })(state, actions)
        expect(testLink['attributes']['href']).toBe(testhref)
    })

    it('passes any unrecognized props down to anchor tag as attributes', () => {
        const teststyle = { backgroundColor: 'red' }
        const testLink = Link({ to: '/details', style: teststyle })(state, actions)
        expect(JSON.stringify(testLink['attributes']['style'])).toEqual(JSON.stringify(teststyle))
    })
})
