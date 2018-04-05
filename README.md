## Hyperapp Top-Level Router

#### @geordiep/h_tlrouter

Tiny higher-order app providing top-level routing for [Hyperapp](https://github.com/hyperapp/hyperapp).

The offical router ([@hyperapp/router](https://github.com/hyperapp/router)) was overkill for one of my use cases, and this simple alternative gets the job done.

---

#### This module...

##### Does

- Switch between top-level components according to app state
- Allow navigation between top-level components from anywhere you can render a `Link` component
- Make an effort to stay out of your way

##### Does Not

- Use the browser history API (location only maintained in app state) (this may change)
- Sanitize route strings (`/example/` will not match a route `/example`) (this may change)
- Implement redirects, URL parameters, nested routes, or many other features you may need

---

### Install

- `yarn add @geordiep/h_tlrouter` or `npm i @geordiep/h_tlrouter`

### Use

**Step-by-step** (Full single-file app example available [later in this README](https://github.com/GeordieP/h_tlrouter/blob/master/README.md#full-app-example)):

- Import Router and higher-order app (HOA) function into app entrypoint file

```js
import { Router, withTlRouter } from '@geordiep/h_tlrouter'
```

- Set up router component

```js
// Map each route string to the component it should render.
// This object acts as your top-level view, passed to hyperapp.app()
const router = Router({
  '/': IndexPg,
  '/details': DetailsPg
})
```

- Call HOA function to create your app. Partially applied function takes the same args as `hyperapp.app()`.

```js
const dispatch = withTlRouter(app)(
  state,
  actions,
  router,
  document.body
)
```

- Render Link components inside any components that should link elsewhere

```jsx
import { Link } from '@geordiep/h_tlrouter'

const myComponent = (state, actions) => (
  <div>
    <p>Hello</p>
    <Link to='/details'>See Details</Link>
  </div>
)
```

That's it!

### Test App

An example multi-file app using the module is provided in the repository under `test/test-app/`. To run it from this repository, follow these steps:

- Clone repo

```
git clone https://github.com/GeordieP/h_tlrouter.git
```

- Install dependencies

```
npm i
```

- Run webpack-dev-server on configuration file `test/test-app/webpack.testapp.js`

```
npm run dev
```


### Full App Example

Example of a working (single file) app using the module.

See "point of interest" comments for the use of module features.

```jsx
import { app, h } from 'hyperapp'
import { Router, withTlRouter, Link } from 'tlRouter'

// Components
const IndexPg = (state, actions) => (
  <div>
    <NavBar />
    <h1>Index Page</h1>
    <p>Date: { state.date }</p>
  </div>
)

const DetailsPg = (state, actions) => (
  <div>
    <NavBar />
    <h1>Details Page</h1>
    <p>Date: { state.date }</p>
    <button onclick={ actions.refreshDate }>Refresh Date</button>
  </div>
)

/*** Point Of Interest ***/
/// Using the router Link component
const NavBar = () => (
  <span>
    <Link to='/'>Home</Link>
    <Link to='/details'>Details</Link>
  </span>
)

// app state and actions
const stateBase = { date: '' }
const actionsBase = { refreshDate: () => ({ date: new Date().toGMTString() }) }

/*** Point Of Interest ***/
/// Creating the router
// Map each route string to the component it should render.
// This object acts as your top-level view, passed to hyperapp.app()
const router = Router({
  '/': IndexPg,
  '/details': DetailsPg
})

/*** Point Of Interest ***/
/// Creating app using provided HOA function
const dispatch = withTlRouter(app)(
  stateBase,
  actionsBase,
  router,
  document.body
)

// Initially call refresh action
dispatch.refreshDate()
```
