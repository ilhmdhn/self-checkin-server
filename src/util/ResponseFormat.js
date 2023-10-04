module.exports = (state, message = 'SUCCESS', data) => {
    return {
        state: state,
        message: message,
        data: data
    }
}