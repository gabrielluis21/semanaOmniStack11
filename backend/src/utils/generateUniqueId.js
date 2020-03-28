const crypto = require('crypto');

module.exports = function genrateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}