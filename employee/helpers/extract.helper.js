const Exception  = require('../exceptions/exception');

function extractBody(event) {
    if (!event.body) {
        throw new Exception( 'Missing Body', 422)
    }

    return JSON.parse(event.body)
}

module.exports = { extractBody };
