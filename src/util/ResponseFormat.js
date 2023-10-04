module.exports = (state, data, message = 'SUCCESS') => {
    return {
        state: state,
        message: message,
        data: data
    }
}