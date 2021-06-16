
// Structure of Error Occured Response
exports.errorMessage = (error) => {
    return {
        EX_CODE: -1,
        ERROR: error
    }
}

exports.successMessage = (success) => {
    return {
        EX_CODE: 1,
        SUCCESS: success
    }
}