function accessMuffin(session, crumble){
    return session[crumble] || false;
}

module.exports = {
    accessMuffin
}