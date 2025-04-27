function accessMuffin(user, crumble) {
    if (crumble == 'all'){
        return {
            userId: user['userId'],
            isLoggedIn: user['isLoggedIn'],
            isAdmin: user['isAdmin'],
            userFirstName: user['userFirstName']
        }
    }
    return user ? user[crumble] || false : false;
}

module.exports = {
    accessMuffin
};