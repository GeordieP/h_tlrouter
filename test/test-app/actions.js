module.exports = {
    countUp: () => state => ({ counter: state.counter + 1}),
    countDown: () => state => ({ counter: state.counter - 1}),
    // updateColor used in navBar to test custom click handler wrappers around Link components
    updateColor: () => state => ({ itemColor: newClr() })
}

// used by updateColor action
const clrs = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'lime']
const newClr = () => clrs[Math.floor(Math.random() * clrs.length)]
