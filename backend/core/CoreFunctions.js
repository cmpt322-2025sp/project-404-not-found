function generateToken(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var token = '';
    for (let index = 0; index < (length-1); index++) {
        token += characters.charAt(Math.floor(Math.random() * 62));
    }
    return token;
}

module.exports = {
    generateToken
}