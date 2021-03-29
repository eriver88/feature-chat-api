const { configure, getLogger } = require('log4js')

configure({
    appenders: { 'out': { type: 'stdout' } },
    categories: { default: { appenders: ['out'], level: 'info' } }
})

const logger = getLogger("feature-chat")

module.exports = logger