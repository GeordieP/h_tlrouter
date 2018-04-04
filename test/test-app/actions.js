module.exports = {
    countUp: () => state => ({ counter: state.counter + 1}),
    countDown: () => state => ({ counter: state.counter - 1})
}
