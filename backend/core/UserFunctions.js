// const { InsertDocument, FindDocument } = require("./DatabaseFunctions");
// const CoreFunctions = require("./CoreFunctions");
// const crypto = require('crypto');

const loginUser = async (email, password) => {
    // const user = await FindDocument('users', {email: email}, 'email salt password');
    // if(!user) return { authenticated: false, error: 'User Not Found' };
    // const hashedPassword = crypto.scryptSync(password, user.salt, 128).toString('hex');
    // return (user.password !== hashedPassword) ? { authenticated: false, error: 'Incorrect Password' } : { authenticated: true, error: '' };
    // return (password !== "pw123") ? { authenticated: false, error: 'Incorrect Password' } : { authenticated: true, error: '' };
    if (email == "admin@bob.com") {
        return (password !== "admin") ? { authenticated: false, error: 'Incorrect Password' } : { authenticated: true, admin: true, error: '' }
    } else {
        return (password !== "pw123") ? { authenticated: false, error: 'Incorrect Password' } : { authenticated: true, admin: false, error: '' }
    }
}

module.exports = {
    loginUser
}